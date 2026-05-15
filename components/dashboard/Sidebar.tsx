import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Mail,
  BarChart3,
  Settings,
  CreditCard,
  LogOut,
  Zap,
  Gift,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-indigo-900 text-white h-screen fixed left-0 top-0">
      <div className="flex items-center h-16 px-6 bg-indigo-950">
        <Zap className="h-8 w-8 text-indigo-400" />
        <span className="ml-3 text-xl font-bold">LeadForge AI</span>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 text-indigo-100 hover:bg-indigo-800 rounded-md transition-colors group"
            >
              <item.icon className="h-5 w-5 mr-3 text-indigo-300 group-hover:text-white" />
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="px-4 py-6">
          <div className="bg-indigo-800 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Gift className="h-5 w-5 text-indigo-300 mr-2" />
              <span className="text-sm font-semibold">Invite a Friend</span>
            </div>
            <p className="text-xs text-indigo-200 mb-3">
              Get 50 free leads for every referral.
            </p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2 px-4 rounded transition-colors">
              Refer & Earn
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-indigo-800">
        <button className="flex items-center w-full px-3 py-2 text-indigo-100 hover:bg-indigo-800 rounded-md transition-colors">
          <LogOut className="h-5 w-5 mr-3 text-indigo-300" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
