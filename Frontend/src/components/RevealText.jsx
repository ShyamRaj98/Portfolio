import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function RevealText({ children, duration = 1.5, delay = 0, className, className1 }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [height, setHeight] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (textRef.current) {
      setHeight(textRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (!height) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          gsap.fromTo(
            textRef.current,
            { y: -height },
            {
              y: 0,
              duration: duration,
              delay,
              ease: "power3.out",
            }
          );
        }
      },
      {
        threshold: 0.6, // 🔥 start when 60% visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [height, delay]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className={`relative w-full flex items-center justify-center ${className}`}
    >
      <div ref={textRef} className={`absolute w-full text-center ${className1}`}>
        {children}
      </div>
    </div>
  );
}
