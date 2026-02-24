# VeriTrade Backend

Business Legitimacy Verification Platform for Nigerian SMEs

---

## Quick Start
```bash
npm install
npm run dev
```

Server runs on `http://localhost:5000`

---

## Setup

Create `.env` file:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=veritrade_new_db
JWT_SECRET=your_secret_key
```

Create database:
```sql
CREATE DATABASE veritrade_new_db;
```

Tables auto-create on first run. 3,500 Nigerian businesses pre-loaded.

---

## Authentication

**Register:**
```http
POST /api/auth/register
{
  "name": "John Buyer",
  "email": "buyer@veritrade.com",
  "password": "TestPassword123",
  "role": "buyer"
}
```

**Login:**
```http
POST /api/auth/login
{
  "email": "buyer@veritrade.com",
  "password": "TestPassword123"
}
```

Save the JWT token from response.

---

## Buyer Endpoints

Include `Authorization: Bearer {token}` in all requests.
```http
POST /api/verifications/submit
{
  "business_name": "EcoTech Solutions Ltd",
  "registration_number": "RC999988"
}

GET /api/verifications/my-requests
GET /api/verifications/:id
PATCH /api/verifications/:id/cancel
```

---

## Admin Endpoints

Include `Authorization: Bearer {admin_token}` in all requests.
```http
GET /api/admin/verifications/pending
GET /api/admin/verifications?status=verified

PATCH /api/admin/verifications/:id/verify
{
  "admin_notes": "Business verified successfully"
}

PATCH /api/admin/verifications/:id/reject
{
  "admin_notes": "Invalid registration"
}

PATCH /api/admin/verifications/:id/flag
{
  "admin_notes": "Needs investigation"
}
```

---

## Status Flow
```
pending → verified
        → rejected
        → flagged
        → cancelled
```

---

## Testing

Use `api-tests.http` with VS Code REST Client extension:
1. Register buyer & admin
2. Login → copy tokens
3. Test all endpoints with tokens

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | No/Invalid Token |
| 403 | Wrong Role |
| 404 | Not Found |
| 500 | Server Error |

---

## Security

- ✅ bcrypt password hashing
- ✅ JWT authentication (24h expiry)
- ✅ Role-based access (buyer/admin)
- ✅ Protected routes
- ✅ SQL injection protection

---

## Database

**3 Tables:**
- `users` — Buyers & Admins
- `verification_requests` — All submissions
- `suppliers` — 3,500 Nigerian businesses

---

