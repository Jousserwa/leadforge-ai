import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Stats from "@/components/dashboard/Stats";
import LeadsTable from "@/components/dashboard/LeadsTable";
import LeadScoringChart from "@/components/dashboard/LeadScoringChart";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const userId = session.user.id;

  // Fetch all leads for this user
  const leads = await prisma.lead.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const totalLeads = leads.length;
  const emailsSent = leads.filter((l) => l.status !== "NEW").length;
  const openedEmails = leads.filter((l) => l.isOpened).length;
  const repliedEmails = leads.filter((l) => l.isReplied).length;

  const openRate = emailsSent > 0 ? (openedEmails / emailsSent) * 100 : 0;

  // Stats data
  const statsData = [
    { name: "Total Leads", value: totalLeads.toLocaleString(), change: "+0%", changeType: "increase" as const },
    { name: "Emails Sent", value: emailsSent.toLocaleString(), change: "+0%", changeType: "increase" as const },
    { name: "Open Rate", value: `${openRate.toFixed(1)}%`, change: "+0%", changeType: "increase" as const },
    { name: "Replied", value: repliedEmails.toLocaleString(), change: "+0%", changeType: "increase" as const },
  ];

  // Lead Scoring Distribution
  const hotLeads = leads.filter((l) => l.score === "HOT").length;
  const warmLeads = leads.filter((l) => l.score === "WARM").length;
  const coldLeads = leads.filter((l) => l.score === "COLD").length;

  const distribution = {
    hot: totalLeads > 0 ? Math.round((hotLeads / totalLeads) * 100) : 0,
    warm: totalLeads > 0 ? Math.round((warmLeads / totalLeads) * 100) : 0,
    cold: totalLeads > 0 ? Math.round((coldLeads / totalLeads) * 100) : 0,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session.user.name || "User"}!
        </h1>
        <p className="text-gray-500">Here&apos;s what&apos;s happening with your leads today.</p>
      </div>

      <Stats stats={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
            <button className="text-indigo-600 hover:text-indigo-900 font-medium text-sm">
              View all
            </button>
          </div>
          <LeadsTable leads={leads.slice(0, 10)} />
        </div>
        <div>
          <LeadScoringChart distribution={distribution} totalLeads={totalLeads} />
        </div>
      </div>
    </div>
  );
}
