import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { GlobalSpotlight } from "@/components/GlobalSpotlight";

export async function SearchWrapper() {
  const session = await auth();
  if (!session?.user?.id) return null;

  try {
    const subs = await prisma.subscription.findMany({
      where: { userId: session.user.id },
      select: { id: true, vendor: { select: { name: true } } }
    });

    const searchData = subs.map(s => ({ id: s.id, vendorName: s.vendor.name }));

    return <GlobalSpotlight subscriptions={searchData} />;
  } catch (error) {
    console.error("Failed to load search data", error);
    return <GlobalSpotlight subscriptions={[]} />;
  }
}