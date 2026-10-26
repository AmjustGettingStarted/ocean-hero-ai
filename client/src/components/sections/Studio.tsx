import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { siteCopy } from "@/data/site";
import { studioProcess, studioServices, studioStats } from "@/data/studio";

function useCountUp(target: number, active: boolean, reducedMotion: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1100;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reducedMotion, target]);

  return value;
}

function AnimatedStat({ value, suffix, label, active, reducedMotion }: { value: number; suffix: string; label: string; active: boolean; reducedMotion: boolean }) {
  const count = useCountUp(value, active, reducedMotion);

  return (
    <div className="border-t border-white/15 pt-4">
      <p className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {count}
        <span className="text-white/45">{suffix}</span>
      </p>
      <p className="font-body mt-2 text-xs uppercase tracking-[0.18em] text-white/45">{label}</p>
    </div>
  );
}

export function Studio() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.78, 1], [0.4, 1, 1, 0.45]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <motion.section
      ref={sectionRef}
      id="studio"
      aria-labelledby="studio-title"
      className="relative min-h-[100svh] scroll-mt-20 px-5 py-28 sm:px-8 sm:py-36 lg:px-12"
      style={{ opacity: reducedMotion ? 1 : sectionOpacity, y: reducedMotion ? 0 : sectionY }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="font-body mb-4 text-xs font-medium uppercase tracking-[0.24em] text-white/55 sm:text-sm">{siteCopy.studioEyebrow}</p>
              <h2 id="studio-title" className="font-heading max-w-3xl text-[clamp(2.7rem,7vw,6.8rem)] font-bold leading-[0.94] tracking-[-0.03em] text-white">
                Small team. <span className="text-white/42">Big feeling.</span>
              </h2>
            </Reveal>
            <ParallaxLayer distance={18} direction="down" className="mt-8 max-w-xl sm:mt-12">
              <Reveal delay={0.12}>
                <p className="font-body text-lg leading-relaxed text-white/60 sm:text-xl">
                  Foldcraft is an independent brand and visual storytelling studio for people building the next meaningful thing. We make the invisible feel inevitable.
                </p>
              </Reveal>
            </ParallaxLayer>
          </div>

          <motion.div ref={statsRef} className="grid grid-cols-2 gap-x-5 gap-y-8 self-end sm:gap-x-8 sm:gap-y-10" initial="hidden" animate={statsInView ? "visible" : "hidden"} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
            {studioStats.map((stat) => (
              <motion.div key={stat.label} variants={{ hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: reducedMotion ? 0 : 0.65 } } }}>
                <AnimatedStat {...stat} active={statsInView} reducedMotion={reducedMotion} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-24 border-t border-white/10 pt-8 sm:mt-32 sm:pt-10">
          <Reveal>
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.24em] text-white/45">How we move</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {studioProcess.map((step, index) => (
              <motion.article
                key={step.title}
                className="border-b border-white/10 pb-7 md:border-b-0 md:border-l md:pb-0 md:pl-6"
                initial={{ opacity: 0, x: reducedMotion ? 0 : index === 1 ? 34 : index === 2 ? -34 : -34 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/35">0{index + 1}</span>
                <h3 className="font-heading mt-7 text-2xl font-bold tracking-[-0.02em] text-white">{step.title}</h3>
                <p className="font-body mt-3 max-w-xs text-sm leading-relaxed text-white/55">{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-24 overflow-hidden border-y border-white/10 py-5 sm:mt-32">
          <div className="flex min-w-max gap-3">
            {studioServices.map((service, index) => (
              <ParallaxLayer key={service} distance={8 + index * 3} direction={index % 2 === 0 ? "up" : "down"}>
                <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm">{service}</span>
              </ParallaxLayer>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
