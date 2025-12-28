"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function finishOnboarding(data: { 
  currency: string; 
  notifications: boolean;
}) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        preferredCurrency: data.currency,
        emailNotifications: data.notifications,
        hasCompletedOnboarding: true, // 👈 Marks user as "Old"
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save preferences" };
  }
}