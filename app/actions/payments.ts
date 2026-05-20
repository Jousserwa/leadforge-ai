"use server";

import { auth } from "@/auth";
import { createInvoice } from "@/lib/nowpayments";

export async function initiatePayment(plan: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const amount = plan === "PRO" ? 49 : plan === "AGENCY" ? 199 : 0;
  if (amount === 0) throw new Error("Invalid plan");

  const orderId = `${session.user.id}_${plan}_${Date.now()}`;
  
  try {
    const invoice = await createInvoice(amount, orderId);
    return { checkout_url: invoice.invoice_url };
  } catch (error) {
    console.error("Failed to initiate payment:", error);
    throw new Error("Payment initiation failed");
  }
}
