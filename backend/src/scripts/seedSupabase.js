import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { mockProducts } from "../models/mockData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
	process.env.SUPABASE_KEY ||
	process.env.SUPABASE_SERVICE_ROLE_KEY ||
	process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
	console.error("Missing SUPABASE_URL or SUPABASE_KEY in environment.");
	process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSeed() {
	console.log(
		"--- Starting VibeLane Product Seeding into Supabase PostgreSQL ---",
	);

	// Clear existing products
	const { error: deleteError } = await supabase
		.from("products")
		.delete()
		.neq("id", 0);
	if (deleteError) {
		console.warn(
			`[Seed Warning] Could not clear existing rows: ${deleteError.message}`,
		);
	} else {
		console.log("Cleared existing products table.");
	}

	const rows = mockProducts.map((p) => ({
		item_number: p.itemNumber,
		name: p.name,
		slug: p.slug,
		category: p.category,
		price: p.price,
		badge: p.badge || "",
		primary_image: p.primaryImage,
		hover_image: p.hoverImage,
		description: p.description || "",
		in_stock: p.inStock ?? true,
		stock_quantity: p.stockQuantity ?? 20,
		sizes: p.sizes || ["S", "M", "L", "XL", "2XL"],
	}));

	console.log(`Inserting ${rows.length} curated products...`);
	const { data, error: insertError } = await supabase
		.from("products")
		.insert(rows)
		.select();

	if (insertError) {
		console.error(
			`[Seed Error] Failed to insert products: ${insertError.message}`,
		);
		process.exit(1);
	}

	console.log(
		`Successfully seeded ${data ? data.length : rows.length} products to Supabase PostgreSQL!`,
	);
	process.exit(0);
}

runSeed();
