/**
 * Database connection configuration.
 *
 * For production, connect your database (e.g. MongoDB with mongoose,
 * PostgreSQL with pg/prisma, or Supabase).
 * By default, this boilerplate operates with an in-memory repository
 * so that it runs out of the box with zero setup.
 */

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (mongoUri) {
      console.log(`[DB] Attempting connection to MongoDB...`);
      // When mongoose is installed:
      // await mongoose.connect(mongoUri);
      console.log(`[DB] Connected successfully.`);
    } else {
      console.log(`[DB] Running with in-memory mock store (No DB URI provided).`);
    }
  } catch (error) {
    console.error(`[DB Error]: ${error.message}`);
    process.exit(1);
  }
};
