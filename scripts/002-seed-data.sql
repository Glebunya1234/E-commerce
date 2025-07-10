-- Insert categories
INSERT INTO categories (name, description, image_url) VALUES
('Electronics', 'Latest electronic devices and gadgets', '/placeholder.svg?height=200&width=200'),
('Clothing', 'Fashion and apparel for all occasions', '/placeholder.svg?height=200&width=200'),
('Home & Garden', 'Everything for your home and garden', '/placeholder.svg?height=200&width=200'),
('Sports & Outdoors', 'Sports equipment and outdoor gear', '/placeholder.svg?height=200&width=200'),
('Books', 'Books and educational materials', '/placeholder.svg?height=200&width=200'),
('Beauty & Health', 'Beauty products and health supplements', '/placeholder.svg?height=200&width=200')
ON CONFLICT (name) DO NOTHING;

-- Insert products
INSERT INTO products (name, description, price, original_price, brand, category_id, stock_quantity, image_urls, is_featured, is_new, is_sale, rating, review_count) VALUES
-- Electronics
('iPhone 15 Pro', 'Latest iPhone with titanium design and A17 Pro chip', 999.00, NULL, 'Apple', (SELECT id FROM categories WHERE name = 'Electronics'), 50, ARRAY['/placeholder.svg?height=400&width=400'], true, true, false, 4.8, 245),
('Samsung Galaxy S24 Ultra', 'Premium Android phone with S Pen and AI features', 1199.00, 1299.00, 'Samsung', (SELECT id FROM categories WHERE name = 'Electronics'), 30, ARRAY['/placeholder.svg?height=400&width=400'], true, true, true, 4.7, 189),
('MacBook Air M3', 'Lightweight laptop with M3 chip and all-day battery', 1099.00, NULL, 'Apple', (SELECT id FROM categories WHERE name = 'Electronics'), 25, ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'], true, true, false, 4.9, 156),
('Sony WH-1000XM5', 'Industry-leading noise canceling headphones', 399.00, 449.00, 'Sony', (SELECT id FROM categories WHERE name = 'Electronics'), 75, false, true, 4.6, 892),
('iPad Pro 12.9"', 'Professional tablet with M2 chip', 1099.99, NULL, 'Apple', (SELECT id FROM categories WHERE name = 'Electronics'), 25, ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'], true, false, false, 4.8, 78),
('Canon EOS R6 Mark II', 'Full-frame mirrorless camera for professionals', 2499.00, NULL, 'Canon', (SELECT id FROM categories WHERE name = 'Electronics'), 10, true, false, 4.9, 89),
('Apple Watch Series 9', 'Advanced smartwatch with health monitoring', 399.00, NULL, 'Apple', (SELECT id FROM categories WHERE name = 'Electronics'), 45, true, false, 4.6, 567),
('Bose QuietComfort Earbuds', 'True wireless earbuds with noise cancellation', 279.00, 329.00, 'Bose', (SELECT id FROM categories WHERE name = 'Electronics'), 55, false, true, 4.5, 445),

-- Clothing
('Nike Air Max 270', 'Comfortable running shoes with Max Air cushioning', 150.00, NULL, 'Nike', (SELECT id FROM categories WHERE name = 'Clothing'), 100, ARRAY['/placeholder.svg?height=400&width=400'], false, false, true, 4.4, 567),
('Levi''s 501 Original Jeans', 'Classic straight-leg jeans in vintage wash', 89.00, 109.00, 'Levi''s', (SELECT id FROM categories WHERE name = 'Clothing'), 200, false, true, 4.3, 1234),
('Adidas Ultraboost 23', 'Premium running shoes with Boost cushioning', 190.00, 220.00, 'Adidas', (SELECT id FROM categories WHERE name = 'Clothing'), 60, true, true, 4.5, 234),
('Champion Hoodie', 'Comfortable cotton blend hoodie', 59.99, 79.99, 'Champion', (SELECT id FROM categories WHERE name = 'Clothing'), 120, ARRAY['/placeholder.svg?height=400&width=400'], false, false, true, 4.3, 67),
('Ray-Ban Aviator', 'Classic aviator sunglasses', 199.99, NULL, 'Ray-Ban', (SELECT id FROM categories WHERE name = 'Clothing'), 60, ARRAY['/placeholder.svg?height=400&width=400'], false, false, false, 4.6, 234),
('Lululemon Align Leggings', 'Buttery-soft yoga leggings for women', 128.00, NULL, 'Lululemon', (SELECT id FROM categories WHERE name = 'Clothing'), 90, ARRAY['/placeholder.svg?height=400&width=400'], false, false, true, 4.6, 1234),

-- Home & Garden
('Dyson V15 Detect', 'Cordless vacuum with laser dust detection', 749.00, NULL, 'Dyson', (SELECT id FROM categories WHERE name = 'Home & Garden'), 15, true, false, 4.7, 445),
('Instant Pot Duo 7-in-1', 'Multi-use pressure cooker for quick meals', 79.00, 99.00, 'Instant Pot', (SELECT id FROM categories WHERE name = 'Home & Garden'), 85, ARRAY['/placeholder.svg?height=400&width=400'], false, false, true, 4.5, 2156),
('Philips Hue Smart Bulbs', 'Color-changing smart LED bulbs (4-pack)', 199.99, NULL, 'Philips', (SELECT id FROM categories WHERE name = 'Home & Garden'), 70, ARRAY['/placeholder.svg?height=400&width=400'], false, true, false, 4.5, 123),
('KitchenAid Stand Mixer', 'Professional 5-quart stand mixer for baking', 379.00, 429.00, 'KitchenAid', (SELECT id FROM categories WHERE name = 'Home & Garden'), 20, false, true, 4.8, 1890),
('Nest Learning Thermostat', 'Smart thermostat with energy savings', 249.99, NULL, 'Google', (SELECT id FROM categories WHERE name = 'Home & Garden'), 55, ARRAY['/placeholder.svg?height=400&width=400'], false, true, false, 4.6, 89),
('Ninja Foodi Personal Blender', 'Compact blender for smoothies and shakes', 79.00, 99.00, 'Ninja', (SELECT id FROM categories WHERE name = 'Home & Garden'), 65, false, true, 4.3, 789),

-- Sports & Outdoors
('Peloton Bike+', 'Interactive exercise bike with rotating screen', 2495.00, 2795.00, 'Peloton', (SELECT id FROM categories WHERE name = 'Sports & Outdoors'), 15, ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'], true, false, true, 4.7, 234),
('Yeti Rambler 30oz', 'Insulated tumbler that keeps drinks cold or hot', 39.00, NULL, 'Yeti', (SELECT id FROM categories WHERE name = 'Sports & Outdoors'), 150, ARRAY['/placeholder.svg?height=400&width=400'], false, false, true, 4.8, 1567),
('Patagonia Down Jacket', 'Lightweight packable down jacket', 299.99, 349.99, 'Patagonia', (SELECT id FROM categories WHERE name = 'Sports & Outdoors'), 45, ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'], false, false, true, 4.6, 178),
('Wilson Tennis Racket', 'Professional tennis racket', 199.99, NULL, 'Wilson', (SELECT id FROM categories WHERE name = 'Sports & Outdoors'), 30, ARRAY['/placeholder.svg?height=400&width=400'], false, false, false, 4.4, 89),
('Hydro Flask Water Bottle', '32oz insulated water bottle', 44.99, 49.99, 'Hydro Flask', (SELECT id FROM categories WHERE name = 'Sports & Outdoors'), 150, ARRAY['/placeholder.svg?height=400&width=400'], false, false, true, 4.7, 345),
('Garmin Forerunner 265', 'GPS running watch with training metrics', 449.00, NULL, 'Garmin', (SELECT id FROM categories WHERE name = 'Sports & Outdoors'), 35, true, false, 4.7, 123),

-- Books
('The Psychology of Money', 'Timeless lessons on wealth, greed, and happiness', 16.99, 19.99, 'Morgan Housel', (SELECT id FROM categories WHERE name = 'Books'), 100, ARRAY['/placeholder.svg?height=400&width=400'], true, false, true, 4.8, 1234),
('Atomic Habits', 'An easy & proven way to build good habits', 18.99, NULL, 'James Clear', (SELECT id FROM categories WHERE name = 'Books'), 80, ARRAY['/placeholder.svg?height=400&width=400'], true, false, false, 4.9, 2156),
('The 7 Habits of Highly Effective People', 'Powerful lessons in personal change', 15.99, 17.99, 'Stephen Covey', (SELECT id FROM categories WHERE name = 'Books'), 120, ARRAY['/placeholder.svg?height=400&width=400'], false, false, true, 4.7, 987),
('Think and Grow Rich', 'The landmark bestseller now revised and updated', 14.99, NULL, 'Napoleon Hill', (SELECT id FROM categories WHERE name = 'Books'), 90, ARRAY['/placeholder.svg?height=400&width=400'], false, false, false, 4.6, 654),
('Rich Dad Poor Dad', 'What the rich teach their kids about money', 17.99, 19.99, 'Robert Kiyosaki', (SELECT id FROM categories WHERE name = 'Books'), 110, ARRAY['/placeholder.svg?height=400&width=400'], true, false, true, 4.5, 1876),

-- Beauty & Health
('Olaplex Hair Treatment', 'Professional hair repair treatment', 89.99, 99.99, 'Olaplex', (SELECT id FROM categories WHERE name = 'Beauty & Health'), 75, ARRAY['/placeholder.svg?height=400&width=400'], false, false, true, 4.7, 234),
('The Ordinary Skincare Set', 'Complete skincare routine set', 49.99, NULL, 'The Ordinary', (SELECT id FROM categories WHERE name = 'Beauty & Health'), 100, ARRAY['/placeholder.svg?height=400&width=400'], true, true, false, 4.6, 456),
('Fitbit Charge 5', 'Advanced fitness tracker with GPS', 199.99, 229.99, 'Fitbit', (SELECT id FROM categories WHERE name = 'Beauty & Health'), 60, ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400'], false, false, true, 4.5, 189),
('Vitamix Blender', 'High-performance blender for smoothies', 549.99, 599.99, 'Vitamix', (SELECT id FROM categories WHERE name = 'Beauty & Health'), 25, ARRAY['/placeholder.svg?height=400&width=400'], true, false, true, 4.8, 345),
('Theragun Mini', 'Portable percussive therapy device', 179.99, NULL, 'Therabody', (SELECT id FROM categories WHERE name = 'Beauty & Health'), 40, ARRAY['/placeholder.svg?height=400&width=400'], false, true, false, 4.6, 123)
ON CONFLICT DO NOTHING;
