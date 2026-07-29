import { Clock3, Cpu, Gauge, HardDrive, Server } from 'lucide-react';

const upcomingFeatures = [
  { icon: Cpu, label: 'Recursos dedicados' },
  { icon: HardDrive, label: 'Almacenamiento NVMe' },
  { icon: Gauge, label: 'Red de baja latencia' },
];

export default function PlanesVPS() {
  return (
    <section id="vps" className="section-padding" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p
            className="font-mono-tech mb-3 text-xs tracking-[0.3em]"
            style={{ color: 'var(--text-secondary)' }}
          >
            INFRAESTRUCTURA
          </p>
          <h2
            className="mb-3 text-2xl font-semibold sm:text-3xl"
            style={{ color: 'var(--text)' }}
          >
            Servidores VPS en Chile
          </h2>
          <p
            className="mx-auto max-w-xl text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Estamos preparando una nueva línea de servidores virtuales privados con el
            rendimiento y la estabilidad de nuestra infraestructura local.
          </p>
        </div>

        <div
          className="relative mx-auto max-w-4xl overflow-hidden rounded-xl p-8 sm:p-12"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          <div
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(55, 138, 221, 0.12)' }}
          />

          <div className="relative flex flex-col items-center text-center">
            <div
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
              }}
            >
              <Server size={30} style={{ color: 'var(--accent)' }} />
            </div>

            <div
              className="font-mono-tech mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-[0.18em]"
              style={{
                backgroundColor: 'rgba(55, 138, 221, 0.12)',
                color: 'var(--accent)',
                border: '1px solid rgba(55, 138, 221, 0.28)',
              }}
            >
              <Clock3 size={14} />
              PRÓXIMAMENTE
            </div>

            <h3
              className="mb-3 text-xl font-semibold sm:text-2xl"
              style={{ color: 'var(--text)' }}
            >
              Una infraestructura diseñada para crecer contigo
            </h3>
            <p
              className="mb-8 max-w-2xl text-sm leading-relaxed sm:text-base"
              style={{ color: 'var(--text-secondary)' }}
            >
              Muy pronto podrás desplegar tus proyectos en VPS administrables, rápidos y
              alojados en Chile.
            </p>

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
              {upcomingFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.label}
                    className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <Icon size={16} style={{ color: 'var(--accent)' }} />
                    {feature.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
