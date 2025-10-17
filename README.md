# Property Management API

A backend API built with Node.js, Express, and Prisma for managing properties, tenants, leases, payments, maintenance, work orders, notifications, and reports.

---

## 📑 Table of Contents

- [⚙️ Technologies](#technologies)
- [📁 Routes Overview](#routes-overview)
- [🔐 Authentication Routes](#authentication-routes)
- [👤 User Routes](#user-routes)
- [🏘️ Property Routes](#property-routes)
- [👥 Tenant Routes](#tenant-routes)
- [📜 Lease Routes](#lease-routes)
- [💰 Payment Routes](#payment-routes)
- [🧰 Maintenance Routes](#maintenance-routes)
- [🧾 Work Order Routes](#work-order-routes)
- [🔔 Notification Routes](#notification-routes)
- [🎨 Report Routes](#report-routes)
- [🔒 Protected Routes](#protected-routes)
- [🧪 Test Route](#test-route)
- [❌ Error Handling](#error-handling)
- [🧭 Developer Notes](#developer-notes)
- [🧑‍💻 Frontend Integration Notes](#frontend-integration-notes)

---

## ⚙️ Technologies

- Node.js  
- Express.js  
- CORS  
- Body-Parser  
- JWT Authentication  

---

## 📁 Routes Overview

| Module | Base Route |
|---------|-------------|
| Authentication | `/api/auth` |
| Users | `/api/users` |
| Properties | `/api/properties` |
| Tenants | `/api/tenants` |
| Leases | `/api/lease` |
| Payments | `/api/payments` |
| Maintenance | `/api/maintenance` |
| Work Orders | `/api/work-orders` |
| Notifications | `/api/notifications` |
| Reports | `/api/reports` |
| Protected Routes | `/api/protected` |
| Test Route | `/test` |

---

## 🔐 Authentication Routes

**Base:** `/api/auth`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Authenticate user and return token |

---

## 👤 User Routes

**Base:** `/api/users`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/` | Retrieve all users |
| GET | `/:id` | Retrieve a specific user |
| PUT | `/:id` | Update user details |
| DELETE | `/:id` | Delete a user |

---

## 🏘️ Property Routes

**Base:** `/api/properties`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/` | Retrieve all properties |
| GET | `/:id` | Retrieve a specific property |
| POST | `/` | Create a new property |
| PUT | `/:id` | Update property details |
| DELETE | `/id` | Delete a property |

---

## 👥 Tenant Routes

**Base:** `/api/tenants`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/` | Retrieve all tenants |
| GET | `/:id` | Retrieve a specific tenant |
| POST | `/` | Add a new tenant |
| PUT | `/:id` | Update tenant information |
| DELETE | `/:id` | Delete a tenant record |

---

## 📜 Lease Routes

**Base:** `/api/lease`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/` | Retrieve all lease agreements |
| GET | `/:id` | Retrieve a specific lease |
| POST | `/` | Create a new lease |
| PUT | `/:id` | Update lease details |
| DELETE | `/id` | Delete a lease record |

---

## 💰 Payment Routes

**Base:** `/api/payments`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/` | Retrieve all payments |
| GET | `/:id` | Retrieve a specific payment |
| POST | `/` | Record a new payment |
| PUT | `/:id` | Update payment details |
| DELETE | `/id` | Delete a payment record |

---

## 🧰 Maintenance Routes

**Base:** `/api/maintenance`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/` | Retrieve all maintenance requests |
| GET | `/:id` | Retrieve a specific maintenance request |
| POST | `/` | Create a new maintenance request |
| PUT | `/:id` | Update maintenance status/details |
| DELETE | `/id` | Delete a maintenance request |

---

## 🧾 Work Order Routes

**Base:** `/api/work-orders`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/` | Retrieve all work orders |
| GET | `/:id` | Retrieve a specific work order |
| POST | `/` | Create a new work order |
| PUT | `/:id` | Update work order details |
| DELETE | `/id` | Delete a work order |

---

## 🔔 Notification Routes

**Base:** `/api/notifications`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/` | Retrieve all notifications |
| GET | `/:id` | Retrieve a specific notification |
| POST | `/` | Create a new notification |
| DELETE | `/id` | Delete a notification |

---

## 🎨 Report Routes

**Base:** `/api/reports`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/` | Retrieve all reports |
| GET | `/:id` | Retrieve a specific report |
| POST | `/` | Create a new report |
| DELETE | `/id` | Delete a report |

---

## 🔒 Protected Routes

**Base:** `/api/protected`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/` | Access a protected route (requires JWT token) |

---

## 🧪 Test Route

**Base:** `/test`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/` | Check if the server is running |

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
