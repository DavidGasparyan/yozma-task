-- Insert users
INSERT INTO users (name, email, created_at) VALUES
('Alice', 'alice@example.com', NOW() - INTERVAL '2 months'),
('Bob', 'bob@example.com', NOW() - INTERVAL '1 year'),
('Charlie', 'charlie@example.com', NOW() - INTERVAL '3 weeks'),
('David', 'david@example.com', NOW() - INTERVAL '1 week'),
('Eve', 'eve@example.com', NOW() - INTERVAL '4 days');



-- Insert orders for users
-- Orders for Alice (7 orders, VIP)
INSERT INTO orders (user_id, product_name, amount, order_date) VALUES
(1, 'Laptop', 1200.00, NOW() - INTERVAL '20 days'),
(1, 'Mouse', 25.00, NOW() - INTERVAL '18 days'),
(1, 'Keyboard', 45.00, NOW() - INTERVAL '15 days'),
(1, 'Monitor', 300.00, NOW() - INTERVAL '12 days'),
(1, 'USB Cable', 10.00, NOW() - INTERVAL '10 days'),
(1, 'Headphones', 50.00, NOW() - INTERVAL '5 days'),
(1, 'Webcam', 75.00, NOW() - INTERVAL '3 days');

-- Orders for Bob (4 orders, not VIP)
INSERT INTO orders (user_id, product_name, amount, order_date) VALUES
(2, 'Phone', 800.00, NOW() - INTERVAL '25 days'),
(2, 'Charger', 30.00, NOW() - INTERVAL '23 days'),
(2, 'Screen Protector', 15.00, NOW() - INTERVAL '21 days'),
(2, 'Case', 20.00, NOW() - INTERVAL '18 days');

-- Orders for Charlie (6 orders, VIP)
INSERT INTO orders (user_id, product_name, amount, order_date) VALUES
(3, 'Camera', 500.00, NOW() - INTERVAL '28 days'),
(3, 'Lens', 300.00, NOW() - INTERVAL '27 days'),
(3, 'Tripod', 100.00, NOW() - INTERVAL '26 days'),
(3, 'Memory Card', 50.00, NOW() - INTERVAL '22 days'),
(3, 'Battery Pack', 40.00, NOW() - INTERVAL '15 days'),
(3, 'Camera Bag', 80.00, NOW() - INTERVAL '12 days');

-- Orders for David (3 orders, not VIP)
INSERT INTO orders (user_id, product_name, amount, order_date) VALUES
(4, 'Tablet', 400.00, NOW() - INTERVAL '14 days'),
(4, 'Stylus', 30.00, NOW() - INTERVAL '10 days'),
(4, 'Tablet Cover', 25.00, NOW() - INTERVAL '7 days');

-- Orders for Eve (8 orders, VIP)
INSERT INTO orders (user_id, product_name, amount, order_date) VALUES
(5, 'Smart Watch', 250.00, NOW() - INTERVAL '20 days'),
(5, 'Fitness Tracker', 100.00, NOW() - INTERVAL '19 days'),
(5, 'Shoes', 75.00, NOW() - INTERVAL '18 days'),
(5, 'Jacket', 150.00, NOW() - INTERVAL '15 days'),
(5, 'Backpack', 60.00, NOW() - INTERVAL '12 days'),
(5, 'Water Bottle', 25.00, NOW() - INTERVAL '10 days'),
(5, 'T-shirt', 20.00, NOW() - INTERVAL '8 days'),
(5, 'Sunglasses', 40.00, NOW() - INTERVAL '5 days');
