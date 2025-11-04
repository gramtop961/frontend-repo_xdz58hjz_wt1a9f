import { useEffect, useMemo, useRef, useState } from 'react';

function CRTPanel({ title, children }) {
  return (
    <div className="relative rounded-lg border border-white/15 bg-[#0b0b11]/80 p-5 shadow-[inset_0_0_24px_rgba(168,85,247,0.12),0_0_30px_rgba(34,211,238,0.08)] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-fuchsia-500/40 via-cyan-400/40 to-transparent" />
      <h3 className="mb-3 font-mono text-sm tracking-widest uppercase text-cyan-200/90">{title}</h3>
      <div className="text-white/80">{children}</div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:100%_3px]" />
    </div>
  );
}

function CodeRain() {
  // Matrix-like glyph stream
  const chars = '01█▒░#@$%&*ABCDEF';
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((f) => f + 1), 120);
    return () => clearInterval(id);
  }, []);

  const lines = useMemo(() => {
    return Array.from({ length: 14 }, (_, row) => (
      Array.from({ length: 48 }, (_, col) => {
        const idx = (row * 31 + col * 17 + frame) % chars.length;
        return chars[idx];
      }).join(' ')
    ));
  }, [frame]);

  return (
    <pre className="h-64 w-full overflow-hidden rounded-md border border-white/10 bg-black/60 p-4 font-mono text-xs leading-4 text-emerald-300/90">
      {lines.map((l, i) => (
        <div key={i} className="animate-pulse [animation-duration:3s]">{l}</div>
      ))}
    </pre>
  );
}

function Terminal() {
  const [log, setLog] = useState([
    'boot: initializing Solith node... ✓',
    'net: connecting to solana mainnet-beta...',
    'dex: subscribing to liquidity pools (orca, raydium, phoenix)...',
    'oracle: streaming on-chain flows... ✓',
  ]);
  const [cmd, setCmd] = useState('signals.stream --pair SOL/USDC --tf 1m');
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [log]);

  const run = () => {
    const time = new Date().toISOString();
    setLog((l) => [
      ...l,
      `> ${cmd}`,
      `[${time}] engine: compiling strategy... ✓`,
      `[${time}] fetch: pulling DefiLlama feeds... ✓`,
      `[${time}] compute: generating signals...`,
      `[${time}] signal: SOL long +0.84σ | confidence 73%`,
    ]);
    setCmd('');
  };

  return (
    <div className="rounded-lg border border-white/10 bg-black/70">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2">
        <div className="flex gap-1">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-xs text-white/60">solith://terminal</span>
      </div>
      <div ref={ref} className="h-72 overflow-auto p-3 font-mono text-xs text-emerald-300/90">
        {log.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap">{l}</div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t border-white/10 p-2">
        <input
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && run()}
          placeholder="type a command..."
          className="flex-1 bg-black/60 text-emerald-200 placeholder:text-emerald-200/40 outline-none rounded px-3 py-2 font-mono text-xs border border-emerald-400/20 focus:border-emerald-400/50"
        />
        <button onClick={run} className="px-3 py-2 rounded border border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/10">
          Run
        </button>
      </div>
    </div>
  );
}

export default function Sections({ route }) {
  if (route === '/docs') return <Docs />;
  if (route === '/terminal') return <TerminalPage />;
  if (route === '/app') return <AppPage />;
  return <HomeSections />;
}

