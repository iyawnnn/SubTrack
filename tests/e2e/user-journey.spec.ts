import { test, expect } from "@playwright/test";
import { execSync } from "child_process";

test.describe.configure({ mode: "serial" });

test.describe("Full User Journey (Mobile)", () => {
  test.setTimeout(60000); 
  test.use({ viewport: { width: 375, height: 667 } }); 

  const USER = {
    email: "test@example.com",
    password: "password123",
  };

  test.beforeAll(() => {
    console.log("🌱 Seeding database...");
    try {
      execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });
    } catch (error) {
      console.error("Seeding failed:", error);
      throw error;
    }
  });

  test("should complete the full lifecycle: Login -> Add -> Edit -> Archive -> Delete", async ({ page }) => {
    // 1. LOG IN
    console.log("🔑 Logging in...");
    await page.goto("/auth/login");
    await page.getByLabel("Email").fill(USER.email);
    await page.getByLabel("Password").fill(USER.password);
    await page.getByRole("button", { name: "Sign In with Email" }).click();
    await page.waitForURL("**/dashboard");
    await expect(page.getByText("Spending Velocity")).toBeVisible();

    // 2. ADD SUBSCRIPTION
    console.log("➕ Adding subscription...");
    await page.getByTestId("btn-mobile-menu").click();
    await page.getByTestId("mobile-nav-subscriptions").click();
    await expect(page).toHaveURL(/.*\/subscriptions/);

    // Open Modal (using first() to handle potential duplicates in empty state)
    await page.getByRole("button", { name: "Add Subscription" }).first().click();

    // Fill Form
    await page.getByTestId("input-vendor-name").fill("Netflix");
    await page.getByTestId("input-cost").fill("15.99");
    await page.getByTestId("btn-save-subscription").click();

    // 👇 FIX: Wait for the modal to actually close!
    // This prevents Playwright from finding "Netflix" inside the closing modal.
    await expect(page.getByRole("dialog")).toBeHidden();

    // Verify it appears in the list
    // We search for the specific text container to be safe
    const card = page.getByText("Netflix", { exact: true });
    await expect(card).toBeVisible();
    await expect(page.getByText("15.99")).toBeVisible();

    // 3. EDIT SUBSCRIPTION
    console.log("✏️ Editing subscription...");
    await card.click(); 

    // Change Cost
    await page.getByTestId("input-cost").fill("19.99");
    await page.getByTestId("btn-save-subscription").click();
    
    // Wait for modal to close again
    await expect(page.getByRole("dialog")).toBeHidden();

    // Verify change
    await expect(page.getByText("19.99")).toBeVisible();

    // 4. ARCHIVE (CANCEL) SUBSCRIPTION
    console.log("📦 Archiving subscription...");
    await page.getByText("Netflix", { exact: true }).click();

    // Expand "More Options" 
    const moreOptions = page.getByText(/More Options|Advanced Options/i);
    if (await moreOptions.isVisible()) {
       await moreOptions.click();
    }

    // Handle Status Selection
    const statusTrigger = page.locator('button[role="combobox"]').filter({ hasText: /Active|Status/ }).first();
    if (await statusTrigger.isVisible()) {
        await statusTrigger.click();
    } else {
        await page.getByLabel("Status").click();
    }

    await page.getByRole("option", { name: "Cancelled" }).click();
    await page.getByTestId("btn-save-subscription").click();
    
    // Wait for modal close
    await expect(page.getByRole("dialog")).toBeHidden();

    // Verify it's gone from Active list
    await expect(page.getByText("Netflix")).toBeHidden();

    // 5. DELETE (From Archive)
    console.log("🗑️ Deleting from Archive...");
    await page.getByTestId("btn-mobile-menu").click();
    await page.getByTestId("mobile-nav-archive").click();
    await expect(page).toHaveURL(/.*\/archive/);

    await expect(page.getByText("Netflix")).toBeVisible();

    // Open Dropdown Menu
    await page.locator("button").filter({ has: page.locator("svg.lucide-more-horizontal") }).first().click();
    
    // Click Delete
    await page.getByRole("menuitem", { name: /Delete/i }).click();

    // Verify Gone
    await expect(page.getByText("Netflix")).toBeHidden();
    
    console.log("✅ User Journey Test Completed Successfully!");
  });
});