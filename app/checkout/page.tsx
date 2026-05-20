"use client";

import { useState, useTransition } from "react";
import { CreditCard, Bitcoin, Loader2 } from "lucide-react";
import { initiatePayment } from "@/app/actions/payments";

export default function CheckoutPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = (plan: string) => {
    setError(null);
    startTransition(async () => {
      try {
        const { checkout_url } = await initiatePayment(plan);
        if (checkout_url) {
          window.location.href = checkout_url;
        }
      } catch (err) {
        setError("Failed to start checkout. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Upgrade to Pro</h1>
          <p className="mt-2 text-gray-600">
            Get 500 leads/month and AI-personalized emails.
          </p>
        </div>

        <div className="bg-indigo-50 rounded-lg p-6 mb-8 border border-indigo-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700 font-medium">Pro Plan Monthly</span>
            <span className="text-2xl font-bold text-gray-900">$49.00</span>
          </div>
          <div className="border-t border-indigo-200 pt-4 flex justify-between items-center">
            <span className="text-gray-900 font-bold">Total</span>
            <span className="text-2xl font-extrabold text-indigo-600">$49.00</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Select Payment Method
          </h2>
          
          <button 
            onClick={() => handleCheckout("PRO")}
            disabled={isPending}
            className="w-full flex items-center justify-between px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-indigo-600 hover:bg-indigo-50 transition-all group disabled:opacity-50"
          >
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-lg mr-4 group-hover:bg-indigo-200">
                <CreditCard className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 tracking-tight">
                  Pay by Card
                </p>
                <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
              </div>
            </div>
            {isPending ? (
              <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
            ) : (
              <div className="h-6 w-6 rounded-full border-2 border-gray-300 group-hover:border-indigo-600 group-hover:bg-indigo-600 flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
            )}
          </button>

          <button 
            onClick={() => handleCheckout("PRO")}
            disabled={isPending}
            className="w-full flex items-center justify-between px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-indigo-600 hover:bg-indigo-50 transition-all group disabled:opacity-50"
          >
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg mr-4 group-hover:bg-orange-200">
                <Bitcoin className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 tracking-tight">
                  Pay by Crypto
                </p>
                <p className="text-sm text-gray-500">USDT, BTC, ETH</p>
              </div>
            </div>
            {isPending ? (
              <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
            ) : (
              <div className="h-6 w-6 rounded-full border-2 border-gray-300 group-hover:border-indigo-600 group-hover:bg-indigo-600 flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
            )}
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          Payments are secured by NOWPayments. By upgrading, you agree to our Terms
          of Service.
        </p>
      </div>
    </div>
  );
}
