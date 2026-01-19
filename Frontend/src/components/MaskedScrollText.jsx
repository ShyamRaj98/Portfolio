import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function MaskedScrollText({
  children,
  duration = 0.5,
  start = "100vh",
  direction = "down",
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setHeight(textRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (!height) return;

    const ctx = gsap.context(() => {
      const split = new SplitType(textRef.current, {
        types: "chars",
      });

      const chars = split.chars;
      const total = chars.length;
      const center = (total - 1) / 2;

      const baseOffset = height * 0.8;
      const step = height * 0.8;

      // 🔥 Direction control
      const dir = direction === "up" ? -1 : 1;

      // 1️⃣ START POSITION (TOP or BOTTOM)
      chars.forEach((char, i) => {
        const distanceFromCenter = Math.abs(i - center);
        const yOffset = (baseOffset + distanceFromCenter * step) * dir;

        gsap.set(char, { y: yOffset });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `${start} ${start}`,
          end: "+=100%",
          scrub: true,
        },
      });

      // 2️⃣ ENTER → move to center
      tl.to(chars, {
        y: 0,
        ease: "none",
      });

      // 3️⃣ HOLD
      tl.to(chars, {
        y: 0,
        duration,
        ease: "none",
      });

      // 4️⃣ EXIT → move same direction as enter
      // tl.to(chars, {
      //   y: (i) => {
      //     const distanceFromCenter = Math.abs(i - center);
      //     return (baseOffset + distanceFromCenter * step) * dir;
      //   },
      //   ease: "none",
      // });
    }, containerRef);

    return () => ctx.revert();
  }, [height, duration, start, direction]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className="relative overflow-hidden flex items-center justify-center"
    >
      <div ref={textRef} className="absolute w-full leading-none">
        {children}
      </div>
    </div>
  );
}
