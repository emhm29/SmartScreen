CREATE DATABASE smartscreen;
USE smartscreen;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);


CREATE TABLE invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vendor VARCHAR(255) NOT NULL,
  client VARCHAR(255) NOT NULL,
  invoice_date DATE NOT NULL,
  invoice_number VARCHAR(50) NOT NULL,
  due_date DATE NOT NULL,
  payment_terms VARCHAR(50) NOT NULL,
  reference VARCHAR(50) NOT NULL,
  total_ht DECIMAL(10, 2) NOT NULL,
  total_tva DECIMAL(10, 2) NOT NULL,
  total_ttc DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'validated') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoice_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invoice_id INT NOT NULL,
  description VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  unit VARCHAR(50) NOT NULL,
  unit_price_ht DECIMAL(10, 2) NOT NULL,
  tva_percent DECIMAL(5, 2) NOT NULL,
  total_tva_item DECIMAL(10, 2) NOT NULL,
  total_ttc_item DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);
