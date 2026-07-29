import { ArrowRight } from 'lucide-react';

export default function CTAFinal() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4"
          style={{ color: 'var(--text)' }}
        >
          Obtén tu VPN con IP chilena ahora
        </h2>
        <p className="text-base sm:text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
          Activación inmediata. Sin complicaciones. Tu IP dedicada estará lista en minutos.
        </p>
        <a
          href="#planes-vpn"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('planes-vpn')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4"
        >
          Ver planes
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
