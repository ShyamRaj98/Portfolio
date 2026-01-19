import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.closest("[data-cursor]")
      ) {
        setIsHover(true);
      }
    };

    const handleMouseOut = () => {
      setIsHover(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[999] bg-white"
      style={{
        width: 24,
        height: 24,
        border: "1px solid rgba(255,255,255,0.4)",
        mixBlendMode: "difference",
      }}
      animate={{
        x: position.x - 12,
        y: position.y - 12,
        scale: isHover ? 2.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    />
  );
}
