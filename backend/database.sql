-- Virtual Cafe Database Schema

CREATE DATABASE IF NOT EXISTS Virtual_cafe;
USE Virtual_cafe;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image VARCHAR(255),
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, image) VALUES
('Espresso', 'Rich and bold espresso shot', 2.50, 'Coffee', '/images/espresso.jpg'),
('Cappuccino', 'Espresso with steamed milk and foam', 4.00, 'Coffee', '/images/cappuccino.jpg'),
('Latte', 'Espresso with steamed milk', 4.50, 'Coffee', '/images/latte.jpg'),
('Americano', 'Espresso with hot water', 3.00, 'Coffee', '/images/americano.jpg'),
('Croissant', 'Buttery, flaky pastry', 3.50, 'Pastry', '/images/croissant.jpg'),
('Blueberry Muffin', 'Fresh blueberry muffin', 3.00, 'Pastry', '/images/muffin.jpg'),
('Caesar Salad', 'Fresh romaine with caesar dressing', 8.50, 'Salad', '/images/caesar.jpg'),
('Club Sandwich', 'Triple-decker with turkey and bacon', 9.00, 'Sandwich', '/images/club.jpg');