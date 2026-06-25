-- ============================================
-- VRAJASPICE PRODUCT SEED DATA
-- Run AFTER schema.sql
-- ============================================

-- Launch Coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_order_value, active, expiry_date) VALUES
  ('LAUNCH10', 'Launch Special - 10% off on all orders', 'percentage', 10, 99, true, NOW() + INTERVAL '90 days'),
  ('SOUL50', 'Vrajaspice Welcome - Flat ₹50 off', 'flat', 50, 299, true, NOW() + INTERVAL '90 days'),
  ('ISKCON15', 'ISKCON Community Discount - 15% off', 'percentage', 15, 199, true, NOW() + INTERVAL '365 days')
ON CONFLICT (code) DO NOTHING;

-- Products
INSERT INTO products (slug, name, short_description, description, ingredients, weight, selling_price, mrp, stock_quantity, featured, badge, image_url, category, benefits, usage_suggestions, is_active) VALUES

(
  'kitchen-king-masala',
  'Kitchen King Masala',
  'The master blend for everyday Indian cooking',
  'Our Kitchen King Masala is the crown jewel of Indian cooking — a harmonious symphony of thirteen hand-selected spices that transforms every dish into a royal experience. Crafted in small batches to preserve freshness and aroma, this versatile blend is perfect for curries, dals, sabzis, and rice dishes. Free from onion, garlic, artificial colours and preservatives, it honours the purity of satvik cooking while delivering an unforgettable depth of flavour.',
  'Coriander, Cumin, Black Pepper, Dry Ginger, Cloves, Cinnamon, Green Cardamom, Bay Leaf, Nutmeg, Mace, Turmeric, Kashmiri Chilli, Asafoetida (Hing)', '100g', 99.00, 199.00, 100, true, 'Best Seller',
  '/kitchen-king-masala.png', 'everyday',
  ARRAY['100% No Onion No Garlic — pure satvik blend', 'No artificial colours or preservatives', 'Small-batch crafted for maximum freshness', 'Versatile — works with curries, dals, and rice'],
  ARRAY['Add 1 tsp while sautéing tomatoes for any curry', 'Mix into curd for a flavourful marinade', 'Sprinkle on roasted vegetables', 'Stir into dal during tempering'],
  true
),

(
  'garam-masala',
  'Garam Masala',
  'A fragrant finishing blend for authentic Indian dishes',
  'Our Garam Masala is an aromatic treasure — a warming blend of nine premium whole spices, stone-ground in small batches to preserve their essential oils and fragrance. This finishing masala elevates any dish with its complex, layered warmth. Completely free from onion, garlic, and artificial additives.',
  'Black Cardamom, Green Cardamom, Cloves, Cinnamon, Bay Leaf, Black Pepper, Nutmeg, Mace, Star Anise', '100g', 99.00, 199.00, 100, true, 'Premium Blend',
  '/garam-masala.png', 'everyday',
  ARRAY['Nine premium whole spices, freshly ground', 'No onion, garlic, or fillers', 'Perfect finishing spice for any curry or rice', 'Aids digestion naturally'],
  ARRAY['Add a pinch at the very end of cooking', 'Sprinkle over biryani before serving', 'Mix into paneer or tofu marinade'],
  true
),

(
  'sambar-masala',
  'Sambar Masala',
  'Authentic South Indian sambar blend with tangy depth',
  'Transport your taste buds to a traditional South Indian kitchen with our authentic Sambar Masala. Made with coriander, red chilli, toor dal, and sun-dried curry leaves, it creates a sambar with perfect balance. Completely NONG, no preservatives.',
  'Coriander, Red Chilli, Toor Dal, Chana Dal, Cumin, Fenugreek, Curry Leaves, Black Pepper, Turmeric, Asafoetida (Hing)', '100g', 99.00, 199.00, 100, false, 'Satvik Friendly',
  '/sambar-masala.png', 'south-indian',
  ARRAY['Authentic South Indian recipe', 'NONG — No Onion No Garlic', 'Contains natural digestive spices like fenugreek', 'No artificial flavours or preservatives'],
  ARRAY['Add 2 tsp per serving of sambar', 'Use in rasam for a richer flavour', 'Mix into vegetable stir-fries for South Indian flair'],
  true
),

(
  'chole-masala',
  'Chole Masala',
  'Bold, tangy blend for restaurant-style chole',
  'Recreate the bold, tangy flavours of North Indian chole right in your home kitchen. Features dried mango powder, pomegranate seed powder, and Kashmiri chilli. Completely free from onion, garlic, and artificial additives.',
  'Coriander, Cumin, Dry Mango Powder (Amchur), Black Pepper, Pomegranate Seed Powder (Anardana), Cloves, Cinnamon, Green Cardamom, Black Salt, Turmeric, Kashmiri Chilli', '100g', 99.00, 199.00, 100, true, 'Best Seller',
  '/chole-masala.png', 'north-indian',
  ARRAY['Restaurant-quality chole at home', 'Natural sourness from amchur and anardana', 'No onion, no garlic', 'No artificial colour or preservatives'],
  ARRAY['Add 2 tsp per can of cooked chickpeas', 'Use in aloo tikki filling for chaat', 'Mix into dal makhani for depth'],
  true
),

