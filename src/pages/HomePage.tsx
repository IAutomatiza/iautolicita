import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import CapabilitiesShowcase from "../components/CapabilitiesShowcase";
import HowItWorks from "../components/HowItWorks";
import IntegrationsBento from "../components/IntegrationsBento";
import Results from "../components/Results";
import PriceSimulator from "../components/PriceSimulator";
import OrganismoIntelligence from "../components/OrganismoIntelligence";
import LiveStatus from "../components/LiveStatus";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <MarketTicker />
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <CapabilitiesShowcase />
        <HowItWorks />
        <IntegrationsBento />
        <Results />
        <PriceSimulator />
        <OrganismoIntelligence />
        <LiveStatus />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
