import { Fingerprint, Users, Ban, Satellite, Home, Network } from 'lucide-react';

export default function PorQueZWS() {
  return (
    <section id="por-que-zws" className="section-padding" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="font-mono-tech text-xs tracking-[0.3em] mb-3"
            style={{ color: 'var(--accent)' }}
          >
            COMPARATIVA
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
            ¿Por qué ZWS VPN?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column */}
          <div className="card-surface p-8">
            <h3 className="text-xl font-medium mb-6" style={{ color: 'var(--text)' }}>
              A diferencia de otras VPN
            </h3>
            <div className="space-y-5">
              {[
                {
                  icon: Fingerprint,
                  title: 'Tu IP es solo tuya',
                  desc: 'No compartes tu dirección IP con nadie. Exclusividad total garantizada.',
                },
                {
                  icon: Users,
                  title: 'No compartes conexión con desconocidos',
                  desc: 'Otras VPN comparten IPs entre cientos de usuarios. Con ZWS, la IP es privada.',
                },
                {
                  icon: Ban,
                  title: 'Menos bloqueos en servicios online',
                  desc: 'Al no compartir IP, evitas que servicios bloqueen tu acceso por actividades de terceros.',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <Icon size={18} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                        {item.title}
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="card-surface p-8">
            <h3 className="text-xl font-medium mb-6" style={{ color: 'var(--text)' }}>
              Ideal para usuarios Starlink
            </h3>
            <div className="space-y-5">
              {[
                {
                  icon: Satellite,
                  title: 'Obtén una IP fija chilena',
                  desc: 'Starlink usa IPs dinámicas. Con ZWS VPN tendrás una IP chilena fija y dedicada.',
                },
                {
                  icon: Home,
                  title: 'Evita problemas de CG-NAT',
                  desc: 'El CG-NAT de Starlink impide conexiones entrantes. Nuestra VPN te da una IP pública real.',
                },
                {
                  icon: Network,
                  title: 'Accede a tu red desde cualquier lugar',
                  desc: 'Conecta a tus dispositivos y servicios locales desde cualquier parte del mundo.',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <Icon size={18} style={{ color: 'var(--accent)' }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                        {item.title}
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {item.desc}
                      </p>
                    </div>
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
