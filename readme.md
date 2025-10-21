🚗 Ride Booking API — Project Note

A RESTful API for a ride-hailing system built with Node.js, Express, TypeScript, and MongoDB. It supports user authentication, role-based access control (RBAC), and full ride management for Riders and Drivers.

project/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── ride.controller.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── rbac.middleware.ts
│   ├── models/
│   │   ├── user.model.ts
│   │   └── ride.model.ts
│   ├── routes/
│   │   ├── auth.route.ts
│   │   └── ride.routes.ts
│   ├── types/
│   │   └── authRequest.ts
│   ├── services/
│   │   └── database.ts
│   ├── server.ts
│   └── app.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md

Key Features:

🔐 JWT Authentication (Sign Up, Log In)

🧩 Role-based Access (Rider / Driver)

🚘 Ride operations: request, accept, complete, cancel

🕒 Ride history for users

⚙️ Data validation & error handling

🌍 MongoDB database with Mongoose

🧠 Built using TypeScript and Express Middleware

Core Endpoints:

POST /api/v1/auth/register → Register user

POST /api/v1/auth/login → Log in and get token

POST /api/v1/rides/request → Rider requests a ride

PATCH /api/v1/rides/:id/accept → Driver accepts ride

PATCH /api/v1/rides/:id/complete → Driver completes ride

PATCH /api/v1/rides/:id/cancel → Cancel ride

GET /api/v1/rides/history → View ride history

Tech Stack:
TypeScript · Express.js · MongoDB · JWT · Bcrypt · Zod/Joi

Developer:
John Fofie — Design and Technology Institute
Creative Media & Tech Enthusiast