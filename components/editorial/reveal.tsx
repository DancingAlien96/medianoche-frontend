"use client";

import { useEffect } from "react";

/**
 * Adds the `visible` class to every `.rev` element as it scrolls into view.
 * Drop one instance anywhere on an editorial page.
 */
export function Reveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(".rev");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);

  return null;
}
