# Cursor Rules Index
description: Central index of all project rules
files: ["**/*"]

## Rules-Overview

| Rule File | Description | Applies To |
|-----------|-------------|------------|
| [general.md](./general.md) | General coding patterns and conventions | All code files |
| [frontend.md](./frontend.md) | Next.js and Refine specific patterns | Frontend code |
| [backend.md](./backend.md) | NestJS backend development rules | Backend code |
| [shared.md](./shared.md) | Shared package development guidelines | Shared types/utilities |
| [documentation.md](./documentation.md) | Documentation writing standards | Markdown files |
| [ai-prompting.md](./ai-prompting.md) | Guidelines for effective AI prompting | All interactions |

## Quick-Reference

### Naming-Conventions

- Files: `kebab-case.ts` for utilities, `PascalCase.tsx` for components
- Variables: `camelCase` for variables/functions, `PascalCase` for classes/interfaces
- Constants: `UPPER_SNAKE_CASE` for enum values and global constants

### Documentation-Pattern

```typescript
/**
 * ComponentOrFunctionName
 * Brief description of purpose
 *
 * @param {Type} paramName - Parameter description
 * @returns {ReturnType} Description of return value
 * @example
 * // Usage example
 */
```

### File-Organization

```
project-root/
├── apps/
│   ├── api/            # NestJS backend
│   └── web/            # Next.js frontend
├── packages/
│   └── shared/         # Shared types/utilities
└── .cursor/
    └── rules/          # AI instructions and patterns
```

## Rule-Updates

When updating these rules:

1. Ensure all rule files use consistent formatting
2. Include examples for all patterns
3. Reference existing code when defining standards
4. Update this index when adding new rule files 