# AI-OPTIMIZED-FULLSTACK

## Project-Structure

```
project-root/
├── apps/
│   ├── api/            # NestJS TypeScript backend
│   └── web/            # Next.js + Refine frontend
└── packages/
    └── shared/         # Shared types and utilities
```

## Tech-Stack

### Frontend
- Next.js@13.4.1
- Refine@4.0.0
- TypeScript@5.0.4
- Material-UI@5.13.0

### Backend
- NestJS@9.4.0
- Prisma@4.14.0
- TypeScript@5.0.4
- PostgreSQL

### Shared
- TypeScript DTOs
- Common utilities
- Type definitions

## Module-Relationships
- Frontend → Shared → Backend
- Shared package provides type-safety between frontend and backend

## Development-Commands

```bash
# Install all dependencies
npm install

# Start development servers (frontend + backend)
npm run dev

# Build all packages
npm run build

# Start production servers
npm start
```

## Data-Flow
1. Frontend components use Refine hooks
2. Hooks connect to backend via REST
3. Backend validates with shared DTOs
4. Prisma handles database operations
5. Response follows typed structure

## File-Naming-Conventions
- Components: PascalCase.tsx
- Utilities: camelCase.ts
- API endpoints: resource.controller.ts
- Services: resource.service.ts
- DTOs: resource.dto.ts

## Module-Boundaries
- Shared types used across boundaries
- Frontend-Backend communication via REST only
- Type checking enforced at compile time 