import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const DIGIT_HEIGHT = 20; // MUST match text size

export default function WaveNumber({
  value,
  className = "",
  duration = 3,
  delayStep = 0.4,
}) {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  // 👇 Trigger animation on viewport entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {start && (
        <div className={`flex ${className}`}>
          {String(value)
            .split("")
            .map((digit, index) => (
              <SlotDigit
                key={index}
                digit={Number(digit)}
                delay={index * delayStep}
                duration={duration}
              />
            ))}
        </div>
      )}
    </div>
  );
}

function SlotDigit({ digit, delay, duration }) {
  const spins = 6;

  const numbers = [
    ...Array.from({ length: spins }, () =>
      Math.floor(Math.random() * 10)
    ),
    digit,
  ];

  return (
    <div
      className="relative overflow-hidden w-[0.8em]"
      style={{ height: DIGIT_HEIGHT }}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -DIGIT_HEIGHT * (numbers.length - 1) }}
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
        className="absolute top-0 left-0 w-full"
      >
        {numbers.map((num, i) => (
          <div
            key={i}
            style={{ height: DIGIT_HEIGHT }}
            className="flex items-center justify-center"
          >
            {num}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
