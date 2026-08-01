# VM reporter setup for Option A (uptime + ping)

## What this is
A tiny bash script that runs on your Falix VM via cron, writes a JSON file with
uptime and ping, and serves it from the VM's web root so the public dashboard
can read it without exposing secrets.

## Files
- `vm-reporter.sh` — the reporter script (run on the VM)
- `status.example.json` — example of the file it produces

## On the VM (once)
1. Upload `vm-reporter.sh` to `/root/`
2. Make it executable: `chmod +x /root/vm-reporter.sh`
3. Test once: `bash /root/vm-reporter.sh` → check `/var/www/html/status.json`
4. Schedule every minute: `crontab -e`, add:
   ```
   * * * * * /root/vm-reporter.sh
   ```
5. Confirm the JSON is public: open `http://<your-server>/status.json` in a browser

## Dashboard side
Set in `.env.local` (or Vercel env vars):
```
VM_STATUS_URL=https://your-server/status.json
```
The dashboard merges this with mcstatus data: users/status/ip/port come from
the public Minecraft API, and uptime/ping come from this JSON.

## Optional tuning
- `PING_TARGET` env var changes what the script pings (default loopback).
- `STATUS_FILE` env var changes the output path.
