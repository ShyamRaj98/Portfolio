import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function MaskedScrollText({
  children,
  duration = 1.5,
  start = "90%",
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (textRef.current) setHeight(textRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    if (!height) return;

    const ctx = gsap.context(() => {
      const split = new SplitType(textRef.current, { types: "chars" });
      const chars = split.chars;
      const total = chars.length;
      const center = (total - 1) / 2;

      const baseOffset = height * 0.8; // minimum movement
      const step = height * 0.4; // additional movement per distance

      // 1️⃣ START → position letters above container based on distance from center
      chars.forEach((char, i) => {
        const distance = Math.abs(i - center);
        const yOffset = -(baseOffset + distance * step); // negative = above
        gsap.set(char, { y: yOffset });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top ${start}`,
          end: "+=120%",
          scrub: true,
        },
      });

      // 2️⃣ ENTER → move letters into center
      tl.to(chars, { y: 0, ease: "power1.out", duration });

      // 3️⃣ EXIT → move letters downward based on distance from center (optional)
      tl.to(chars, {
        y: (i) => {
          const distance = Math.abs(i - center);
          return baseOffset + distance * step; // positive = down
        },
        ease: "power1.in",
        duration,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [height, duration, start]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className="relative overflow-hidden flex items-center justify-center"
    >
      <div ref={textRef} className="absolute w-full text-center leading-none">
        {children}
      </div>
    </div>
  );
}
