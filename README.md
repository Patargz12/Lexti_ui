# React + Vite + ShadCN Boilerplate

A modern React application boilerplate using Vite, TypeScript, Redux, TanStack Query, and ShadCN/UI components.

## Technologies

- **Core:**
  - React 18
  - TypeScript 5
  - Vite 5

- **State Management & Data Fetching:**
  - Redux Toolkit
  - TanStack Query (React Query) v5
  
- **UI & Styling:**
  - Tailwind CSS 3
  - ShadCN/UI Components
  
- **Routing:**
  - React Router 6
  
- **HTTP Client:**
  - Axios

## Project Structure

```
src/
├── assets/                # Static assets (images, fonts)
├── components/            # Reusable components
│   ├── common/            # Common components (Button, Input, etc.)
│   ├── layout/            # Layout components (Header, Footer, etc.)
│   └── ui/                # ShadCN UI components
├── constants/             # Application constants
├── hooks/                 # Custom React hooks
│   └── queries/           # TanStack Query hooks
├── store/                 # Redux store
│   ├── slices/            # Redux slices
│   └── index.ts           # Store configuration
├── pages/                 # Route pages
│   ├── Home.tsx           # Home page
│   ├── About.tsx          # About page
│   ├── Dashboard.tsx      # Dashboard page
│   ├── Profile.tsx        # Profile page
│   ├── Error.tsx          # Error page
│   └── NotFound.tsx       # 404 page
├── routes/                # Route definitions
│   └── Router.tsx         # Main router component
├── services/              # API services
├── types/                 # TypeScript types
├── utils/                 # Utility functions
├── App.tsx                # Main App component
├── main.tsx               # Entry point
└── vite-env.d.ts          # Vite type declarations
```

## Getting Started

### Prerequisites
- Node.js (v16.0.0 or higher)
- Yarn (v1.22.0 or higher)

### Installation

1. Create the Vite project with React and TypeScript
2. Install core dependencies (React Router, Redux Toolkit, TanStack Query, Axios)
3. Install development dependencies (Tailwind CSS, PostCSS, AutoPrefixer)
4. Initialize Tailwind CSS
5. Install ShadCN UI and add core components

### Available Scripts

- `dev`: Run development server
- `build`: Build for production
- `lint`: Run ESLint
- `preview`: Preview production build
- `format`: Format code with Prettier

## Development Tools

### ESLint & Prettier

Install ESLint and Prettier for code quality and formatting

### Configuration Files

- **Vite Config**: Set up path aliases and plugins
- **TypeScript Config**: Configure strict type checking and path aliases
- **ESLint/Prettier**: Set up code quality rules

## Component Guidelines

### Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.ts`, `useWindowSize.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `validators.ts`)
- **Constants**: UPPER_CASE for values, PascalCase for objects (e.g., `API_URL`, `RouteNames`)
- **Types/Interfaces**: PascalCase with appropriate suffix (e.g., `UserType`, `AuthResponseDTO`)

### Component Organization

Components should be organized by type and purpose:
- **UI Components**: Basic UI elements (buttons, inputs, cards)
- **Common Components**: Business-specific reusable components
- **Layout Components**: Components that define the structure of the app

## Styling

Using Tailwind CSS with ShadCN/UI components. ShadCN components should be installed in the `components/ui` directory.

## State Management

The application uses Redux Toolkit for global state management.

- **Store Configuration**: Central Redux store setup
- **Slices**: Feature-based state slices (auth, ui, etc.)
- **Typed Hooks**: Type-safe hooks for accessing state and dispatch

## Data Fetching

Using TanStack Query for server state management.

- **Query Client**: Configured with sensible defaults
- **Query Hooks**: Custom hooks for different data fetching needs
- **Cache Management**: Proper cache invalidation strategy

## Routing

Using React Router for application routing.

- **BrowserRouter**: Modern HTML5 history API based routing
- **Route Configuration**: Declarative routes definition
- **Layout Routes**: Routes wrapped in layouts
- **Dynamic Routes**: Support for parameterized routes

## Best Practices

1. Keep components small and focused on a single responsibility
2. Extract reusable logic into hooks
3. Use TypeScript for better type safety and developer experience
4. Implement lazy loading for better performance on larger apps
5. Use environment variables for configuration
6. Write meaningful component and function names that describe their purpose

---

This project structure is designed to be scalable and maintainable for modern React applications. Feel free to customize it based on your specific project requirements.