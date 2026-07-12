export interface Product {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  ingredients: string;
  weight: string;
  sellingPrice: number;
  mrp: number;
  stockQuantity: number;
  featured: boolean;
  badge: string | null;
  imageUrl: string;
  category: string;
  benefits: string[];
  usageSuggestions: string[];
  faqs: { q: string; a: string }[];
  isActive?: boolean;
}

export const products: Product[] = [
  {
    "id": 1,
    "slug": "kitchen-king-masala",
    "name": "Kitchen King Masala",
    "shortDescription": "The master blend for everyday Indian cooking",
    "description": "Our Kitchen King Masala is the crown jewel of Indian cooking — a harmonious symphony of thirteen hand-selected spices that transforms every dish into a royal experience. Crafted in small batches to preserve freshness and aroma, this versatile blend is perfect for curries, dals, sabzis, and rice dishes. Free from onion, garlic, artificial colours and preservatives, it honours the purity of satvik cooking while delivering an unforgettable depth of flavour.",
    "ingredients": "Coriander, Cumin, Black Pepper, Dry Ginger, Cloves, Cinnamon, Green Cardamom, Bay Leaf, Nutmeg, Mace, Turmeric, Kashmiri Chilli, Asafoetida (Hing)",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": true,
    "badge": "Best Seller",
    "imageUrl": "/product-images/kitchen-king-masala.jpeg?v=2",
    "category": "everyday",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile — works with curries, dals, and rice"
    ],
    "usageSuggestions": [
      "Add 1 tsp while sautéing tomatoes for any curry",
      "Mix into curd for a flavourful marinade",
      "Sprinkle on roasted vegetables",
      "Stir into dal during tempering"
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 2,
    "slug": "garam-masala",
    "name": "Garam Masala",
    "shortDescription": "A fragrant finishing blend for authentic Indian dishes",
    "description": "Our Garam Masala is an aromatic treasure — a warming blend of nine premium whole spices, stone-ground in small batches to preserve their essential oils and fragrance. This finishing masala elevates any dish with its complex, layered warmth. Completely free from onion, garlic, and artificial additives.",
    "ingredients": "Black Cardamom, Green Cardamom, Cloves, Cinnamon, Bay Leaf, Black Pepper, Nutmeg, Mace, Star Anise",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": true,
    "badge": "Premium Blend",
    "imageUrl": "/product-images/garam-masala.jpeg?v=2",
    "category": "everyday",
    "benefits": [
      "Nine premium whole spices, freshly ground",
      "No onion, garlic, or fillers",
      "Perfect finishing spice for any curry or rice",
      "Aids digestion naturally"
    ],
    "usageSuggestions": [
      "Add a pinch at the very end of cooking",
      "Sprinkle over biryani before serving",
      "Mix into paneer or tofu marinade"
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 3,
    "slug": "sambar-masala",
    "name": "Sambar Masala",
    "shortDescription": "Authentic South Indian sambar blend with tangy depth",
    "description": "Transport your taste buds to a traditional South Indian kitchen with our authentic Sambar Masala. Made with coriander, red chilli, toor dal, and sun-dried curry leaves, it creates a sambar with perfect balance. Completely NONG, no preservatives.",
    "ingredients": "Coriander, Red Chilli, Toor Dal, Chana Dal, Cumin, Fenugreek, Curry Leaves, Black Pepper, Turmeric, Asafoetida (Hing)",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": "Satvik Friendly",
    "imageUrl": "/product-images/sambar-masala.jpeg?v=2",
    "category": "south-indian",
    "benefits": [
      "Authentic South Indian recipe",
      "NONG — No Onion No Garlic",
      "Contains natural digestive spices like fenugreek",
      "No artificial flavours or preservatives"
    ],
    "usageSuggestions": [
      "Add 2 tsp per serving of sambar",
      "Use in rasam for a richer flavour",
      "Mix into vegetable stir-fries for South Indian flair"
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 4,
    "slug": "chole-masala",
    "name": "Chole Masala",
    "shortDescription": "Bold, tangy blend for restaurant-style chole",
    "description": "Recreate the bold, tangy flavours of North Indian chole right in your home kitchen. Features dried mango powder, pomegranate seed powder, and Kashmiri chilli. Completely free from onion, garlic, and artificial additives.",
    "ingredients": "Coriander, Cumin, Dry Mango Powder (Amchur), Black Pepper, Pomegranate Seed Powder (Anardana), Cloves, Cinnamon, Green Cardamom, Black Salt, Turmeric, Kashmiri Chilli",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": true,
    "badge": "Best Seller",
    "imageUrl": "/product-images/chole-masala.jpeg?v=2",
    "category": "north-indian",
    "benefits": [
      "Restaurant-quality chole at home",
      "Natural sourness from amchur and anardana",
      "No onion, no garlic",
      "No artificial colour or preservatives"
    ],
    "usageSuggestions": [
      "Add 2 tsp per can of cooked chickpeas",
      "Use in aloo tikki filling for chaat",
      "Mix into dal makhani for depth"
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 5,
    "slug": "ekadashi-sabzi-masala",
    "name": "Ekadashi Sabzi Masala",
    "shortDescription": "Pure satvik blend for Ekadashi and fasting days",
    "description": "Specially crafted for Ekadashi and other fasting days using only sendha namak (rock salt) and vrat-permitted spices. The perfect companion for your spiritual practice without compromising on flavour.",
    "ingredients": "Cumin, Black Pepper, Dry Ginger, Rock Salt (Sendha Namak), Cinnamon, Green Cardamom, Cloves, Nutmeg",
    "weight": "100g",
    "sellingPrice": 119,
    "mrp": 219,
    "stockQuantity": 100,
    "featured": true,
    "badge": "Launch Special",
    "imageUrl": "/product-images/ekadashi-sabzi-masala.jpeg?v=2",
    "category": "satvik",
    "benefits": [
      "Made exclusively with sendha namak — vrat friendly",
      "No table salt, no onion, no garlic",
      "Perfect for Ekadashi, Navratri, and fasting days",
      "Satvik and ISKCON compliant"
    ],
    "usageSuggestions": [
      "Use in sabudana khichdi and kuttu atta dishes",
      "Add to samak rice preparations",
      "Mix into aloo or lauki sabzi during vrat"
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 6,
    "slug": "pav-bhaji-masala",
    "name": "Pav Bhaji Masala",
    "shortDescription": "Mumbai street-style pav bhaji at home",
    "description": "Capture the iconic flavours of Mumbai's beloved street food. This vibrant twelve-spice blend brings the authentic tanginess of fennel and dried mango powder together with the warmth of Kashmiri chilli. Completely NONG and free from artificial additives.",
    "ingredients": "Coriander, Cumin, Fennel Seeds, Dry Mango Powder (Amchur), Kashmiri Chilli, Black Pepper, Cinnamon, Cloves, Black Cardamom, Turmeric, Dry Ginger, Asafoetida (Hing)",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": "No Onion No Garlic",
    "imageUrl": "/product-images/pav-bhaji-masala.jpeg?v=2",
    "category": "street-food",
    "benefits": [
      "Authentic Mumbai street-food flavour",
      "No onion, no garlic — satvik approved",
      "Natural tanginess from amchur",
      "No artificial flavour enhancers"
    ],
    "usageSuggestions": [
      "Add 2 tsp per serving of mashed vegetables",
      "Use in mixed vegetable sabzi",
      "Mix into paneer bhurji"
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 7,
    "slug": "biryani-masala",
    "name": "Biryani Masala",
    "shortDescription": "Royal aromatic blend for fragrant biryanis",
    "description": "A regal blend of thirteen whole spices that brings the grandeur of Mughal culinary traditions to your kitchen. Each spice creates layers of aromatic complexity. No onion, no garlic, no shortcuts.",
    "ingredients": "Coriander, Cumin, Black Cardamom, Green Cardamom, Cinnamon, Cloves, Bay Leaf, Star Anise, Mace, Nutmeg, Black Pepper, Fennel Seeds, Dry Ginger",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 249,
    "stockQuantity": 100,
    "featured": false,
    "badge": "Premium Blend",
    "imageUrl": "/product-images/biryani-masala.jpeg?v=2",
    "category": "rice",
    "benefits": [
      "Thirteen whole spices for royal biryani flavour",
      "No onion or garlic — pure satvik blend",
      "Fragrant enough for pulaos and rice dishes",
      "No artificial fragrance or flavours"
    ],
    "usageSuggestions": [
      "Layer 1-2 tsp into biryani while cooking rice",
      "Add to vegetable or paneer biryani",
      "Use in pulao and jeera rice"
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 8,
    "slug": "rasam-powder",
    "name": "Rasam Powder",
    "shortDescription": "Soul-warming South Indian rasam blend",
    "description": "A perfectly balanced blend of coriander, pepper, cumin, toor dal, and sun-dried curry leaves that creates a rasam with deep flavour and the characteristic peppery finish. Pure, authentic, and completely NONG.",
    "ingredients": "Coriander, Red Chilli, Black Pepper, Cumin, Toor Dal, Curry Leaves, Turmeric, Asafoetida (Hing)",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 249,
    "stockQuantity": 100,
    "featured": false,
    "badge": "Satvik Friendly",
    "imageUrl": "/product-images/rasam-powder.jpeg?v=2",
    "category": "south-indian",
    "benefits": [
      "Traditional South Indian recipe",
      "Peppery warmth that aids digestion",
      "No onion, no garlic, pure satvik",
      "Natural immunity-boosting spices"
    ],
    "usageSuggestions": [
      "Add 1.5 tsp per litre of rasam",
      "Use in pepper water for immunity",
      "Mix into dal for a rasam-style finish"
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 9,
    "slug": "khichdi-masala",
    "name": "Khichdi Masala",
    "shortDescription": "Warm, comforting blend for the ultimate khichdi",
    "description": "This gentle, warming blend adds depth and warmth to your khichdi without overpowering its comforting simplicity. Made for satvik households, ISKCON kitchens, and anyone seeking a pure, nourishing meal.",
    "ingredients": "Cumin, Coriander, Black Pepper, Dry Ginger, Turmeric, Cinnamon, Cloves, Green Cardamom, Asafoetida (Hing)",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 249,
    "stockQuantity": 100,
    "featured": false,
    "badge": "Satvik Friendly",
    "imageUrl": "/product-images/khichdi-masala.jpeg?v=2",
    "category": "satvik",
    "benefits": [
      "Gentle and warming — ideal for all ages",
      "ISKCON and satvik kitchen approved",
      "Anti-inflammatory turmeric and ginger",
      "No onion or garlic"
    ],
    "usageSuggestions": [
      "Add 1 tsp per serving of khichdi",
      "Use in dal-rice combinations",
      "Mix into vegetable upma"
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 10,
    "slug": "farali-chaat-masala",
    "name": "Farali Chaat Masala",
    "shortDescription": "Tangy fasting chaat masala with sendha namak",
    "description": "Crafted entirely with vrat-friendly ingredients — using sendha namak instead of table salt — while delivering a tantalizingly tangy, minty, peppery flavour that makes fasting food genuinely exciting.",
    "ingredients": "Rock Salt (Sendha Namak), Cumin, Black Pepper, Dry Ginger, Dry Mango Powder (Amchur), Mint Powder,  Nutmeg",
    "weight": "100g",
    "sellingPrice": 119,
    "mrp": 249,
    "stockQuantity": 100,
    "featured": true,
    "badge": "Launch Special",
    "imageUrl": "/product-images/farali-chaat-masala.jpeg?v=2",
    "category": "satvik",
    "benefits": [
      "100% vrat-friendly with sendha namak",
      "Tangy and minty — makes fasting food exciting",
      "No onion, garlic, or regular salt",
      "Refreshing mint powder for natural flavour"
    ],
    "usageSuggestions": [
      "Sprinkle on cut fruits for farali fruit chaat",
      "Toss with boiled potatoes and chutneys",
      "Mix on makhana for a tangy snack"
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 11,
    "slug": "ekadashi-hing",
    "name": "Ekadashi Hing",
    "shortDescription": "Pure Ekadashi-friendly asafoetida without wheat flour.",
    "description": "A pure and potent Ekadashi-friendly asafoetida, specially crafted without wheat flour. Adds bold flavour to everyday cooking.",
    "ingredients": "Coming soon",
    "weight": "50g",
    "sellingPrice": 219,
    "mrp": 219,
    "stockQuantity": 100,
    "featured": false,
    "badge": "Ekadashi Special",
    "imageUrl": "/product-images/ekadashi-hing.png?v=2",
    "category": "ekadashi",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": false
  },
  {
    "id": 12,
    "slug": "pulihora-mix",
    "name": "Pulihora Mix",
    "shortDescription": "Authentic Andhra tamarind rice mix — tangy, spicy & crunchy.",
    "description": "A ready-to-use Andhra-style tamarind rice mix with a perfect balance of sourness, spice and crunch.",
    "ingredients": "Chana Dal, Urad Dal, Groundnuts, Jaggery, Tamarind Powder, Salt, Asafoetida, Turmeric, Curry Leaves, Green Chillies, Coriander Powder, Mustard, Black Pepper, Cumin",
    "weight": "200g",
    "sellingPrice": 179,
    "mrp": 299,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/pulihora-mix.jpeg?v=2",
    "category": "instant-mix",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 13,
    "slug": "magic-masala",
    "name": "Magic Masala",
    "shortDescription": "Bold all-purpose seasoning that transforms any snack or dish.",
    "description": "An irresistible all-purpose seasoning blend that transforms any snack or dish with its bold, layered flavours.",
    "ingredients": "Black Pepper, Nutmeg, Fenugreek, Sugar, Star Anise, Cinnamon, Green Cardamom, Dried Ginger, Salt, Red Chilli Powder, Turmeric Powder, Coriander Powder, Chaat Masala Powder, Roasted Cumin Powder",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": true,
    "badge": "Bestseller",
    "imageUrl": "/product-images/magic-masala.jpeg?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 14,
    "slug": "schezwan-sauce",
    "name": "Schezwan Sauce",
    "shortDescription": "Fiery, tangy sauce perfect as dip, spread or stir-fry base.",
    "description": "A fiery, tangy Schezwan sauce made with red chillies and aromatic spices — perfect as a dip, spread or stir-fry sauce.",
    "ingredients": "Red Chilli, Edible Vegetable Oil, Ginger, Celery, Tomato, Salt, Sugar, Soy Sauce, Vinegar, Black Pepper, White Pepper, Asafoetida",
    "weight": "250g",
    "sellingPrice": 199,
    "mrp": 299,
    "stockQuantity": 100,
    "featured": true,
    "badge": "New",
    "imageUrl": "/product-images/schezwan-sauce.jpeg?v=2",
    "category": "sauce",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 15,
    "slug": "moringa-podi",
    "name": "Moringa Podi",
    "shortDescription": "Nutritious drumstick leaf powder rich in iron and antioxidants.",
    "description": "A nutritious drumstick leaf powder packed with iron and antioxidants. Mix with rice and ghee for a wholesome meal.",
    "ingredients": "Dried Moringa Leaves, Roasted Chana Dal, Moong Dal, Urad Dal, Dry Red Chilli, Cumin Seeds, Black Pepper, Sesame Seeds, Asafoetida, Dry Curry Leaves, Salt, Red Chilli, Flax Seeds, Ginger Powder",
    "weight": "100g",
    "sellingPrice": 119,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": "Healthy",
    "imageUrl": "/product-images/moringa-podi.jpeg?v=2",
    "category": "podi",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 16,
    "slug": "flaxseed-podi",
    "name": "Flaxseed Podi",
    "shortDescription": "Fibre-rich flaxseed powder with South Indian spices.",
    "description": "A fibre-rich flaxseed powder blended with traditional South Indian spices. Excellent mixed with hot rice and oil.",
    "ingredients": "Flax Seeds, Roasted Chana Dal, Urad Dal, Dry Red Chilli, Dry Curry Leaves, Cumin, Tamarind Powder, Salt, Sugar, Asafoetida",
    "weight": "100g",
    "sellingPrice": 119,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/flaxseed-podi.jpeg?v=2",
    "category": "podi",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 17,
    "slug": "ekadashi-khichdi-mix",
    "name": "Ekadashi Khichdi Mix",
    "shortDescription": "Nourishing barnyard millet khichdi for Ekadashi fasting.",
    "description": "A complete Ekadashi fasting khichdi mix with barnyard millet and aromatic spices — nourishing, satvik and easy to cook.",
    "ingredients": "Barnyard Millet, Peanut, Cumin, Black Pepper, Green Chili, Rock Salt, Dried Curry Leaves, Dry Ginger Powder, Cashew, Coriander Powder",
    "weight": "200g",
    "sellingPrice": 209,
    "mrp": 349,
    "stockQuantity": 100,
    "featured": true,
    "badge": "Ekadashi Special",
    "imageUrl": "/product-images/ekadashi-khichdi-mix.jpeg?v=2",
    "category": "ekadashi",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 18,
    "slug": "ekadashi-sabudana-khichdi-mix",
    "name": "Ekadashi Sabudana Khichdi Mix",
    "shortDescription": "Ready-to-cook sabudana khichdi for Ekadashi vrat.",
    "description": "A ready-to-cook Ekadashi sabudana khichdi mix with sago pearls, peanuts and mild spicing for a perfect vrat meal.",
    "ingredients": "Sabudana, Peanut, Cumin Powder, Red Chilli, Dry Ginger Powder, Dry Curry Leaves, Lemon Powder, Cashews",
    "weight": "200g",
    "sellingPrice": 209,
    "mrp": 399,
    "stockQuantity": 100,
    "featured": false,
    "badge": "Ekadashi Special",
    "imageUrl": "/product-images/ekadashi-sabudana-khichdi-mix.jpeg?v=2",
    "category": "ekadashi",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 19,
    "slug": "italian-seasoning",
    "name": "Italian Seasoning",
    "shortDescription": "Classic Italian herb blend for pasta, pizza and more.",
    "description": "A fragrant blend of classic Italian herbs — perfect for pasta, pizza, garlic bread and roasted vegetables.",
    "ingredients": "Oregano Flakes, Basil Flakes, Parsley Flakes, Thyme, Chilli Flakes, Black Pepper Powder, Salt, Dry Ginger",
    "weight": "50g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": "New",
    "imageUrl": "/product-images/italian-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 20,
    "slug": "peanut-chutney-powder",
    "name": "Peanut Chutney Powder",
    "shortDescription": "Classic South Indian peanut dry chutney for idli and dosa.",
    "description": "A South Indian dry chutney powder made with roasted peanuts — pairs perfectly with idli, dosa and rice.",
    "ingredients": "Roasted Peanut, Roasted Chana Dal, Dry Red Chilli, Dry Curry Leaves, Dry Mango Powder, Salt, Asafoetida, Refined Oil, Sugar",
    "weight": "100g",
    "sellingPrice": 110,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/peanut-chutney-powder.jpeg?v=2",
    "category": "podi",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 21,
    "slug": "noodles-tastemaker",
    "name": "Noodles Tastemaker",
    "shortDescription": "Restaurant-style noodle seasoning in a packet.",
    "description": "A zesty noodle seasoning blend that gives homemade noodles that bold, restaurant-style taste in seconds.",
    "ingredients": "Salt, Sugar, Corn Starch, Chilli Powder, Black Pepper, White Pepper, Ginger Powder, Cumin Powder, Coriander Powder, Celery Powder, Turmeric Powder, Garam Masala, Dry Mango Powder",
    "weight": "50g",
    "sellingPrice": 129,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/noodles-tastemaker.jpeg?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 22,
    "slug": "ekadashi-rajgira-dosa-mix",
    "name": "Ekadashi Rajgira Dosa Mix",
    "shortDescription": "Crispy gluten-free Ekadashi dosa with rajgira & barnyard millet.",
    "description": "A gluten-free Ekadashi dosa mix made from rajgira (amaranth) and barnyard millet flours — crispy and wholesome.",
    "ingredients": "Rajgira Flour, Barnyard Flour, Peanut Powder, Cumin, Black Pepper, Rock Salt, Dry Ginger Powder, Green Chilli Powder, Coriander Powder",
    "weight": "250g",
    "sellingPrice": 249,
    "mrp": 299,
    "stockQuantity": 100,
    "featured": false,
    "badge": "Ekadashi Special",
    "imageUrl": "/product-images/ekadashi-rajgira-dosa-mix.jpeg?v=2",
    "category": "ekadashi",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 23,
    "slug": "ekadashi-rajgira-halwa-mix",
    "name": "Ekadashi Rajgira Halwa Mix",
    "shortDescription": "Festive rajgira halwa with saffron, cashews and almonds.",
    "description": "A luxurious Ekadashi halwa mix with rajgira flour, jaggery, saffron, cashews and almonds — a festive vrat treat.",
    "ingredients": "Rajgira Flour, Jaggery Powder, Cashew Powder, Almond Powder, Cardamom Powder, Saffron Strands",
    "weight": "200g",
    "sellingPrice": 249,
    "mrp": 349,
    "stockQuantity": 100,
    "featured": false,
    "badge": "Ekadashi Special",
    "imageUrl": "/product-images/ekadashi-rajgira-halwa-mix.jpeg?v=2",
    "category": "ekadashi",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 24,
    "slug": "ekadashi-pancake-mix",
    "name": "Ekadashi Pancake Mix",
    "shortDescription": "Wholesome amaranth pancakes for Ekadashi fasting.",
    "description": "A wholesome vrat pancake mix with amaranth and buckwheat flours, jaggery and cardamom — healthy and delicious.",
    "ingredients": "Amaranth Flour, Buckwheat Flour, Fox Nut Powder, Jaggery Powder, Cardamom Powder, Cinnamon Powder, Rock Salt",
    "weight": "200g",
    "sellingPrice": 249,
    "mrp": 299,
    "stockQuantity": 100,
    "featured": false,
    "badge": "Ekadashi Special",
    "imageUrl": "/product-images/ekadashi-pancake-mix.jpeg?v=2",
    "category": "ekadashi",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 25,
    "slug": "choco-millet-pancake-mix",
    "name": "Choco Millet Pancake Mix",
    "shortDescription": "Chocolatey millet pancakes with oats and jaggery — loved by all!",
    "description": "A chocolatey, guilt-free millet pancake mix with barnyard millet, oats, jaggery and cocoa — kids and adults both love it!",
    "ingredients": "Barnyard Millet Flour, Fox Nut Powder, Oats Powder, Foxtail Millet Powder, Milk Powder, Jaggery Powder, Baking Powder, Cinnamon Powder, Rock Salt, Cocoa Powder",
    "weight": "200g",
    "sellingPrice": 249,
    "mrp": 299,
    "stockQuantity": 100,
    "featured": true,
    "badge": "New",
    "imageUrl": "/product-images/choco-millet-pancake-mix.jpeg?v=2",
    "category": "instant-mix",
    "benefits": [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile and easy to cook"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp during cooking to elevate flavor.",
      "Store in a cool, dry, airtight container."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, it contains no onion or garlic and is fully Jain friendly."
      }
    ],
    "isActive": true
  },
  {
    "id": 26,
    "slug": "everyday-sabji-masala",
    "name": "Everyday Sabji Masala",
    "shortDescription": "Premium satvik Everyday Sabji Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Everyday Sabji Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander Seeds, Cumin Seeds, Kashmiri Chilli, Black Pepper, Turmeric, Dry Ginger, Fennel Seeds, Dry Mango Powder, Bay Leaf, Cinnamon, Green Cardamom, Cloves, Black Cardamom, Nutmeg, Mace, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/everyday-sabji-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Everyday Sabji Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 27,
    "slug": "vegetable-masala",
    "name": "Vegetable Masala",
    "shortDescription": "Premium satvik Vegetable Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Vegetable Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Kashmiri Chilli, Turmeric, Black Pepper, Fennel, Dry Mango, Dry Ginger, Bay Leaf, Cinnamon, Clove, Cardamom, Nutmeg, Mace, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/vegetable-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Vegetable Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 28,
    "slug": "dal-masala",
    "name": "Dal Masala",
    "shortDescription": "Premium satvik Dal Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Dal Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Kashmiri Chilli, Black Pepper, Fennel Seeds, Dry Ginger, Turmeric, Dry Mango Powder, Fenugreek Seeds, Bay Leaf, Cinnamon, Clove, Cardamom, Compound Hing, Curry Leaf Powder",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/dal-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Dal Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 29,
    "slug": "tadka-masala",
    "name": "Tadka Masala",
    "shortDescription": "Premium satvik Tadka Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Tadka Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Cumin, Coriander, Red Chilli, Black Pepper, Turmeric, Curry Leaf Powder, Dry Ginger, Compound Hing, Cinnamon, Clove, Bay Leaf",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/tadka-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Tadka Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 30,
    "slug": "dry-sabji-masala",
    "name": "Dry Sabji Masala",
    "shortDescription": "Premium satvik Dry Sabji Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Dry Sabji Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Dry Mango (Amchur), Kashmiri Chilli, Fennel Seeds, Black Pepper, Dry Ginger, Turmeric, Black Salt, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/dry-sabji-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Dry Sabji Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 31,
    "slug": "curry-masala",
    "name": "Curry Masala",
    "shortDescription": "Premium satvik Curry Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Curry Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Kashmiri Chilli, Fennel, Black Pepper, Turmeric, Dry Ginger, Dry Mango, Cinnamon, Bay Leaf, Cardamom, Clove, Star Anise, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/curry-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Curry Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 32,
    "slug": "stuffed-vegetable-masala",
    "name": "Stuffed Vegetable Masala",
    "shortDescription": "Premium satvik Stuffed Vegetable Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Stuffed Vegetable Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Roasted Peanut Powder, Cumin, Sesame Seeds, Dry Coconut Powder, Kashmiri Chilli, Dry Mango Powder, Fennel Seeds, Black Pepper, Turmeric, Cinnamon, Clove, Compound Hing",
    "weight": "100g",
    "sellingPrice": 120,
    "mrp": 210,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/stuffed-vegetable-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Stuffed Vegetable Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 33,
    "slug": "tomato-curry-masala",
    "name": "Tomato Curry Masala",
    "shortDescription": "Premium satvik Tomato Curry Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Tomato Curry Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Kashmiri Chilli, Dry Mango, Black Pepper, Turmeric, Dry Ginger, Cinnamon, Bay Leaf, Fennel, Clove, Cardamom, Star Anise, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/tomato-curry-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Tomato Curry Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 34,
    "slug": "paneer-masala",
    "name": "Paneer Masala",
    "shortDescription": "Premium satvik Paneer Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Paneer Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Kashmiri Chilli, Kasuri Methi, Dry Mango, Black Pepper, Dry Ginger, Cinnamon, Star Anise, Bay Leaf, Cardamom, White Pepper, Clove, Nutmeg, Mace, Fennel, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/paneer-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Paneer Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 35,
    "slug": "govinda-sabji-masala",
    "name": "Govinda Sabji Masala",
    "shortDescription": "Premium satvik Govinda Sabji Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Govinda Sabji Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander Seeds, Cumin Seeds, Fennel Seeds, Kashmiri Chilli, Dry Ginger, Black Pepper, Turmeric, Dry Mango Powder, Bay Leaf, Cinnamon, Green Cardamom, Clove, Nutmeg, Mace, Black Cardamom, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/govinda-sabji-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Govinda Sabji Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 36,
    "slug": "temple-khichdi-masala",
    "name": "Temple Khichdi Masala",
    "shortDescription": "Premium satvik Temple Khichdi Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Temple Khichdi Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Cumin, Coriander, Black Pepper, Dry Ginger, Fennel, Turmeric, Compound Hing, Cinnamon, Bay Leaf, Green Cardamom, Clove, Nutmeg, Mace, Dry Mango",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/temple-khichdi-masala.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Temple Khichdi Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 37,
    "slug": "vaishnava-garam-masala",
    "name": "Vaishnava Garam Masala",
    "shortDescription": "Premium satvik Vaishnava Garam Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Vaishnava Garam Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Green Cardamom, Black Pepper, Cinnamon, Clove, Bay Leaf, Black Cardamom, Nutmeg, Mace, Fennel, Cumin",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/vaishnava-garam-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Vaishnava Garam Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 38,
    "slug": "prasadam-curry-masala",
    "name": "Prasadam Curry Masala",
    "shortDescription": "Premium satvik Prasadam Curry Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Prasadam Curry Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Fennel, Kashmiri Chilli, Dry Ginger, Black Pepper, Turmeric, Dry Mango, Cinnamon, Bay Leaf, Cardamom, Clove, Compound Hing, Nutmeg",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/prasadam-curry-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Prasadam Curry Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 39,
    "slug": "annakut-masala",
    "name": "Annakut Masala",
    "shortDescription": "Premium satvik Annakut Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Annakut Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Fennel, Kashmiri Chilli, Black Pepper, Dry Ginger, Turmeric, Dry Mango, Cinnamon, Bay Leaf, Cardamom, Clove, Nutmeg, Mace, Star Anise, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/annakut-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Annakut Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 40,
    "slug": "temple-pulao-masala",
    "name": "Temple Pulao Masala",
    "shortDescription": "Premium satvik Temple Pulao Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Temple Pulao Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Cumin, Coriander, Cinnamon, Green Cardamom, Bay Leaf, Black Pepper, Clove, Fennel, Mace, Star Anise, Nutmeg, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/temple-pulao-masala.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Temple Pulao Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 41,
    "slug": "bhoga-seasoning-blend",
    "name": "Bhoga Seasoning Blend",
    "shortDescription": "Premium satvik Bhoga Seasoning Blend for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Bhoga Seasoning Blend. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Roasted Cumin, Roasted Coriander, Black Pepper, Dry Ginger, Fennel, Dry Mango, Cinnamon, Cardamom, Compound Hing, Nutmeg, Mace",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/bhoga-seasoning-blend.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Bhoga Seasoning Blend during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 42,
    "slug": "festival-vegetable-masala",
    "name": "Festival Vegetable Masala",
    "shortDescription": "Premium satvik Festival Vegetable Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Festival Vegetable Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Fennel, Kashmiri Chilli, Black Pepper, Cinnamon, Dry Ginger, Dry Mango, Turmeric, Bay Leaf, Cardamom, Clove, Nutmeg, Mace, Star Anise, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/festival-vegetable-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Festival Vegetable Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 43,
    "slug": "satvik-curry-blend",
    "name": "Satvik Curry Blend",
    "shortDescription": "Premium satvik Satvik Curry Blend for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Satvik Curry Blend. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Fennel, Kashmiri Chilli, Dry Ginger, Black Pepper, Turmeric, Dry Mango, Cinnamon, Bay Leaf, Cardamom, Clove, Nutmeg",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/satvik-curry-blend.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Satvik Curry Blend during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 44,
    "slug": "mahaprasad-khichdi-blend",
    "name": "Mahaprasad Khichdi Blend",
    "shortDescription": "Premium satvik Mahaprasad Khichdi Blend for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Mahaprasad Khichdi Blend. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Cumin, Coriander, Dry Ginger, Black Pepper, Fennel, Turmeric, Compound Hing, Bay Leaf, Cinnamon, Cardamom, Clove, Nutmeg, Mace, Dry Mango",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/mahaprasad-khichdi-blend.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Mahaprasad Khichdi Blend during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 45,
    "slug": "mediterranean-herb-mix",
    "name": "Mediterranean Herb Mix",
    "shortDescription": "Premium satvik Mediterranean Herb Mix for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Mediterranean Herb Mix. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Oregano, Rosemary, Thyme, Basil, Lemon Peel Powder, Black Pepper, , Dried Parsley",
    "weight": "35g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/mediterranean-herb-mix.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Mediterranean Herb Mix during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 46,
    "slug": "pizza-sprinkle",
    "name": "Pizza Sprinkle",
    "shortDescription": "Premium satvik Pizza Sprinkle for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Pizza Sprinkle. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Oregano, Basil, Thyme, Red Chilli Flakes, Black Pepper",
    "weight": "35g",
    "sellingPrice": 85,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/pizza-sprinkle.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Pizza Sprinkle during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 47,
    "slug": "pasta-seasoning",
    "name": "Pasta Seasoning",
    "shortDescription": "Premium satvik Pasta Seasoning for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Pasta Seasoning. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Basil, Oregano, Thyme, Paprika, White Pepper, Nutmeg",
    "weight": "35g",
    "sellingPrice": 85,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/pasta-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Pasta Seasoning during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 48,
    "slug": "tuscan-herb-blend",
    "name": "Tuscan Herb Blend",
    "shortDescription": "Premium satvik Tuscan Herb Blend for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Tuscan Herb Blend. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Rosemary, Thyme, Basil, Oregano, Sage, Crushed Fennel",
    "weight": "35g",
    "sellingPrice": 85,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/tuscan-herb-blend.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Tuscan Herb Blend during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 49,
    "slug": "french-herb-blend",
    "name": "French Herb Blend",
    "shortDescription": "Premium satvik French Herb Blend for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium French Herb Blend. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Thyme, Rosemary, Basil, Oregano, Marjoram, Lavender",
    "weight": "35g",
    "sellingPrice": 110,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/french-herb-blend.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of French Herb Blend during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 50,
    "slug": "lemon-herb-seasoning",
    "name": "Lemon Herb Seasoning",
    "shortDescription": "Premium satvik Lemon Herb Seasoning for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Lemon Herb Seasoning. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Basil, Oregano, Thyme, Lemon Peel Powder, Parsley, White Pepper",
    "weight": "35g",
    "sellingPrice": 85,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/lemon-herb-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Lemon Herb Seasoning during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 51,
    "slug": "roasted-vegetable-seasoning",
    "name": "Roasted Vegetable Seasoning",
    "shortDescription": "Premium satvik Roasted Vegetable Seasoning for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Roasted Vegetable Seasoning. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Rosemary, Smoked Paprika, Thyme, Oregano, Black Pepper, Parsley",
    "weight": "35g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/roasted-vegetable-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Roasted Vegetable Seasoning during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 52,
    "slug": "herb-paneer-seasoning",
    "name": "Herb Paneer Seasoning",
    "shortDescription": "Premium satvik Herb Paneer Seasoning for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Herb Paneer Seasoning. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Rosemary, Oregano, Thyme, Cumin, Black Pepper, Lemon Peel Powder",
    "weight": "35g",
    "sellingPrice": 85,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/herb-paneer-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Herb Paneer Seasoning during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 53,
    "slug": "all-purpose-gourmet-herb-mix",
    "name": "All-Purpose Gourmet Herb Mix",
    "shortDescription": "Premium satvik All-Purpose Gourmet Herb Mix for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium All-Purpose Gourmet Herb Mix. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Oregano, Basil, Rosemary, Thyme, Paprika, Black Pepper, Parsley, Celery Seed",
    "weight": "35g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/all-purpose-gourmet-herb-mix.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of All-Purpose Gourmet Herb Mix during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 54,
    "slug": "garlic-free-bread-sprinkle",
    "name": "Garlic-Free Bread Sprinkle",
    "shortDescription": "Premium satvik Garlic-Free Bread Sprinkle for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Garlic-Free Bread Sprinkle. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Oregano, Basil, Parsley, Sesame Seeds, Black Pepper",
    "weight": "35g",
    "sellingPrice": 85,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/garlic-free-bread-sprinkle.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Garlic-Free Bread Sprinkle during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 55,
    "slug": "tomato-herb-seasoning",
    "name": "Tomato Herb Seasoning",
    "shortDescription": "Premium satvik Tomato Herb Seasoning for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Tomato Herb Seasoning. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Basil, Oregano, Thyme, Paprika, Celery Seed",
    "weight": "35g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/tomato-herb-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Tomato Herb Seasoning during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 56,
    "slug": "herb-rice-seasoning",
    "name": "Herb Rice Seasoning",
    "shortDescription": "Premium satvik Herb Rice Seasoning for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Herb Rice Seasoning. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Rosemary, Thyme, Parsley, Lemon Peel Powder, Black Pepper",
    "weight": "35g",
    "sellingPrice": 85,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/herb-rice-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Herb Rice Seasoning during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 57,
    "slug": "creamy-pasta-herb-mix",
    "name": "Creamy Pasta Herb Mix",
    "shortDescription": "Premium satvik Creamy Pasta Herb Mix for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Creamy Pasta Herb Mix. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Basil, Oregano, Thyme, White Pepper, Nutmeg",
    "weight": "35g",
    "sellingPrice": 85,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/creamy-pasta-herb-mix.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Creamy Pasta Herb Mix during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 58,
    "slug": "air-fryer-veggie-mix",
    "name": "Air Fryer Veggie Mix",
    "shortDescription": "Premium satvik Air Fryer Veggie Mix for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Air Fryer Veggie Mix. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Rosemary, Oregano, Thyme, Smoked Paprika, Black Pepper",
    "weight": "35g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/air-fryer-veggie-mix.png?v=2",
    "category": "everyday",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Air Fryer Veggie Mix during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 59,
    "slug": "premium-veg-biryani-masala",
    "name": "Premium Veg Biryani Masala",
    "shortDescription": "Premium satvik Premium Veg Biryani Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Premium Veg Biryani Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Black Pepper, Kashmiri Chilli, Cinnamon, Green Cardamom, Black Cardamom, Clove, Bay Leaf, Mace, Star Anise, Fennel, Nutmeg, Dry Ginger, Stone Flower (Kalpasi)",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/premium-veg-biryani-masala.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Premium Veg Biryani Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 60,
    "slug": "royal-pulao-masala",
    "name": "Royal Pulao Masala",
    "shortDescription": "Premium satvik Royal Pulao Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Royal Pulao Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Cumin, Coriander, Cinnamon, Green Cardamom, Black Pepper, Bay Leaf, Clove, Fennel, Mace, Star Anise, Nutmeg, Dry Ginger",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/royal-pulao-masala.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Royal Pulao Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 61,
    "slug": "jeera-rice-seasoning",
    "name": "Jeera Rice Seasoning",
    "shortDescription": "Premium satvik Jeera Rice Seasoning for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Jeera Rice Seasoning. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Roasted Cumin, Black Pepper, Coriander, Dry Ginger, Cinnamon, Bay Leaf, Green Cardamom, Clove, Compound Hing, Nutmeg",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/jeera-rice-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Jeera Rice Seasoning during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 62,
    "slug": "lemon-rice-masala",
    "name": "Lemon Rice Masala",
    "shortDescription": "Premium satvik Lemon Rice Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Lemon Rice Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Roasted Chana Dal Powder, Roasted Urad Dal Powder, Cumin, Coriander, Black Pepper, Dry Lemon Peel, Turmeric, Curry Leaf Powder, Dry Ginger, Compound Hing, Kashmiri Chilli",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/lemon-rice-masala.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Lemon Rice Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 63,
    "slug": "tamarind-rice-masala",
    "name": "Tamarind Rice Masala",
    "shortDescription": "Premium satvik Tamarind Rice Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Tamarind Rice Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Sesame Seeds, Chana Dal, Urad Dal, Black Pepper, Cumin, Dry Red Chilli, Curry Leaf Powder, Compound Hing, Fenugreek Seeds, Dry Ginger, Mustard Powder",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/tamarind-rice-masala.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Tamarind Rice Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 64,
    "slug": "coconut-rice-masala",
    "name": "Coconut Rice Masala",
    "shortDescription": "Premium satvik Coconut Rice Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Coconut Rice Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Roasted Coconut Powder, Cumin, Coriander, Black Pepper, Curry Leaf Powder, Sesame Seeds, Dry Ginger, Cinnamon, Compound Hing, Cardamom, Nutmeg, Clove",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/coconut-rice-masala.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Coconut Rice Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 65,
    "slug": "masala-rice-blend",
    "name": "Masala Rice Blend",
    "shortDescription": "Premium satvik Masala Rice Blend for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Masala Rice Blend. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Black Pepper, Kashmiri Chilli, Turmeric, Fennel, Dry Mango, Dry Ginger, Cinnamon, Bay Leaf, Compound Hing, Clove, Cardamom, Nutmeg, Mace",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/masala-rice-blend.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Masala Rice Blend during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 66,
    "slug": "curd-rice-tadka-mix",
    "name": "Curd Rice Tadka Mix",
    "shortDescription": "Premium satvik Curd Rice Tadka Mix for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Curd Rice Tadka Mix. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Roasted Urad Dal, Roasted Chana Dal, Curry Leaf Powder, Cumin, Black Pepper, Sesame Seeds, Dry Ginger, Compound Hing, Dry Red Chilli, Mustard Powder, Coriander",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/curd-rice-tadka-mix.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Curd Rice Tadka Mix during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 67,
    "slug": "indian-fried-rice-seasoning",
    "name": "Indian Fried Rice Seasoning",
    "shortDescription": "Premium satvik Indian Fried Rice Seasoning for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Indian Fried Rice Seasoning. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Black Pepper, Cumin, Coriander, Dry Ginger, Kashmiri Chilli, Cinnamon, Fennel, Star Anise, Cardamom, Clove, Nutmeg, Compound Hing, Dry Lemon Peel",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/indian-fried-rice-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Indian Fried Rice Seasoning during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 68,
    "slug": "premium-upma-masala",
    "name": "Premium Upma Masala",
    "shortDescription": "Premium satvik Premium Upma Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Premium Upma Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Roasted Chana Dal, Roasted Urad Dal, Cumin, Coriander, Black Pepper, Dry Ginger, Curry Leaf Powder, Turmeric, Kashmiri Chilli, Sesame Seeds, Compound Hing, Mustard Powder, Fennel",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/premium-upma-masala.png?v=2",
    "category": "instant-mix",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Premium Upma Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 69,
    "slug": "premium-poha-masala",
    "name": "Premium Poha Masala",
    "shortDescription": "Premium satvik Premium Poha Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Premium Poha Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Cumin, Coriander, Turmeric, Curry Leaf Powder, Roasted Peanut Powder, Black Pepper, Dry Ginger, Fennel, Dry Mango Powder, Kashmiri Chilli, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/premium-poha-masala.png?v=2",
    "category": "instant-mix",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Premium Poha Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 70,
    "slug": "temple-pongal-masala",
    "name": "Temple Pongal Masala",
    "shortDescription": "Premium satvik Temple Pongal Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Temple Pongal Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Black Pepper, Cumin, Dry Ginger, Compound Hing, Coriander, Curry Leaf Powder, Green Cardamom, Cinnamon, Clove, Nutmeg, Mace",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/temple-pongal-masala.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Temple Pongal Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 71,
    "slug": "premium-idli-podi",
    "name": "Premium Idli Podi",
    "shortDescription": "Premium satvik Premium Idli Podi for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Premium Idli Podi. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Roasted Chana Dal, Roasted Urad Dal, Sesame Seeds, Kashmiri Chilli, Curry Leaf Powder, Cumin, Black Pepper, Compound Hing, Dry Ginger, Jaggery Powder",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/premium-idli-podi.png?v=2",
    "category": "podi",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Premium Idli Podi during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 72,
    "slug": "premium-dosa-podi",
    "name": "Premium Dosa Podi",
    "shortDescription": "Premium satvik Premium Dosa Podi for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Premium Dosa Podi. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Roasted Chana Dal, Roasted Urad Dal, Sesame Seeds, Kashmiri Chilli, Curry Leaf Powder, Black Pepper, Cumin, Compound Hing, Dry Ginger, Jaggery Powder",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/premium-dosa-podi.png?v=2",
    "category": "podi",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Premium Dosa Podi during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 73,
    "slug": "millet-khichdi-masala",
    "name": "Millet Khichdi Masala",
    "shortDescription": "Premium satvik Millet Khichdi Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Millet Khichdi Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Cumin, Coriander, Black Pepper, Dry Ginger, Fennel, Dry Mango, Turmeric, Compound Hing, Cinnamon, Bay Leaf, Cardamom, Clove, Nutmeg",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/millet-khichdi-masala.png?v=2",
    "category": "rice",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Millet Khichdi Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 74,
    "slug": "savory-oats-masala",
    "name": "Savory Oats Masala",
    "shortDescription": "Premium satvik Savory Oats Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Savory Oats Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Black Pepper, Turmeric, Dry Ginger, Fennel, Dry Mango, Curry Leaf Powder, Compound Hing, Cinnamon, Cardamom, Clove, Nutmeg, Mace, Kashmiri Chilli",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/savory-oats-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Savory Oats Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 75,
    "slug": "vegetable-dalia-masala",
    "name": "Vegetable Dalia Masala",
    "shortDescription": "Premium satvik Vegetable Dalia Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Vegetable Dalia Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Coriander, Cumin, Black Pepper, Turmeric, Dry Ginger, Fennel, Dry Mango, Curry Leaf Powder, Compound Hing, Cinnamon, Cardamom, Clove, Nutmeg, Mace",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/vegetable-dalia-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Vegetable Dalia Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 76,
    "slug": "breakfast-sprinkle",
    "name": "Breakfast Sprinkle",
    "shortDescription": "Premium satvik Breakfast Sprinkle for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Breakfast Sprinkle. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Roasted Cumin, Black Pepper, Sesame Seeds, Dry Mint, Dry Mango, Dry Lemon Peel, Fennel, Cinnamon, Cardamom, Nutmeg, Chilli Flakes, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/breakfast-sprinkle.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Breakfast Sprinkle during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 77,
    "slug": "instant-tadka-mix",
    "name": "Instant Tadka Mix",
    "shortDescription": "Premium satvik Instant Tadka Mix for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Instant Tadka Mix. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Roasted Chana Dal, Roasted Urad Dal, Cumin, Curry Leaf Powder, Mustard Powder, Dry Red Chilli Flakes, Sesame Seeds, Black Pepper, Compound Hing, Dry Ginger, Turmeric",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/instant-tadka-mix.png?v=2",
    "category": "instant-mix",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Instant Tadka Mix during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 78,
    "slug": "premium-chaat-masala",
    "name": "Premium Chaat Masala",
    "shortDescription": "Premium satvik Premium Chaat Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Premium Chaat Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Dry Mango Powder, Roasted Cumin, Black Pepper, Dry Ginger, Black Salt, Rock Salt, Dry Mint, Kashmiri Chilli, Green Cardamom, Compound Hing, Nutmeg",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/premium-chaat-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Premium Chaat Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 79,
    "slug": "premium-fruit-sprinkle",
    "name": "Premium Fruit Sprinkle",
    "shortDescription": "Premium satvik Premium Fruit Sprinkle for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Premium Fruit Sprinkle. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Dry Mango Powder, Roasted Cumin, Dry Mint, Black Pepper, Rock Salt, Dry Ginger, Green Cardamom, Lemon Peel Powder, Nutmeg, Cinnamon",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/premium-fruit-sprinkle.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Premium Fruit Sprinkle during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 80,
    "slug": "gourmet-popcorn-masala",
    "name": "Gourmet Popcorn Masala",
    "shortDescription": "Premium satvik Gourmet Popcorn Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Gourmet Popcorn Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Kashmiri Chilli • Rock Salt • Dry Tomato Powder • Dry Mango Powder • Cumin • Dry Mint • Black Pepper • Paprika • Coriander • Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/gourmet-popcorn-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Gourmet Popcorn Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 81,
    "slug": "roasted-makhana-masala",
    "name": "Roasted Makhana Masala",
    "shortDescription": "Premium satvik Roasted Makhana Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Roasted Makhana Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Black Pepper, Cumin, Dry Mango Powder, Dry Ginger, Kashmiri Chilli, Fennel, Dry Mint, Rock Salt, Cinnamon, Cardamom, Nutmeg, Compound Hing, Lemon Peel",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/roasted-makhana-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Roasted Makhana Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 82,
    "slug": "peanut-masala",
    "name": "Peanut Masala",
    "shortDescription": "Premium satvik Peanut Masala for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Peanut Masala. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Dry Mango Powder, Cumin, Black Pepper, Kashmiri Chilli, Rock Salt, Dry Ginger, Dry Mint, Fennel, Cinnamon, Lemon Peel, Cardamom, Nutmeg, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/peanut-masala.png?v=2",
    "category": "masala",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Peanut Masala during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 83,
    "slug": "sweet-corn-seasoning",
    "name": "Sweet Corn Seasoning",
    "shortDescription": "Premium satvik Sweet Corn Seasoning for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Sweet Corn Seasoning. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Dry Mango Powder, Black Pepper, Roasted Cumin, Rock Salt, Dry Mint, Lemon Peel Powder, Kashmiri Chilli, Paprika, Dry Ginger, Coriander, Fennel, Green Cardamom, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/sweet-corn-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Sweet Corn Seasoning during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 84,
    "slug": "sandwich-sprinkle",
    "name": "Sandwich Sprinkle",
    "shortDescription": "Premium satvik Sandwich Sprinkle for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Sandwich Sprinkle. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Black Pepper, Roasted Cumin, Dry Tomato Powder, Mixed Italian Herbs, Dry Mango Powder, Rock Salt, Dry Mint, Lemon Peel, Paprika, Dry Ginger, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/sandwich-sprinkle.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Sandwich Sprinkle during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 85,
    "slug": "gourmet-potato-seasoning",
    "name": "Gourmet Potato Seasoning",
    "shortDescription": "Premium satvik Gourmet Potato Seasoning for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Gourmet Potato Seasoning. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Smoked Paprika, Kashmiri Chilli, Black Pepper, Dry Tomato Powder, Cumin, Rock Salt, Dry Mango Powder, Mixed Herbs, Lemon Peel, Dry Ginger, Compound Hing, Coriander",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/gourmet-potato-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Gourmet Potato Seasoning during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 86,
    "slug": "sprouts-seasoning",
    "name": "Sprouts Seasoning",
    "shortDescription": "Premium satvik Sprouts Seasoning for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Sprouts Seasoning. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "Dry Mango Powder, Roasted Cumin, Black Pepper, Dry Mint, Rock Salt, Dry Ginger, Lemon Peel, Fennel, Kashmiri Chilli, Green Cardamom, Compound Hing",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/sprouts-seasoning.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Sprouts Seasoning during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  },
  {
    "id": 87,
    "slug": "everything-satvik-sprinkle",
    "name": "Everything Satvik Sprinkle",
    "shortDescription": "Premium satvik Everything Satvik Sprinkle for pure, aromatic, and delicious everyday meals.",
    "description": "Experience the authentic essence of Indian culinary tradition with our premium Everything Satvik Sprinkle. Specially crafted for satvik households, this blend is 100% No Onion and No Garlic (NONG). We source the finest, hand-selected ingredients and grind them in small batches to preserve their natural aroma, essential oils, and nutritional value. Free from artificial preservatives, MSG, and synthetic colors, it ensures a healthy, pure, and soul-satisfying meal for your family.",
    "ingredients": "White Sesame Seeds, Roasted Cumin, Black Pepper, Black Sesame Seeds, Dry Mint, Dry Mango Powder, Fennel, Lemon Peel, Kashmiri Chilli Flakes, Flax Seeds, Rock Salt, Pumpkin Seeds, Sunflower Seeds",
    "weight": "100g",
    "sellingPrice": 99,
    "mrp": 199,
    "stockQuantity": 100,
    "featured": false,
    "badge": null,
    "imageUrl": "/product-images/everything-satvik-sprinkle.png?v=2",
    "category": "seasoning",
    "benefits": [
      "100% No Onion No Garlic (NONG) — pure satvik blend",
      "Made with premium quality, hand-selected spices",
      "Small-batch ground to retain essential oils and aroma",
      "No artificial preservatives, additives, or synthetic colors",
      "Aids digestion and enhances the natural flavor of your dishes"
    ],
    "usageSuggestions": [
      "Add 1-2 tsp of Everything Satvik Sprinkle during the tempering (tadka) stage of cooking.",
      "Stir well and cook on medium flame to release the rich aromas.",
      "Store in an airtight container in a cool, dry place after opening."
    ],
    "faqs": [
      {
        "q": "Is this suitable for Jain cooking?",
        "a": "Yes, all Vrajaspice products are 100% onion-free and garlic-free, making them perfect for Jain and satvik diets."
      },
      {
        "q": "Does it contain preservatives?",
        "a": "No, our products are completely free from chemical preservatives, artificial colors, and MSG."
      }
    ],
    "isActive": true
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(currentSlug: string, count = 4): Product[] {
  return products.filter((p) => p.slug !== currentSlug).slice(0, count);
}

export function getDiscountPercent(selling: number, mrp: number): number {
  return Math.round(((mrp - selling) / mrp) * 100);
}

export function mapDbRowToProduct(row: any): Product {
  let img = row.image_url || '/placeholder.png';
  if (img.startsWith('/product-images/')) {
    img = `${img}?v=2`;
  }
  return {
    id: Number(row.id),
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description || '',
    description: row.description || '',
    ingredients: row.ingredients || '',
    weight: row.weight || '100g',
    sellingPrice: Number(row.selling_price),
    mrp: Number(row.mrp),
    stockQuantity: Number(row.stock_quantity),
    featured: !!row.featured,
    badge: row.badge,
    imageUrl: img,
    category: row.category || 'everyday',
    benefits: row.benefits || [],
    usageSuggestions: row.usage_suggestions || [],
    faqs: row.faqs || [],
    isActive: row.is_active !== undefined ? !!row.is_active : true,
  };
}
