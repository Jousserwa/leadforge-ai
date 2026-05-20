"use client";

import { useState, useTransition } from "react";
import { CreditCard, Bitcoin, Loader2 } from "lucide-react";
import { initiatePayment } from "@/app/actions/payments";

interface CheckoutButtonsProps {
  plan: string;
}

export default function CheckoutButtons({ plan }: CheckoutButtonsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = () => {
    setError(null);
    startTransition(async () => {
      try {
        const { checkout_url } = await initiatePayment(plan);
        if (checkout_url) {
          window.location.href = checkout_url;
        }
      } catch (err) {
        setError("Payment failed to start. Try again.");
      }
    });
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleCheckout}
        disabled={isPending}
        className="w-full flex items-center justify-center py-3 px-4 border border-indigo-600 rounded-lg text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <CreditCard className="h-4 w-4 mr-2" />
        )}
        Pay by Card
      </button>
      
      <button
        onClick={handleCheckout}
        disabled={isPending}
        className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 rounded-lg text-sm font-bold text-white hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-sm"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Bitcoin className="h-4 w-4 mr-2" />
        )}
        Pay by Crypto
      </button>
      
      {error && <p className="text-red-600 text-xs text-center mt-2">{error}</p>}
    </div>
  );
}
