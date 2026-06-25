'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

/**
 * Foldcraft Landing Page
 * Premium, fullscreen interactive hero with cinematic video background
 * Design: Dark, premium aesthetic with white typography and elegant motion
 */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Stagger animation for hero text elements
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const navLinks = ['Home', 'Projects', 'Studio', 'Reach Us'];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans selection:bg-white selection:text-black">
      {/* Cinematic Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '70% center' }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
      />

      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Navigation Bar (z-30) */}
      <nav className="relative z-30 flex w-full items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        {/* Logo */}
        <div className="text-lg font-semibold tracking-tight text-white sm:text-xl">
          Foldcraft
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden flex-row gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-white/80 transition-colors duration-200 hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop Action Button */}
        <button className="hidden rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 active:scale-95 md:block">
          Let's Talk
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative h-10 w-10 md:hidden active:scale-90"
        >
          <AnimatePresence mode="wait">
            {!mobileMenuOpen ? (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* Fullscreen Mobile Menu Overlay (z-20) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
            }}
            className="absolute inset-x-0 top-0 z-20 h-screen bg-black/95 backdrop-blur-xl"
          >
            <div className="flex h-full flex-col justify-center px-8">
              {/* Mobile Navigation Links */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {navLinks.map((link) => (
                  <motion.a
                    key={link}
                    href="#"
                    variants={staggerItem}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-3xl font-medium text-white/90 transition-colors hover:text-white"
                  >
                    {link}
                  </motion.a>
                ))}

                {/* Mobile CTA Button */}
                <motion.button
                  variants={staggerItem}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-6 w-fit rounded-full bg-white px-8 py-3.5 text-base font-medium text-black transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  Let's Talk
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content Container (z-10) */}
      <div
        ref={containerRef}
        className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16"
      >
        {/* Top Callout Block */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Sub-badge */}
          <motion.div
            variants={staggerItem}
            className="mb-4 text-xs font-medium tracking-wider uppercase text-white/90 sm:text-sm"
          >
            Brand & Visual Storytelling
          </motion.div>

          {/* Hero H1 Header */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Shaping visual <br />
            narratives, <br />
            one pixel at a time.
          </motion.h1>
        </motion.div>

        {/* Bottom Utility Block */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Descriptive Paragraph */}
          <motion.p
            variants={staggerItem}
            className="mb-6 max-w-sm text-sm leading-relaxed text-white/60 sm:mb-8 sm:max-w-lg sm:text-base md:text-lg"
          >
            Turning vision into reality through craft, motion, and an endless pursuit of beauty.
          </motion.p>

          {/* Primary CTA Button */}
          <motion.button
            variants={staggerItem}
            className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 active:scale-95 sm:px-6 sm:py-3"
          >
            Explore Work
            <motion.div
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <ArrowRight size={16} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
