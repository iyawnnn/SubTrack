// scripts/seed-test-data.ts
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

async function main() {
  // ⚠️ CHANGE THIS to your actual email so you can check your inbox
  const TEST_EMAIL = "ianmacabulos0@gmail.com"; 

  console.log(`🌱 Seeding test data for ${TEST_EMAIL}...`);

  // 1. Create or Get the User
  const user = await prisma.user.upsert({
    where: { email: TEST_EMAIL },
    update: {},
    create: {
      email: TEST_EMAIL,
      name: "Test User",
      preferredCurrency: "USD",
    },
  });

  console.log(`✅ User ensured: ${user.id}`);

  // 2. Create Vendors
  const netflixVendor = await prisma.vendor.create({
    data: { name: "Netflix (Test)", userId: user.id },
  });
  
  const adobeVendor = await prisma.vendor.create({
    data: { name: "Adobe Creative Cloud (Test)", userId: user.id },
  });

  const spotifyVendor = await prisma.vendor.create({
    data: { name: "Spotify (Safe)", userId: user.id },
  });

  // 3. Create Subscriptions

  // 🔴 CASE A: Trial Ending in 2 Days (Should trigger Trial Email)
  await prisma.subscription.create({
    data: {
      userId: user.id,
      vendorId: adobeVendor.id,
      cost: 54.99,
      frequency: "MONTHLY",
      startDate: dayjs().subtract(5, "day").toDate(),
      nextRenewalDate: dayjs().add(2, "day").toDate(), // 👈 Exact hit for Cron
      isTrial: true,
      status: "ACTIVE",
      category: "Software",
      lastNotifiedAt: null, // Important: Reset notification
    },
  });
  console.log("👉 Created 'Adobe' trial ending in 2 days.");

  // 🟠 CASE B: Regular Bill in 3 Days (Should trigger Upcoming Bill Email)
  await prisma.subscription.create({
    data: {
      userId: user.id,
      vendorId: netflixVendor.id,
      cost: 19.99,
      frequency: "MONTHLY",
      startDate: dayjs().subtract(1, "month").toDate(),
      nextRenewalDate: dayjs().add(3, "day").toDate(), // 👈 Exact hit for Cron
      isTrial: false,
      status: "ACTIVE",
      category: "Entertainment",
      lastNotifiedAt: null,
    },
  });
  console.log("👉 Created 'Netflix' renewal in 3 days.");

  // 🟢 CASE C: Safe Subscription (Should NOT trigger anything)
  await prisma.subscription.create({
    data: {
      userId: user.id,
      vendorId: spotifyVendor.id,
      cost: 9.99,
      frequency: "MONTHLY",
      startDate: dayjs().subtract(1, "month").toDate(),
      nextRenewalDate: dayjs().add(14, "day").toDate(), // 👈 Too far in future
      isTrial: false,
      status: "ACTIVE",
      category: "Music",
    },
  });
  console.log("👉 Created 'Spotify' renewal in 14 days (Control group).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });