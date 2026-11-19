import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power3.out' });

    let visible = false;
    let snappedEl: HTMLElement | null = null;

    const resetRing = () => {
      snappedEl = null;
      gsap.to(ring, {
        width: 36,
        height: 36,
        borderRadius: 9999,
        backgroundColor: 'rgba(199, 240, 0, 0)',
        duration: 0.28,
        ease: 'power3.out',
      });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
    };

    const handleMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.22 });
      }

      xDot(e.clientX);
      yDot(e.clientY);

      if (snappedEl && document.body.contains(snappedEl)) {
        const rect = snappedEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Subtle magnetic pull toward pointer while snapped to element center
        const pullX = (e.clientX - centerX) * 0.16;
        const pullY = (e.clientY - centerY) * 0.16;
        xRing(centerX + pullX);
        yRing(centerY + pullY);
      } else {
        xRing(e.clientX);
        yRing(e.clientY);
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"]') as HTMLElement | null;

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        // Snap cleanly to compact buttons/nav items (avoid snapping to huge full-width cards)
        if (rect.width <= 320 && rect.height <= 96) {
          snappedEl = interactive;
          const computedRadius = parseFloat(window.getComputedStyle(interactive).borderRadius) || 12;
          gsap.to(ring, {
            width: rect.width + 10,
            height: rect.height + 8,
            borderRadius: computedRadius + 4,
            backgroundColor: 'rgba(199, 240, 0, 0.14)',
            duration: 0.26,
            ease: 'power3.out',
          });
          gsap.to(dot, { scale: 0.5, duration: 0.2 });
          return;
        }
      }

      if (snappedEl) {
        resetRing();
      }
    };

    const handleLeave = () => {
      visible = false;
      snappedEl = null;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const handleScroll = () => {
      if (snappedEl) resetRing();
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 w-9 h-9 rounded-full border-[1.5px] border-[#C7F000] mix-blend-difference pointer-events-none z-[9999] will-change-transform"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-[#C7F000] mix-blend-difference pointer-events-none z-[9999] will-change-transform"
      />
    </>
  );
}