function HomeSections() {
  return (
    <section className="relative bg-[#07070b] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <CRTPanel title="01 • Narrative">
          Solith Protocol is a DefiLlama market signals framework built for the Solana ecosystem. We fuse on-chain liquidity, order-flow, wallet cohorts and macro sentiment into clean, low-latency signals designed for execution.
        </CRTPanel>
        <CRTPanel title="02 • Market Signals">
          Multi-modal indicators: funding/borrow dynamics, AMM skew, DEX depth, MEV pressure, stablecoin flow and NFT liquidity spillover — synthesized into interpretable scores.
        </CRTPanel>
        <CRTPanel title="03 • Oracles & Data">
          Plugs into DefiLlama, Pyth, Switchboard and native RPC streams. Batches by slot, reconciles drift and outputs time-synchronized features.
        </CRTPanel>
        <CRTPanel title="04 • Signal Types">
          Directional, mean-reversion, breakout and volatility regime detectors. Each surfaced with confidence, strength and decay profiles.
        </CRTPanel>
        <CRTPanel title="05 • Strategy Lab">
          Compose signals with a simple DSL. Backtest with realistic fees and slippage. Export to your favorite executors.
        </CRTPanel>
        <CRTPanel title="06 • Risk Engine">
          Exposure caps, kill-switches and drawdown guardians tuned to Solana’s block times. Risk-first by design.
        </CRTPanel>
        <CRTPanel title="07 • Integrations">
          Out-of-the-box hooks for DEXs and vaults. Webhooks and websocket streams for custom infra.
        </CRTPanel>
        <CRTPanel title="08 • Solana Native">
          Ultra-fast pipelines leveraging parallelism — typical signal latency ~120ms.
        </CRTPanel>
        <CRTPanel title="09 • Community">
          Join the builders. Share strategies, audit signals, and help steer the roadmap.
        </CRTPanel>
        <CRTPanel title="10 • Code Backrooms">
          A peek behind the curtain — live glyph streams from the engine.
          <div className="mt-4"><CodeRain /></div>
        </CRTPanel>
        <CRTPanel title="Terminal Preview">
          <Terminal />
        </CRTPanel>
      </div>
    </section>
  );
}

function Docs() {
  return (
    <section className="bg-[#07070b] text-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
        <aside className="h-max sticky top-24 hidden lg:block">
          <div className="rounded-lg border border-white/10 bg-black/40 p-4">
            <div className="font-mono text-xs uppercase text-white/60 mb-2">Docs</div>
            <ul className="space-y-2 text-sm">
              <li className="text-cyan-300">Intro</li>
              <li className="text-white/80">Quickstart</li>
              <li className="text-white/80">Signals</li>
              <li className="text-white/80">API</li>
            </ul>
          </div>
        </aside>
        <article>
          <div className="prose prose-invert max-w-none">
            <h1>Solith Protocol Documentation</h1>
            <p>
              Solith provides low-latency signals built on Solana. Use the stream endpoints to subscribe to
              pair-specific signals and integrate with executors.
            </p>
            <h2>Quickstart</h2>
            <pre className="rounded-md border border-white/10 bg-black/60 p-4 text-emerald-300 overflow-auto"><code>
              curl https://api.solith.dev/signals/stream?pair=SOL/USDC&tf=1m
            </code></pre>
            <h2>Signal Object</h2>
            <pre className="rounded-md border border-white/10 bg-black/60 p-4 overflow-auto text-emerald-300"><code>{`{
  pair: "SOL/USDC",
  tf: "1m",
  regime: "trend",
  direction: "long",
  strength: 0.84,
  confidence: 0.73,
  decay: 22
}`}</code></pre>
          </div>
        </article>
      </div>
    </section>
  );
}

function TerminalPage() {
  return (
    <section className="bg-[#07070b] text-white pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-4">Interactive Terminal</h2>
        <p className="text-white/70 mb-6">Run demo commands to see mock outputs from the Solith engine. This is a local simulation.</p>
        <Terminal />
      </div>
    </section>
  );
}

function AppPage() {
  return (
    <section className="bg-[#07070b] text-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-2xl font-bold">App Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CRTPanel title="Signals Live">
            Real-time views of directional and regime changes with confidence scores.
          </CRTPanel>
          <CRTPanel title="Positions">
            Connect your wallet to visualize positions across integrated venues.
          </CRTPanel>
          <CRTPanel title="Risk Controls">
            Configure exposure caps and global circuit-breakers for automated strategies.
          </CRTPanel>
        </div>
        <CRTPanel title="Strategy Composer">
          Compose and backtest strategies using a simple expression language.
          <div className="mt-3">
            <pre className="rounded-md border border-white/10 bg-black/60 p-3 text-emerald-300 overflow-auto"><code>{`when(signal.trend.long > 0.7 and rollvol < 0.5) then allocate 0.3 SOL`}</code></pre>
          </div>
        </CRTPanel>
      </div>
    </section>
  );
}
