#!/usr/bin/env sh
# Production-safe counterpart to the local Node-based release check.
# The production host intentionally has no host-level Node.js installation.
set -eu

case "${1:-}" in
  ''|--stateless) ;;
  *) printf '%s\n' 'Usage: sh deploy/release-check.sh [--stateless]' >&2; exit 2 ;;
esac

docker compose -f compose.yaml config >/dev/null
if [ "${1:-}" != '--stateless' ]; then
  stamp=$(date -u +%Y%m%dT%H%M%SZ)
  backup_dir="/opt/vanventure/backups/release-${stamp}"
  mkdir -p "$backup_dir"
  docker compose -f compose.yaml exec -T db pg_dump -U vanventure -d vanventure -Fc > "$backup_dir/database-before.dump"
  test -s "$backup_dir/database-before.dump"
  chmod 600 "$backup_dir/database-before.dump"
  sha256sum "$backup_dir/database-before.dump" > "$backup_dir/database-before.dump.sha256"
fi
docker compose -f compose.yaml exec -T web node --input-type=module -e "const response=await fetch('http://127.0.0.1:8787/healthz');if(!response.ok)process.exit(1)"
printf '%s\n' 'Produktionsprüfung erfolgreich: Compose und Healthcheck sind erfüllt.'
