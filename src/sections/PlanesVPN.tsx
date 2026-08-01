import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'ZWS VPN Basic',
    price: '$8.500',
    period: '/mes',
    recommended: false,
    features: [
      'IP chilena dedicada (no compartida)',
      '1 dispositivo',
      'Conexión segura con WireGuard',
      'Cifrado de alto nivel',
      'Velocidad estable (limitada)',
      'Windows / Android / iOS / macOS',
      'Soporte básico',
      'Activación automática',
    ],
    ideal: 'Uso personal, navegación segura, usuarios Starlink básicos',
  },
  {
    name: 'ZWS VPN Plus',
    price: '$15.000',
    period: '/mes',
    recommended: true,
    features: [
      'IP chilena dedicada exclusiva',
      'Hasta 3 dispositivos simultáneos',
      'Velocidad máxima (sin limitación)',
      'Prioridad de red',
      'Conexión estable optimizada',
      'Todos los dispositivos',
      'Soporte prioritario',
      'Activación automática',
    ],
    ideal: 'Gaming, trabajo remoto, múltiples dispositivos, Starlink',
  },
  {
    name: 'ZWS VPN Pro',
    price: '$19.000',
    period: '/mes',
    recommended: false,
    features: [
      'IP chilena dedicada privada',
      'Hasta 5 dispositivos simultáneos',
      'Máxima prioridad de red',
      'Rendimiento optimizado',
      'Acceso remoto seguro',
      'Estabilidad superior',
      'Soporte preferente',
      'Configuración personalizada',
    ],
    ideal: 'Empresas, equipos de trabajo, acceso remoto profesional',
  },
];

export default function PlanesVPN() {
  return (
    <section id="planes-vpn" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="font-mono-tech text-xs tracking-[0.3em] mb-3"
            style={{ color: 'var(--accent)' }}
          >
            PLANES
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
            Elige tu plan VPN
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Todos los planes incluyen IP dedicada chilena, soporte técnico y activación inmediata.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="relative flex h-full flex-col rounded-lg transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: plan.recommended
                  ? '1px solid var(--accent)'
                  : '1px solid var(--border)',
                boxShadow: plan.recommended
                  ? '0 0 30px rgba(55, 138, 221, 0.15), 0 8px 40px rgba(0,0,0,0.1)'
                  : 'none',
                padding: '32px 28px',
              }}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#ffffff',
                  }}
                >
                  <Star size={12} fill="currentColor" />
                  Recomendado
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3
                  className="text-lg font-medium mb-2"
                  style={{ color: 'var(--text)' }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-3xl sm:text-4xl font-semibold"
                    style={{ color: 'var(--text)' }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-6">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: 'var(--accent)' }}
                    />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Ideal For */}
              <div
                className="rounded-md p-3 mb-6 text-xs"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span className="font-medium" style={{ color: 'var(--text)' }}>Ideal para:</span>{' '}
                {plan.ideal}
              </div>

              {/* CTA */}
              <a
                href="https://clientes.zws.cl/index.php?rp=/store/vpn"
                aria-label={`Contratar ${plan.name} en clientes.zws.cl`}
                className="w-full text-center py-3 rounded font-medium text-sm transition-all duration-200"
                style={{
                  backgroundColor: plan.recommended ? 'var(--accent)' : 'transparent',
                  color: plan.recommended ? '#ffffff' : 'var(--text)',
                  border: plan.recommended ? 'none' : '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  if (!plan.recommended) {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--accent)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.recommended) {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text)';
                  }
                }}
              >
                Contratar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
