# General Coding Rules
description: General coding patterns and rules for the entire project
files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"]

## Writing Style

Always use a clear, concise coding style optimized for AI interpretation:

- Use explicit type annotations rather than relying on inference 
- Function names should be verb phrases that clearly describe their purpose
- Variable names should be descriptive and avoid abbreviations
- Avoid nested ternary expressions or complex logical conditions
- Limit function length to less than 50 lines
- Limit file length to less than 300 lines
- Maximum 3 levels of nesting for conditional logic

## Comments and Documentation

All code should include detailed documentation:

- Every file should start with a module description comment
- All exported functions, types, and components must have JSDoc comments
- Include descriptive parameter and return type documentation
- Provide usage examples for complex utilities
- Use descriptive error messages with ERROR_CODES from shared constants
- Update README files when adding new functionality

## Naming Conventions

- Files: `kebab-case.ts` for utilities, `PascalCase.tsx` for components
- Variables: `camelCase` for variables/functions, `PascalCase` for classes/interfaces
- Constants: `UPPER_SNAKE_CASE` for enum values, `CONSTANT_CASE` for global constants
- Types/Interfaces: `PascalCase` with `I` prefix for interfaces (`IUserProps`)
- Components: `PascalCase` with descriptive noun (`UserProfile`, not `Profile`)

## Type Safety

- No `any` type unless absolutely necessary
- Use shared DTOs for API communication
- Create interfaces for all component props
- Use discriminated unions over type assertions
- Never disable TypeScript type checking with `@ts-ignore`
- Use proper typeguards for type narrowing 