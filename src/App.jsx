import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sections from './components/Sections';
import Footer from './components/Footer';

export default function App() {
  const [route, setRoute] = useState(window.location.pathname || '/');
  const [loading, setLoading] = useState(true);

  // Simple client-side routing without extra deps
  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(id);
  }, []);

  const navigate = (href) => {
    if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      setRoute(href);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07070b] grid place-items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,#9333ea_0%,transparent_40%),radial-gradient(circle_at_80%_30%,#06b6d4_0%,transparent_35%)]" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 h-14 w-14 rounded-lg border border-fuchsia-400/40 bg-fuchsia-500/10 grid place-items-center animate-spin-slow">
            <span className="block h-7 w-7 rounded-sm bg-cyan-400/70" />
          </div>
          <div className="font-black text-2xl [text-shadow:0_0_18px_rgba(34,211,238,0.35)]">Solith Protocol</div>
          <div className="mt-2 font-mono text-xs tracking-widest uppercase text-white/70">Booting systems...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070b] text-white">
      <Navbar />
      {route === '/' && <Hero onCTAClick={navigate} />}
      <Sections route={route} />
      <Footer />
    </div>
  );
}

// Tailwind keyframes via utility plugin not guaranteed, so use inline style for the slow spin
// eslint-disable-next-line no-undef
const style = document.createElement('style');
style.innerHTML = `@keyframes spin-slow { from { transform: rotate(0); } to { transform: rotate(360deg); } }
.animate-spin-slow { animation: spin-slow 2.8s linear infinite; }`;
document.head.appendChild(style);
