export const metadata = {
  title: "Home - Stellar",
  description: "Page description",
};

import Clients from "@/components/clients";
import Cta from "@/components/cta";
import Features from "@/components/features";
import Features03 from "@/components/features-03";
import Hero from "@/components/hero";
import Roadmap from "@/components/roadmap";
import Team from "@/components/team";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Features />
      {/* <Features02 /> */}
      <Team />

      <Features03 />
      <Roadmap />
      {/* <Features04 /> */}
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      <Cta />
    </>
  );
}
