"use client";

/**
 * MediaNocheLogo — animated brand logo (spinning hands). Self-contained,
 * responsive: it fills its parent's width and scales the 1536×1024 artwork.
 * The SVG overlay masks the original ornaments and redraws the dial + hands.
 */
import { useEffect, useRef, useState } from "react";

const W = 1536;
const H = 1024;
const CX = 778;
const CY = 426;
const R_DIAL = 118; // dial center/radius
const TICK_IN = 84;
const TICK_OUT = 108;
const INK = "#8a6a48";
const BG = "#fefefe";
const BASE_MIN = -30;
const BASE_HOUR = -110; // original 10:10 pose

// regions of the original art to hide: [x, y, w, h]
const MASKS: [number, number, number, number][] = [
  [300, 844, 940, 52],
  [505, 120, 137, 545],
  [916, 120, 125, 278],
  [946, 398, 95, 62],
  [916, 460, 125, 205],
  [640, 120, 62, 155],
  [854, 120, 64, 155],
  [640, 574, 62, 92],
  [854, 574, 64, 92],
  [698, 96, 164, 106],
  [726, 600, 108, 116],
];

interface Props {
  src?: string;
  loopSecs?: number;
  spinTurns?: number;
  paused?: boolean;
  className?: string;
}

export function MediaNocheLogo({
  src = "/logo-media-noche.jpeg",
  loopSecs = 11,
  spinTurns = 1,
  paused = false,
  className,
}: Props) {
  const [p, setP] = useState(0);
  const [boxW, setBoxW] = useState(0);
  const raf = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the container width so the artwork scales responsively.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setBoxW(entries[0].contentRect.width);
    });
    ro.observe(el);
    setBoxW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      setP((((now - t0) / 1000) % loopSecs) / loopSecs);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [loopSecs, paused]);

  // constant, continuous rotation from the start (seamless: 360° = one full turn)
  const minAngle = BASE_MIN - 90 + p * 360 * spinTurns;
  const hourAngle = BASE_HOUR - 90 + p * 360;
  const scale = boxW ? boxW / W : 0;

  const hand = (
    angle: number,
    length: number,
    tail: number,
    w: number,
  ): React.SVGProps<SVGLineElement> => {
    const a = (angle * Math.PI) / 180;
    return {
      x1: CX - Math.cos(a) * tail,
      y1: CY - Math.sin(a) * tail,
      x2: CX + Math.cos(a) * length,
      y2: CY + Math.sin(a) * length,
      stroke: INK,
      strokeWidth: w,
      strokeLinecap: "round",
      opacity: 0.95,
    };
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        aspectRatio: `${W} / ${H}`,
        background: BG,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: W,
          height: H,
          transformOrigin: "0 0",
          transform: `scale(${scale})`,
          willChange: "transform",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          width={W}
          height={H}
          alt="Media Noche"
          style={{ position: "absolute", inset: 0 }}
        />
        {MASKS.map(([x, y, w, h], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: w,
              height: h,
              background: BG,
            }}
          />
        ))}
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            <radialGradient id="mnDial" cx="46%" cy="38%" r="72%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#fefdfa" />
              <stop offset="100%" stopColor="#faf4ea" />
            </radialGradient>
          </defs>
          <circle cx={CX} cy={CY} r={R_DIAL} fill="url(#mnDial)" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = ((i * 30 - 90) * Math.PI) / 180;
            const major = i % 3 === 0;
            const rIn = major ? TICK_IN - 4 : TICK_IN;
            return (
              <line
                key={i}
                x1={CX + Math.cos(a) * rIn}
                y1={CY + Math.sin(a) * rIn}
                x2={CX + Math.cos(a) * TICK_OUT}
                y2={CY + Math.sin(a) * TICK_OUT}
                stroke={INK}
                strokeWidth={major ? 2.2 : 1.5}
                strokeLinecap="round"
                opacity={major ? 0.95 : 0.8}
              />
            );
          })}
          <line {...hand(hourAngle, 62, 14, 3.1)} />
          <line {...hand(minAngle, 96, 16, 2.3)} />
          <circle
            cx={CX}
            cy={CY}
            r={6.5}
            fill="#fffefb"
            stroke={INK}
            strokeWidth={1.8}
          />
          <circle cx={CX} cy={CY} r={1.8} fill={INK} />
        </svg>
      </div>
    </div>
  );
}
