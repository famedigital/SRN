import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { ensureSchema } = await import("../src/lib/db/migrate");
  const { processOutbox } = await import("../src/lib/outbox/process");
  await ensureSchema();
  const result = await processOutbox();
  console.log(result);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
