import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import CapacidadesLici from "../components/CapacidadesLici";
import HowItWorks from "../components/HowItWorks";
import DosFinales from "../components/DosFinales";
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
        <CapacidadesLici />
        <HowItWorks />
        <DosFinales />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
