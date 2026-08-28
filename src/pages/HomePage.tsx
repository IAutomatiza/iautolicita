import MarketTicker from "../components/MarketTicker";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import CapacidadesLici from "../components/CapacidadesLici";
import HowItWorks from "../components/HowItWorks";
import DosFinales from "../components/DosFinales";
import SoloConNosotros from "../components/SoloConNosotros";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

export default function HomePage() {
  return (
    <>
      <Seo ruta="/" />
      <MarketTicker />
      <Nav />
      <main>
        <Hero />
        <CapacidadesLici />
        <HowItWorks />
        <DosFinales />
        <SoloConNosotros />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
