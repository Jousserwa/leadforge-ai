import Stats from "@/components/dashboard/Stats";
import LeadsTable from "@/components/dashboard/LeadsTable";
import LeadScoringChart from "@/components/dashboard/LeadScoringChart";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h1>
        <p className="text-gray-500">Here&apos;s what&apos;s happening with your leads today.</p>
      </div>

      <Stats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
            <button className="text-indigo-600 hover:text-indigo-900 font-medium text-sm">
              View all
            </button>
          </div>
          <LeadsTable />
        </div>
        <div>
          <LeadScoringChart />
        </div>
      </div>
    </div>
  );
}
