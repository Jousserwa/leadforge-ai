import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { generatePersonalizedEmail } from "@/lib/openai";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { leadId, userProduct } = await req.json();

    if (!leadId || !userProduct) {
      return NextResponse.json({ error: "Missing leadId or userProduct" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId, userId: session.user.id },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const emailContent = await generatePersonalizedEmail(
      lead.name || "there",
      lead.company || "your company",
      userProduct
    );

    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: { personalEmailContent: emailContent },
    });

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("Personalization API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
