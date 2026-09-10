import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Product } from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PRODUCTS_DIR = path.resolve(__dirname, '../../../frontend/public/images/products');

if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function fetchCandidateProducts() {
  const sources = [
    {
      url: 'https://bluorng.com/collections/back-printed-t-shirts/products.json?limit=12',
      defaultCategory: 'Heavyweight Tees',
      prefix: 'Heavyweight',
    },
    {
      url: 'https://bluorng.com/collections/black-hoodies/products.json?limit=8',
      defaultCategory: 'Hoodies & Fleece',
      prefix: 'Drop-Shoulder',
    },
    {
      url: 'https://bluorng.com/collections/bottoms/products.json?limit=8',
      defaultCategory: 'Tech Bottoms',
      prefix: 'Relaxed',
    },
    {
      url: 'https://www.colebuxton.com/products.json?limit=10',
      defaultCategory: 'Streetwear Essentials',
      prefix: 'Luxury',
    },
    {
      url: 'https://representclo.com/products.json?limit=10',
      defaultCategory: 'Footwear & Outerwear',
      prefix: 'Editorial',
    },
  ];

  const candidateList = [];

  for (const source of sources) {
    try {
      const res = await fetch(source.url);
      if (!res.ok) continue;
      const data = await res.json();
      if (!data.products) continue;

      for (const p of data.products) {
        if (p.images && p.images.length >= 2) {
          candidateList.push({
            title: p.title,
            type: p.product_type || source.defaultCategory,
            img1: p.images[0].src,
            img2: p.images[1].src,
            body: p.body_html || '',
          });
        }
      }
    } catch (err) {
      console.warn(`Could not fetch from ${source.url}:`, err.message);
    }
  }

  return candidateList;
}

