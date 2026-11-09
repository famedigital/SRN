import { z } from "zod";
import { getDb } from "@/lib/db/client";
import { ensureSchema } from "@/lib/db/migrate";
import { auditLogs, enquiries, outbox } from "@/lib/db/schema";
import { seedDatabase } from "@/lib/db/seed";

const schema = z.object({
  fullName: z.string().min(2).max(255),
  companyName: z.string().min(2).max(255),
  businessEmail: z.string().email().max(255),
  phoneWhatsApp: z.string().max(50).optional(),
  country: z.string().min(2).max(100),
  enquiryType: z.string().min(2).max(50),
  productCategories: z.array(z.string()).min(1),
  lineItems: z
    .array(z.object({ slug: z.string(), name: z.string(), notes: z.string().optional() }))
    .optional(),
  specifications: z.string().min(5).max(20000),
  estimatedQuantity: z.string().max(100).optional(),
  requiredPackaging: z.string().max(100).optional(),
  incoterm: z.string().max(20).optional(),
  destinationPort: z.string().max(150).optional(),
  originGateway: z.string().max(150).optional(),
  timeline: z.string().max(100).optional(),
  additionalNotes: z.string().max(10000).optional(),
  consentGiven: z.literal(true),
});

function makeReference() {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SRN-${year}-${rand}`;
}

export async function createEnquiry(
  raw: unknown,
  meta: { ip?: string; userAgent?: string },
) {
  const data = schema.parse(raw);
  await seedDatabase();
  await ensureSchema();
  const db = await getDb();
  const referenceNumber = makeReference();

  const [row] = await db
    .insert(enquiries)
    .values({
      referenceNumber,
      fullName: data.fullName,
      companyName: data.companyName,
      businessEmail: data.businessEmail,
      phoneWhatsApp: data.phoneWhatsApp,
      country: data.country,
      enquiryType: data.enquiryType,
      productCategories: data.productCategories,
      lineItems: data.lineItems,
      specifications: data.specifications,
      estimatedQuantity: data.estimatedQuantity,
      requiredPackaging: data.requiredPackaging,
      incoterm: data.incoterm,
      destinationPort: data.destinationPort,
      originGateway: data.originGateway,
      timeline: data.timeline,
      additionalNotes: data.additionalNotes,
      consentGiven: true,
      ipAddress: meta.ip,
      userAgent: meta.userAgent,
      status: "NEW",
    })
    .returning();

  const payload = {
    referenceNumber,
    companyName: data.companyName,
    fullName: data.fullName,
    businessEmail: data.businessEmail,
    phoneWhatsApp: data.phoneWhatsApp,
    country: data.country,
    productCategories: data.productCategories,
    estimatedQuantity: data.estimatedQuantity,
    incoterm: data.incoterm,
    destinationPort: data.destinationPort,
    timeline: data.timeline,
    enquiryId: row.id,
  };

  await db.insert(outbox).values([
    {
      aggregateType: "ENQUIRY",
      aggregateId: row.id,
      channel: "TELEGRAM",
      payload,
      status: "PENDING",
    },
    {
      aggregateType: "ENQUIRY",
      aggregateId: row.id,
      channel: "EMAIL",
      payload,
      status: "PENDING",
    },
  ]);

  await db.insert(auditLogs).values({
    action: "ENQUIRY_CREATED",
    resource: "enquiries",
    resourceId: row.id,
    ipAddress: meta.ip,
    diff: { referenceNumber },
  });

  return row;
}
