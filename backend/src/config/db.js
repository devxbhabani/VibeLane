import { createClient } from '@supabase/supabase-js';
import { mockProducts } from '../models/mockData.js';

let clientInstance = null;

export const getSupabase = () => {
  if (clientInstance) return clientInstance;

  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL;

  const supabaseKey =
    process.env.SUPABASE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    clientInstance = createClient(supabaseUrl, supabaseKey);
  }
  return clientInstance;
};

// Export proxy/getter for backwards compatibility
export const supabase = {
  from: (...args) => {
    const client = getSupabase();
    if (!client) throw new Error('Supabase client not initialized');
    return client.from(...args);
  },
};

export const connectDB = async () => {
  const client = getSupabase();
  if (!client) {
    console.log('[Supabase] Missing SUPABASE_URL or SUPABASE_KEY in environment.');
    console.log('[DB] Supabase not initialized. Running with in-memory fallback.');
    return;
  }

  try {
    console.log('[DB] Connecting to Supabase PostgreSQL...');
    const { count, error } = await client
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.warn(`[DB Warning] Supabase query returned: ${error.message}`);
      return;
    }

    console.log(`[DB] Connected to Supabase! Current products count: ${count}`);

    // Auto-seed initial products if table is empty
    if (count === 0) {
      console.log('[DB] Product table is empty. Seeding initial products...');
      const rows = mockProducts.map((p) => ({
        item_number: p.itemNumber,
        name: p.name,
        slug: p.slug,
        category: p.category,
        price: p.price,
        badge: p.badge || '',
        primary_image: p.primaryImage,
        hover_image: p.hoverImage,
        description: p.description || '',
        in_stock: p.inStock ?? true,
        stock_quantity: p.stockQuantity ?? 20,
      }));

      const { error: insertError } = await client.from('products').insert(rows);
      if (insertError) {
        console.error(`[DB Seed Error] Failed to seed: ${insertError.message}`);
      } else {
        console.log(`[DB] Successfully seeded ${rows.length} products to Supabase!`);
      }
    }
  } catch (err) {
    console.error(`[DB Error]: ${err.message}`);
  }
};
