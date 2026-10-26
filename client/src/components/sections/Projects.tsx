import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { projects } from "@/data/projects";
import { siteCopy } from "@/data/site";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.14, 0.82, 1], [0.3, 1, 1, 0.45]);
  const sectionY = useTransform(scrollYProgress, [0, 1], [44, -44]);
  const headingX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-34, 34]);

  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-title"
      className="relative min-h-[100svh] scroll-mt-20 px-5 py-28 sm:px-8 sm:py-36 lg:px-12"
      style={{ opacity: reducedMotion ? 1 : sectionOpacity, y: reducedMotion ? 0 : sectionY }}
    >
      <div className="mx-auto max-w-7xl">
        <ParallaxLayer distance={18} direction="down" className="mb-14 flex flex-col gap-5 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-white/55 sm:text-sm">{siteCopy.projectsEyebrow}</p>
            </Reveal>
            <motion.h2
              id="projects-title"
              className="max-w-xl text-[clamp(2.6rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.06em] text-white"
              style={{ x: reducedMotion ? 0 : headingX }}
            >
              Work with a pulse.
            </motion.h2>
          </div>
          <Reveal delay={0.12} className="max-w-xs sm:pb-1">
            <p className="text-sm leading-relaxed text-white/55 sm:text-base">
              A selection of identities, campaigns, and digital worlds built to stay with you.
            </p>
          </Reveal>
        </ParallaxLayer>

        <div className="grid gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-8 lg:gap-x-8">
          {projects.map((project, index) => {
            const fromRight = index % 2 === 0;
            const parallaxDistance = 18 + (index % 3) * 11;
            return (
              <ParallaxLayer key={project.name} distance={parallaxDistance} direction={index % 3 === 1 ? "down" : "up"}>
                <motion.article
                  className={`group relative min-h-[18rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-md sm:min-h-[22rem] sm:p-7 ${index % 2 === 1 ? "md:mt-16" : ""}`}
                  initial={{ opacity: 0, x: reducedMotion ? 0 : fromRight ? 46 : -46, rotate: reducedMotion ? 0 : fromRight ? 2.5 : -2.5 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reducedMotion ? undefined : { y: -8, scale: 1.012 }}
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-70 transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.24),transparent_24%)]" />

                  <div className="relative flex h-full min-h-[17rem] flex-col justify-between sm:min-h-[20rem]">
                    <div className="flex items-start justify-between text-xs uppercase tracking-[0.22em] text-white/60">
                      <span>{project.number}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">{project.name}</h3>
                      <div className="mt-3 flex items-center justify-between gap-4 text-sm text-white/60">
                        <span>{project.category}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </ParallaxLayer>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
