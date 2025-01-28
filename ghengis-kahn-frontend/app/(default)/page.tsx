export const metadata = {
  title: "Home - Stellar",
  description: "Page description",
};

import Clients from "@/components/clients";
import Cta from "@/components/cta";
import Features from "@/components/features";
import Features02 from "@/components/features-02";
import Features03 from "@/components/features-03";
import Features04 from "@/components/features-04";
import Hero from "@/components/hero";
import TestimonialsCarousel from "@/components/testimonials-carousel";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <Features />
      <Features02 />
      <Features03 />
      <TestimonialsCarousel />
      <Features04 />
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      <Cta />
    </>
  );
}
