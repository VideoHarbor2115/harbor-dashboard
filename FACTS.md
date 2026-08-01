## 專案概覽

| 事實 | 值 | 查證方式 | 查證日期 |
|---|---|---|---|
| 專案名稱 | falix-dashboard | package.json | 2026-08-01 |
| 框架 | Next.js 14.2.35 (App Router) | `npm run build` 輸出 | 2026-08-01 |
| 樣式方案 | Tailwind CSS 3.4.4 | tailwind.config.ts | 2026-08-01 |
| 語言 | TypeScript 5.5 | tsconfig.json | 2026-08-01 |
| 部署目標 | Vercel（免費方案） | 設計決策 | 2026-08-01 |
| Build 狀態 | ✅ 通過，零錯誤 | `npm run build` | 2026-08-01 |

## 架構

| 事實 | 值 | 查證方式 | 查證日期 |
|---|---|---|---|
| 前端入口 | `app/page.tsx` — client component | 程式碼 | 2026-08-01 |
| API - 伺服器資料 | `app/api/server-info/route.ts` GET | 程式碼 | 2026-08-01 |
| API - 啟動通知 | `app/api/notify-bootup/route.ts` POST | 程式碼 | 2026-08-01 |
| 資料層 | `lib/server-status.ts` — 透過公開 mcstatus.io API 讀取伺服器狀態（不需 API key） | 程式碼 | 2026-08-01 |
| Uptime/Ping 資料來源 | `getVmReport()` 讀取 `VM_STATUS_URL`（VM 上 `vm/vm-reporter.sh` 產生的 JSON），失敗時回退 '—' | 實測合併成功 | 2026-08-01 |
| 動態渲染 | `/` 與 `/api/server-info` 皆為 `force-dynamic`（建置時不烘焙數值，請求時即時抓取，fetch revalidate 60s） | `npm run build` 輸出 ƒ | 2026-08-01 |
| Falix 面板 API | 停用 — 面板 API 有 Cloudflare 挑戰保護，伺服器端無法呼叫 | 實測 401/challenge | 2026-08-01 |
| 伺服器設定 | `SERVER_HOST=157.90.205.61`、`SERVER_PORT=21046`（.env.local） | 使用者提供 | 2026-08-01 |
| Email 通知 | 未設定 — Resend key 回傳 401，按鈕暫時為佔位 | 實測 401 | 2026-08-01 |
| VM 狀態檔案格式 | `status.json`：`{server_uptime_seconds, uptime_human, ping_ms, checked_at}` — 範例在 `vm/status.example.json`（純 JSON，無註解） | 實測解析成功 | 2026-08-01 |
