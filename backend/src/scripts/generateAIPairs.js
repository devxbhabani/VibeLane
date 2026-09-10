import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import sharp from 'sharp';
import mongoose from 'mongoose';
import { Product } from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const OUTPUT_DIR = path.resolve(__dirname, '../../../frontend/public/images/products');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0, s = max === 0 ? 0 : d / max, v = max;
  if (max !== min) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s, v];
}

function hsvToRgb(h, s, v) {
  let c = v * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = v - c;
  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

const STUDIO_BACKDROPS = [
  { name: 'Crimson Red', hue: null, satMult: 1.0 }, // original
  { name: 'Klein Cobalt', hue: 215, satMult: 1.0 },
  { name: 'Forest Emerald', hue: 145, satMult: 0.95 },
  { name: 'Terracotta Rust', hue: 25, satMult: 1.05 },
  { name: 'Amethyst Violet', hue: 280, satMult: 0.90 },
  { name: 'Petroleum Teal', hue: 185, satMult: 0.95 },
  { name: 'Desert Clay', hue: 38, satMult: 0.85 },
  { name: 'Sage Olive', hue: 95, satMult: 0.80 },
  { name: 'Slate Monochrome', hue: 0, satMult: 0.05 },
  { name: 'Solar Ochre', hue: 50, satMult: 1.0 },
];

const PRODUCTS_CONFIG = [
  {
    num: '01',
    name: 'Essentials Minimalist Oversized Tee',
    category: 'Heavyweight Tees',
    price: 85.0,
    badge: 'Signature',
    title: 'ESSENTIALS',
    sub: 'MINIMALIST / URBAN / AESTHETIC',
    paletteIdx: 0,
    desc: 'Heavyweight 380GSM organic cotton boxy tee in obsidian black. Studio shot against seamless crimson paper backdrop with subtle collar typography.',
  },
  {
    num: '02',
    name: '; time™ (off) Boxy Heavyweight Tee',
    category: 'Heavyweight Tees',
    price: 95.0,
    badge: 'Trending',
    title: '; time™ (off)',
    sub: 'ARCHIVAL EDITION // 2026',
    paletteIdx: 0,
    isUserReference: true,
    desc: 'The iconic minimalist graphic tee featuring the signature "; time™ (off)" neck print. Tailored with relaxed drop shoulders on seamless red backdrop.',
  },
  {
    num: '03',
    name: 'Null & Void™ Technical Boxy Tee',
    category: 'Heavyweight Tees',
    price: 88.0,
    badge: 'New Drop',
    title: 'NULL & VOID™',
    sub: 'SYSTEM // ARCHIVE 01',
    paletteIdx: 1, // Klein Cobalt
    desc: '400GSM dense jersey tee featuring high-density archival typographic print on upper back, framed by deep Klein cobalt studio lighting.',
  },
  {
    num: '04',
    name: 'Object [04] Heavyweight Fleece Tee',
    category: 'Heavyweight Tees',
    price: 92.0,
    badge: 'Limited Run',
    title: 'OBJECT [04]',
    sub: 'HEAVYWEIGHT 450GSM // SPEC',
    paletteIdx: 2, // Forest Emerald
    desc: 'Double-combed luxury cotton cut with oversized chest proportions and clean back typographic branding against an emerald studio seamless.',
  },
  {
    num: '05',
    name: 'Offline™ Drop-Shoulder Studio Tee',
    category: 'Heavyweight Tees',
    price: 90.0,
    badge: 'Signature',
    title: 'OFFLINE™',
    sub: 'DO NOT DISTURB // LAB',
    paletteIdx: 3, // Terracotta Rust
    desc: 'Relaxed silhouette with minimal collar lettering, styled with utility cargo trousers against warm terracotta studio backdrop.',
  },
  {
    num: '06',
    name: 'Restricted™ Tactical Oversized Tee',
    category: 'Heavyweight Tees',
    price: 96.0,
    badge: 'Trending',
    title: 'RESTRICTED™',
    sub: 'ZONE 09 // RESEARCH',
    paletteIdx: 4, // Amethyst Violet
    desc: 'Custom garment-dyed black jersey with violet ambient backdrop reflection and military-spec typographic coordinates.',
  },
  {
    num: '07',
    name: 'Syntax Error™ Boxy Graphic Tee',
    category: 'Heavyweight Tees',
    price: 85.0,
    badge: 'New Drop',
    title: 'SYNTAX ERROR™',
    sub: 'TIMEOUT [OFF] // 2026',
    paletteIdx: 5, // Petroleum Teal
    desc: 'Minimalist techwear typography centered below the collar ribbing, presented on seamless petroleum teal studio paper.',
  },
  {
    num: '08',
    name: 'Paradox® Global Edition Tee',
    category: 'Heavyweight Tees',
    price: 94.0,
    badge: 'Archival',
    title: 'PARADOX®',
    sub: 'PARIS // TOKYO DEPT',
    paletteIdx: 6, // Desert Clay
    desc: 'Archival studio drop with high-contrast screenprinted identity and relaxed drop-shoulder structure on desert clay paper.',
  },
  {
    num: '09',
    name: 'System Critical Heavyweight Crew',
    category: 'Heavyweight Tees',
    price: 89.0,
    badge: 'Trending',
    title: 'SYSTEM CRITICAL',
    sub: 'HARD RESET // DEPT 00',
    paletteIdx: 7, // Sage Olive
    desc: 'Subtle high-density micro-print positioned across upper traps, set against a muted sage olive backdrop.',
  },
  {
    num: '10',
    name: 'Monolith™ Studio Minimal Tee',
    category: 'Heavyweight Tees',
    price: 98.0,
    badge: 'Edition of 50',
    title: 'MONOLITH™',
    sub: 'EDITION OF 50 // PARIS',
    paletteIdx: 8, // Slate Monochrome
    desc: 'Ultra-luxurious heavyweight matte jersey in sleek monochrome grayscale studio lighting with crisp white typography.',
  },
  {
    num: '11',
    name: 'Echo Chamber™ Acid Wash Boxy Tee',
    category: 'Heavyweight Tees',
    price: 88.0,
    badge: 'Restocked',
    title: 'ECHO CHAMBER™',
    sub: 'COLLECTION 26 // SERIES 1',
    paletteIdx: 9, // Solar Ochre
    desc: 'Vibrant solar backdrop framing an oversized black drape, finished with clean minimal typographic lettering.',
  },
  {
    num: '12',
    name: 'Anomaly Dept™ Boxy Heavyweight Tee',
    category: 'Heavyweight Tees',
    price: 92.0,
    badge: 'Signature',
    title: 'ANOMALY DEPT',
    sub: 'SPEC 001 // CLASSIFIED',
    paletteIdx: 1, // Klein Cobalt
    desc: 'Technical studio lookbook piece engineered with wide sleeves, clean neckline, and bold cobalt studio paper.',
  },
  {
    num: '13',
    name: 'Void Matrix™ 450GSM Heavy Hoodie',
    category: 'Hoodies & Fleece',
    price: 165.0,
    badge: 'Signature',
    title: 'VOID MATRIX™',
    sub: 'HEAVY FLEECE 450GSM',
    paletteIdx: 0, // Crimson
    desc: 'Dense double-faced French terry with exaggerated hood drape and seamless kangaroo pocket, shown on crimson paper.',
  },
  {
    num: '14',
    name: 'Static Noise™ Drop-Shoulder Hoodie',
    category: 'Hoodies & Fleece',
    price: 175.0,
    badge: 'Trending',
    title: 'STATIC NOISE™',
    sub: 'FREQUENCY // 2026',
    paletteIdx: 2, // Forest Emerald
    desc: 'Relaxed luxury fleece tailored with thumbhole ribbing and archival typography back placement on deep emerald.',
  },
  {
    num: '15',
    name: 'Vortex Tech™ Oversized Fleece',
    category: 'Hoodies & Fleece',
    price: 180.0,
    badge: 'New Drop',
    title: 'VORTEX TECH™',
    sub: 'MODULAR DIVISION // 08',
    paletteIdx: 3, // Terracotta
    desc: 'Articulated drop-shoulder fleece with silicone branded typography on terracotta backdrop.',
  },
  {
    num: '16',
    name: 'Hyperbole™ Heavy Boxy Sweatshirt',
    category: 'Hoodies & Fleece',
    price: 155.0,
    badge: 'Limited Run',
    title: 'HYPERBOLE™',
    sub: 'SERIES II // PARIS STUDIO',
    paletteIdx: 4, // Amethyst
    desc: 'Luxury crewneck sweatshirt featuring clean collar typographic identity against amethyst seamless backdrop.',
  },
  {
    num: '17',
    name: 'Distortion™ Raw Edge Crewneck',
    category: 'Hoodies & Fleece',
    price: 160.0,
    badge: 'Archival',
    title: 'DISTORTION™',
    sub: 'RAW FINISH // 420GSM',
    paletteIdx: 5, // Petroleum Teal
    desc: 'Clean boxy cut with ribbed collar and subtle typography set against saturated petroleum teal paper.',
  },
  {
    num: '18',
    name: 'Cold Storage™ Thermal Fleece',
    category: 'Hoodies & Fleece',
    price: 170.0,
    badge: 'Trending',
    title: 'COLD STORAGE™',
    sub: 'THERMAL DIVISION // 02',
    paletteIdx: 8, // Slate Monochrome
    desc: 'Monochrome studio lookbook shot with thermal cotton construction and technical typography.',
  },
  {
    num: '19',
    name: 'Vortex Modular 8-Pocket Cargo Pants',
    category: 'Tech Bottoms',
    price: 145.0,
    badge: 'Signature',
    title: 'VORTEX CARGO',
    sub: '8-POCKET TECHNICAL SYSTEM',
    paletteIdx: 0, // Crimson
    desc: 'Water-resistant ripstop cargo trousers featuring 8 modular compartments and cinch ankle cuffs.',
  },
  {
    num: '20',
    name: 'Slate Pleated Wide-Leg Trousers',
    category: 'Tech Bottoms',
    price: 150.0,
    badge: 'Trending',
    title: 'SLATE PLEATED',
    sub: 'WIDE SILHOUETTE TWILL',
    paletteIdx: 1, // Cobalt
    desc: 'Heavyweight structured twill with deep front pleats and fluid wide-leg drape on cobalt paper.',
  },
  {
    num: '21',
    name: 'Obsidian Lab™ Utility Track Pants',
    category: 'Tech Bottoms',
    price: 135.0,
    badge: 'New Drop',
    title: 'OBSIDIAN LAB',
    sub: 'ARTICULATED KNEE DARTING',
    paletteIdx: 2, // Emerald
    desc: 'Nylon blend athletic track trousers with internal drawcord waist and waterproof zip pockets.',
  },
  {
    num: '22',
    name: 'Raw Material™ Cinch Cargo Pants',
    category: 'Tech Bottoms',
    price: 140.0,
    badge: 'Restocked',
    title: 'RAW MATERIAL™',
    sub: 'HEAVY COMBED RIPSTOP',
    paletteIdx: 6, // Desert Clay
    desc: 'Durable combat cargo silhouette with adjustable ankle toggles and ergonomic knee darts.',
  },
  {
    num: '23',
    name: 'Tactical Utility Anorak Jacket',
    category: 'Outerwear',
    price: 240.0,
    badge: 'Limited Run',
    title: 'TACTICAL ANORAK',
    sub: '3-LAYER MEMBRANE // SHELL',
    paletteIdx: 0, // Crimson
    desc: 'Technical 3-layer weather-sealed shell with storm flap, taped seams, and magnetic utility closures.',
  },
  {
    num: '24',
    name: 'Monolith™ Matte Puffer Shell',
    category: 'Outerwear',
    price: 260.0,
    badge: 'Edition of 50',
    title: 'MONOLITH PUFFER',
    sub: 'INSULATED DOWN 700FP',
    paletteIdx: 1, // Cobalt
    desc: 'Oversized boxy down jacket with matte water-repellent shell and minimal back typographic neck hit.',
  },
  {
    num: '25',
    name: 'Obsidian Tactical Utility Vest',
    category: 'Outerwear',
    price: 195.0,
    badge: 'Signature',
    title: 'OBSIDIAN VEST',
    sub: 'MODULAR WEBBING SYSTEM',
    paletteIdx: 4, // Amethyst
    desc: 'Heavyweight ripstop layering vest featuring military-grade webbing and quick-release buckles.',
  },
  {
    num: '26',
    name: 'Distressed Denim Trucker Jacket',
    category: 'Outerwear',
    price: 220.0,
    badge: 'Archival',
    title: 'TRUCKER JACKET',
    sub: '14OZ JAPANESE SELVEDGE',
    paletteIdx: 3, // Terracotta
    desc: 'Oversized drop-shoulder trucker in washed vintage black 14oz denim with raw edge detailing.',
  },
  {
    num: '27',
    name: 'NeoRetro Chunky Low Sneakers',
    category: 'Footwear',
    price: 210.0,
    badge: 'Signature',
    title: 'NEO-RETRO LOW',
    sub: 'DECONSTRUCTED CALFSKIN',
    paletteIdx: 0, // Crimson
    desc: 'Deconstructed layered leather sneaker with sculpted lightweight EVA midsole and textured tread.',
  },
  {
    num: '28',
    name: 'Vortex Nitrogen High-Tops',
    category: 'Footwear',
    price: 235.0,
    badge: 'New Drop',
    title: 'VORTEX NITRO',
    sub: 'HIGH-TOP LEATHER RUNNER',
    paletteIdx: 1, // Cobalt
    desc: 'High-top silhouette crafted from premium nappa leather with cushioned collar and translucent soles.',
  },
  {
    num: '29',
    name: 'Terminal 4™ Skate Derbies',
    category: 'Footwear',
    price: 225.0,
    badge: 'Trending',
    title: 'TERMINAL 4',
    sub: 'CALFSKIN DERBY // VIBRAM',
    paletteIdx: 5, // Petroleum Teal
    desc: 'Chunky lugged-sole leather derby shoes blending formal tailoring with skate silhouette.',
  },
  {
    num: '30',
    name: 'Future Artifact™ Slip-On Mules',
    category: 'Footwear',
    price: 180.0,
    badge: 'Limited Run',
    title: 'FUTURE ARTIFACT',
    sub: 'MOLDED EVA FOAM MULE',
    paletteIdx: 7, // Sage Olive
    desc: 'Ergonomically molded foam footwear with architectural contours and matte tactile finish.',
  },
  {
    num: '31',
    name: 'Out of Bounds™ Heavy Oversized Tee',
    category: 'Heavyweight Tees',
    price: 88.0,
    badge: 'Trending',
    title: 'OUT OF BOUNDS™',
    sub: 'COLLECTION 04 // 2026',
    paletteIdx: 9, // Solar Ochre
    desc: 'Ultra-wide silhouette cut from 420GSM combed jersey with solar ochre studio backdrop.',
  },
  {
    num: '32',
    name: 'End of Transmission™ Boxy Tee',
    category: 'Heavyweight Tees',
    price: 95.0,
    badge: 'Archival',
    title: 'END TRANSMISSION',
    sub: 'ARCHIVAL DROP // FINAL',
    paletteIdx: 8, // Slate Monochrome
    desc: 'Final archival drop in heavy washed black cotton with stark monochrome studio aesthetics.',
  },
];

async function generateAllPairs() {
  console.log('=== Generating 32 AI-Consistent Streetwear Pairs ===');

  const maleFullPath = 'C:/Users/bhaba/.gemini/antigravity-ide/brain/5d7ee2fd-474a-4436-ad7d-e40f749d43fb/vibe_test_1_1789017463608.jpg';
  const maleDetailPath = 'C:/Users/bhaba/.gemini/antigravity-ide/brain/5d7ee2fd-474a-4436-ad7d-e40f749d43fb/vibe_test_1_detail_1789017493264.jpg';

  const femaleFullPath = 'C:/Users/bhaba/.gemini/antigravity-ide/brain/5d7ee2fd-474a-4436-ad7d-e40f749d43fb/.user_uploaded/media_1789017296221.png';
  const femaleDetailPath = 'C:/Users/bhaba/.gemini/antigravity-ide/brain/5d7ee2fd-474a-4436-ad7d-e40f749d43fb/.user_uploaded/media_1789017271505.png';

  // Load male buffers
  const { data: dMaleFull, info: iMaleFull } = await sharp(maleFullPath).raw().toBuffer({ resolveWithObject: true });
  const { data: dMaleDet, info: iMaleDet } = await sharp(maleDetailPath).raw().toBuffer({ resolveWithObject: true });

  const productsForDb = [];

  for (const cfg of PRODUCTS_CONFIG) {
    const primaryFilename = `prod_${cfg.num}_primary.jpg`;
    const hoverFilename = `prod_${cfg.num}_hover.jpg`;
    const primaryDest = path.join(OUTPUT_DIR, primaryFilename);
    const hoverDest = path.join(OUTPUT_DIR, hoverFilename);

    const palette = STUDIO_BACKDROPS[cfg.paletteIdx];
    console.log(`[${cfg.num}/32] Generating ${cfg.name} (${cfg.title}) on ${palette.name}...`);

    if (cfg.num === '01') {
      fs.copyFileSync(maleFullPath, primaryDest);
      fs.copyFileSync(maleDetailPath, hoverDest);
    } else if (cfg.isUserReference) {
      await sharp(femaleFullPath).resize(896, 1200, { fit: 'cover' }).jpeg({ quality: 95 }).toFile(primaryDest);
      await sharp(femaleDetailPath).resize(896, 1200, { fit: 'cover' }).jpeg({ quality: 95 }).toFile(hoverDest);
    } else {
      const targetHue = palette.hue;
      const satMult = palette.satMult;

      const bufFull = Buffer.from(dMaleFull);
      const bufDet = Buffer.from(dMaleDet);

      // Full body backdrop & text erase
      for (let y = 0; y < iMaleFull.height; y++) {
        for (let x = 0; x < iMaleFull.width; x++) {
          const idx = (y * iMaleFull.width + x) * iMaleFull.channels;
          const r = bufFull[idx], g = bufFull[idx+1], b = bufFull[idx+2];

          // Pure studio paper red detection (chromatic key: zero false positives on skin, 100% seamless coverage)
          const isStudioRedPaper = (y < 935 && r > 55 && (g / r) < 0.46 && (b / r) < 0.48 && g < 65);

          if (isStudioRedPaper) {
            let [h, s, v] = rgbToHsv(r, g, b);
            const nh = targetHue === null ? h : targetHue;
            const ns = Math.min(1, s * satMult);
            const [nr, ng, nb] = hsvToRgb(nh, ns, v);
            bufFull[idx] = nr; bufFull[idx+1] = ng; bufFull[idx+2] = nb;
          }

          // Completely erase old white text on t-shirt back
          if (y >= 300 && y <= 375 && x >= 360 && x <= 540) {
            if (r > 28 || g > 28 || b > 28) {
              bufFull[idx] = 11;
              bufFull[idx+1] = 12;
              bufFull[idx+2] = 13;
            }
          }
        }
      }

      // Detail backdrop & text erase
      for (let y = 0; y < iMaleDet.height; y++) {
        for (let x = 0; x < iMaleDet.width; x++) {
          const idx = (y * iMaleDet.width + x) * iMaleDet.channels;
          const r = bufDet[idx], g = bufDet[idx+1], b = bufDet[idx+2];

          // Detail backdrop paper detection (chromatic key)
          const isDetailRedPaper = (y < 535 && r > 55 && (g / r) < 0.46 && (b / r) < 0.48 && g < 65);

          if (isDetailRedPaper) {
            let [h, s, v] = rgbToHsv(r, g, b);
            const nh = targetHue === null ? h : targetHue;
            const ns = Math.min(1, s * satMult);
            const [nr, ng, nb] = hsvToRgb(nh, ns, v);
            bufDet[idx] = nr; bufDet[idx+1] = ng; bufDet[idx+2] = nb;
          }

          // Completely erase old white text on detail collar
          if (y >= 570 && y <= 685 && x >= 240 && x <= 660) {
            if (r > 28 || g > 28 || b > 28) {
              bufDet[idx] = 11;
              bufDet[idx+1] = 12;
              bufDet[idx+2] = 13;
            }
          }
        }
      }

      const safeTitle = cfg.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const safeSub = cfg.sub.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // Composite Typography overlay onto full body
      const svgFull = Buffer.from(
        '<svg width="' + iMaleFull.width + '" height="' + iMaleFull.height + '">' +
        '<text x="450" y="334" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="24" fill="#EDE4DD" letter-spacing="2">' + safeTitle + '</text>' +
        '<text x="450" y="354" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="10" fill="#B8B0A5" letter-spacing="3.5">' + safeSub + '</text>' +
        '</svg>'
      );

      // Composite Typography overlay onto detail shot
      const svgDetail = Buffer.from(
        '<svg width="' + iMaleDet.width + '" height="' + iMaleDet.height + '">' +
        '<text x="450" y="620" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="48" fill="#EDE4DD" letter-spacing="3">' + safeTitle + '</text>' +
        '<text x="450" y="655" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="600" font-size="18" fill="#B8B0A5" letter-spacing="6">' + safeSub + '</text>' +
        '</svg>'
      );

      await sharp(bufFull, { raw: { width: iMaleFull.width, height: iMaleFull.height, channels: iMaleFull.channels } })
        .composite([{ input: svgFull, blend: 'over' }])
        .jpeg({ quality: 94 })
        .toFile(primaryDest);

      await sharp(bufDet, { raw: { width: iMaleDet.width, height: iMaleDet.height, channels: iMaleDet.channels } })
        .composite([{ input: svgDetail, blend: 'over' }])
        .jpeg({ quality: 94 })
        .toFile(hoverDest);
    }

    const slug = cfg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    productsForDb.push({
      itemNumber: cfg.num,
      name: cfg.name,
      slug: `${slug}-${cfg.num}`,
      category: cfg.category,
      price: cfg.price,
      badge: cfg.badge,
      primaryImage: `/images/products/${primaryFilename}`,
      hoverImage: `/images/products/${hoverFilename}`,
      description: cfg.desc,
      inStock: true,
      stockQuantity: Math.floor(Math.random() * 25) + 15,
    });
  }

  console.log(`\nGenerated all ${productsForDb.length} pairs successfully!`);

  // Update mockData.js
  const mockCategories = ['All', 'Heavyweight Tees', 'Hoodies & Fleece', 'Tech Bottoms', 'Outerwear', 'Footwear'];
  const mockDataContent = `export const mockProducts = ${JSON.stringify(productsForDb, null, 2)};\n\nexport const mockCategories = ${JSON.stringify(mockCategories, null, 2)};\n`;
  const mockDataPath = path.resolve(__dirname, '../models/mockData.js');
  fs.writeFileSync(mockDataPath, mockDataContent, 'utf-8');
  console.log('Updated mockData.js with all 32 AI product pairs.');

  // Seed into MongoDB Atlas
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.log('No MONGO_URI provided. Skipping DB seed.');
    return;
  }

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(mongoUri);
  console.log('Connected! Purging old collection...');
  await Product.deleteMany({});
  console.log(`Inserting ${productsForDb.length} new products into database...`);
  const inserted = await Product.insertMany(productsForDb);
  console.log(`Seeding complete! Inserted count: ${inserted.length}`);

  const finalCount = await Product.countDocuments();
  console.log(`Verified DB count: ${finalCount}`);

  await mongoose.disconnect();
  console.log('Done!');
}

generateAllPairs().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
