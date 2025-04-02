# API-BACKEND

## Overview
NestJS TypeScript backend with Prisma ORM and JWT authentication.

## Directory-Structure
```
api/
├── prisma/
│   └── schema.prisma    # Database schema definition
├── src/
│   ├── auth/            # Authentication module
│   ├── users/           # Users resource module
│   ├── prisma/          # Prisma database service
│   ├── app.module.ts    # Main application module
│   └── main.ts          # Application entry point
└── package.json
```

## Module-Pattern
```
module-name/
├── dto/
│   ├── create-resource.dto.ts
│   └── update-resource.dto.ts
├── entities/
│   └── resource.entity.ts
├── resource.controller.ts    # API endpoints
├── resource.service.ts       # Business logic
└── resource.module.ts        # Module definition
```

## API-Endpoints
| Method | Path | Description | Auth Required |
|--------|------|-------------|--------------|
| POST | /auth/login | User login | No |
| POST | /auth/register | User registration | No |
| GET | /auth/me | Get current user | Yes |
| GET | /users | List all users | Yes (Admin) |
| GET | /users/:id | Get user by ID | Yes |
| POST | /users | Create user | Yes (Admin) |
| PATCH | /users/:id | Update user | Yes (Admin/Self) |
| DELETE | /users/:id | Delete user | Yes (Admin) |

## Authentication-Flow
1. Client sends credentials to /auth/login
2. Server validates and returns JWT token
3. Client includes token in Authorization header
4. Server validates token on protected routes
5. Server checks user permissions for resource access

## Development-Commands
```bash
# Start development server
npm run dev

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
``` 