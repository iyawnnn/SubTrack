🎨 Phase 1: The "Midnight Azure" Visual Overhaul
This phase focuses on moving from a basic "SaaS" look to a premium, high-end financial tool aesthetic.

📐 Typography & Foundation
[ ] Satoshi Font Integration:

[ ] Create folder: src/app/fonts/.

[ ] Move .woff2 files into the folder.

[ ] Configure next/font/local in src/app/layout.tsx.

[ ] Color Palette:

Background: #0a0a0a (Deep Slate Black)

Surface: #161616 (Card/Sidebar background)

Primary: #0070f3 (Azure Blue)

Accent: #10b981 (Emerald Green for savings)

[ ] Dark Mode Mastery:

[ ] Enable useMantineColorScheme in the DashboardShell.

[ ] Add a Sun/Moon toggle button in the sidebar.

✨ Premium UI Elements
[ ] Glassmorphism: Apply backdrop-filter: blur(12px) and semi-transparent borders to the Sidebar and Modals.

[ ] Micro-animations: - [ ] Install Framer Motion: pnpm add framer-motion.

[ ] Add "Entry Fade-in" for the Stats Cards.

[ ] Add "Slide-out" effect when deleting a subscription.

[ ] Interactive Hover States: Cards should have a subtle Azure glow on hover.

🧠 Phase 2: Advanced Intelligence (The Portfolio Hooks)
These are the features that prove you can build logic-heavy applications.

[ ] The "Savings Engine"
[ ] Logic: Compare subscriptions by category. If a user has more than one in the same category (e.g., Netflix and Disney+), show a "Optimization Insight" card.

[ ] Potential Savings Card: Display exactly how much they could save by cutting "Redundant" subscriptions.

[ ] Global Currency Normalization
[ ] Free Exchange API: Integrate a service like exchangerate-api to fetch daily rates.

[ ] Multi-Currency Toggle: Allow users to switch the entire dashboard view between PHP, USD, and EUR regardless of how the sub was entered.

🛠️ Phase 3: Power-User UX & Performance
[ ] Command Palette (Cmd+K): Implement Mantine Spotlight.

[ ] Quick Search: Type "Net" to jump straight to Netflix details.

[ ] Actions: Type "Add" to open the subscription modal instantly.

[ ] Pause Mode Logic: - [ ] Update prisma/schema.prisma to include a PAUSED status.

[ ] Exclude paused subscriptions from the "Monthly Burn Rate" calculation while keeping them in the list.

[ ] Bulk Actions: Add checkboxes to the Subscription Table to delete multiple items at once.

📈 Phase 4: Data Storytelling
[ ] Yearly Payment Heatmap: A grid (similar to GitHub contributions) showing which months have the highest density of payment renewals.

[ ] Category Deep-Dive: Click a slice of the Pie Chart to "drill down" and see exactly which subscriptions make up that percentage.

[ ] PDF Export: Allow users to download a "Monthly Spend Report" to share or keep for records.

📂 Phase 5: Final Polish & Launch
[ ] SEO Optimization: Update metadata for the landing page.

[ ] Custom Favicon: Create a professional "S" or "ST" logo favicon.

[ ] Performance Audit: Ensure all images and fonts are optimized for LCP (Largest Contentful Paint).