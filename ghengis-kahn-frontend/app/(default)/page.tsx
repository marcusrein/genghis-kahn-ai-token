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
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/45871/genghis-kahn-ai-token/version/latest",
  cache: new InMemoryCache(),
});

export default function Home() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}
