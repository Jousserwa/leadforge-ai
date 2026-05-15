import { HelpCircle } from "lucide-react";

export default function LeadScoringChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Lead Distribution</h3>
        <div className="group relative">
          <HelpCircle className="h-5 w-5 text-gray-400 cursor-help" />
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-20">
            Pro users get 5x more accurate AI scoring with deep-intent analysis.
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-red-700">Hot Leads</span>
            <span className="text-sm font-medium text-red-700">28%</span>
          </div>
          <div className="w-full bg-red-100 rounded-full h-2.5">
            <div
              className="bg-red-600 h-2.5 rounded-full"
              style={{ width: "28%" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-orange-700">Warm Leads</span>
            <span className="text-sm font-medium text-orange-700">45%</span>
          </div>
          <div className="w-full bg-orange-100 rounded-full h-2.5">
            <div
              className="bg-orange-500 h-2.5 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-blue-700">Cold Leads</span>
            <span className="text-sm font-medium text-blue-700">27%</span>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "27%" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Total Qualified Leads</span>
          <span className="font-bold text-gray-900">1,284</span>
        </div>
      </div>
    </div>
  );
}
