"use client";

import { useEffect, useState } from "react";

/**
 * A live analog clock rendered as SVG. The hands sweep continuously via CSS
 * animation, with a negative animation-delay set to the current time so it
 * always shows the real time. Hands render only after mount to avoid an
 * SSR/CSR hydration mismatch.
 */
export function AnalogClock({ className }: { className?: string }) {
  const [offsets, setOffsets] = useState<{
    s: number;
    m: number;
    h: number;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    const s = now.getSeconds() + now.getMilliseconds() / 1000;
    const m = now.getMinutes() * 60 + s;
    const h = (now.getHours() % 12) * 3600 + m;
    setOffsets({ s, m, h });
  }, []);

  // Round to a fixed precision so server and client serialize identical
  // coordinate strings (avoids a floating-point hydration mismatch).
  const r = (n: number) => Math.round(n * 1000) / 1000;

  // Continuous rotation around the dial center via SMIL. A negative `begin`
  // offset starts the animation partway so it reflects the real current time.
  const spin = (durationSeconds: number, beginSeconds: number) => (
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      from="0 100 100"
      to="360 100 100"
      dur={`${durationSeconds}s`}
      begin={`-${beginSeconds}s`}
      repeatCount="indefinite"
    />
  );

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {/* Case + dial */}
      <circle
        cx="100"
        cy="100"
        r="97"
        fill="#1d1a12"
        stroke="#bc5632"
        strokeWidth="3"
      />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#3d372e" />

      {/* Hour marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r1 = 84;
        const r2 = i % 3 === 0 ? 70 : 77;
        return (
          <line
            key={i}
            x1={r(100 + r1 * Math.sin(angle))}
            y1={r(100 - r1 * Math.cos(angle))}
            x2={r(100 + r2 * Math.sin(angle))}
            y2={r(100 - r2 * Math.cos(angle))}
            stroke={i % 3 === 0 ? "#d2703f" : "#8a7f6b"}
            strokeWidth={i % 3 === 0 ? 3 : 1.5}
            strokeLinecap="round"
          />
        );
      })}

      {/* Hands (client-only, animated via SMIL) */}
      {offsets && (
        <>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="56"
            stroke="#f3ebdd"
            strokeWidth="5"
            strokeLinecap="round"
          >
            {spin(43200, offsets.h)}
          </line>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="38"
            stroke="#f3ebdd"
            strokeWidth="3.5"
            strokeLinecap="round"
          >
            {spin(3600, offsets.m)}
          </line>
          <line
            x1="100"
            y1="112"
            x2="100"
            y2="30"
            stroke="#e8622f"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {spin(60, offsets.s)}
          </line>
        </>
      )}

      {/* Center cap */}
      <circle cx="100" cy="100" r="5.5" fill="#bc5632" />
      <circle cx="100" cy="100" r="2" fill="#1d1a12" />
    </svg>
  );
}
