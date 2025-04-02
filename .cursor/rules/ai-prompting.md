# AI Prompting Rules
description: Guidelines for effective AI prompting within Cursor
files: ["**/*"]

## Effective-Prompting

When asking questions to AI, follow these patterns for best results:

- Start with the task type: "Implement", "Fix", "Refactor", "Explain"
- Include the file path or context about what module you're working on
- Specify the exact problem or feature being addressed
- Reference any relevant types, models, or documentation
- Ask for step-by-step explanations when needed

## Example-Prompts

### For Implementation

```
Implement a User profile page component that:
1. Fetches user data using the Refine useOne hook
2. Shows user details in a Material UI Card
3. Provides edit functionality
4. Follows our project's component structure
```

### For Bug Fixing

```
Fix the authentication error in the login component:
1. The error is: "TypeError: Cannot read property 'data' of undefined"
2. It occurs when the API returns an error
3. Check the auth.tsx file, lines 45-60
```

### For Refactoring

```
Refactor the UserService to:
1. Use dependency injection for the PrismaService
2. Add proper error handling
3. Implement pagination for the findAll method
4. Follow our NestJS controller pattern
```

## Context-Optimization

- Before asking for large changes, provide context about the feature or module
- Reference existing patterns when asking for new implementations
- Clarify the purpose and expected behavior of the code
- Specify any non-obvious requirements

## Iteration-Pattern

For complex tasks, follow this iteration pattern:

1. Initial prompt: What you want to achieve
2. Follow-up: Ask for clarification on specific parts
3. Refinement: Request optimizations or adjustments
4. Validation: Ask for tests or validation checks 