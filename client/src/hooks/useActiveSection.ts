import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_SCROLL_EVENT, type NavScrollDetail, type SectionId } from "@/data/site";

interface UseActiveSectionOptions {
  /**
   * Vertical position in viewport where a section is considered the "primary reading zone".
   * Expressed as a ratio of window.innerHeight (default: 0.35, i.e., 35% from the top).
   */
  triggerRatio?: number;
  /**
   * Pixels from the top of the page before snapping to the first section (default: 60px).
   */
  topThreshold?: number;
  /**
   * Pixels from the bottom of the page before snapping to the last section (default: 40px).
   */
  bottomThreshold?: number;
}

export function useActiveSection(
  sectionIds: readonly SectionId[],
  options: UseActiveSectionOptions = {}
) {
  const { triggerRatio = 0.35, topThreshold = 60, bottomThreshold = 40 } = options;

  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "") as SectionId;
      if (sectionIds.includes(hash)) {
        return hash;
      }
    }
    return sectionIds[0] ?? "home";
  });

  const activeSectionRef = useRef<SectionId>(activeSection);
  activeSectionRef.current = activeSection;

  const isManualLockRef = useRef<boolean>(false);
  const targetSectionRef = useRef<SectionId | null>(null);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Helper to safely release the manual scroll lock
  const releaseLock = useCallback(() => {
    isManualLockRef.current = false;
    targetSectionRef.current = null;
    if (lockTimeoutRef.current) {
      clearTimeout(lockTimeoutRef.current);
      lockTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Release lock and immediately resume tracking
    const cancelLockAndCheck = () => {
      if (isManualLockRef.current) {
        releaseLock();
      }
    };

    // Handle programmatic scroll events dispatched by scrollToSection
    const handleNavScroll = (event: Event) => {
      const customEvent = event as CustomEvent<NavScrollDetail>;
      const targetId = customEvent.detail?.id;
      if (!targetId || !sectionIds.includes(targetId)) return;

      // 1. Immediately switch active section so the indicator starts animating directly to the target
      setActiveSection(targetId);
      activeSectionRef.current = targetId;

      // 2. Lock scroll spy during smooth scrolling
      isManualLockRef.current = true;
      targetSectionRef.current = targetId;

      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }

      // Proximity check: If user is already at the target, unlock quickly
      const header = document.querySelector("header");
      const navHeight = header ? header.getBoundingClientRect().height : 76;
      let targetY = 0;
      if (targetId !== "home") {
        const el = document.getElementById(targetId);
        if (el) {
          targetY = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - navHeight));
        }
      }

      if (Math.abs(window.scrollY - targetY) < 4) {
        lockTimeoutRef.current = setTimeout(releaseLock, 50);
        return;
      }

      const onScrollEnd = () => {
        releaseLock();
        window.removeEventListener("scrollend", onScrollEnd);
      };

      // Native scrollend event (supported in modern browsers)
      window.addEventListener("scrollend", onScrollEnd, { once: true });

      // Fallback timeout: smooth scrolling settles within ~1100ms
      lockTimeoutRef.current = setTimeout(() => {
        window.removeEventListener("scrollend", onScrollEnd);
        releaseLock();
      }, 1200);
    };

    // If user takes over manual scrolling (mouse wheel, touch gesture, page keys), release lock immediately
    const handleUserInteraction = () => {
      cancelLockAndCheck();
    };

    window.addEventListener(NAV_SCROLL_EVENT, handleNavScroll);
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener(NAV_SCROLL_EVENT, handleNavScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
    };
  }, [releaseLock, sectionIds]);

  useEffect(() => {
    const getSections = () =>
      sectionIds
        .map((id) => ({ id, element: document.getElementById(id) }))
        .filter((item): item is { id: SectionId; element: HTMLElement } => item.element !== null);

    const determineActive = (): SectionId => {
      const scrollY = window.scrollY || window.pageYOffset;
      const clientHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // 1. Boundary check: Near the very top of the page -> First section ("home")
      if (scrollY <= topThreshold) {
        return sectionIds[0] ?? "home";
      }

      // 2. Boundary check: At or near the bottom of the page -> Last section ("reach-us")
      // Ensures sections at the bottom (e.g. contact + footer) are properly highlighted even on large monitors
      const distanceToBottom = scrollHeight - (scrollY + clientHeight);
      if (distanceToBottom <= Math.max(bottomThreshold, clientHeight * 0.05)) {
        return sectionIds[sectionIds.length - 1] ?? "reach-us";
      }

      // 3. Primary reading zone check
      // Target reading zone is placed at triggerRatio (default 35% from the top of the viewport)
      const triggerY = clientHeight * triggerRatio;
      const sections = getSections();
      if (sections.length === 0) return sectionIds[0] ?? "home";

      const sectionRects = sections.map(({ id, element }) => ({
        id,
        rect: element.getBoundingClientRect(),
      }));

      // Section containing the trigger line: top <= triggerY and bottom > triggerY
      // This reliably handles both short sections and sections much taller than 100vh
      const match = sectionRects.find(
        ({ rect }) => rect.top <= triggerY && rect.bottom > triggerY
      );

      if (match) {
        return match.id;
      }

      // Fallback (e.g. slight subpixel gaps or margins): pick the most recent section that passed triggerY
      const passed = sectionRects.filter(({ rect }) => rect.top <= triggerY);
      if (passed.length > 0) {
        return passed[passed.length - 1].id;
      }

      return sectionRects[0].id;
    };

    const updateActiveSection = () => {
      if (isManualLockRef.current) return;

      const nextActive = determineActive();
      if (nextActive && nextActive !== activeSectionRef.current) {
        activeSectionRef.current = nextActive;
        setActiveSection(nextActive);
      }
    };

    const scheduleCheck = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        updateActiveSection();
      });
    };

    // Initial evaluation
    scheduleCheck();

    // IntersectionObserver configured with primary reading zone margins
    const observer = new IntersectionObserver(
      () => {
        scheduleCheck();
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const sections = getSections();
    sections.forEach(({ element }) => observer.observe(element));

    // Passive scroll and resize listeners, throttled via requestAnimationFrame
    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck, { passive: true });

    // ResizeObserver on document body to handle asynchronous font/image layout shifts
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        scheduleCheck();
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      observer.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [sectionIds, topThreshold, bottomThreshold, triggerRatio]);

  return activeSection;
}
