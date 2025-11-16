# Test Task Frontend

A modern Next.js 14 frontend application built with TypeScript, TailwindCSS, and React 18. This application provides a user registration system and user management interface.

## Tech Stack

- **Next.js 14+** with App Router (`app/` directory)
- **React 18**
- **TypeScript**
- **TailwindCSS** for styling
- **ESLint** + **Prettier** for code quality

## Project Structure

```
test-next/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home/landing page
│   ├── globals.css         # Global styles with Tailwind
│   ├── auth/
│   │   └── register/
│   │       └── page.tsx    # Registration page
│   └── users/
│       └── page.tsx        # User list page
├── components/
│   └── ui/
│       ├── Button.tsx      # Reusable button component
│       ├── InputField.tsx  # Form input with label and error handling
│       ├── Modal.tsx       # Accessible modal dialog
│       ├── Tabs.tsx        # Keyboard-navigable tabs
│       └── Card.tsx        # Card container component
├── lib/
│   ├── api.ts             # API client helpers
│   └── types.ts           # TypeScript type definitions
└── styles/
    └── globals.css        # TailwindCSS setup
```

## Installation

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Configure environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp env.local.example .env.local
   ```
   
   Then edit `.env.local` and set your backend URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Run the development server:**
   ```bash
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3001](http://localhost:3001) (or the port shown in your terminal)

## API Integration

The application consumes a backend API with the following endpoints:

- **POST** `{BACKEND_URL}/auth/register` - Register a new user
- **GET** `{BACKEND_URL}/auth/users` - Fetch all users

The backend URL is configured via the `NEXT_PUBLIC_API_URL` environment variable.

### API Client

The API client (`lib/api.ts`) provides:
- `registerUser(data: RegisterUserDto)` - Register a new user
- `getUsers()` - Fetch all users

Both functions handle errors and return typed responses.

## UI Component Library

### Button
- Supports multiple variants: `primary`, `secondary`, `outline`, `danger`
- Accessible with proper `type` attributes
- Responsive and mobile-friendly

### InputField
- Linked labels with `htmlFor` and `id`
- Error message display with `aria-invalid`
- Full-width support on mobile
- Required field indicators

### Modal
- Accessible with `role="dialog"` and `aria-modal`
- Keyboard support (ESC to close)
- Click outside to close
- Prevents body scroll when open

### Tabs
- Keyboard navigable (Arrow keys, Home, End)
- ARIA roles for accessibility
- Smooth transitions

### Card
- Clean container component
- Optional title section
- Responsive padding and spacing

## Pages

### Home Page (`/`)
- Landing page with navigation links
- Links to registration and user list pages

### Registration Page (`/auth/register`)
- Client-side form with validation
- Fields: email (required), password (required, min 6 chars), fullName (optional)
- Loading, success, and error states
- Success modal with navigation option
- Tabs component to switch between Register and Users views

### User List Page (`/users`)
- Server-side rendered using Next.js App Router
- Displays users in a responsive grid
- Shows email, fullName, and formatted createdAt
- Handles empty state and error states
- Link to registration page

## State Handling

- **Loading states**: Disabled buttons and loading text during API calls
- **Error states**: Inline error messages and error cards
- **Success states**: Modal dialogs and success messages

## Accessibility

- Semantic HTML elements
- ARIA attributes where needed (`aria-label`, `aria-invalid`, `aria-describedby`)
- Keyboard navigation support (tabs, modals)
- Focus management
- Screen reader friendly labels

## Responsiveness

- Mobile-first design approach
- Responsive grid layouts
- Flexible containers with max-width constraints
- Touch-friendly button sizes
- Responsive typography

## Development

### Code Formatting
```bash
yarn run format  # Format code with Prettier
```

### Linting
```bash
yarn run lint    # Run ESLint
```

### Build
```bash
yarn run build   # Build for production
yarn start       # Start production server
```

## Configuration

### TailwindCSS
Configured in `tailwind.config.ts` with custom primary color palette.

### ESLint
Uses Next.js recommended rules with TypeScript support.

### Prettier
Configured with TailwindCSS plugin for class sorting.

## Deployment

This application is ready for deployment on platforms like Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Set the `NEXT_PUBLIC_API_URL` environment variable
4. Deploy

The application uses Next.js App Router and is optimized for production builds.