import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRevealText({ children, duration = 1.5, start = "70%", className }) {
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top ${start}`,
          end: "+=100%", // controls show long it stays
          scrub: true,
        },
      });

      // 1️⃣ Enter (top → center)
      tl.fromTo(textRef.current, { y: -height }, { y: 0, ease: "none" });

      // 2️⃣ HOLD (no movement)
      tl.to(textRef.current, { y: 0, duration: duration });

      // 3️⃣ Exit (center → bottom)
      tl.to(textRef.current, { y: height, ease: "elastic" });
    }, containerRef);

    return () => ctx.revert();
  }, [height]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className="relative overflow-hidden"
    >
      <div ref={textRef} className={`absolute ${className}`}>
        {children}
      </div>
    </div>
  );
}
