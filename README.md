# Virtual Cafe - Full Stack Application

A modern full-stack cafe management application with React frontend and Express.js/Prisma backend.

## Project Structure

```
Virtual-Cafe-/
├── frontend/              # React frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── backend/              # Express.js + Prisma backend
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── package.json          # Root workspace scripts
└── README.md             # This file
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

### Installation

1. Install dependencies for both frontend and backend:
```bash
npm run install-all
```

2. Set up environment variables:

**Backend (.env)**
```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL connection string
```

**Frontend (.env)**
```bash
cd ../frontend
cp .env.example .env
# Configure REACT_APP_API_URL if needed
```

### Running the Application

**Development Mode** (runs both frontend and backend):
```bash
npm run dev
```

**Frontend Only:**
```bash
npm run start:frontend
```

**Backend Only:**
```bash
npm run start:backend
```

### Building for Production

**Build Frontend:**
```bash
npm run build:frontend
```

**Backend** (no build needed):
```bash
npm run build:backend
```

## Frontend

- **Framework:** React 18
- **Routing:** React Router v6
- **Forms:** React Hook Form
- **Styling:** CSS + Lucide React Icons
- **Authentication:** Firebase
- **API Communication:** Fetch/Axios

For frontend details, see [frontend/README.md](frontend/README.md)

## Backend

- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** MySQL
- **Authentication:** JWT + bcryptjs
- **API Style:** RESTful

For backend details, see [backend/README.md](backend/README.md)

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Available Routes
- `/menu` - Menu management
- `/orders` - Order management
- `/users` - User authentication and management
- `/health` - Server health check

## Environment Setup

### Backend
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="mysql://root:password@localhost:3306/virtual_cafe"
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
```

### Frontend
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Database Setup

1. Ensure MySQL is running
2. Navigate to backend directory:
```bash
cd backend
```

3. Push Prisma schema to database:
```bash
npm run db:push
```

4. View database with Prisma Studio:
```bash
npm run prisma:studio
```

## Project Scripts

### Root Level
- `npm run install-all` - Install all dependencies
- `npm run dev` - Start both frontend and backend in development
- `npm run start:frontend` - Start frontend only
- `npm run start:backend` - Start backend only
- `npm run build:frontend` - Build frontend for production
- `npm run test:frontend` - Run frontend tests
- `npm run test:backend` - Run backend tests

### Frontend Only (from frontend directory)
```bash
cd frontend
npm start       # Development server
npm run build   # Production build
npm test        # Run tests
```

### Backend Only (from backend directory)
```bash
cd backend
npm run dev                    # Development with auto-reload
npm run prisma:migrate        # Create database migration
npm run db:push               # Push schema to database
npm run prisma:studio         # Open Prisma Studio
```

## Tech Stack

### Frontend
- React 18
- React Router DOM
- React Hook Form
- Firebase Auth
- Lucide React
- React Icons

### Backend
- Express.js 4
- Prisma ORM
- MySQL 8
- Bcryptjs (Password hashing)
- JWT (Authentication)
- CORS

## Features

- User authentication (registration & login)
- Menu management (CRUD operations)
- Order management
- User profile management
- Responsive UI
- RESTful API

## Common Issues

### Port Already in Use
If port 3000 (frontend) or 5000 (backend) is already in use:
- Frontend: `PORT=3001 npm start` (in frontend directory)
- Backend: Edit `PORT` in backend `.env`

### Database Connection Error
1. Verify MySQL is running
2. Check `DATABASE_URL` in backend `.env`
3. Ensure database user has proper permissions

### CORS Errors
1. Verify `CORS_ORIGIN` in backend `.env` matches frontend URL
2. Check frontend is sending correct API URL

## Development Workflow

1. **Feature Branch:**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes:**
   - Frontend changes go in `frontend/src`
   - Backend changes go in `backend/src`

3. **Test:**
   ```bash
   npm run test:frontend  # or test:backend
   ```

4. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Add your feature"
   git push origin feature/your-feature
   ```

## License

ISC

## Support

For detailed information:
- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
