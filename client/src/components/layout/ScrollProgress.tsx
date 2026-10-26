import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  return <motion.div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-white" style={{ scaleX: progress }} aria-hidden="true" />;
}
