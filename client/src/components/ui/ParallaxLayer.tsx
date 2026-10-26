import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  direction?: "up" | "down";
}

export function ParallaxLayer({
  children,
  className,
  distance = 32,
  direction = "up",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], direction === "up" ? [distance, -distance] : [-distance, distance]);

  return (
    <motion.div ref={ref} className={className} style={{ y: reducedMotion ? 0 : y, willChange: reducedMotion ? "auto" : "transform" }}>
      {children}
    </motion.div>
  );
}
