import { ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 text-sm text-white/45 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading font-bold text-base tracking-tight text-white">Foldcraft<span className="text-white/40">.</span></p>
          <p className="font-body mt-1 text-xs text-white/50">Brand &amp; visual storytelling</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="text-white/55">© 2026 Foldcraft Studio</span>
          <a href="#home" onClick={(event) => { event.preventDefault(); scrollToSection("home"); }} className="inline-flex items-center gap-1 text-white transition-colors hover:text-white/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Back to top
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
