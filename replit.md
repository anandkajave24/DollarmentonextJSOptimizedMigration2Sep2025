# Overview

This project is a comprehensive financial education and calculator platform built with Next.js. It features 45+ financial calculators, educational content, and tools designed to help users make informed financial decisions. The platform includes specialized calculators for 401(k) planning, mortgages, auto loans, currency conversion, and various other financial scenarios tailored for US users.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js with TypeScript for type safety and modern React features
- **Rendering Strategy**: Hybrid approach using SSG (Static Site Generation) for SEO-critical pages and CSR (Client-Side Rendering) for interactive calculators
- **Styling**: Tailwind CSS with a custom design system using shadcn/ui components and Radix UI primitives
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **UI Components**: Comprehensive component library built on Radix UI for accessibility and consistency
- **Build Tool**: Vite for development with optimized webpack configuration for production

## Data Layer
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Location**: Centralized schema definitions in `./shared/schema.ts`
- **Migrations**: Managed through Drizzle Kit with migration files in `./migrations`

## Design System
- **Theme**: Professional variant with HSL color system for consistent theming
- **Components**: Custom implementation of shadcn/ui with Radix UI primitives
- **Typography**: Inter font family for modern, readable text
- **Responsive Design**: Mobile-first approach with responsive breakpoints

## Performance Optimizations
- **Code Splitting**: Webpack configured for optimal bundle splitting with separate chunks for vendors, charts (Recharts), and calculator components
- **Image Optimization**: Next.js image optimization with WebP/AVIF formats and caching
- **ISR (Incremental Static Regeneration)**: 24-hour revalidation for dynamic content while maintaining performance
- **Bundle Analysis**: Optimized package imports for Lucide React, Recharts, and Radix UI components

## Path Aliases
- `@/*`: Client source files (`./client/src/*`)
- `@shared/*`: Shared utilities and schemas (`./shared/*`)
- `@assets/*`: Static assets (`./attached_assets/*`)
- Additional aliases for components, hooks, contexts, utilities, data, and services

# External Dependencies

## Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@anthropic-ai/sdk**: AI integration for enhanced user experience
- **@stripe/stripe-js & @stripe/react-stripe-js**: Payment processing capabilities

## UI and Visualization
- **Recharts**: Primary charting library for financial data visualization
- **@radix-ui/***: Complete suite of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for smooth user interactions

## Form Handling
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Form validation integration
- **Zod**: Runtime type checking and validation

## Development Tools
- **@replit/vite-plugin-shadcn-theme-json**: Theme integration for Replit environment
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **TypeScript**: Full type safety across the application

## Deployment
- **Vercel**: Primary deployment platform with optimized Next.js configuration
- **Firebase**: Alternative hosting option with cloud functions support
- **Environment Variables**: DATABASE_URL required for PostgreSQL connection