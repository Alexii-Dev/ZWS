import {
  ArrowUpRight,
  Code2,
  Database,
  LayoutTemplate,
  Mail,
  PanelsTopLeft,
  ShoppingCart,
  Wrench,
} from 'lucide-react';

const services = [
  {
    icon: LayoutTemplate,
    title: 'Páginas web corporativas',
    description:
      'Sitios rápidos, modernos y adaptados a celulares, pensados para presentar tu marca y convertir visitas en oportunidades.',
  },
  {
    icon: ShoppingCart,
    title: 'Tiendas online',
    description:
      'Experiencias de compra claras y seguras, con catálogo, pagos e integraciones preparadas para vender.',
  },
  {
    icon: PanelsTopLeft,
    title: 'Plataformas y sistemas web',
    description:
      'Paneles, portales y herramientas internas construidas alrededor de los procesos reales de tu negocio.',
  },
  {
    icon: Code2,
    title: 'Frontend a medida',
    description:
      'Interfaces claras y fluidas, desarrolladas a medida para representar tu marca y simplificar cada interacción.',
  },
  {
    icon: Database,
    title: 'Backend, APIs e integraciones',
    description:
      'Lógica, bases de datos y conexiones con otros servicios para que tu producto funcione de forma segura y escalable.',
  },
  {
    icon: Wrench,
    title: 'Mantenimiento y evolución',
    description:
      'Mejoras, soporte técnico y nuevas funciones para mantener tu solución estable y acompañar su crecimiento.',
  },
];

export default function Software() {
  return (
    <section
      id="software"
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 grid grid-cols-1 items-end gap-8 md:grid-cols-2">
          <div>
            <p
              className="font-mono-tech mb-3 text-xs tracking-[0.3em]"
              style={{ color: 'var(--accent)' }}
            >
              DESARROLLO A MEDIDA
            </p>
            <h2
              className="text-3xl font-semibold leading-tight sm:text-4xl"
              style={{ color: 'var(--text)' }}
            >
              Desarrollo web y software de principio a fin
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed sm:text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            Convertimos ideas y necesidades de negocio en productos digitales completos.
            Diseñamos, desarrollamos e integramos cada parte de la solución, desde la primera
            conversación hasta su lanzamiento.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="card-surface flex h-full flex-col p-7">
                <div
                  className="mb-6 flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <Icon size={21} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="mb-3 text-lg font-medium" style={{ color: 'var(--text)' }}>
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>

        <div
          className="flex flex-col items-start justify-between gap-6 rounded-xl p-7 sm:flex-row sm:items-center sm:p-8"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <Mail size={20} style={{ color: 'var(--accent)' }} />
            </div>
            <div>
              <h3 className="mb-1 text-base font-medium" style={{ color: 'var(--text)' }}>
                ¿Tienes un proyecto en mente?
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Cuéntanos qué necesitas y conversemos sobre la mejor forma de construirlo.
              </p>
            </div>
          </div>
          <a
            href="mailto:desarrollo@zws.cl?subject=Quiero%20cotizar%20un%20proyecto%20de%20desarrollo"
            className="btn-primary shrink-0"
          >
            desarrollo@zws.cl
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
