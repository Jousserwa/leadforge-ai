import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";
import Inception from "@/components/landing/Inception";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Inception />
      <Pricing />
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} LeadForge AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
