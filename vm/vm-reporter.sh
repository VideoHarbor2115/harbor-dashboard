#!/usr/bin/env bash
# vm-reporter.sh — run on your Falix VM (Linux) to publish uptime + ping
# every 60 seconds via cron. Writes /var/www/html/status.json (web root)
# so the public dashboard can read it without exposing any secrets.
#
# Setup (run once on the VM):
#   1. Place this file in /root/ and:  chmod +x /root/vm-reporter.sh
#   2. Add to crontab:  crontab -e
#        * * * * * /root/vm-reporter.sh
#
# The JSON it writes:
#   {
#     "server_uptime_seconds": 12345,
#     "uptime_human": "3h 25m",
#     "ping_ms": 42,
#     "checked_at": "2026-08-01T22:30:00Z"
#   }

OUTPUT_FILE="${STATUS_FILE:-/var/www/html/status.json}"

# 1) Uptime (seconds since boot), with a human-readable form
uptime_seconds=$(awk '{print int($1)}' /proc/uptime 2>/dev/null)
if [ -z "$uptime_seconds" ] || ! [ "$uptime_seconds" -ge 0 ] 2>/dev/null; then
  uptime_seconds=0
fi

days=$((uptime_seconds / 86400))
hours=$(((uptime_seconds % 86400) / 3600))
minutes=$(((uptime_seconds % 3600) / 60))
if [ "$days" -gt 0 ]; then
  uptime_human="${days}d ${hours}h ${minutes}m"
elif [ "$hours" -gt 0 ]; then
  uptime_human="${hours}h ${minutes}m"
else
  uptime_human="${minutes}m"
fi

# 2) Ping (ms) — ICMP to the loopback is cheap and reliable; swap in your
#    real target host if you want round-trip to a gateway or public IP.
PING_TARGET="${PING_TARGET:-127.0.0.1}"
ping_ms=$(ping -c 1 -W 1 "$PING_TARGET" 2>/dev/null | awk -F'[= ]' '/time=/ {print $7; exit}')
if [ -z "$ping_ms" ]; then
  ping_ms=0
fi

# 3) ISO timestamp
checked_at=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# 4) Write JSON (atomic via temp file)
TMP_FILE="${OUTPUT_FILE}.tmp"
cat > "$TMP_FILE" <<EOF
{
  "server_uptime_seconds": $uptime_seconds,
  "uptime_human": "$uptime_human",
  "ping_ms": $ping_ms,
  "checked_at": "$checked_at"
}
EOF
mv -f "$TMP_FILE" "$OUTPUT_FILE"

echo "Wrote $OUTPUT_FILE"
