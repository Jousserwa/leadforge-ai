import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import CampaignManager from "@/components/dashboard/CampaignManager";

export default async function CampaignsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const userId = session.user.id;

  const leads = await prisma.lead.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Campaigns</h1>
        <p className="text-gray-500 text-sm">Personalize and send cold emails to your leads using AI.</p>
      </div>

      <CampaignManager leads={leads} />
    </div>
  );
}
