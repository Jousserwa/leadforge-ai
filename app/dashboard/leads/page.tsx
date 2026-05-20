import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import LeadsTable from "@/components/dashboard/LeadsTable";
import LeadGenForm from "@/components/dashboard/LeadGenForm";

export default async function LeadsPage() {
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
        <h1 className="text-2xl font-bold text-gray-900">Lead Sourcing</h1>
        <p className="text-gray-500 text-sm">Use our AI to find new potential customers in any industry and location.</p>
      </div>

      <LeadGenForm />

      <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All Leads</h3>
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
