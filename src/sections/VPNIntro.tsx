import { ArrowDown, MapPin, Network, ShieldCheck } from 'lucide-react';

const vpnHighlights = [
  { icon: MapPin, label: 'IP chilena dedicada' },
  { icon: Network, label: 'Conexión de baja latencia' },
  { icon: ShieldCheck, label: 'Acceso privado y seguro' },
];

export default function VPNIntro() {
  return (
    <section
      id="vpn"
      className="section-padding"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p
            className="font-mono-tech mb-3 text-xs tracking-[0.3em]"
            style={{ color: 'var(--accent)' }}
          >
            SERVICIO COMPLEMENTARIO
          </p>
          <h2
            className="mb-5 text-3xl font-semibold leading-tight sm:text-4xl"
            style={{ color: 'var(--text)' }}
          >
            VPN con IP dedicada en Chile
          </h2>
          <p
            className="mb-7 max-w-2xl text-sm leading-relaxed sm:text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            Además de desarrollar soluciones digitales, ofrecemos una VPN con IP chilena
            exclusiva para equipos, empresas y personas que necesitan una conexión estable,
            privada y predecible.
          </p>
          <a
            href="#planes-vpn"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById('planes-vpn')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-ghost"
          >
            Ver planes VPN
            <ArrowDown size={16} />
          </a>
        </div>

        <div
          className="rounded-xl p-6 sm:p-8"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="space-y-3">
            {vpnHighlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={highlight.label}
                  className="flex items-center gap-4 rounded-lg p-4"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: 'rgba(55, 138, 221, 0.12)' }}
                  >
                    <Icon size={19} style={{ color: 'var(--accent)' }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                    {highlight.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
