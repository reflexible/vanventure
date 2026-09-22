#!/usr/bin/env sh
# Production-safe counterpart to the local Node-based release check.
# The production host intentionally has no host-level Node.js installation.
set -eu

stamp=$(date -u +%Y%m%dT%H%M%SZ)
backup_dir="/opt/vanventure/backups/release-${stamp}"

docker compose -f compose.yaml config >/dev/null
mkdir -p "$backup_dir"
docker compose -f compose.yaml exec -T db pg_dump -U vanventure -d vanventure -Fc > "$backup_dir/database-before.dump"
test -s "$backup_dir/database-before.dump"
chmod 600 "$backup_dir/database-before.dump"
sha256sum "$backup_dir/database-before.dump" > "$backup_dir/database-before.dump.sha256"
docker compose -f compose.yaml exec -T web node --input-type=module -e "const response=await fetch('http://127.0.0.1:8787/healthz');if(!response.ok)process.exit(1)"
printf '%s\n' 'Produktionsprüfung erfolgreich: Compose, geschützter Dump und Healthcheck sind erfüllt.'
