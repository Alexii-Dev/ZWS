import { Helmet } from 'react-helmet-async';
import { useTheme } from '@/hooks/useTheme';
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <Helmet>
        <title>VPN Chile con IP dedicada | ZWS VPN – IP chilena privada</title>
        <meta
          name="description"
          content="Obtén una VPN en Chile con IP dedicada privada. Ideal para usuarios Starlink, acceso remoto y evitar bloqueos. Activación inmediata."
        />
        <link rel="canonical" href="https://zws.cl/vpn-chile" />
        <meta property="og:title" content="VPN Chile con IP dedicada | ZWS VPN" />
        <meta
          property="og:description"
          content="Obtén una VPN en Chile con IP dedicada privada. Ideal para usuarios Starlink, acceso remoto y evitar bloqueos."
        />
        <meta property="og:url" content="https://zws.cl/vpn-chile" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content={isDark ? '#0a0a0a' : '#ffffff'} />
      </Helmet>

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
    </>
  );
}

export default App;
