import axios from "axios";
import crypto from "node:crypto";

const API_KEY = process.env.NOWPAYMENTS_API_KEY;
const IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET;
const API_URL = "https://api.nowpayments.io/v1";

export async function createPayment(amount: number, currency: string, orderId: string, payCurrency?: string) {
  try {
    const response = await axios.post(
      `${API_URL}/payment`,
      {
        price_amount: amount,
        price_currency: "usd",
        pay_currency: payCurrency || "btc",
        ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/nowpayments/webhook`,
        order_id: orderId,
        order_description: `LeadForge AI Subscription - ${orderId}`,
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("NOWPayments create error:", error.response?.data || error.message);
    } else {
      console.error("NOWPayments create error:", error);
    }
    throw error;
  }
}

export async function createInvoice(amount: number, orderId: string) {
  try {
    const response = await axios.post(
      `${API_URL}/invoice`,
      {
        price_amount: amount,
        price_currency: "usd",
        order_id: orderId,
        order_description: `LeadForge AI Subscription - ${orderId}`,
        ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/nowpayments/webhook`,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?payment=cancelled`,
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("NOWPayments invoice error:", error.response?.data || error.message);
    } else {
      console.error("NOWPayments invoice error:", error);
    }
    throw error;
  }
}

export function verifyWebhookSignature(payload: Record<string, unknown>, signature: string) {
  if (!IPN_SECRET) return false;

  const orderedPayload = Object.keys(payload)
    .sort()
    .reduce((obj: Record<string, unknown>, key: string) => {
      obj[key] = payload[key];
      return obj;
    }, {});

  const hmac = crypto.createHmac("sha512", IPN_SECRET);
  const data = JSON.stringify(orderedPayload);
  hmac.update(data);
  const expectedSignature = hmac.digest("hex");

  return expectedSignature === signature;
}
