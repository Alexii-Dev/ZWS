import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Software from '@/sections/Software';
import VPNIntro from '@/sections/VPNIntro';
import Beneficios from '@/sections/Beneficios';
import PlanesVPN from '@/sections/PlanesVPN';
import PorQueZWS from '@/sections/PorQueZWS';
import Compatibilidad from '@/sections/Compatibilidad';
import FAQ from '@/sections/FAQ';
import CTAFinal from '@/sections/CTAFinal';
import PlanesVPS from '@/sections/PlanesVPS';
import Footer from '@/sections/Footer';

function App() {
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <Navbar />
      <main>
        <Hero />
        <Software />
        <VPNIntro />
        <Beneficios />
        <PlanesVPN />
        <PorQueZWS />
        <Compatibilidad />
        <FAQ />
        <CTAFinal />
        <PlanesVPS />
      </main>
      <Footer />
    </div>
  );
}

export default App;
