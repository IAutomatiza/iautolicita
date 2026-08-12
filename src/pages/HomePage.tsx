import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import CapacidadesLici from "../components/CapacidadesLici";
import HowItWorks from "../components/HowItWorks";
import Results from "../components/Results";
import PriceSimulator from "../components/PriceSimulator";
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
        {/* Results abre el argumento del precio real y el simulador lo prueba:
            una sola sección, porque separados repetían el mismo dato. */}
        <Results />
        <PriceSimulator embedded />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
