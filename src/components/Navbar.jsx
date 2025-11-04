import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs' },
  { label: 'Terminal', href: '/terminal' },
  { label: 'App', href: '/app' },
];

export default function Navbar() {
  const [active, setActive] = useState('/');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActive(window.location.pathname || '/');
    const onPop = () => setActive(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (href) => {
    if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      setActive(href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Text logo with subtle glow to mimic retro CRT */}
          <div className="relative">
            <span className="text-xl font-black tracking-tight text-white [text-shadow:0_0_12px_rgba(168,85,247,0.55)]">
              Solith Protocol
            </span>
            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-fuchsia-500/60 via-cyan-400/60 to-transparent" />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`text-sm font-medium transition-colors ${
                active === item.href ? 'text-cyan-300' : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://x.com/SolithProtocol"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-white/80 hover:text-white"
          >
            X
          </a>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border border-white/10 px-3 py-2 text-white/90"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80">
          <div className="px-4 py-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className={`text-left w-full px-3 py-2 rounded border border-white/10 bg-white/5 ${
                  active === item.href ? 'text-cyan-300' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://x.com/SolithProtocol"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded border border-white/10 bg-white/5 text-white/80 hover:text-white"
            >
              X
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
