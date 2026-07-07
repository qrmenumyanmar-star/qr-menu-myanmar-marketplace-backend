# QR Shop ERP — Express Backend

REST API for the QR Shop ERP frontend (Quotation, Customer, Product, Auth).

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

API runs at **http://localhost:4000**

## Default login

| Email | Password |
|-------|----------|
| `admin@qrshop.com` | `password` |

## API endpoints

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | `/api/health` | No |
| POST | `/api/auth/login` | No |
| GET | `/api/auth/me` | Yes |
| POST | `/api/auth/logout` | Yes |
| GET/POST | `/api/customers` | Yes |
| GET/PUT/DELETE | `/api/customers/:id` | Yes |
| GET/POST | `/api/products` | Yes |
| GET/PUT/DELETE | `/api/products/:id` | Yes |
| GET/POST | `/api/quotations` | Yes |
| GET/DELETE | `/api/quotations/:id` | Yes |

### Login example

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@qrshop.com","password":"password"}'
```

### Authenticated request

```bash
curl http://localhost:4000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Project structure

```
backend/
├── src/
│   ├── config/       # env
│   ├── data/         # in-memory store (replace with Odoo/DB later)
│   ├── middleware/   # auth, errors
│   ├── routes/       # API routes
│   ├── types/
│   ├── app.ts
│   └── index.ts
├── .env.example
└── package.json
```

## Next steps

- Connect to **Odoo** JSON-RPC / JSON-2 API
- Replace in-memory store with PostgreSQL
- Wire frontend `services/auth.ts` to `POST /api/auth/login`
