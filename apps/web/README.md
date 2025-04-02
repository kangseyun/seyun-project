# WEB-FRONTEND

## Overview
Next.js frontend with Refine admin panel and Material UI.

## Directory-Structure
```
web/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   └── layout/     # Layout components
│   ├── contexts/       # React context providers
│   │   └── auth.tsx    # Authentication context
│   ├── pages/          # Next.js page components
│   │   ├── _app.tsx    # Application wrapper
│   │   └── index.tsx   # Homepage
│   └── utils/          # Frontend utilities
├── next.config.js      # Next.js configuration
└── package.json
```

## Component-Pattern
```typescript
/**
 * Component-Name
 * Brief description of the component's purpose
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
  // Component logic
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

## Refine-Resource-Pattern
```typescript
// In _app.tsx
<Refine
  dataProvider={dataProvider}
  resources={[
    {
      name: "resource-name",
      list: "/resource-name",
      show: "/resource-name/:id",
      create: "/resource-name/create",
      edit: "/resource-name/:id/edit",
    }
  ]}
/>
```

## Page-Structure
```
src/pages/
├── _app.tsx                   # App wrapper with Refine provider
├── index.tsx                  # Home page
├── login.tsx                  # Login page
├── register.tsx               # Registration page
├── [resource]/                # Resource directory
│   ├── index.tsx              # List view
│   ├── [id].tsx               # Show view
│   ├── create.tsx             # Create view
│   └── [id]/edit.tsx          # Edit view
```

## Development-Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
``` 