function cleanDescription(title, category) {
  const descriptions = [
    `Crafted from 450GSM ultra-dense organic French terry cotton with exaggerated drop-shoulder drape and silicone badge detailing.`,
    `Engineered boxy silhouette with reinforced ribbing, raw edge hems, and archival typography screenprint.`,
    `Heavyweight 320GSM combed jersey with garment dyed pigment wash and minimalist micro-branding.`,
    `Technical water-resistant ripstop construction tailored with articulated knee darting and modular storage compartments.`,
    `Premium deconstructed silhouette crafted with full-grain calfskin and sculpted lightweight foam outsoles.`,
    `Double-layered heavyweight fleece featuring seamless kangaroo pouch and ergonomic thumbhole cuffs.`,
    `Tailored wide-leg drape cut from custom dense twill, finished with internal cinch cords and matte black hardware.`
  ];
  const idx = Math.abs(title.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % descriptions.length;
  return `${title}. ${descriptions[idx]}`;
}

function determineCategory(title, type) {
  const lower = (title + ' ' + type).toLowerCase();
  if (lower.includes('shoe') || lower.includes('boot') || lower.includes('sneaker')) return 'Footwear';
  if (lower.includes('pant') || lower.includes('denim') || lower.includes('trouser') || lower.includes('short')) return 'Tech Bottoms';
  if (lower.includes('hoodie') || lower.includes('sweatshirt') || lower.includes('fleece')) return 'Hoodies & Fleece';
  if (lower.includes('jacket') || lower.includes('trucker') || lower.includes('anorak') || lower.includes('vest')) return 'Outerwear';
  return 'Heavyweight Tees';
}

function determineBadge(idx) {
  const badges = ['Signature', 'New Drop', 'Trending', 'Limited Edition', 'Archival', 'Back in Stock'];
  return badges[idx % badges.length];
}

function determinePrice(category, idx) {
  const basePrices = {
    'Heavyweight Tees': [68.0, 75.0, 85.0, 92.0, 95.0],
    'Hoodies & Fleece': [140.0, 160.0, 175.0, 185.0],
    'Outerwear': [195.0, 220.0, 245.0, 260.0],
    'Tech Bottoms': [120.0, 135.0, 150.0, 165.0],
    'Footwear': [180.0, 210.0, 230.0, 250.0],
  };
  const list = basePrices[category] || [85.0, 110.0, 130.0];
  return list[idx % list.length];
}

async function runSeed() {
  console.log('--- Starting VibeLane Product Generation & Seeding ---');

  const products = [];

  // Product 01: Antigravity AI-Generated Pair (Essentials Minimalist Oversized Tee on Red Backdrop)
  products.push({
    itemNumber: '01',
    name: 'Essentials Minimalist Oversized Tee',
    slug: 'essentials-minimalist-oversized-tee',
    category: 'Heavyweight Tees',
    price: 85.0,
    badge: 'Signature',
    primaryImage: '/images/products/prod_01_primary.jpg',
    hoverImage: '/images/products/prod_01_hover.jpg',
    description: 'Minimalist studio-shot oversized streetwear tee in deep black 380GSM cotton jersey. Features crisp micro-typography across the upper back with a clean drop-shoulder drape.',
    inStock: true,
    stockQuantity: 35,
  });

  // Product 02: User Reference Photo Pair (; time™ (off) Boxy Tee on Red Backdrop)
  products.push({
    itemNumber: '02',
    name: '; time™ (off) Boxy Heavyweight Tee',
    slug: 'time-off-boxy-heavyweight-tee',
    category: 'Heavyweight Tees',
    price: 95.0,
    badge: 'Trending',
    primaryImage: '/images/products/prod_02_primary.jpg',
    hoverImage: '/images/products/prod_02_hover.jpg',
    description: 'Iconic minimal typographic graphic tee featuring the signature "; time™ (off)" collar print. Cut with relaxed boxy proportions, drop sleeves, and dense cotton knit.',
    inStock: true,
    stockQuantity: 28,
  });

  // Fetch candidates for products 03 to 32
  console.log('Fetching candidate streetwear lookbook items with front & back perspectives...');
  const candidates = await fetchCandidateProducts();
  console.log(`Found ${candidates.length} candidate items with multiple perspectives.`);

  // Filter unique candidates
  const seenTitles = new Set();
  const uniqueCandidates = [];
  for (const c of candidates) {
    const key = c.title.toLowerCase().trim();
    if (!seenTitles.has(key)) {
      seenTitles.add(key);
      uniqueCandidates.push(c);
    }
  }

  const targetCount = 32; // Generates 32 products total (exceeds user requirement of at least 30)
  let itemNum = 3;

  for (const cand of uniqueCandidates) {
    if (products.length >= targetCount) break;

    const numStr = itemNum < 10 ? `0${itemNum}` : `${itemNum}`;
    const primaryFile = `prod_${numStr}_primary.jpg`;
    const hoverFile = `prod_${numStr}_hover.jpg`;

    const primaryPath = path.join(PRODUCTS_DIR, primaryFile);
    const hoverPath = path.join(PRODUCTS_DIR, hoverFile);

    console.log(`[${numStr}/${targetCount}] Downloading images for: ${cand.title}...`);
    const ok1 = await downloadImage(cand.img1, primaryPath);
    const ok2 = await downloadImage(cand.img2, hoverPath);

    if (!ok1 || !ok2) {
      console.warn(`Skipping ${cand.title} due to download failure.`);
      continue;
    }

    const category = determineCategory(cand.title, cand.type);
    const price = determinePrice(category, itemNum);
    const badge = determineBadge(itemNum);
    const slug = cand.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    products.push({
      itemNumber: numStr,
      name: cand.title,
      slug: `${slug}-${numStr}`,
      category,
      price,
      badge,
      primaryImage: `/images/products/${primaryFile}`,
      hoverImage: `/images/products/${hoverFile}`,
      description: cleanDescription(cand.title, category),
      inStock: true,
      stockQuantity: Math.floor(Math.random() * 30) + 15,
    });

    itemNum++;
  }

  console.log(`\nSuccessfully prepared ${products.length} products with dual perspectives!`);

  // Write to mockData.js for seamless offline/fallback support
  const mockCategories = ['All', ...new Set(products.map((p) => p.category))];
  const mockDataContent = `export const mockProducts = ${JSON.stringify(products, null, 2)};\n\nexport const mockCategories = ${JSON.stringify(mockCategories, null, 2)};\n`;

  const mockDataPath = path.resolve(__dirname, '../models/mockData.js');
  fs.writeFileSync(mockDataPath, mockDataContent, 'utf-8');
  console.log(`Updated mockData.js with ${products.length} products.`);

  // Seed into MongoDB Atlas
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('No MONGO_URI found in environment. Database seeding skipped.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(mongoUri);
  console.log('MongoDB Connected Successfully.');

  console.log('Removing old mock products from database...');
  await Product.deleteMany({});

  console.log(`Inserting ${products.length} new products into database...`);
  const inserted = await Product.insertMany(products);
  console.log(`Database seeding completed! Total products inserted: ${inserted.length}`);

  const finalCount = await Product.countDocuments();
  console.log(`Verification: Product.countDocuments() = ${finalCount}`);

  await mongoose.disconnect();
  console.log('MongoDB Disconnected. Done!');
}

runSeed().catch((err) => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
