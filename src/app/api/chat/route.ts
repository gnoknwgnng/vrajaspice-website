import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { products as staticProducts, Product } from "@/lib/products";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function mapDbRowToProduct(row: any): Product {
  return {
    id: Number(row.id),
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description || "",
    description: row.description || "",
    ingredients: row.ingredients || "",
    weight: row.weight || "100g",
    sellingPrice: Number(row.selling_price),
    mrp: Number(row.mrp),
    stockQuantity: Number(row.stock_quantity),
    featured: !!row.featured,
    badge: row.badge,
    imageUrl: row.image_url || "/placeholder.png",
    category: row.category || "everyday",
    benefits: row.benefits || [],
    usageSuggestions: row.usage_suggestions || [],
    faqs: row.faqs || [],
    isActive: row.is_active !== undefined ? !!row.is_active : true,
  };
}

async function fetchLiveProducts(): Promise<Product[]> {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("id", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticProducts.filter((p) => p.isActive !== false);
    }
    return data.map(mapDbRowToProduct);
  } catch {
    return staticProducts.filter((p) => p.isActive !== false);
  }
}

function buildProductCatalog(productList: Product[]): string {
  return productList
    .map((p) => {
      return [
        `Product: ${p.name}`,
        `  slug: "${p.slug}"`,
        `  Category: ${p.category}`,
        `  Price: ₹${p.sellingPrice} (MRP ₹${p.mrp})`,
        `  Weight: ${p.weight}`,
        `  Description: ${p.shortDescription}`,
        `  Ingredients: ${p.ingredients}`,
        p.usageSuggestions?.length
          ? `  Best for: ${p.usageSuggestions.slice(0, 3).join("; ")}`
          : "",
        p.badge ? `  Badge: ${p.badge}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");
}

function buildSystemPrompt(catalog: string): string {
  return `You are "Vraja", a warm spice assistant for Vrajaspice — a premium Indian spice brand. All products are NONG (No Onion No Garlic), made for satvik, Jain, ISKCON, and Vaishnav cooking.

CRITICAL OUTPUT RULE:
You MUST respond with valid JSON only — no markdown, no extra text outside the JSON.
Format:
{
  "message": "your friendly reply text (under 120 words, use \\n for line breaks)",
  "recommendedSlugs": ["slug1", "slug2"]
}

- "message": Your helpful reply. Keep it short and warm.
- "recommendedSlugs": Array of product slugs from the catalog that best match the user's request. Max 3. Empty array [] if no products are relevant.

RULES:
- ONLY use slugs from the catalog below — never invent slugs
- Match the user's EXACT cooking need to the catalog. If they say "noodles", find a noodle product.
- All products are NONG — highlight this
- Be friendly and concise

VRAJASPICE PRODUCT CATALOG (${catalog.split('slug:').length - 1} products):
${catalog}

Always pick the most relevant product slugs before suggesting alternatives.`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const liveProducts = await fetchLiveProducts();
    const catalog = buildProductCatalog(liveProducts);
    const systemPrompt = buildSystemPrompt(catalog);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.4,
        response_format: { type: "json_object" },
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      return NextResponse.json(
        { error: "AI service unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content ?? "{}";

    let parsed: { message?: string; recommendedSlugs?: string[] } = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      // Fallback if LLM didn't return valid JSON
      parsed = { message: rawContent, recommendedSlugs: [] };
    }

    const reply = parsed.message ?? "Sorry, I couldn't understand that. Could you rephrase?";
    const slugs: string[] = Array.isArray(parsed.recommendedSlugs) ? parsed.recommendedSlugs : [];

    // Attach full product details for each recommended slug
    const recommendedProducts = slugs
      .map((slug) => liveProducts.find((p) => p.slug === slug))
      .filter(Boolean) as Product[];

    // Return only the fields the frontend needs (keep payload small)
    const productsForUI = recommendedProducts.map((p) => ({
      slug: p.slug,
      name: p.name,
      shortDescription: p.shortDescription,
      imageUrl: p.imageUrl,
      sellingPrice: p.sellingPrice,
      mrp: p.mrp,
      weight: p.weight,
      badge: p.badge,
    }));

    return NextResponse.json({ reply, products: productsForUI });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
