import { Github, Instagram, Mail, Twitter } from 'lucide-react';

const footerLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'VPN', href: '#vpn' },
  { label: 'VPS', href: '#vps' },
  { label: 'Software', href: '#software' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/zwscl/', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:desarrollo@zws.cl', label: 'Email' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      id="servicios"
      className="relative"
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Large Typography */}
        <h2
          className="font-mono-tech text-5xl sm:text-7xl md:text-[100px] font-medium tracking-tighter mb-16 opacity-10 select-none"
          style={{ color: 'var(--text)' }}
        >
          SOPORTE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Logo & Description */}
          <div>
            <img
              src="/logo.png"
              alt="ZWS"
              className="theme-logo mb-4 h-8 w-auto object-contain"
            />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              Infraestructura de hosting y VPN con IP dedicada en Chile. Seguridad, velocidad y estabilidad garantizadas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3
              className="font-mono-tech text-xs tracking-[0.2em] mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              NAVEGACIÓN
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm transition-colors duration-200 hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3
              className="font-mono-tech text-xs tracking-[0.2em] mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              REDES
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[var(--bg-secondary)]"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={(e) => social.href === '#' && e.preventDefault()}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            © 2026 ZWS. Todos los derechos reservados.
          </p>
          <p className="font-mono-tech text-xs" style={{ color: 'var(--text-secondary)' }}>
            Concepción, Chile
          </p>
        </div>
      </div>
    </footer>
  );
}
