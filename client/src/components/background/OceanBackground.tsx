import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

const OCEAN_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4";

export function OceanBackground() {
  const { scrollYProgress } = useScroll();
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.18, 0.42, 0.7, 1], [0.28, 0.42, 0.72, 0.34, 0.48]);
  const blurAmount = useTransform(scrollYProgress, [0, 0.3, 0.62, 0.78, 1], [0, 0.4, 1.3, 0.25, 0.5]);
  const backdropFilter = useMotionTemplate`blur(${blurAmount}px)`;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black" aria-hidden="true">
      <video
        className="ocean-video absolute inset-0 h-full w-full object-cover"
        src={OCEAN_VIDEO_SRC}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/20" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/55 to-black/70"
        style={{ opacity: overlayOpacity, backdropFilter }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_80%_70%,rgba(55,155,196,0.15),transparent_28%)]" />
    </div>
  );
}
