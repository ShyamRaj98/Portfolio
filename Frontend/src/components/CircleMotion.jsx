import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CircleMotion() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Circle movement
  const x = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={ref} className="relative w-full h-full">
      {/* Circle */}
      <motion.div
        style={{ x, y, scale, opacity }}
        className="
          absolute
          w-6 h-6
          rounded-full
          bg-white
          left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
        "
      />
    </div>
  );
}
