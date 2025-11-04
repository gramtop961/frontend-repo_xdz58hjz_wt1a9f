export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/60">© {new Date().getFullYear()} Solith Protocol. Built on Solana.</p>
        <div className="flex items-center gap-4 text-sm">
          <a href="/docs" className="text-white/80 hover:text-white">Docs</a>
          <a href="/terminal" className="text-white/80 hover:text-white">Terminal</a>
          <a href="/app" className="text-white/80 hover:text-white">App</a>
          <a href="https://x.com/SolithProtocol" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">X</a>
        </div>
      </div>
    </footer>
  );
}
