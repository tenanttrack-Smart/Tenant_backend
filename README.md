# Property Management API

A backend API built with Node.js, Express, and Prisma for managing properties, tenants, leases, payments, maintenance, work orders, notifications, and reports.

base URL: http://localhost:3000
---



## 🔐 Authentication Routes

**Base:** `/api/auth`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| POST | `/register` | `{ name, email, password, role }` | Register a new user |
| POST | `/login` | `{ email, password }` | Authenticate user and return token |

---

## 👤 User Routes

**Base:** `/api/users`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| GET | `/` | None | Retrieve all users |
| GET | `/:id` | None | Retrieve a specific user |
| PUT | `/:id` | `{ name?, email?, password?, role? }` | Update user details (optional fields) |
| DELETE | `/:id` | None | Delete a user |

---

## 🏘️ Property Routes

**Base:** `/api/properties`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| GET | `/` | None | Retrieve all properties |
| GET | `/:id` | None | Retrieve a specific property |
| POST | `/` | `{ title, address, description?, userId }` | Create a new property |
| PUT | `/:id` | `{ title?, address?, description? }` | Update property details |
| DELETE | `/:id` | None | Delete a property |

---

## 👥 Tenant Routes

**Base:** `/api/tenants`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| GET | `/` | None | Retrieve all tenants |
| GET | `/:id` | None | Retrieve a specific tenant |
| POST | `/` | `{ userId, email, propertyName?, unitNumber, phone?, monthlyRent, depositAmount, startDate, endDate }` | Add a new tenant |
| PUT | `/:id` | `{ email?, propertyName?, unitNumber?, phone?, monthlyRent?, depositAmount?, startDate?, endDate?, status? }` | Update tenant information |
| DELETE | `/:id` | None | Delete a tenant record |

---

## 📜 Lease Routes

**Base:** `/api/lease`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| GET | `/` | None | Retrieve all lease agreements |
| GET | `/:id` | None | Retrieve a specific lease |
| POST | `/` | `{ tenantId, landlordId, propertyId, startDate, endDate, rentAmount, paymentFrequency?, status?, notes? }` | Create a new lease |
| PUT | `/:id` | `{ startDate?, endDate?, rentAmount?, paymentFrequency?, status?, notes? }` | Update lease details |
| DELETE | `/:id` | None | Delete a lease record |

---

## 💰 Payment Routes

**Base:** `/api/payments`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| GET | `/` | None | Retrieve all payments |
| GET | `/:id` | None | Retrieve a specific payment |
| POST | `/` | `{ tenantId, leaseId, staffId?, amount, paymentDate?, paymentMethod?, paymentStatus?, notes? }` | Record a new payment |
| PUT | `/:id` | `{ amount?, paymentDate?, paymentMethod?, paymentStatus?, notes? }` | Update payment details |
| DELETE | `/:id` | None | Delete a payment record |

---

## 🧰 Maintenance Routes

**Base:** `/api/maintenance`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| GET | `/` | None | Retrieve all maintenance requests |
| GET | `/:id` | None | Retrieve a specific maintenance request |
| POST | `/` | `{ tenantId, title, description, priority, status?, assignedTo? }` | Create a new maintenance request |
| PUT | `/:id` | `{ title?, description?, priority?, status?, assignedTo? }` | Update maintenance status/details |
| DELETE | `/:id` | None | Delete a maintenance request |

---

## 🧾 Work Order Routes

**Base:** `/api/work-orders`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| GET | `/` | None | Retrieve all work orders |
| GET | `/:id` | None | Retrieve a specific work order |
| POST | `/` | `{ title, description, apartmentName, tenantName, priority, status, assignedTo? }` | Create a new work order |
| PUT | `/:id` | `{ title?, description?, apartmentName?, tenantName?, priority?, status?, assignedTo? }` | Update work order details |
| DELETE | `/id` | None | Delete a work order |

---

## 🔔 Notification Routes

**Base:** `/api/notifications`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| GET | `/` | None | Retrieve all notifications |
| GET | `/:id` | None | Retrieve a specific notification |
| POST | `/` | `{ userId, title, message, type, isRead? }` | Create a new notification |
| DELETE | `/id` | None | Delete a notification |

---

## 🎨 Report Routes

**Base:** `/api/reports`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| GET | `/` | None | Retrieve all reports |
| GET | `/:id` | None | Retrieve a specific report |
| POST | `/` | `{ tenantId, landlordId, propertyId, data }` | Create a new report (full property/tenant/landlord details) |
| DELETE | `/id` | None | Delete a report |

---

## 🔒 Protected Routes

**Base:** `/api/protected`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| GET | `/` | JWT token in header | Access a protected route (requires JWT token) |

---

## 🧪 Test Route

**Base:** `/test`

| Method | Endpoint | Required Data | Description |
|--------|-----------|---------------|-------------|
| GET | `/` | None | Check if the server is running |

---

## ❌ Error Handling

| Type | Response |
|------|-----------|
| Server Error | Returns a `500` status with message `"Something went wrong!"` |
| Not Found | Returns a `404` status with message `"Route not found"` |

---

## 🧭 Developer Notes

- All routes are prefixed with `/api`
- JSON format is required for all request and response bodies
- CORS is enabled globally
- JWT authentication is required for protected routes
- Default port: `3000`

---

## 🧑‍💻 Frontend Integration Notes

- Use `Authorization: Bearer <token>` header for protected routes  
- Handle 404 and 500 status codes properly  
- Use `/test` to verify backend connection  
- All endpoints return structured JSON responses  

---

**© 2025 Property Management API — All Rights Reserved**