(
  'ekadashi-sabzi-masala',
  'Ekadashi Sabzi Masala',
  'Pure satvik blend for Ekadashi and fasting days',
  'Specially crafted for Ekadashi and other fasting days using only sendha namak (rock salt) and vrat-permitted spices. The perfect companion for your spiritual practice without compromising on flavour.',
  'Cumin, Black Pepper, Dry Ginger, Rock Salt (Sendha Namak), Cinnamon, Green Cardamom, Cloves, Nutmeg', '100g', 119.00, 249.00, 100, true, 'Launch Special',
  '/ekadashi-sabzi-masala.png', 'satvik',
  ARRAY['Made exclusively with sendha namak — vrat friendly', 'No table salt, no onion, no garlic', 'Perfect for Ekadashi, Navratri, and fasting days', 'Satvik and ISKCON compliant'],
  ARRAY['Use in sabudana khichdi and kuttu atta dishes', 'Add to samak rice preparations', 'Mix into aloo or lauki sabzi during vrat'],
  true
),

(
  'pav-bhaji-masala',
  'Pav Bhaji Masala',
  'Mumbai street-style pav bhaji at home',
  'Capture the iconic flavours of Mumbai''s beloved street food. This vibrant twelve-spice blend brings the authentic tanginess of fennel and dried mango powder together with the warmth of Kashmiri chilli. Completely NONG and free from artificial additives.',
  'Coriander, Cumin, Fennel Seeds, Dry Mango Powder (Amchur), Kashmiri Chilli, Black Pepper, Cinnamon, Cloves, Black Cardamom, Turmeric, Dry Ginger, Asafoetida (Hing)', '100g', 99.00, 199.00, 100, false, 'No Onion No Garlic',
  '/pav-bhaji-masala.png', 'street-food',
  ARRAY['Authentic Mumbai street-food flavour', 'No onion, no garlic — satvik approved', 'Natural tanginess from amchur', 'No artificial flavour enhancers'],
  ARRAY['Add 2 tsp per serving of mashed vegetables', 'Use in mixed vegetable sabzi', 'Mix into paneer bhurji'],
  true
),

(
  'biryani-masala',
  'Biryani Masala',
  'Royal aromatic blend for fragrant biryanis',
  'A regal blend of thirteen whole spices that brings the grandeur of Mughal culinary traditions to your kitchen. Each spice creates layers of aromatic complexity. No onion, no garlic, no shortcuts.',
  'Coriander, Cumin, Black Cardamom, Green Cardamom, Cinnamon, Cloves, Bay Leaf, Star Anise, Mace, Nutmeg, Black Pepper, Fennel Seeds, Dry Ginger', '100g', 99.00, 249.00, 100, false, 'Premium Blend',
  '/biryani-masala.png', 'rice',
  ARRAY['Thirteen whole spices for royal biryani flavour', 'No onion or garlic — pure satvik blend', 'Fragrant enough for pulaos and rice dishes', 'No artificial fragrance or flavours'],
  ARRAY['Layer 1-2 tsp into biryani while cooking rice', 'Add to vegetable or paneer biryani', 'Use in pulao and jeera rice'],
  true
),

(
  'rasam-powder',
  'Rasam Powder',
  'Soul-warming South Indian rasam blend',
  'A perfectly balanced blend of coriander, pepper, cumin, toor dal, and sun-dried curry leaves that creates a rasam with deep flavour and the characteristic peppery finish. Pure, authentic, and completely NONG.',
  'Coriander, Red Chilli, Black Pepper, Cumin, Toor Dal, Curry Leaves, Turmeric, Asafoetida (Hing)', '100g', 99.00, 249.00, 100, false, 'Satvik Friendly',
  '/rasam-powder.png', 'south-indian',
  ARRAY['Traditional South Indian recipe', 'Peppery warmth that aids digestion', 'No onion, no garlic, pure satvik', 'Natural immunity-boosting spices'],
  ARRAY['Add 1.5 tsp per litre of rasam', 'Use in pepper water for immunity', 'Mix into dal for a rasam-style finish'],
  true
),

(
  'khichdi-masala',
  'Khichdi Masala',
  'Warm, comforting blend for the ultimate khichdi',
  'This gentle, warming blend adds depth and warmth to your khichdi without overpowering its comforting simplicity. Made for satvik households, ISKCON kitchens, and anyone seeking a pure, nourishing meal.',
  'Cumin, Coriander, Black Pepper, Dry Ginger, Turmeric, Cinnamon, Cloves, Green Cardamom, Asafoetida (Hing)', '100g', 99.00, 249.00, 100, false, 'Satvik Friendly',
  '/khichdi-masala.png', 'satvik',
  ARRAY['Gentle and warming — ideal for all ages', 'ISKCON and satvik kitchen approved', 'Anti-inflammatory turmeric and ginger', 'No onion or garlic'],
  ARRAY['Add 1 tsp per serving of khichdi', 'Use in dal-rice combinations', 'Mix into vegetable upma'],
  true
),

(
  'farali-chaat-masala',
  'Farali Chaat Masala',
  'Tangy fasting chaat masala with sendha namak',
  'Crafted entirely with vrat-friendly ingredients — using sendha namak instead of table salt — while delivering a tantalizingly tangy, minty, peppery flavour that makes fasting food genuinely exciting.',
  'Rock Salt (Sendha Namak), Cumin, Black Pepper, Dry Ginger, Dry Mango Powder (Amchur), Mint Powder,  Nutmeg', '100g', 119.00, 249.00, 100, true, 'Launch Special',
  '/farali-chaat-masala.png', 'satvik',
  ARRAY['100% vrat-friendly with sendha namak', 'Tangy and minty — makes fasting food exciting', 'No onion, garlic, or regular salt', 'Refreshing mint powder for natural flavour'],
  ARRAY['Sprinkle on cut fruits for farali fruit chaat', 'Toss with boiled potatoes and chutneys', 'Mix on makhana for a tangy snack'],
  true
)

ON CONFLICT (slug) DO NOTHING;
