import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { generateLeads } from "@/lib/openai";
import prisma from "@/lib/prisma";

interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  linkedinUrl?: string;
  score?: string;
  description?: string;
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { industry, description, location } = await req.json();

    if (!industry || !description || !location) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check usage limits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { subscription: true },
    });

    const plan = user?.subscription?.plan || "FREE";
    let limit = 10;
    if (plan === "PRO") limit = 500;
    if (plan === "AGENCY") limit = 1000000; // practical unlimited

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const leadCount = await prisma.lead.count({
      where: {
        userId: session.user.id,
        createdAt: { gte: startOfMonth },
      },
    });

    if (leadCount >= limit) {
      return NextResponse.json({ 
        error: "Lead limit reached", 
        message: `You have already used your ${limit} leads for this month. Please upgrade your plan.` 
      }, { status: 403 });
    }

    const leadsData = (await generateLeads(industry, description, location)) as LeadData[];

    const savedLeads = await Promise.all(
      leadsData.map(async (lead: LeadData) => {
        return prisma.lead.create({
          data: {
            userId: session.user!.id!,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            linkedinUrl: lead.linkedinUrl,
            industry: industry,
            description: lead.description,
            location: location,
            score: lead.score,
          },
        });
      })
    );

    return NextResponse.json(savedLeads);
  } catch (error) {
    console.error("Lead generation API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
