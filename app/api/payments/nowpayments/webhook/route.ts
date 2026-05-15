import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/nowpayments";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const signature = req.headers.get("x-nowpayments-sig") || "";

    const isValid = verifyWebhookSignature(body, signature);

    if (!isValid) {
      console.warn("Invalid NOWPayments signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const { payment_status, order_id } = body;

    if (payment_status === "finished" || payment_status === "confirmed") {
      // order_id format: userId_plan_timestamp
      const [userId, plan] = order_id.split("_");

      await prisma.subscription.upsert({
        where: { userId },
        update: {
          plan,
          status: "ACTIVE",
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
        create: {
          userId,
          plan,
          status: "ACTIVE",
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });

      console.log(`Subscription activated for user ${userId}, plan ${plan}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("NOWPayments Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
