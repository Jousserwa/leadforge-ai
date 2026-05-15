import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface SendGridEvent {
  leadId?: string;
  event?: string;
  [key: string]: unknown;
}

export async function POST(req: Request) {
  try {
    const events = (await req.json()) as SendGridEvent[];

    if (!Array.isArray(events)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    for (const event of events) {
      const { leadId, event: eventType } = event;

      if (leadId) {
        if (eventType === "open") {
          await prisma.lead.update({
            where: { id: leadId },
            data: { isOpened: true },
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SendGrid webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
