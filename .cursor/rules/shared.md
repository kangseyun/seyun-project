# Shared Package Rules
description: Rules for the shared package used across frontend and backend
files: ["packages/shared/**/*.ts"]
references: ["@file:.cursor/rules/general.md"]

## Type Definitions

Type definitions should be clear, descriptive, and well-documented:

```typescript
/**
 * EntityName
 * Description of what this entity represents
 * 
 * @typedef {Object} EntityName
 * @property {string} id - Unique identifier
 * @property {string} name - Entity name
 * @property {Date} createdAt - Creation timestamp
 */
export interface EntityName {
  id: string;
  name: string;
  createdAt: Date;
}
```

## DTO Structure

Data Transfer Objects should match API request/response formats exactly:

```typescript
/**
 * CreateEntityDto
 * Data required to create a new entity
 * 
 * @typedef {Object} CreateEntityDto
 * @property {string} name - Entity name
 * @property {string} [description] - Optional entity description
 */
export interface CreateEntityDto {
  name: string;
  description?: string;
}
```

## Constants

Constants should be categorized and well-documented:

```typescript
/**
 * API-ENDPOINTS
 * Centralized definition of all API routes
 */
export const API_ENDPOINTS = {
  /** @constant {string} - Base path for entity endpoints */
  ENTITY: '/entity',
};
```

## Utility Functions

Utility functions should be pure, focused, and well-documented:

```typescript
/**
 * Transforms input value according to specific rules
 * 
 * @param {string} input - Value to transform
 * @param {TransformOptions} [options] - Optional transformation options
 * @returns {string} Transformed value
 * @example
 * transformValue('input') // 'output'
 */
export const transformValue = (
  input: string, 
  options?: TransformOptions
): string => {
  // Function implementation
};
```

## Module Organization

- Group related types in dedicated files
- Use barrel exports (index.ts) for cleaner imports
- Categorize utilities by domain/function
- Keep constants organized by feature area
- Maintain backward compatibility when modifying types

## Cross-Package Dependencies

- The shared package should have no dependencies on frontend or backend
- Avoid circular dependencies between modules
- Keep the shared package lightweight
- Reuse types instead of duplicating them
- Extract commonly used patterns into shared utilities 