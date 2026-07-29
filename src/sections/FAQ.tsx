import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: '¿Qué es una VPN con IP dedicada?',
    a: 'Es una VPN donde la dirección IP es exclusiva para un solo usuario, evitando bloqueos y mejorando la estabilidad. A diferencia de las VPN compartidas, nadie más usa tu IP.',
  },
  {
    q: '¿La VPN funciona con Starlink?',
    a: 'Sí, es ideal para usuarios Starlink. Permite tener una IP fija chilena y evitar problemas de CG-NAT, algo que el servicio de Starlink no ofrece por defecto.',
  },
  {
    q: '¿Cuántos dispositivos puedo usar?',
    a: 'Depende de tu plan: Basic incluye 1 dispositivo, Plus permite hasta 3 dispositivos simultáneos, y Pro soporta hasta 5 dispositivos conectados a la vez.',
  },
  {
    q: '¿Es difícil de configurar?',
    a: 'No. Solo instala la app WireGuard en tu dispositivo y escanea el código QR que te enviamos al correo tras la contratación. Listo en menos de 5 minutos.',
  },
  {
    q: '¿Qué es CG-NAT y cómo me afecta en Starlink?',
    a: 'CG-NAT (Carrier-Grade NAT) es cuando varios usuarios comparten una misma IP pública. Esto impide abrir puertos, acceder a cámaras remotas o usar ciertos servicios. Con ZWS VPN obtienes una IP chilena fija y exclusiva, eliminando ese problema por completo.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];
      if (items.length === 0) return;

      // Set initial stacked state
      gsap.set(items, {
        y: (i) => i * 8,
        scale: 0.96,
        opacity: 0.7,
      });

      // Create the fan-out animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      items.forEach((item, i) => {
        tl.to(
          item,
          {
            scale: 1,
            y: 0,
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'back.out(1.4)',
          },
          i * 0.08
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="section-padding" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="font-mono-tech text-xs tracking-[0.3em] mb-3"
            style={{ color: 'var(--accent)' }}
          >
            AYUDA
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
            Preguntas frecuentes
          </h2>
        </div>

        <div ref={containerRef} className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className="rounded-lg overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
              >
                <span
                  className="text-sm sm:text-base font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: 'var(--accent)',
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: openIndex === i ? '300px' : '0px',
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <div
                  className="px-5 pb-4 text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
