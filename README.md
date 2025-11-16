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

## Development

### Testing
```bash
yarn run test    # Run tests with Jest
```

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