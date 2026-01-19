import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function HoverScaleText({
  text,
  className = "",
  maxScale = 1.8,
  influence = 180,
}) {
  const textRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    const split = new SplitType(textRef.current, {
      types: "chars",
    });

    charsRef.current = split.chars;

    // ✅ ONLY SCALE — NO Y
    gsap.set(charsRef.current, {
      scaleY: 1,
      transformOrigin: "50% 100%", // center bottom
    });

    const handleMove = (e) => {
      charsRef.current.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const distance = Math.abs(e.clientX - centerX);

        const scale =
          distance < influence
            ? gsap.utils.mapRange(
                0,
                influence,
                maxScale,
                1,
                distance
              )
            : 1;

        gsap.to(char, {
          scaleY: scale,
          duration: 0.2,
          ease: "power3.out",
        });
      });
    };

    const handleLeave = () => {
      gsap.to(charsRef.current, {
        scaleY: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const el = textRef.current;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      split.revert();
    };
  }, [maxScale, influence]);

  return (
    <h1
      ref={textRef}
      className={`proximity-text ${className}`}
    >
      {text}
    </h1>
  );
}
