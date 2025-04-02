# SHARED-PACKAGE

## Overview
Shared TypeScript package containing common types, utilities, and constants used by both frontend and backend.

## Directory-Structure
```
shared/
├── src/
│   ├── constants/     # Application constants and configuration
│   ├── dto/           # Data Transfer Objects for API communication
│   ├── types/         # Type definitions shared across packages
│   └── utils/         # Utility functions
└── package.json
```

## Usage-Patterns

### Import-Examples
```typescript
// Import specific types
import { User, AuthResponse } from 'shared/types';

// Import DTOs
import { LoginDto, RegisterDto } from 'shared/dto';

// Import constants
import { API_ENDPOINTS, APP_CONSTANTS } from 'shared/constants';

// Import utilities
import { formatDate, isValidEmail } from 'shared/utils';
```

### Type-Enhancement
When adding new shared types:
1. Define interface in appropriate file (types/index.ts)
2. Add JSDoc comments with @typedef and property descriptions
3. Export from module entry point (src/index.ts)

### DTO-Guidelines
- DTOs should match backend validation exactly
- Use optional properties for partial updates
- Include detailed JSDoc comments for each field

## Build-Commands
```bash
# Build the shared package
npm run build

# Watch mode during development
npm run dev
``` 