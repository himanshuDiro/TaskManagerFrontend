# Task Manager Frontend

A modern, responsive task management application built with Next.js and Tailwind CSS.

## Features

- User authentication (register, login, logout)
- Task creation, reading, updating, and deletion
- Task filtering by status and search
- Task sorting by various criteria
- Responsive design for mobile and desktop
- Status tracking for tasks (Pending, In Progress, Completed)

## Tech Stack

- **Next.js**: React framework for server-rendered React applications
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Axios**: Promise-based HTTP client for API requests
- **React Icons**: SVG icon library for React
- **js-cookie**: Client-side cookie handling

## Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- Backend API running (see backend README)

## Installation

1. Clone the repository (if not already done)
```bash
git clone <repository-url>
cd task-manager/frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following content:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
frontend/
├── components/         # Reusable UI components
│   ├── Layout.js       # Main layout wrapper
│   ├── Navbar.js       # Navigation bar
│   ├── TaskForm.js     # Form for creating/editing tasks
│   ├── TaskItem.js     # Individual task display
│   ├── TaskList.js     # List of tasks
│   └── LoadingSpinner.js # Loading indicator
├── context/
│   └── AuthContext.js  # Authentication context provider
├── pages/              # Application pages/routes
│   ├── _app.js         # Custom App component
│   ├── index.js        # Home page
│   ├── login.js        # Login page
│   ├── register.js     # Registration page
│   └── dashboard.js    # User dashboard
├── public/             # Static assets
├── styles/
│   └── globals.css     # Global styles and Tailwind imports
├── utils/
│   ├── api.js          # API utility functions
│   └── authHelper.js   # Authentication helpers
└── various config files (next.config.js, tailwind.config.js, etc.)
```

## API Integration

The frontend connects to the backend API using Axios. The API base URL is set in the `.env.local` file.

All API requests that require authentication include the JWT token in the Authorization header.

## Authentication Flow

1. User registers or logs in
2. JWT token is received from the backend and stored in cookies
3. Token is included in the Authorization header for protected routes
4. On logout, the token is removed from cookies

## Troubleshooting

- If styles are not loading, ensure Tailwind CSS is properly installed and configured
- If API calls fail, check that the backend server is running and the API URL is correct
- For authentication issues, check the browser console for any error messages