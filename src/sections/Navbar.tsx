import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'VPN', href: '#vpn' },
  { label: 'VPS', href: '#vps' },
  { label: 'Software', href: '#software' },
  { label: 'Contacto', href: '#servicios' },
];

const searchItems = [
  {
    title: 'Inicio',
    description: 'VPN e infraestructura chilena con IP dedicada.',
    href: '#inicio',
    keywords: 'inicio portada fortaleza digital infraestructura chile',
  },
  {
    title: 'VPN con IP dedicada',
    description: 'Conexión privada, IP chilena y baja latencia.',
    href: '#vpn',
    keywords: 'vpn ip dedicada privada chile seguridad latencia',
  },
  {
    title: 'Beneficios',
    description: 'Privacidad, velocidad y acceso remoto seguro.',
    href: '#beneficios',
    keywords: 'beneficios privacidad velocidad seguridad acceso remoto',
  },
  {
    title: 'Planes VPN',
    description: 'Compara los planes disponibles de ZWS VPN.',
    href: '#planes-vpn',
    keywords: 'planes precios contratar vpn mensual trimestral anual',
  },
  {
    title: '¿Por qué ZWS?',
    description: 'Conoce las ventajas de una IP exclusiva y fija.',
    href: '#por-que-zws',
    keywords: 'comparativa starlink cgnat ip fija exclusiva',
  },
  {
    title: 'Compatibilidad',
    description: 'Windows, macOS, Linux, Android, iPhone y iPad.',
    href: '#compatibilidad',
    keywords: 'dispositivos wireguard windows mac linux android iphone ipad',
  },
  {
    title: 'Preguntas frecuentes',
    description: 'Respuestas sobre instalación, IP y funcionamiento.',
    href: '#faq',
    keywords: 'faq preguntas ayuda instalacion soporte funcionamiento',
  },
  {
    title: 'Servidores VPS',
    description: 'Próximamente: servidores virtuales privados en Chile.',
    href: '#vps',
    keywords: 'vps servidor virtual recursos dedicados proximamente',
  },
  {
    title: 'Desarrollo de software',
    description: 'Páginas web, frontend y backend a medida.',
    href: '#software',
    keywords: 'software desarrollo paginas web frontend backend programacion',
  },
  {
    title: 'Contacto',
    description: 'Canales de contacto y soporte de ZWS.',
    href: '#servicios',
    keywords: 'contacto correo email soporte redes',
  },
];

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const searchResults = useMemo(() => {
    const terms = normalizeText(searchQuery).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];

    return searchItems.filter((item) => {
      const searchableText = normalizeText(
        `${item.title} ${item.description} ${item.keywords}`,
      );
      return terms.every((term) => searchableText.includes(term));
    });
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const goToSection = (href: string) => {
    const el = document.getElementById(href.replace('#', ''));
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSearchOpen(false);
    setSearchQuery('');
    setMobileOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    goToSection(href);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchResults[0]) {
      goToSection(searchResults[0].href);
    }
  };

  const renderSearchResults = (mobile = false) => {
    if (!searchQuery.trim()) return null;

    return (
      <div
        id={mobile ? 'mobile-search-results' : 'desktop-search-results'}
        className={
          mobile
            ? 'mt-2 overflow-hidden rounded-lg border'
            : 'absolute right-0 top-full mt-3 w-80 overflow-hidden rounded-lg border shadow-2xl'
        }
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border)',
        }}
        role="listbox"
        aria-label="Resultados de búsqueda"
      >
        {searchResults.length ? (
          searchResults.map((result) => (
            <button
              key={result.href}
              type="button"
              onClick={() => goToSection(result.href)}
              className="group flex w-full items-center gap-3 border-b px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-[var(--bg-secondary)]"
              style={{ borderColor: 'var(--border)' }}
              role="option"
              aria-selected="false"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium" style={{ color: 'var(--text)' }}>
                  {result.title}
                </span>
                <span
                  className="mt-0.5 block text-xs leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {result.description}
                </span>
              </span>
              <ArrowRight
                size={15}
                className="shrink-0 transition-transform group-hover:translate-x-1"
                style={{ color: 'var(--accent)' }}
              />
            </button>
          ))
        ) : (
          <p className="px-4 py-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
            No encontramos resultados para “{searchQuery}”.
          </p>
        )}
      </div>
    );
  };

  return (
    <nav
      id="inicio"
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        height: scrolled ? '60px' : '72px',
        backgroundColor: scrolled
          ? theme === 'dark'
            ? 'rgba(10,10,10,0.95)'
            : 'rgba(255,255,255,0.95)'
          : theme === 'dark'
            ? 'rgba(10,10,10,0.85)'
            : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, '#inicio')}
          className="flex flex-shrink-0 items-center gap-2"
          aria-label="Ir al inicio"
        >
          <img
            src="/logo.png"
            alt="ZWS"
            className="theme-logo h-8 w-auto object-contain"
          />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium transition-colors duration-200 hover:text-[var(--accent)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden items-center sm:flex">
            {searchOpen ? (
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200"
                role="search"
              >
                <div className="relative">
                  <Search
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-secondary)' }}
                  />
                  <input
                    ref={searchRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar en ZWS..."
                    className="w-56 rounded border py-2 pl-9 pr-3 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                    }}
                    aria-label="Buscar en el sitio"
                    aria-controls="desktop-search-results"
                    aria-expanded={Boolean(searchQuery.trim())}
                  />
                  {renderSearchResults()}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="rounded-md p-1.5 transition-colors hover:bg-[var(--bg-secondary)]"
                  aria-label="Cerrar búsqueda"
                >
                  <X size={16} style={{ color: 'var(--text-secondary)' }} />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="rounded-md p-2 transition-colors hover:bg-[var(--bg-secondary)]"
                aria-label="Abrir búsqueda"
              >
                <Search size={18} style={{ color: 'var(--text-secondary)' }} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md p-2 transition-colors hover:bg-[var(--bg-secondary)]"
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {theme === 'dark' ? (
              <Sun size={18} style={{ color: 'var(--text-secondary)' }} />
            ) : (
              <Moon size={18} style={{ color: 'var(--text-secondary)' }} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 transition-colors hover:bg-[var(--bg-secondary)] md:hidden"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={20} style={{ color: 'var(--text)' }} />
            ) : (
              <Menu size={20} style={{ color: 'var(--text)' }} />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="absolute left-0 right-0 top-full border-b animate-in fade-in slide-in-from-top-2 duration-200 md:hidden"
          style={{
            backgroundColor:
              theme === 'dark' ? 'rgba(10,10,10,0.98)' : 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(12px)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex flex-col gap-2 px-4 py-4">
            <form onSubmit={handleSearchSubmit} className="mb-2" role="search">
              <div className="flex items-center gap-2">
                <Search size={16} style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en ZWS..."
                  className="flex-1 rounded border px-3 py-2 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text)',
                  }}
                  aria-label="Buscar en el sitio"
                  aria-controls="mobile-search-results"
                  aria-expanded={Boolean(searchQuery.trim())}
                />
              </div>
              {renderSearchResults(true)}
            </form>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--bg-secondary)]"
                style={{ color: 'var(--text)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
