export type ServerSnapshot = {
  users: string;
  status: string;
  ipAddress: string;
  port: string;
  uptime: string;
  ping: string;
  domain: string;
  players: string[];
  version: string;
};

const fallbackSnapshot: ServerSnapshot = {
  users: '—',
  status: 'offline',
  ipAddress: '—',
  port: '—',
  uptime: '—',
  ping: '—',
  domain: '—',
  players: [],
  version: '—',
};

type McStatusResponse = {
  online: boolean;
  host?: string;
  port?: number;
  ip_address?: string;
  players?: { 
    online?: number; 
    max?: number;
    list?: Array<{ name_clean?: string; name_raw?: string }>;
  };
  version?: { name_clean?: string; name_raw?: string };
  retrieved_at?: number;
};

type VmStatusReport = {
  server_uptime_seconds?: number;
  uptime_human?: string;
  ping_ms?: number;
  checked_at?: string;
};

async function getVmReport(): Promise<Partial<ServerSnapshot>> {
  const vmStatusUrl = process.env.VM_STATUS_URL;
  if (!vmStatusUrl) {
    return { uptime: '—', ping: '—' };
  }

  try {
    const response = await fetch(vmStatusUrl, { cache: 'no-store' });
    if (!response.ok) {
      console.error('VM status report request failed', await response.text());
      return { uptime: '—', ping: '—' };
    }
    const data = (await response.json()) as VmStatusReport;

    const uptime = data.uptime_human
      ? data.uptime_human
      : data.server_uptime_seconds != null
        ? `${data.server_uptime_seconds}s`
        : '—';
    const ping = data.ping_ms != null ? `${data.ping_ms} ms` : '—';

    return { uptime, ping };
  } catch (error) {
    console.error('VM status report integration error', error);
    return { uptime: '—', ping: '—' };
  }
}

export async function getServerStatus(): Promise<ServerSnapshot> {
  const host = process.env.SERVER_HOST;
  const port = process.env.SERVER_PORT;

  if (!host || !port) {
    return fallbackSnapshot;
  }

  const vmReport = await getVmReport();

  try {
    const response = await fetch(
      `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(`${host}:${port}`)}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      console.error('Status API request failed', await response.text());
      return fallbackSnapshot;
    }

    const data = (await response.json()) as McStatusResponse;
    const domain = process.env.SERVER_DOMAIN || data.host || host;

    // Extract player names
    const playerList = data.players?.list?.map(p => p.name_clean || p.name_raw || 'Unknown').slice(0, 10) || [];
    const rawVersion = data.version?.name_clean || data.version?.name_raw || '—';
    // Don't show "OFFLINE" as version - it's just the MOTD
    const version = rawVersion === 'OFFLINE' ? '—' : rawVersion;

    return {
      users: data.online && data.players?.online != null ? String(data.players.online) : '—',
      status: data.online ? 'online' : 'offline',
      ipAddress: data.ip_address || data.host || host,
      port: data.port ? String(data.port) : port,
      uptime: vmReport.uptime ?? '—',
      ping: vmReport.ping ?? '—',
      domain,
      players: playerList,
      version,
    };
  } catch (error) {
    console.error('Status API integration error', error);
    return {
      ...fallbackSnapshot,
      uptime: vmReport.uptime ?? '—',
      ping: vmReport.ping ?? '—',
    };
  }
}
