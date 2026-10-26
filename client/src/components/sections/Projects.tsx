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
                  className={`group relative card-clip min-h-[26rem] overflow-hidden rounded-[2rem] border border-white/15 bg-zinc-950 p-6 shadow-2xl transition-all duration-500 hover:border-white/35 sm:min-h-[30rem] sm:p-8 lg:min-h-[34rem] ${index % 2 === 1 ? "md:mt-16" : ""}`}
                  initial={{ opacity: 0, x: reducedMotion ? 0 : fromRight ? 46 : -46, rotate: reducedMotion ? 0 : fromRight ? 2.5 : -2.5 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reducedMotion ? undefined : { y: -8 }}
                >
                  {/* Full Bleed Background Project Image */}
                  <div className="pointer-events-none absolute inset-0 card-clip overflow-hidden rounded-[2rem]">
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="h-full w-full rounded-[2rem] object-cover will-change-transform transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Gentle Bottom Scrim for Text Readability without Dimming the Artwork */}
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/95 via-black/45 via-45% to-transparent transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/35" />

                  {/* Bespoke Accent Hue Wash */}
                  <div className={`pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-t ${project.accent} opacity-20 mix-blend-screen transition-opacity duration-500 group-hover:opacity-35`} />

                  {/* Corner Glow & Border Highlights */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.18),transparent_32%)]" />
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] border border-white/10 transition-colors duration-500 group-hover:border-white/30" />

                  {/* Card Content */}
                  <div className="relative flex h-full min-h-[23rem] flex-col justify-between sm:min-h-[26rem] lg:min-h-[30rem]">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/55 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-white/90 backdrop-blur-md transition-colors duration-300 group-hover:border-white/50 group-hover:bg-black/75">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
                        {project.number}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-md transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black group-hover:scale-105">
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="space-y-3 pt-12">
                      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80">
                        <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 backdrop-blur-md text-white/95">
                          {project.category}
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="font-mono text-white/70">{project.year}</span>
                      </div>
                      <h3 className="text-2xl font-medium tracking-[-0.04em] text-white transition-colors duration-300 drop-shadow-md sm:text-3xl lg:text-4xl">
                        {project.name}
                      </h3>
                      <p className="line-clamp-2 text-xs leading-relaxed text-white/75 drop-shadow transition-colors duration-300 group-hover:text-white/95 sm:text-sm">
                        {project.description}
                      </p>
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
