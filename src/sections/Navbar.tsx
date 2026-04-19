import { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'VPN', href: '#vpn' },
  { label: 'VPS', href: '#vps' },
  { label: 'Servicios', href: '#servicios' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 2) {
      const searchableIds = ['beneficios', 'planes-vpn', 'faq'];
      for (const id of searchableIds) {
        const el = document.getElementById(id);
        if (el) {
          const text = el.innerText.toLowerCase();
          if (text.includes(query)) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            break;
          }
        }
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      id="inicio"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: scrolled ? '60px' : '72px',
        backgroundColor: scrolled
          ? theme === 'dark' ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)'
          : theme === 'dark' ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/logo.png"
            alt="ZWS"
            className="h-8 w-auto object-contain"
            style={{
              filter: theme === 'light' ? 'invert(0)' : 'invert(0)',
            }}
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
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

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden sm:flex items-center relative">
            {searchOpen ? (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Buscar..."
                  className="w-48 px-3 py-1.5 text-sm rounded border transition-all duration-200 focus:outline-none focus:ring-1"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text)',

                  }}
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="p-1.5 rounded-md transition-colors hover:bg-[var(--bg-secondary)]"
                >
                  <X size={16} style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-md transition-colors hover:bg-[var(--bg-secondary)]"
                aria-label="Buscar"
              >
                <Search size={18} style={{ color: 'var(--text-secondary)' }} />
              </button>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md transition-colors hover:bg-[var(--bg-secondary)]"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? (
              <Sun size={18} style={{ color: 'var(--text-secondary)' }} />
            ) : (
              <Moon size={18} style={{ color: 'var(--text-secondary)' }} />
            )}
          </button>

          {/* Login Button */}
          <a
            href="https://zws.cl/clientarea"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex btn-primary text-sm py-2 px-5"
          >
            Ingresar
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md transition-colors hover:bg-[var(--bg-secondary)]"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X size={20} style={{ color: 'var(--text)' }} />
            ) : (
              <Menu size={20} style={{ color: 'var(--text)' }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 border-b animate-in fade-in slide-in-from-top-2 duration-200"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(10,10,10,0.98)' : 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(12px)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-2">
            {/* Mobile Search */}
            <div className="flex items-center gap-2 mb-2">
              <Search size={16} style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Buscar planes, FAQ..."
                className="flex-1 px-3 py-2 text-sm rounded border transition-all focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              />
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-[var(--bg-secondary)]"
                style={{ color: 'var(--text)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://zws.cl/clientarea"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2.5 px-5 mt-2 justify-center"
            >
              Ingresar
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
