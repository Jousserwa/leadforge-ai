import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out LeadForge AI.",
    features: ["10 leads/month", "Basic lead info", "Standard email templates"],
    buttonText: "Start for free",
    link: "/signup",
  },
  {
    name: "Pro",
    price: "$49",
    description: "Grow your business with more leads and automation.",
    features: [
      "500 leads/month",
      "Full lead details",
      "AI-personalized emails",
      "Campaign tracking",
      "Priority support",
    ],
    buttonText: "Get Pro",
    link: "/checkout?plan=pro",
    highlighted: true,
    tag: "Best Value for Growth",
  },
  {
    name: "Agency",
    price: "$199",
    description: "Unlimited power for your agency.",
    features: [
      "White label reports & branding",
      "Unlimited leads",
      "Team collaboration",
      "API access",
      "Dedicated account manager",
    ],
    buttonText: "Go Agency",
    link: "/checkout?plan=agency",
    tag: "Perfect for Scale",
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that&apos;s right for your business.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${
                tier.highlighted
                  ? "ring-2 ring-indigo-600 border-indigo-600"
                  : "border-gray-200"
              }`}
            >
              {tier.tag && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase">
                  {tier.tag}
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {tier.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 text-gray-500">{tier.description}</p>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-indigo-500" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.link}
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  tier.highlighted
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                {tier.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
