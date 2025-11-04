import Spline from '@splinetool/react-spline';

export default function Hero({ onCTAClick }) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#07070b] text-white">
      {/* Spline scene as immersive background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlay for readability (non-blocking to interactions) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

      <div className="relative z-10 pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block rounded-md border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-1 text-xs tracking-widest uppercase text-fuchsia-200/90 mb-4">
              Solana Ecosystem • DeFi Signals
            </div>
            <h1 className="text-4xl sm:text-6xl font-black leading-tight [text-shadow:0_0_24px_rgba(34,211,238,0.35)]">
              Solith Protocol
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/80">
              A DefiLlama market signals framework for Solana — aggregating on-chain flows, sentiment, and liquidity to power execution-ready strategies.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onCTAClick('/terminal')}
                className="px-5 py-3 rounded border border-cyan-400/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20 transition shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              >
                Open Terminal
              </button>
              <button
                onClick={() => onCTAClick('/docs')}
                className="px-5 py-3 rounded border border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-200 hover:bg-fuchsia-500/20 transition"
              >
                Read Docs
              </button>
              <a
                href="https://x.com/SolithProtocol"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded border border-white/20 bg-white/5 text-white/90 hover:bg-white/10 transition"
              >
                Follow on X
              </a>
            </div>

            {/* Retro status bar */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ['Signals', '24'],
                ['Latency', '~120ms'],
                ['Markets', '52'],
                ['Integrations', '8'],
              ].map(([k, v]) => (
                <div key={k} className="rounded border border-white/10 bg-black/40 p-3">
                  <div className="text-xs text-white/60">{k}</div>
                  <div className="text-lg font-semibold text-cyan-200">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
