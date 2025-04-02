# Frontend Development Rules
description: Rules specific to frontend Next.js and Refine development
files: ["apps/web/**/*.ts", "apps/web/**/*.tsx"]
references: ["@file:.cursor/rules/general.md"]

## Component Structure

All React components should follow these patterns:

```typescript
/**
 * ComponentName
 * Brief description of component purpose
 * 
 * @param {IComponentProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export const ComponentName: React.FC<IComponentProps> = ({ 
  prop1, 
  prop2,
  ...rest
}) => {
  // State and hooks at the top
  const [state, setState] = useState<StateType>(initialState);
  
  // Effects and callbacks in the middle
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Helper functions next
  const handleEvent = useCallback(() => {
    // Handler logic
  }, [dependencies]);
  
  // Render logic at the bottom
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

## Refine Patterns

When working with Refine:

- Use the provided hooks for data operations (`useTable`, `useForm`, etc.)
- Follow resource naming pattern for consistent navigation
- Make explicit dataProvider calls rather than direct API fetches
- Utilize resource hooks for CRUD operations
- For complex data fetching, use Refine's `useCustom` hook

## Material UI Usage

- Use theme variables instead of hardcoded values
- Utilize `sx` prop for custom styling
- Prefer Material UI components over custom HTML
- Define custom theme extensions in `theme.ts`
- Use the component prop to change the rendered element

## State Management

- Use React Context for global state
- Prefer hooks over HOCs
- Keep state as local as possible
- Use appropriate Refine hooks for data management
- Memoize expensive calculations and components

## File Organization

- Group components by feature in dedicated folders
- Include an `index.ts` file to re-export components
- Separate hooks into their own files
- Keep context providers in `/contexts` directory
- Place utility functions in `/utils` directory 