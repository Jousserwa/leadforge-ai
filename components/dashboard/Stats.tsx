import { Users, Mail, MousePointer2, TrendingUp } from "lucide-react";

const stats = [
  { name: "Total Leads", value: "1,284", icon: Users, change: "+12%", changeType: "increase" },
  { name: "Emails Sent", value: "842", icon: Mail, change: "+5%", changeType: "increase" },
  { name: "Open Rate", value: "42.5%", icon: MousePointer2, change: "+2%", changeType: "increase" },
  { name: "Replied", value: "128", icon: TrendingUp, change: "+18%", changeType: "increase" },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.name}
          className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden border border-gray-100"
        >
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              {item.name}
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                item.changeType === "increase" ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}
