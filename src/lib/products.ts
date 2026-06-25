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
    id: 1,
    slug: "kitchen-king-masala",
    name: "Kitchen King Masala",
    shortDescription: "The master blend for everyday Indian cooking",
    description:
      "Our Kitchen King Masala is the crown jewel of Indian cooking — a harmonious symphony of thirteen hand-selected spices that transforms every dish into a royal experience. Crafted in small batches to preserve freshness and aroma, this versatile blend is perfect for curries, dals, sabzis, and rice dishes. Free from onion, garlic, artificial colours and preservatives, it honours the purity of satvik cooking while delivering an unforgettable depth of flavour.",
    ingredients: "Coriander, Cumin, Black Pepper, Dry Ginger, Cloves, Cinnamon, Green Cardamom, Bay Leaf, Nutmeg, Mace, Turmeric, Kashmiri Chilli, Asafoetida (Hing)",
    weight: "100g",
    sellingPrice: 99,
    mrp: 199,
    stockQuantity: 100,
    featured: true,
    badge: "Best Seller",
    imageUrl: "/kitchen-king-masala.png",
    category: "everyday",
    benefits: [
      "100% No Onion No Garlic — pure satvik blend",
      "No artificial colours or preservatives",
      "Small-batch crafted for maximum freshness",
      "Versatile — works with curries, dals, and rice",
      "Rich in natural antioxidants from whole spices",
    ],
    usageSuggestions: [
      "Add 1 tsp while sautéing tomatoes for any curry",
      "Mix into curd for a flavourful marinade",
      "Sprinkle on roasted vegetables",
      "Stir into dal during tempering",
    ],
    faqs: [
      {
        q: "Is this suitable for Jain cooking?",
        a: "Yes! Our Kitchen King Masala contains no onion or garlic, making it fully suitable for Jain and satvik cooking.",
      },
      {
        q: "Does it contain any artificial colour?",
        a: "Absolutely not. The deep red colour comes naturally from Kashmiri Chilli and turmeric — nothing artificial.",
      },
      {
        q: "How long does it stay fresh?",
        a: "Best consumed within 12 months of manufacture. Store in a cool, dry place away from direct sunlight.",
      },
    ],
  },
  {
    id: 2,
    slug: "garam-masala",
    name: "Garam Masala",
    shortDescription: "A fragrant finishing blend for authentic Indian dishes",
    description:
      "Our Garam Masala is an aromatic treasure — a warming blend of nine premium whole spices, stone-ground in small batches to preserve their essential oils and fragrance. This finishing masala elevates any dish with its complex, layered warmth. From biryanis to curries, a pinch of our Garam Masala brings authentic Indian kitchen magic to your plate. Completely free from onion, garlic, and artificial additives.",
    ingredients: "Black Cardamom, Green Cardamom, Cloves, Cinnamon, Bay Leaf, Black Pepper, Nutmeg, Mace, Star Anise",
    weight: "100g",
    sellingPrice: 99,
    mrp: 199,
    stockQuantity: 100,
    featured: true,
    badge: "Premium Blend",
    imageUrl: "/garam-masala.png",
    category: "everyday",
    benefits: [
      "Nine premium whole spices, freshly ground",
      "No onion, garlic, or fillers",
      "Perfect finishing spice for any curry or rice",
      "Aids digestion naturally",
      "Stone-ground to preserve aroma",
    ],
    usageSuggestions: [
      "Add a pinch at the very end of cooking",
      "Sprinkle over biryani before serving",
      "Mix into paneer or tofu marinade",
      "Stir into hot milk for a warming drink",
    ],
    faqs: [
      {
        q: "Why does your Garam Masala smell stronger?",
        a: "Because we grind whole spices fresh in small batches, retaining the essential oils that most commercial brands lose during mass processing.",
      },
      {
        q: "Can I use this daily?",
        a: "Yes! A small pinch goes a long way. It's a finishing spice — add it at the end of cooking for maximum impact.",
      },
    ],
  },
  {
    id: 3,
    slug: "sambar-masala",
    name: "Sambar Masala",
    shortDescription: "Authentic South Indian sambar blend with tangy depth",
    description:
      "Transport your taste buds to a traditional South Indian kitchen with our authentic Sambar Masala. This time-honoured blend captures the essence of generations of sambar recipes — tangy, spicy, and deeply aromatic. Made with coriander, red chilli, toor dal, and sun-dried curry leaves, it creates a sambar with perfect balance. Completely NONG, no preservatives, and crafted in small batches for the freshest taste.",
    ingredients: "Coriander, Red Chilli, Toor Dal, Chana Dal, Cumin, Fenugreek, Curry Leaves, Black Pepper, Turmeric, Asafoetida (Hing)",
    weight: "100g",
    sellingPrice: 99,
    mrp: 199,
    stockQuantity: 100,
    featured: false,
    badge: "Satvik Friendly",
    imageUrl: "/sambar-masala.png",
    category: "south-indian",
    benefits: [
      "Authentic South Indian recipe",
      "NONG — No Onion No Garlic",
      "Contains natural digestive spices like fenugreek",
      "Rich in dietary fibre from dal ingredients",
      "No artificial flavours or preservatives",
    ],
    usageSuggestions: [
      "Add 2 tsp per serving of sambar",
      "Use in rasam for a richer flavour",
      "Mix into vegetable stir-fries for South Indian flair",
      "Combine with tamarind water for authentic taste",
    ],
    faqs: [
      {
        q: "Does this contain fenugreek?",
        a: "Yes, fenugreek (methi) is a key ingredient that gives sambar its distinctive slight bitterness and digestive benefits.",
      },
      {
        q: "Can I use this for other dishes?",
        a: "Absolutely! It works beautifully in kootu, vegetable curries, and even rice dishes.",
      },
    ],
  },
  {
    id: 4,
    slug: "chole-masala",
    name: "Chole Masala",
    shortDescription: "Bold, tangy blend for restaurant-style chole",
    description:
      "Recreate the bold, tangy flavours of North Indian chole right in your home kitchen. Our Chole Masala features a masterful combination of eleven spices including dried mango powder, pomegranate seed powder, and Kashmiri chilli that creates the characteristic deep, complex flavour of authentic chole. Rich, robust, and completely free from onion, garlic, and artificial additives — this is the blend that makes people ask for the recipe.",
    ingredients: "Coriander, Cumin, Dry Mango Powder (Amchur), Black Pepper, Pomegranate Seed Powder (Anardana), Cloves, Cinnamon, Green Cardamom, Black Salt, Turmeric, Kashmiri Chilli",
    weight: "100g",
    sellingPrice: 99,
    mrp: 199,
    stockQuantity: 100,
    featured: true,
    badge: "Best Seller",
    imageUrl: "/chole-masala.png",
    category: "north-indian",
    benefits: [
      "Restaurant-quality chole at home",
      "Natural sourness from amchur and anardana",
      "No onion, no garlic",
      "Rich in iron-boosting spices",
      "No artificial colour or preservatives",
    ],
    usageSuggestions: [
      "Add 2 tsp per can of cooked chickpeas",
      "Use in aloo tikki filling for chaat",
      "Mix into dal makhani for depth",
      "Sprinkle on roasted makhana",
    ],
    faqs: [
      {
        q: "Does this contain black salt?",
        a: "Yes, black salt (kala namak) adds a distinctive tangy-savoury note authentic to chole recipes.",
      },
      {
        q: "Is this spicy?",
        a: "It has a medium heat level. Adjust quantity to your preference.",
      },
    ],
  },
  {
    id: 5,
    slug: "ekadashi-sabzi-masala",
    name: "Ekadashi Sabzi Masala",
    shortDescription: "Pure satvik blend for Ekadashi and fasting days",
    description:
      "Specially crafted for Ekadashi and other fasting days, this pure masala uses only sendha namak (rock salt) and spices permitted during satvik fasting — making it the perfect companion for your spiritual practice. Our Ekadashi Sabzi Masala brings warmth and depth to your fasting meals without compromising the sanctity of your vrat. Crafted with devotion, free from table salt, onion, garlic, and any non-satvik ingredients.",
    ingredients: "Cumin, Black Pepper, Dry Ginger, Rock Salt (Sendha Namak), Cinnamon, Green Cardamom, Cloves, Nutmeg",
    weight: "100g",
    sellingPrice: 119,
    mrp: 249,
    stockQuantity: 100,
    featured: true,
    badge: "Launch Special",
    imageUrl: "/ekadashi-sabzi-masala.png",
    category: "satvik",
    benefits: [
      "Made exclusively with sendha namak — vrat friendly",
      "No table salt, no onion, no garlic",
      "Perfect for Ekadashi, Navratri, and fasting days",
      "Satvik and ISKCON compliant",
      "Aids digestion during fasting",
    ],
    usageSuggestions: [
      "Use in sabudana khichdi and kuttu atta dishes",
      "Add to samak rice preparations",
      "Mix into aloo or lauki sabzi during vrat",
      "Sprinkle on roasted makhana for fasting snacks",
    ],
    faqs: [
      {
        q: "Is this suitable for Navratri fasting?",
        a: "Yes, this masala uses only vrat-permissible ingredients including sendha namak. It is suitable for Navratri, Ekadashi, and other satvik fasting days.",
      },
      {
        q: "Why is this priced slightly higher?",
        a: "Rock salt (sendha namak) is a premium ingredient. We don't compromise on quality — this is a truly pure fasting blend.",
      },
    ],
  },
  {
    id: 6,
    slug: "pav-bhaji-masala",
    name: "Pav Bhaji Masala",
    shortDescription: "Mumbai street-style pav bhaji at home",
    description:
      "Capture the iconic flavours of Mumbai's beloved street food with our Pav Bhaji Masala. This vibrant twelve-spice blend brings the authentic tanginess of fennel and dried mango powder together with the warmth of Kashmiri chilli and aromatic spices. Whether you're making classic pav bhaji, mixed vegetable curry, or even loaded toast, this blend delivers the unmistakable street-food aroma every time. Completely NONG and free from artificial additives.",
    ingredients: "Coriander, Cumin, Fennel Seeds, Dry Mango Powder (Amchur), Kashmiri Chilli, Black Pepper, Cinnamon, Cloves, Black Cardamom, Turmeric, Dry Ginger, Asafoetida (Hing)",
    weight: "100g",
    sellingPrice: 99,
    mrp: 199,
    stockQuantity: 100,
    featured: false,
    badge: "No Onion No Garlic",
    imageUrl: "/pav-bhaji-masala.png",
    category: "street-food",
    benefits: [
      "Authentic Mumbai street-food flavour",
      "No onion, no garlic — satvik approved",
      "Natural tanginess from amchur",
      "Vibrant colour from real Kashmiri chilli",
      "No artificial flavour enhancers",
    ],
    usageSuggestions: [
      "Add 2 tsp per serving of mashed vegetables",
      "Use in mixed vegetable sabzi",
      "Mix into paneer bhurji",
      "Sprinkle on sliced bread before grilling",
    ],
    faqs: [
      {
        q: "Can I make pav bhaji without onion and garlic?",
        a: "Absolutely! Our masala is specially crafted to give you the full flavour experience without onion and garlic. Many of our customers are surprised at how authentic it tastes.",
      },
    ],
  },
  {
    id: 7,
    slug: "biryani-masala",
    name: "Biryani Masala",
    shortDescription: "Royal aromatic blend for fragrant biryanis",
    description:
      "Our Biryani Masala is a regal blend of thirteen whole spices that brings the grandeur of Mughal culinary traditions to your kitchen. Each spice is carefully selected and balanced to create layers of aromatic complexity — the warmth of black cardamom, the freshness of star anise, the sweetness of fennel — all coming together in perfect harmony. Use it for biryanis, pulao, or aromatic rice dishes. No onion, no garlic, no shortcuts.",
    ingredients: "Coriander, Cumin, Black Cardamom, Green Cardamom, Cinnamon, Cloves, Bay Leaf, Star Anise, Mace, Nutmeg, Black Pepper, Fennel Seeds, Dry Ginger",
    weight: "100g",
    sellingPrice: 99,
    mrp: 249,
    stockQuantity: 100,
    featured: false,
    badge: "Premium Blend",
    imageUrl: "/biryani-masala.png",
    category: "rice",
    benefits: [
      "Thirteen whole spices for royal biryani flavour",
      "No onion or garlic — pure satvik blend",
      "Fragrant enough for pulaos and rice dishes",
      "Stone-ground for maximum aroma",
      "No artificial fragrance or flavours",
    ],
    usageSuggestions: [
      "Layer 1-2 tsp into biryani while cooking rice",
      "Add to vegetable or paneer biryani",
      "Use in pulao and jeera rice",
      "Mix into curd for a raita with depth",
    ],
    faqs: [
      {
        q: "Can I use this for veg biryani?",
        a: "Yes! Our Biryani Masala is perfect for vegetable biryani, paneer biryani, and mushroom biryani. The NONG formulation is specifically designed for satvik cooking.",
      },
    ],
  },
  {
    id: 8,
    slug: "rasam-powder",
    name: "Rasam Powder",
    shortDescription: "Soul-warming South Indian rasam blend",
    description:
      "There is nothing quite as comforting as a bowl of hot rasam on a difficult day. Our Rasam Powder captures the soul of South Indian grandmothers' kitchens — a perfectly balanced blend of coriander, pepper, cumin, toor dal, and sun-dried curry leaves that creates a rasam with deep flavour, the right heat, and the characteristic peppery finish that clears your sinuses and warms your heart. Pure, authentic, and completely NONG.",
    ingredients: "Coriander, Red Chilli, Black Pepper, Cumin, Toor Dal, Curry Leaves, Turmeric, Asafoetida (Hing)",
    weight: "100g",
    sellingPrice: 99,
    mrp: 249,
    stockQuantity: 100,
    featured: false,
    badge: "Satvik Friendly",
    imageUrl: "/rasam-powder.png",
    category: "south-indian",
    benefits: [
      "Traditional South Indian recipe",
      "Peppery warmth that aids digestion",
      "No onion, no garlic, pure satvik",
      "Natural immunity-boosting spices",
      "No artificial thickeners or flavours",
    ],
    usageSuggestions: [
      "Add 1.5 tsp per litre of rasam",
      "Use in pepper water for immunity",
      "Mix into dal for a rasam-style finish",
      "Sprinkle in soup for South Indian flavour",
    ],
    faqs: [
      {
        q: "Is this the same as sambar powder?",
        a: "No. Rasam powder has a higher pepper and cumin content for a thinner, spicier, more peppery flavour profile, while sambar powder is richer and more complex.",
      },
    ],
  },
  {
    id: 9,
    slug: "khichdi-masala",
    name: "Khichdi Masala",
    shortDescription: "Warm, comforting blend for the ultimate khichdi",
    description:
      "Khichdi is the soul of Indian comfort food, and our Khichdi Masala is crafted to make it extraordinary. This gentle, warming blend of nine spices — featuring turmeric, cumin, dry ginger, and aromatic cardamom — adds depth and warmth to your khichdi without overpowering its comforting simplicity. Made for satvik households, ISKCON kitchens, and anyone seeking a pure, nourishing meal. No onion, no garlic, just pure goodness.",
    ingredients: "Cumin, Coriander, Black Pepper, Dry Ginger, Turmeric, Cinnamon, Cloves, Green Cardamom, Asafoetida (Hing)",
    weight: "100g",
    sellingPrice: 99,
    mrp: 249,
    stockQuantity: 100,
    featured: false,
    badge: "Satvik Friendly",
    imageUrl: "/khichdi-masala.png",
    category: "satvik",
    benefits: [
      "Gentle and warming — ideal for all ages",
      "ISKCON and satvik kitchen approved",
      "Anti-inflammatory turmeric and ginger",
      "No onion or garlic",
      "Perfect for convalescent and everyday meals",
    ],
    usageSuggestions: [
      "Add 1 tsp per serving of khichdi",
      "Use in dal-rice combinations",
      "Mix into vegetable upma",
      "Add to sabudana khichdi for depth",
    ],
    faqs: [
      {
        q: "Is this suitable for babies and children?",
        a: "While our masala uses natural spices, we recommend consulting your paediatrician for babies under 1 year. For children above 1 year, you can use a very small quantity.",
      },
    ],
  },
  {
    id: 10,
    slug: "farali-chaat-masala",
    name: "Farali Chaat Masala",
    shortDescription: "Tangy fasting chaat masala with sendha namak",
    description:
      "Why should fasting days be flavour-less? Our Farali Chaat Masala is crafted entirely with vrat-friendly ingredients — using sendha namak instead of table salt, and omitting all forbidden spices — while delivering a tantalizingly tangy, minty, peppery flavour that makes fasting food genuinely exciting. Sprinkle it on fruits, potatoes, makhana, or any satvik snack and experience the joy of flavour without compromise.",
    ingredients: "Rock Salt (Sendha Namak), Cumin, Black Pepper, Dry Ginger, Dry Mango Powder (Amchur), Mint Powder,  Nutmeg",
    weight: "100g",
    sellingPrice: 119,
    mrp: 249,
    stockQuantity: 100,
    featured: true,
    badge: "Launch Special",
    imageUrl: "/farali-chaat-masala.png",
    category: "satvik",
    benefits: [
      "100% vrat-friendly with sendha namak",
      "Tangy and minty — makes fasting food exciting",
      "No onion, garlic, or regular salt",
      "Refreshing mint powder for natural flavour",
      "Perfect for Navratri, Ekadashi, and daily use",
    ],
    usageSuggestions: [
      "Sprinkle on cut fruits for farali fruit chaat",
      "Toss with boiled potatoes and chutneys",
      "Mix on makhana for a tangy snack",
      "Add to shrikhand or dahi for a satvik dip",
    ],
    faqs: [
      {
        q: "Is this safe for all fasting days?",
        a: "Yes, this masala uses only sendha namak and vrat-permitted spices. It is designed for Navratri, Ekadashi, Janmashtami, and other fasting occasions.",
      },
      {
        q: "Can I use this every day?",
        a: "Absolutely! Many customers use it as a healthier everyday chaat masala since sendha namak is less processed than table salt.",
      },
    ],
  },
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
