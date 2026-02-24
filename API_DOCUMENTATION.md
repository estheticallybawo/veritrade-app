# VeriTrade API Documentation

**For Mobile Development Team**

Base URL: `http://localhost:5000` (Development)

---

## Authentication

### Register User
```
POST /api/auth/register

Body: name, email, password, role (buyer or admin)
Response: token, user object
```

### Login User
```
POST /api/auth/login

Body: email, password
Response: token, user object
```

---

## Token Management

**CRITICAL:** Store JWT tokens using `expo-secure-store` (NOT AsyncStorage)

Include token in all protected requests:
```
Authorization: Bearer {token}
```

Token expires after 24 hours.

---

## Buyer Endpoints

All require `Authorization: Bearer {token}` header.

### Submit Verification Request
```
POST /api/verifications/submit

Body: business_name, registration_number
Response: verification object with id, status, created_at
```

### Get My Verification Requests
```
GET /api/verifications/my-requests

Response: Array of verification objects
```

### Get Single Verification Request
```
GET /api/verifications/:id

Response: Single verification object
```

### Cancel Verification Request
```
PATCH /api/verifications/:id/cancel

Response: Updated verification with status "cancelled"
Note: Only works for pending/draft requests
```

---

## Verification Status Values

- `pending` — Awaiting admin review
- `verified` — Admin approved
- `rejected` — Admin rejected
- `flagged` — Needs further review
- `cancelled` — User cancelled

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Continue |
| 201 | Created | Resource created |
| 400 | Bad Request | Show validation error |
| 401 | Unauthorized | Redirect to login |
| 403 | Forbidden | Show access denied |
| 404 | Not Found | Show not found message |
| 500 | Server Error | Show try again message |

### Error Response Format
```json
{
  "message": "Error description"
}
```

---

## Security Requirements

1. **Token Storage:** Use `expo-secure-store` only
2. **Token Inclusion:** Add `Authorization: Bearer {token}` to all protected requests
3. **Token Expiry:** Handle 401 errors by redirecting to login
4. **Logout:** Delete token from SecureStore
5. **HTTPS:** Use HTTPS in production (DevOps will provide URL)

---

## Testing

Check if backend is running:
```
GET http://localhost:5000
Response: {"message":"VeriTrade API is running"}
```

--- 
**References:** `api-tests.http` for request examples, `README.md` for setup

