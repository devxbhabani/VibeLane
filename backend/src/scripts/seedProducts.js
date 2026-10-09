import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "../models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

async function runSeed() {
	console.log("--- Starting VibeLane Manual Product Seeding ---");

	const mongoUri = process.env.MONGO_URI;
	if (!mongoUri) {
		console.error(
			"No MONGO_URI found in environment. Database seeding skipped.",
		);
		process.exit(1);
	}

	console.log("Connecting to MongoDB Atlas...");
	await mongoose.connect(mongoUri);
	console.log("MongoDB Connected Successfully.");

	console.log("Cleaning all products from the database...");
	await Product.deleteMany({});
	console.log("All existing products removed.");

	// Manually curated products using the images from the images/products folder
	// You can freely rearrange these, change sizes, or modify properties to design them manually.
	const products = [
		{
			itemNumber: "01",
			name: "Outfit 01 Off By Design",
			slug: "outfit-01-off-by-design",
			category: "Editorial",
			price: 150.0,
			badge: "Exclusive",
			primaryImage: "/images/products/outfit_01_off-by-design_primary.jpg",
			hoverImage: "/images/products/outfit_01_off-by-design_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 10,
		}, //
		{
			itemNumber: "02",
			name: "Outfit 02 Kerned Confidence",
			slug: "outfit-02-kerned-confidence",
			category: "Apparel",
			price: 120.0,
			badge: "",
			primaryImage:
				"/images/products/outfit_02_kerned-confidence-1_primary.jpg",
			hoverImage: "/images/products/outfit_02_kerned-confidence-1_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 15,
		},
		{
			itemNumber: "03",
			name: "Outfit 03 Specimen",
			slug: "outfit-03-specimen",
			category: "Apparel",
			price: 180.0,
			badge: "Limited",
			primaryImage:
				"/images/products/outfit_03_specimen-no-hh01_primary.jpg",
			hoverImage: "/images/products/outfit_03_specimen-no-hh01_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 8,
		},
		{
			itemNumber: "04",
			name: "Outfit 04 Grid System Go",
			slug: "outfit-04-grid-system",
			category: "Editorial",
			price: 135.0,
			badge: "",
			primaryImage: "/images/products/outfit_04_grid-system-go_primary.jpg",
			hoverImage: "/images/products/outfit_04_grid-system-go_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 20,
		},
		{
			itemNumber: "05",
			name: "Outfit 05 Neutral Grotesk",
			slug: "outfit-05-neutral",
			category: "Apparel",
			price: 145.0,
			badge: "",
			primaryImage: "/images/products/outfit_05_neutral-grotesk_primary.jpg",
			hoverImage: "/images/products/outfit_05_neutral-grotesk_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 12,
		},
		{
			itemNumber: "06",
			name: "Outfit 06 Red Dot",
			slug: "outfit-06-red-dot",
			category: "Accessories",
			price: 95.0,
			badge: "Archival",
			primaryImage:
				"/images/products/outfit_06_red-dot-not-award-1_primary.jpg",
			hoverImage: "/images/products/outfit_06_red-dot-not-award-1_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 30,
		},
		{
			itemNumber: "07",
			name: "Outfit 07 Gridlocked",
			slug: "outfit-07-gridlocked",
			category: "Apparel",
			price: 160.0,
			badge: "",
			primaryImage: "/images/products/outfit_07_gridlocked_primary.jpg",
			hoverImage: "/images/products/outfit_07_gridlocked_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 25,
		},
		{
			itemNumber: "08",
			name: "Outfit 08 Hello Week",
			slug: "outfit-08-hello",
			category: "Apparel",
			price: 110.0,
			badge: "",
			primaryImage: "/images/products/outfit_08_hello-week-001_primary.jpg",
			hoverImage: "/images/products/outfit_08_hello-week-001_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 18,
		},
		{
			itemNumber: "09",
			name: "Outfit 09 Hello Week 002",
			slug: "outfit-09-hello-week",
			category: "Apparel",
			price: 115.0,
			badge: "New",
			primaryImage: "/images/products/outfit_09_hello-week-002_primary.jpg",
			hoverImage: "/images/products/outfit_09_hello-week-002_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 20,
		},
		{
			itemNumber: "10",
			name: "Outfit 10 Monochrome Manifest",
			slug: "outfit-10-monochrome",
			category: "Editorial",
			price: 140.0,
			badge: "",
			primaryImage:
				"/images/products/outfit_10_monochrome-manifest-1_primary.jpg",
			hoverImage:
				"/images/products/outfit_10_monochrome-manifest-1_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 15,
		},
		{
			itemNumber: "11",
			name: "Outfit 11 Positive Space",
			slug: "outfit-11-positive-space",
			category: "Apparel",
			price: 130.0,
			badge: "",
			primaryImage: "/images/products/outfit_11_positive-space_primary.jpg",
			hoverImage: "/images/products/outfit_11_positive-space_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 12,
		},
		{
			itemNumber: "12",
			name: "Outfit 12 Whitespace Matters",
			slug: "outfit-12-whitespace",
			category: "Editorial",
			price: 160.0,
			badge: "Archival",
			primaryImage:
				"/images/products/outfit_12_whitespace-matters-1_primary.jpg",
			hoverImage:
				"/images/products/outfit_12_whitespace-matters-1_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 8,
		},
		{
			itemNumber: "13",
			name: "Outfit 13 Command K",
			slug: "outfit-13-command-k",
			category: "Accessories",
			price: 85.0,
			badge: "",
			primaryImage: "/images/products/outfit_13_command-k_primary.jpg",
			hoverImage: "/images/products/outfit_13_command-k_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 25,
		},
		{
			itemNumber: "31",
			name: "Prod 31 Editorial",
			slug: "prod-31-editorial",
			category: "Editorial",
			price: 175.0,
			badge: "Exclusive",
			primaryImage: "/images/products/prod_31_primary.jpg",
			hoverImage: "/images/products/prod_31_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 5,
		},
		{
			itemNumber: "32",
			name: "Prod 32 Concept",
			slug: "prod-32-concept",
			category: "Editorial",
			price: 190.0,
			badge: "",
			primaryImage: "/images/products/prod_32_primary.jpg",
			hoverImage: "/images/products/prod_32_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 7,
		},
		{
			itemNumber: "11_prod",
			name: "Prod 11 Signature",
			slug: "prod-11-signature",
			category: "Apparel",
			price: 125.0,
			badge: "Signature",
			primaryImage: "/images/products/prod_11_primary.jpg",
			hoverImage: "/images/products/prod_11_hover.jpg",
			description: "Manually curated design piece.",
			inStock: true,
			stockQuantity: 14,
		},
	];

	console.log(
		`Inserting ${products.length} manually curated products into database...`,
	);
	const inserted = await Product.insertMany(products);
	console.log(
		`Database seeding completed! Total products inserted: ${inserted.length}`,
	);

	// Write to mockData.js for offline fallback
	const mockCategories = ["All", ...new Set(products.map((p) => p.category))];
	const mockDataContent = `export const mockProducts = ${JSON.stringify(products, null, 2)};\n\nexport const mockCategories = ${JSON.stringify(mockCategories, null, 2)};\n`;

	const mockDataPath = path.resolve(__dirname, "../models/mockData.js");
	fs.writeFileSync(mockDataPath, mockDataContent, "utf-8");
	console.log("Updated mockData.js with manual products.");

	await mongoose.disconnect();
	console.log("MongoDB Disconnected. Done!");
}

runSeed().catch((err) => {
	console.error("Fatal seed error:", err);
	process.exit(1);
});
