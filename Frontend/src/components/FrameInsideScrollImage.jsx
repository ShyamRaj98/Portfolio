import { motion } from "framer-motion";

export function ScrollingImage({ images, setPaused, active }) {

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Macbook Frame */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative w-[340px] sm:w-[380px] h-[240px] sm:h-[260px] bg-neutral-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 w-full h-8 bg-neutral-800 flex items-center px-3 gap-2 z-10">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="w-3 h-3 bg-green-500 rounded-full" />
        </div>

        {/* Scrolling image */}
        <div className="absolute top-8 left-0 w-full h-[calc(100%-2rem)] overflow-hidden">
          <motion.div
            key={active}
            animate={{ y: ["0%", "-60%", "0%"] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <img
              src={images[active]}
              alt="project"
              className="w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export function PremiumDots({ count, active, onChange }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`w-3 h-3 rounded-full transition-all duration-300
            ${
              active === i
                ? "bg-white scale-125"
                : "bg-white/30 hover:bg-white/60"
            }
          `}
        />
      ))}
    </div>
  );
}
