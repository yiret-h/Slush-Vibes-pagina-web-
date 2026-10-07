CREATE DATABASE IF NOT EXISTS slush_vibes;
USE slush_vibes;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Datos de prueba
INSERT INTO categories (name, slug) VALUES 
('Waffles', 'waffles'),
('Slush Vibes', 'slush-vibes')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO products (category_id, name, description, price, image_url) VALUES 
(1, 'Waffle Clásico', 'Delicioso waffle con miel y mantequilla.', 5.00, ''),
(1, 'Waffle Nutella', 'Waffle cubierto de nutella y fresas frescas.', 7.50, ''),
(2, 'Slush Fresa', 'Granizado refrescante de fresa.', 4.00, ''),
(2, 'Slush Mango Biche', 'Granizado de mango con sal y limón.', 4.50, '');
