import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sendColdEmail } from "@/lib/sendgrid";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { leadId, subject } = await req.json();

    if (!leadId || !subject) {
      return NextResponse.json({ error: "Missing leadId or subject" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId, userId: session.user.id },
    });

    if (!lead || !lead.email || !lead.personalEmailContent) {
      return NextResponse.json({ error: "Lead or email content missing" }, { status: 400 });
    }

    const result = await sendColdEmail(lead.email, subject, lead.personalEmailContent, leadId);

    if (result.success) {
      await prisma.lead.update({
        where: { id: leadId },
        data: { status: "CONTACTED" },
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
  } catch (error) {
    console.error("Send email API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
