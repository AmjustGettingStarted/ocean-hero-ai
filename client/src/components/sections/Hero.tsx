import { ArrowDownRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { scrollToSection, siteCopy } from "@/data/site";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.78, 0.35]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, -54]);

  return (
    <motion.section ref={sectionRef} id="home" aria-labelledby="hero-title" className="relative box-border flex min-h-[100svh] items-end scroll-mt-20 px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:px-12" style={{ opacity: reducedMotion ? 1 : sectionOpacity, y: reducedMotion ? 0 : sectionY }}>
      <div className="mx-auto flex min-h-[calc(100svh-11rem)] w-full max-w-7xl flex-col justify-between gap-16">
        <ParallaxLayer distance={20} className="max-w-4xl">
          <Reveal>
            <p className="font-body mb-5 text-xs font-medium uppercase tracking-[0.24em] text-white/70 sm:text-sm">{siteCopy.eyebrow}</p>
            <SplitText id="hero-title" lines={siteCopy.heroHeadline} className="font-heading text-[clamp(2.75rem,8vw,7.5rem)] font-bold leading-[0.98] tracking-[-0.03em] text-white" />
          </Reveal>
        </ParallaxLayer>

        <ParallaxLayer distance={10} direction="down" className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <Reveal delay={0.18} className="max-w-xl" margin="0px">
            <p className="text-base leading-relaxed text-white/60 sm:text-lg">{siteCopy.heroDescription}</p>
          </Reveal>
          <Reveal delay={0.28} margin="0px">
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95"
            >
              Explore Work
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden="true" />
            </button>
          </Reveal>
        </ParallaxLayer>
      </div>

      <motion.div className="absolute bottom-7 right-5 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/55 sm:flex lg:right-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 1.2 }}>
        <span className="h-px w-8 bg-white/35" />
        Scroll
      </motion.div>
    </motion.section>
  );
}
