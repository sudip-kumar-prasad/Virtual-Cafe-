# Virtual Cafe Backend

Express.js backend API with MySQL database for the Virtual Cafe application.

## Features

- User authentication (JWT)
- Menu management
- Order processing
- RESTful API endpoints
- MySQL database integration

## Setup

### Prerequisites
- Node.js (v14+)
- MySQL Server
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Create database and tables:
```bash
mysql -u root -p < database.sql
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get specific menu item
- `POST /api/menu` - Add menu item

### Orders
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get user orders (requires auth)

### Health
- `GET /api/health` - Server health check

## Environment Variables

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=virtual_cafe
JWT_SECRET=your_jwt_secret_key_here
```