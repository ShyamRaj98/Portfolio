import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCenterText({ children }) {
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
          start: "top 70%",
          end: "+=100%", // controls pause length
          scrub: true,
        },
      });

      // 1️⃣ ENTER: from top to center
      tl.fromTo(
        textRef.current,
        { y: -height, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, ease: "none" }
      );

      // 2️⃣ HOLD: stay at center, subtle scale-up
      tl.to(textRef.current, {
        y: 0,
        scale: 1.05,
        opacity: 1,
        duration: 1,
        ease: "none",
      });

      // 3️⃣ EXIT: move down + fade out
      tl.to(textRef.current, {
        y: height,
        opacity: 0,
        scale: 0.96,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [height]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className="relative overflow-hidden flex items-center justify-center"
    >
      <div
        ref={textRef}
        className="absolute w-full text-center will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
