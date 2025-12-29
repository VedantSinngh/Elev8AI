import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BlindFeatures } from "@/components/features/BlindFeatures";
import { DeafFeatures } from "@/components/features/DeafFeatures";
import { AllFeatures } from "@/components/features/AllFeatures";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Features Sections */}
      <section className="container mx-auto px-4 py-24 space-y-24">
        {/* Features for Blind Users */}
        <div>
          <h2 className="mb-12 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            Features for Blind Users
          </h2>
          <BlindFeatures />
        </div>

        {/* Features for Deaf Users */}
        <div>
          <h2 className="mb-12 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            Features for Deaf Users
          </h2>
          <DeafFeatures />
        </div>

        {/* Features for All Users */}
        <div>
          <h2 className="mb-12 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            Features for All Users
          </h2>
          <AllFeatures />
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
          Our Team
        </h2>
        <Team />
      </section>
    </main>
  );
}