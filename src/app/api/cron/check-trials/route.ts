import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { TrialReminderEmail } from "@/components/emails/TrialReminder";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = dayjs();
    const twoDaysFromNow = now.add(2, "day").toDate();

    const expiringTrials = await prisma.subscription.findMany({
      where: {
        isTrial: true,
        nextRenewalDate: {
          gte: now.toDate(),
          lte: twoDaysFromNow,
        },
      },
      include: { user: true, vendor: true },
    });

    if (expiringTrials.length === 0) {
      return NextResponse.json({ message: "No trials found", count: 0 });
    }

    const emailPromises = expiringTrials.map(async (sub) => {
      if (!sub.user.email) return null;
      const daysLeft = dayjs(sub.nextRenewalDate).diff(now, "day");

      const { data, error } = await resend.emails.send({
        // 👇 UPDATE 1: Use your new verified domain & Brand Name
        from: "SubVantage <updates@subvantage.iansebastian.dev>",
        
        // 👇 UPDATE 2: Send to the ACTUAL user (since you are now verified)
        to: sub.user.email, 
        
        subject: `⚠️ Action Required: ${sub.vendor.name} trial ending`,
        react: TrialReminderEmail({
          userName: sub.user.name || "User",
          vendorName: sub.vendor.name,
          daysLeft: Math.max(0, daysLeft),
          renewalCost: `$${Number(sub.cost).toFixed(2)}`,
        }),
      });

      if (error) throw new Error(error.message);
      return data;
    });

    await Promise.all(emailPromises);

    return NextResponse.json({
      success: true,
      processed: expiringTrials.length,
    });
  } catch (error: any) {
    console.error("Cron Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}