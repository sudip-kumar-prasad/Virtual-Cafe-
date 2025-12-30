# Virtual Cafe Backend

Backend API for Virtual Cafe with authentication using Node.js, Express, Prisma, MySQL, JWT, and bcrypt.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and configure your MySQL database:

```env
DATABASE_URL="mysql://username:password@localhost:3306/virtual_cafe"
JWT_SECRET="your-secret-key-change-this-in-production"
PORT=5000
NODE_ENV=development
```

### 3. Setup MySQL Database

Make sure MySQL is running and create a database:

```sql
CREATE DATABASE virtual_cafe;
```

### 4. Run Prisma Migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Start the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### Signup
- **POST** `/api/auth/signup`
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

#### Signin
- **POST** `/api/auth/signin`
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### Get Profile (Protected)
- **GET** `/api/auth/profile`
- **Headers**: `Authorization: Bearer <token>`

### Health Check
- **GET** `/health`

## Project Structure

```
backend/
├── config/
│   └── database.js       # Prisma client configuration
├── controllers/
│   └── auth.controller.js # Authentication logic
├── middleware/
│   └── auth.middleware.js # JWT verification
├── prisma/
│   └── schema.prisma     # Database schema
├── routes/
│   └── auth.routes.js    # API routes
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
└── server.js             # Express server setup
```

## Technologies Used

- **Express.js** - Web framework
- **Prisma** - ORM for MySQL
- **MySQL** - Database
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management
