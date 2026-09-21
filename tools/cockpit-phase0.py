"""Prepare/check Cockpit configuration without printing secrets or starting services.

Run on Marvin: python3 cockpit-phase0.py --root /opt/vanventure --prepare
Import Google's downloaded Web client JSON with --client-json /private/client.json.
Exit 2 means configuration is incomplete; Google Console checks remain separate.
"""
import argparse
import datetime
import json
import os
from pathlib import Path
import re
import secrets
import tempfile

CALLBACK = "https://vanventure.at/api/cockpit/youtube/callback"
KEY = "COCKPIT_TOKEN_ENCRYPTION_KEY"


def run():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, required=True)
    parser.add_argument("--prepare", action="store_true")
    parser.add_argument("--client-json", type=Path)
    parser.add_argument("--channel-id")
    args = parser.parse_args()
    path = args.root.resolve() / ".env"
    if path.is_symlink() or not path.is_file():
        raise ValueError("An existing regular .env file is required")
    original = path.read_text(encoding="utf-8")
    values = {}
    for line in original.splitlines():
        if not line.strip() or line.lstrip().startswith("#") or "=" not in line:
            continue
        name, value = line.split("=", 1)
        name = name.strip()
        if name in values:
            raise ValueError("Duplicate environment variable: " + name)
        values[name] = value.strip().strip("\"'")
    additions = {}
    if args.prepare:
        if not values.get(KEY):
            additions[KEY] = secrets.token_hex(32)
        if not values.get("GOOGLE_OAUTH_REDIRECT_URI"):
            additions["GOOGLE_OAUTH_REDIRECT_URI"] = CALLBACK
        if "COCKPIT_SYNC_ENABLED" not in values:
            additions["COCKPIT_SYNC_ENABLED"] = "false"
    if args.client_json:
        client = json.loads(args.client_json.read_text(encoding="utf-8")).get("web", {})
        if CALLBACK not in client.get("redirect_uris", []):
            raise ValueError("Web client must include the production callback")
        for name, field in [("GOOGLE_OAUTH_CLIENT_ID", "client_id"), ("GOOGLE_OAUTH_CLIENT_SECRET", "client_secret")]:
            value = client.get(field, "")
            if not re.fullmatch(r"[A-Za-z0-9_.-]+", value):
                raise ValueError("Missing or invalid Web client field: " + field)
            if values.get(name) and values[name] != value:
                raise ValueError("Refusing to replace existing credential: " + name)
            additions[name] = value
    if args.channel_id:
        if not re.fullmatch(r"UC[A-Za-z0-9_-]{22}", args.channel_id):
            raise ValueError("Invalid YouTube channel ID")
        if values.get("YOUTUBE_CHANNEL_ID") not in (None, "", args.channel_id):
            raise ValueError("Refusing to change the configured channel")
        additions["YOUTUBE_CHANNEL_ID"] = args.channel_id
    additions = {k: v for k, v in additions.items() if values.get(k) != v}
    if additions:
        stamp = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%dT%H%M%S%fZ")
        backup = args.root.resolve() / "backups" / ("cockpit-phase0-" + stamp)
        backup.mkdir(parents=True, mode=0o700)
        backup_file = backup / "environment.before"
        fd = os.open(backup_file, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            stream.write(original)
        lines = [line for line in original.splitlines() if line.split("=", 1)[0].strip() not in additions]
        lines.extend(k + "=" + v for k, v in additions.items())
        fd, temporary = tempfile.mkstemp(dir=path.parent, prefix=".cockpit-env-")
        try:
            with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as stream:
                stream.write("\n".join(lines) + "\n")
                stream.flush()
                os.fsync(stream.fileno())
            os.replace(temporary, path)
        finally:
            if os.path.exists(temporary):
                os.unlink(temporary)
        values.update(additions)
    checks = {
        "oauth_client_id": bool(re.fullmatch(r"[A-Za-z0-9_.-]+\.apps\.googleusercontent\.com", values.get("GOOGLE_OAUTH_CLIENT_ID", ""))),
        "oauth_client_secret": bool(values.get("GOOGLE_OAUTH_CLIENT_SECRET")),
        "encryption_key_32_bytes_hex": bool(re.fullmatch(r"[0-9a-f]{64}", values.get(KEY, ""))),
        "production_callback": values.get("GOOGLE_OAUTH_REDIRECT_URI") == CALLBACK,
        "channel_id": bool(re.fullmatch(r"UC[A-Za-z0-9_-]{22}", values.get("YOUTUBE_CHANNEL_ID", ""))),
        "automatic_sync_disabled": values.get("COCKPIT_SYNC_ENABLED") == "false",
        "environment_private": os.name == "nt" or path.stat().st_mode & 0o077 == 0,
    }
    print(json.dumps({"checks": checks, "configuration_ready": all(checks.values()), "changed_variables": sorted(additions)}, indent=2))
    return 0 if all(checks.values()) else 2


if __name__ == "__main__":
    try:
        raise SystemExit(run())
    except (ValueError, OSError, KeyError):
        # Input files can contain secrets, so do not echo exception payloads.
        print("Configuration rejected. Check file access, duplicate variables, existing credentials and Web client format.")
        raise SystemExit(1)
