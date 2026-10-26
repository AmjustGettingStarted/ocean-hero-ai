import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { navLinks, scrollToSection, sectionIds } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const reducedMotion = useReducedMotionSafe();

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 border-b border-transparent transition-colors duration-300 ${scrolled ? "border-white/10 bg-black/45 backdrop-blur-xl" : "bg-transparent"}`}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: -12, opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.6 }}
      >
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12" aria-label="Primary navigation">
          <a
            href="#home"
            className="relative z-50 text-lg font-semibold tracking-[-0.04em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-xl"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("home");
              closeMobileMenu();
            }}
          >
            Foldcraft<span className="text-white/40">.</span>
          </a>

          <LayoutGroup id="primary-navigation">
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${isActive ? "text-white" : "text-white/55 hover:text-white"}`}
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
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 md:inline-flex"
              onClick={() => scrollToSection("reach-us")}
            >
              Let&apos;s Talk
            </button>
            <button
              type="button"
              className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
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
        </nav>
      </motion.header>
      <MobileMenu open={mobileMenuOpen} activeSection={activeSection} onClose={closeMobileMenu} />
    </>
  );
}
