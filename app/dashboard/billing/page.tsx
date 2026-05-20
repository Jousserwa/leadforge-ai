import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { CreditCard, Bitcoin, Zap, ShieldCheck } from "lucide-react";
import CheckoutButtons from "./CheckoutButtons";

export default async function BillingPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  });

  const plan = user?.subscription?.plan || "FREE";
  const status = user?.subscription?.status || "INACTIVE";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-500 text-sm">Manage your plan and payment methods.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8 bg-indigo-50 border-b border-indigo-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Current Plan</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{plan} Plan</h2>
              <p className="text-gray-600 mt-1 flex items-center">
                <ShieldCheck className="h-4 w-4 text-green-500 mr-1" />
                Status: <span className="font-medium ml-1">{status}</span>
              </p>
            </div>
            {plan === "FREE" && (
               <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-200">
                 <p className="text-sm text-gray-600 font-medium">Upgrade to Pro for 50x more leads</p>
               </div>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Available Upgrades</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-6 hover:border-indigo-600 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Pro Plan</h4>
                  <p className="text-gray-500 text-sm">Best for solo founders</p>
                </div>
                <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                  $49/mo
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-gray-600">
                  <Zap className="h-4 w-4 text-indigo-600 mr-2" /> 500 Leads / month
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Zap className="h-4 w-4 text-indigo-600 mr-2" /> AI Personalization
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Zap className="h-4 w-4 text-indigo-600 mr-2" /> Email Support
                </li>
              </ul>
              <CheckoutButtons plan="PRO" />
            </div>

            <div className="border border-gray-200 rounded-xl p-6 hover:border-indigo-600 transition-all relative">
              <div className="absolute -top-3 right-6 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                POPULAR
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Agency Plan</h4>
                  <p className="text-gray-500 text-sm">For scaling outreach</p>
                </div>
                <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                  $199/mo
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-gray-600">
                  <Zap className="h-4 w-4 text-indigo-600 mr-2" /> Unlimited Leads
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Zap className="h-4 w-4 text-indigo-600 mr-2" /> White Labeling
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <Zap className="h-4 w-4 text-indigo-600 mr-2" /> Priority API Access
                </li>
              </ul>
              <CheckoutButtons plan="AGENCY" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm py-4">
        All payments are securely processed by NOWPayments. 
        Crypto payments are accepted in BTC, USDT, ETH, and more.
      </div>
    </div>
  );
}
