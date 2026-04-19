import { Shield, Lock, Zap, Globe, Monitor, QrCode } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'IP chilena dedicada',
    desc: 'Tu dirección IP es exclusiva, no compartida con otros usuarios. Máxima privacidad y control total.',
  },
  {
    icon: Lock,
    title: 'Sin bloqueos ni baneos',
    desc: 'Tu IP es solo tuya. Olvídate de restricciones por uso compartido o actividades de terceros.',
  },
  {
    icon: Zap,
    title: 'Conexión rápida y estable',
    desc: 'Tecnología WireGuard de última generación para la máxima velocidad y estabilidad de conexión.',
  },
  {
    icon: Globe,
    title: 'Acceso desde cualquier lugar',
    desc: 'Conecta desde cualquier parte del mundo con una IP fija chilena. Ideal para nómadas digitales.',
  },
  {
    icon: Monitor,
    title: 'Compatible con todos los dispositivos',
    desc: 'Windows, macOS, Linux, Android e iOS. Protege todos tus equipos con una sola suscripción.',
  },
  {
    icon: QrCode,
    title: 'Configuración en minutos',
    desc: 'Instala la app WireGuard, escanea el QR que te enviamos y listo. Sin complicaciones técnicas.',
  },
];

export default function Beneficios() {
  return (
    <section id="beneficios" className="section-padding" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="font-mono-tech text-xs tracking-[0.3em] mb-3"
            style={{ color: 'var(--accent)' }}
          >
            VENTAJAS
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
            Por qué elegir ZWS VPN
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Infraestructura propia en Chile con las mejores especificaciones técnicas del mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="card-surface p-6 sm:p-8 group"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <Icon size={22} style={{ color: 'var(--accent)' }} />
                </div>
                <h3
                  className="text-lg font-medium mb-2"
                  style={{ color: 'var(--text)' }}
                >
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
