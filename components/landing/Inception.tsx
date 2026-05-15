import { Zap } from "lucide-react";

export default function Inception() {
  return (
    <section className="py-16 bg-indigo-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-10">
          <Zap className="h-64 w-64" />
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
            We found you using LeadForge AI.
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-indigo-100 leading-relaxed">
            We didn&apos;t use ads or luck to get you here. Our AI identified you as a
            high-potential user and reached out automatically. It worked on you—now
            imagine what it can do for your business.
          </p>
          <div className="mt-10">
            <a
              href="/signup"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-900 bg-white hover:bg-indigo-50 transition"
            >
              Start Your Own Outreach
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
