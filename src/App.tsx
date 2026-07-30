import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Beneficios from '@/sections/Beneficios';
import PlanesVPN from '@/sections/PlanesVPN';
import PorQueZWS from '@/sections/PorQueZWS';
import Compatibilidad from '@/sections/Compatibilidad';
import FAQ from '@/sections/FAQ';
import CTAFinal from '@/sections/CTAFinal';
import PlanesVPS from '@/sections/PlanesVPS';
import Software from '@/sections/Software';
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
        <Beneficios />
        <PlanesVPN />
        <PorQueZWS />
        <Compatibilidad />
        <FAQ />
        <CTAFinal />
        <PlanesVPS />
        <Software />
      </main>
      <Footer />
    </div>
  );
}

export default App;
