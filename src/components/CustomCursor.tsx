// components/CustomCursor.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("[data-cursor]");
      setHoveringInteractive(!!isInteractive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-[9999] h-6 w-6 rounded-full border border-white/30 transition-all duration-300 ease-out
        ${
          hoveringInteractive
            ? "scale-150 bg-white/10 backdrop-blur-sm"
            : "scale-100 bg-transparent"
        }`}
      style={{
        transform: "translate3d(0, 0, 0)",
        transition: "transform 0.1s ease-out",
      }}
    />
  );
}
