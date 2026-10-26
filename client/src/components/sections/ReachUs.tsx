import { ArrowUpRight, Check, LoaderCircle, Send } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { siteCopy } from "@/data/site";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", email: "", message: "" };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = "Tell us who you are.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (values.message.trim().length < 12) errors.message = "A little more detail helps us get started.";
  return errors;
}

export function ReachUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.16, 0.76, 1], [0.35, 1, 1, 0.75]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [34, -30]);

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setValues(initialValues);
    }, 850);
  };

  return (
    <motion.section
      ref={sectionRef}
      id="reach-us"
      aria-labelledby="reach-us-title"
      className="relative min-h-[100svh] scroll-mt-20 px-5 py-28 sm:px-8 sm:py-36 lg:px-12"
      style={{ opacity: reducedMotion ? 1 : sectionOpacity }}
    >
      <div className="mx-auto max-w-7xl">
        <ParallaxLayer distance={16} direction="down" className="mb-14 sm:mb-20">
          <Reveal>
            <p className="font-body mb-4 text-xs font-medium uppercase tracking-[0.24em] text-white/55 sm:text-sm">{siteCopy.reachEyebrow}</p>
            <motion.h2 id="reach-us-title" className="font-heading max-w-4xl text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white" style={{ y: reducedMotion ? 0 : headlineY }}>
              Let&apos;s make something <span className="text-white/40">impossible to ignore.</span>
            </motion.h2>
          </Reveal>
        </ParallaxLayer>

        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <Reveal delay={0.12} className="flex flex-col justify-between gap-10">
            <div>
              <p className="max-w-sm text-base leading-relaxed text-white/60 sm:text-lg">
                Have a sharp idea, a soft launch, or a world that needs a little more gravity? We&apos;d love to hear about it.
              </p>
              <a href="mailto:hello@foldcraft.studio" className="mt-6 inline-flex items-center gap-2 text-sm text-white transition-colors hover:text-white/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                hello@foldcraft.studio
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="flex gap-5 text-sm text-white/50">
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Instagram</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">LinkedIn</a>
              <a href="https://www.behance.net" target="_blank" rel="noreferrer" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Behance</a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5 backdrop-blur-md sm:p-8">
              {submitted ? (
                <motion.div className="flex min-h-[22rem] flex-col items-start justify-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55 }}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"><Check className="h-5 w-5" aria-hidden="true" /></div>
                  <h3 className="font-heading mt-7 text-3xl font-bold tracking-tight text-white">Message received.</h3>
                  <p className="font-body mt-3 max-w-sm text-sm leading-relaxed text-white/55">Thanks for reaching out. We&apos;ll get back to you with a thoughtful next step.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="mt-8 text-sm text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Send another note</button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="block text-sm text-white/60">
                      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">Name</span>
                      <input
                        type="text"
                        value={values.name}
                        onChange={(event) => handleChange("name", event.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-white"
                        placeholder="Your name"
                      />
                      {errors.name && <span id="name-error" className="mt-2 block text-xs text-rose-200">{errors.name}</span>}
                    </label>
                    <label className="block text-sm text-white/60">
                      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">Email</span>
                      <input
                        type="email"
                        value={values.email}
                        onChange={(event) => handleChange("email", event.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-white"
                        placeholder="you@company.com"
                      />
                      {errors.email && <span id="email-error" className="mt-2 block text-xs text-rose-200">{errors.email}</span>}
                    </label>
                  </div>
                  <label className="block text-sm text-white/60">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">Message</span>
                    <textarea
                      rows={5}
                      value={values.message}
                      onChange={(event) => handleChange("message", event.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className="w-full resize-none border-b border-white/20 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors placeholder:text-white/25 focus:border-white"
                      placeholder="Tell us what you&apos;re building..."
                    />
                    {errors.message && <span id="message-error" className="mt-2 block text-xs text-rose-200">{errors.message}</span>}
                  </label>
                  <div className="flex items-center justify-between gap-5 pt-2">
                    <p className="text-xs leading-relaxed text-white/50">We usually reply within two working days.</p>
                    <button type="submit" disabled={isSubmitting} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-wait disabled:opacity-65">
                      {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                      {isSubmitting ? "Sending" : "Send note"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </motion.section>
  );
}
