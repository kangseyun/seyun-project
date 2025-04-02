# Documentation Rules
description: Rules for writing documentation and README files
files: ["**/*.md", "**/*.mdx"]

## General Documentation Style

- Use hyphenated headers for section titles (e.g., `## Section-Title`)
- Use code blocks with language specification
- Include clear examples for all API documentation
- Use bullet points for listing features, options, etc.
- Use tables for structured data
- Include diagrams for complex flows (use mermaid when possible)

## README Structure

Each module should have a README.md with these sections:

```markdown
# MODULE-NAME

## Overview
Brief description of the module's purpose and function.

## Directory-Structure
```
module/
├── file1.ts   # Description
└── file2.ts   # Description
```

## Usage-Examples
Code examples showing how to use the module.

## API-Reference
Documentation of the module's public API.
```

## Code Examples

- Include TypeScript type annotations in all examples
- Show both the simplest usage and more advanced examples
- Format code consistently with project style
- Include comments in complex examples
- Always specify imports needed for the example to work

## API Documentation

Document APIs using this format:

```markdown
### functionName

`functionName(param1: Type, param2?: Type): ReturnType`

Description of what the function does.

**Parameters:**
- `param1`: Description of param1
- `param2` (optional): Description of param2

**Returns:**
Description of return value

**Example:**
```typescript
functionName('value', { option: true })
```
```

## Architecture Documentation

- Include high-level architecture diagrams
- Document module interactions and dependencies
- Specify data flow between components
- Include sequence diagrams for complex processes
- Document deployment architecture when applicable 