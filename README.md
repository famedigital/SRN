# SRN — Export House Atelier

Local-first Next.js site for **SRN PRINTOTRADING PRIVATE LIMITED** (`srnglobal.in`).

See [SRN-WEBSITE-PLAN.md](./SRN-WEBSITE-PLAN.md) and [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

## Quick start

```bash
npm install
npm run dev
```

- Public site: http://localhost:3000  
- Admin: http://localhost:3000/admin  
- Default admin: `admin@srnglobal.in` / `SRN-Admin-Local-2026!` (from `.env.local`)

## Stack

- Next.js 15 · React 19 · Tailwind 4  
- Drizzle + **PGlite** locally (Postgres-compatible; no Docker required)  
- Optional `docker-compose.yml` Postgres when Docker is available  
- Hermes Telegram Mode A · transactional outbox for RFQs  

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local server |
| `npm run db:seed` | Ensure schema + seed products/admin |
| `npm run outbox:process` | Flush pending Telegram/email outbox |
| `npm run build` | Production build |

## Deferred

Vercel + Supabase — wire when you say so (`DATABASE_MODE=postgres` + `DATABASE_URL`).
