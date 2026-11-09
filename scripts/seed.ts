import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { seedDatabase } = await import("../src/lib/db/seed");
  await seedDatabase();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
