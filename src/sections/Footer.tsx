import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Desarrollo', href: '#software' },
  { label: 'VPN', href: '#vpn' },
  { label: 'VPS', href: '#vps' },
];

const contactItems = [
  {
    icon: Mail,
    label: 'Correo',
    value: 'contacto@zws.cl',
    href: 'mailto:contacto@zws.cl',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+56933803167',
    href: 'tel:+56933803167',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Concepción, Chile',
  },
];

export default function Footer() {
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    document
      .getElementById(href.replace('#', ''))
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer
      id="servicios"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.05fr_1fr_1.05fr] lg:gap-16">
          <div>
            <img
              src="/logo.png"
              alt="ZWS"
              className="theme-logo mb-8 h-10 w-auto object-contain"
            />
            <h2
              className="mb-5 max-w-sm text-2xl font-semibold leading-tight sm:text-3xl"
              style={{ color: 'var(--text)' }}
            >
              Ideas digitales construidas para crecer.
            </h2>
            <p
              className="max-w-md text-sm leading-7"
              style={{ color: 'var(--text-secondary)' }}
            >
              Desarrollamos páginas web, plataformas y software a medida. También ofrecemos
              infraestructura VPN para conectar personas y equipos de forma segura.
            </p>
          </div>

          <div>
            <h3
              className="font-mono-tech mb-5 text-xs font-semibold tracking-[0.22em]"
              style={{ color: 'var(--text)' }}
            >
              CONTACTO
            </h3>
            <div>
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: 'rgba(55, 138, 221, 0.12)' }}
                    >
                      <Icon size={18} style={{ color: 'var(--accent)' }} />
                    </span>
                    <span>
                      <span
                        className="mb-1 block text-sm font-semibold"
                        style={{ color: 'var(--text)' }}
                      >
                        {item.label}
                      </span>
                      <span className="block text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {item.value}
                      </span>
                    </span>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex gap-4 border-b py-5 first:pt-0 transition-opacity hover:opacity-75"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="flex gap-4 border-b py-5 first:pt-0"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <h3
              className="font-mono-tech mb-5 text-xs font-semibold tracking-[0.22em]"
              style={{ color: 'var(--text)' }}
            >
              REDES SOCIALES
            </h3>
            <a
              href="https://www.instagram.com/zwscl/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-56 flex-col justify-between overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: '0 18px 50px rgba(0, 0, 0, 0.12)',
              }}
              aria-label="Visitar Instagram de ZWS"
            >
              <div className="flex items-start justify-between">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: 'var(--accent)', color: '#ffffff' }}
                >
                  <Instagram size={24} />
                </span>
                <ArrowUpRight
                  size={21}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  style={{ color: 'var(--accent)' }}
                />
              </div>
              <div>
                <p className="mb-1 text-lg font-semibold" style={{ color: 'var(--text)' }}>
                  Instagram
                </p>
                <p className="mb-4 text-sm" style={{ color: 'var(--accent)' }}>
                  @zwscl
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Sigue nuestros proyectos, novedades y servicios digitales.
                </p>
              </div>
            </a>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col gap-5 border-t pt-7 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            © 2026 ZWS. Todos los derechos reservados.
          </p>
          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="text-xs transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
