import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useCallback, useState } from "react";
import { navLinks, scrollToSection, sectionIds } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const reducedMotion = useReducedMotionSafe();

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 z-50 w-full pointer-events-none px-6 md:px-12 py-5 flex items-center justify-between"
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -12, opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.6 }}
      >
        {/* Left Island: Brand Logo */}
        <div className="pointer-events-auto flex items-center">
          <a
            href="#home"
            className="font-heading text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-2xl drop-shadow-md"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("home");
              closeMobileMenu();
            }}
          >
            Foldcraft<span className="text-white/40">.</span>
          </a>
        </div>

        {/* Center Island: Floating Glass Navigation Capsule */}
        <LayoutGroup id="primary-navigation">
          <nav
            className="pointer-events-auto hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl md:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`relative rounded-full px-3 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(link.id);
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </LayoutGroup>

        {/* Right Island: Independent CTA Button & Mobile Toggle */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow-lg transition-all hover:bg-slate-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 md:inline-flex"
            onClick={() => scrollToSection("reach-us")}
          >
            Let&apos;s Talk
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white shadow-lg backdrop-blur-xl transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <MobileMenu
        open={mobileMenuOpen}
        activeSection={activeSection}
        onClose={closeMobileMenu}
      />
    </>
  );
}
