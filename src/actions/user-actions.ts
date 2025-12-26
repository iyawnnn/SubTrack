"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserSettings(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  const preferredCurrency = formData.get("preferredCurrency") as string;

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { preferredCurrency },
    });

    revalidatePath("/dashboard");
    revalidatePath("/settings");
    
    return { success: true, message: "Settings updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update settings" };
  }
}