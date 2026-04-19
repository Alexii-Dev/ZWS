import { useState, useEffect } from 'react';
import { Server, Cpu, HardDrive, AlertTriangle } from 'lucide-react';

interface VPSPlan {
  pid: number;
  name: string;
  description: string;
  pricing: {
    CLP?: {
      monthly: string;
    };
  };
  stocklevel: number;
}

export default function PlanesVPS() {
  const [plans, setPlans] = useState<VPSPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Simulated API call - in production this would hit the WHMCS API
        // const response = await fetch(`${import.meta.env.REACT_APP_WHMCS_URL}/includes/api.php`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     action: 'GetProducts',
        //     identifier: import.meta.env.REACT_APP_WHMCS_IDENTIFIER,
        //     secret: import.meta.env.REACT_APP_WHMCS_SECRET,
        //     responsetype: 'json',
        //   }),
        // });

        // Simulated data for demo purposes
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockPlans: VPSPlan[] = [
          {
            pid: 101,
            name: 'VPS Basic',
            description: '1 vCPU | 2 GB RAM | 40 GB SSD',
            pricing: { CLP: { monthly: '12.900' } },
            stocklevel: 5,
          },
          {
            pid: 102,
            name: 'VPS Pro',
            description: '2 vCPU | 4 GB RAM | 80 GB SSD',
            pricing: { CLP: { monthly: '24.900' } },
            stocklevel: 0,
          },
          {
            pid: 103,
            name: 'VPS Enterprise',
            description: '4 vCPU | 8 GB RAM | 160 GB SSD',
            pricing: { CLP: { monthly: '49.900' } },
            stocklevel: 3,
          },
        ];

        setPlans(mockPlans);
        setLoading(false);
      } catch {
        setError('No se pudieron cargar los planes VPS. Inténtalo más tarde.');
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const SkeletonCard = () => (
    <div
      className="rounded-lg p-6 animate-pulse"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div className="h-5 w-32 rounded mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }} />
      <div className="h-8 w-24 rounded mb-3" style={{ backgroundColor: 'var(--bg-secondary)' }} />
      <div className="h-4 w-full rounded mb-2" style={{ backgroundColor: 'var(--bg-secondary)' }} />
      <div className="h-4 w-3/4 rounded mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }} />
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }} />
        <div className="h-6 w-16 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }} />
      </div>
      <div className="h-10 w-full rounded" style={{ backgroundColor: 'var(--bg-secondary)' }} />
    </div>
  );

  return (
    <section id="vps" className="section-padding" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="font-mono-tech text-xs tracking-[0.3em] mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            INFRAESTRUCTURA
          </p>
          <h2
            className="text-2xl sm:text-3xl font-semibold mb-3"
            style={{ color: 'var(--text)' }}
          >
            ¿Necesitas un servidor? También tenemos VPS
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Servidores virtuales privados con recursos dedicados y panel de control incluido.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : error ? (
          <div
            className="flex items-center gap-3 justify-center py-8 rounded-lg"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <AlertTriangle size={20} style={{ color: '#e74c3c' }} />
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {error}
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const specs = plan.description.split('|').map((s) => s.trim());
              const outOfStock = plan.stocklevel <= 0;

              return (
                <div
                  key={plan.pid}
                  className="rounded-lg p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Server size={18} style={{ color: 'var(--accent)' }} />
                    <h3
                      className="text-base font-medium"
                      style={{ color: 'var(--text)' }}
                    >
                      {plan.name}
                    </h3>
                  </div>

                  <div className="mb-4">
                    <span
                      className="text-2xl font-semibold"
                      style={{ color: 'var(--text)' }}
                    >
                      ${plan.pricing?.CLP?.monthly || 'N/A'}
                    </span>
                    <span className="text-sm ml-1" style={{ color: 'var(--text-secondary)' }}>
                      /mes
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {specs.map((spec, si) => (
                      <span
                        key={si}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded"
                        style={{
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {spec.includes('CPU') && <Cpu size={10} />}
                        {spec.includes('GB') && spec.includes('RAM') && <HardDrive size={10} />}
                        {spec.includes('SSD') && <HardDrive size={10} />}
                        {spec}
                      </span>
                    ))}
                  </div>

                  {outOfStock && (
                    <div
                      className="inline-block text-xs px-3 py-1 rounded-full mb-4 font-medium"
                      style={{
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        color: '#e74c3c',
                      }}
                    >
                      Sin stock
                    </div>
                  )}

                  <a
                    href={`https://zws.cl/cart.php?a=add&pid=${plan.pid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center py-2.5 rounded text-sm font-medium transition-all duration-200 ${
                      outOfStock
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                    style={{
                      backgroundColor: outOfStock ? 'var(--bg-secondary)' : 'var(--accent)',
                      color: outOfStock ? 'var(--text-secondary)' : '#ffffff',
                      pointerEvents: outOfStock ? 'none' : 'auto',
                    }}
                    onClick={(e) => outOfStock && e.preventDefault()}
                  >
                    {outOfStock ? 'Agotado' : 'Contratar'}
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
