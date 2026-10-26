import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { navLinks, scrollToSection, type SectionId } from "@/data/site";
import { useEffect } from "react";

interface MobileMenuProps {
  open: boolean;
  activeSection: SectionId;
  onClose: () => void;
}

export function MobileMenu({ open, activeSection, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-navigation"
          className="fixed inset-0 z-40 bg-black/95 px-6 pb-10 pt-24 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.nav
            className="flex h-full flex-col justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`flex items-center justify-between border-b border-white/10 py-4 text-3xl font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${isActive ? "text-white" : "text-white/45 hover:text-white"}`}
                  variants={{ hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } }}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(link.id);
                    onClose();
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-6 w-6" aria-hidden="true" />
                </motion.a>
              );
            })}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
