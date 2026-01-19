import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/skills";
import MaskedScrollText from "../components/MaskedScrollText";

export default function Skills() {
  return (
    <section id="skills" className="bg-white py-30">
      <MaskedScrollText start="150%" duration={0.5}>
        <h2 className="w-full text-center text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[15rem] text-nowrap font-extrabold uppercase tracking-tight py-2">
          Skills
        </h2>
      </MaskedScrollText>
      <div className="max-w-[1600px] mx-auto flex flex-col gap-y-16">
        {skills.map((category) => (
          <div key={category.title}>
            <h4 className="text-4xl font-semibold text-black mb-8 text-center">
              {category.title}
            </h4>

            <div className="flex flex-wrap md:gap-x-4 lg:gap-x-8 md:gap-y-4 lg:gap-y-20 justify-center">
              {category.items.map(({ name, icon: Icon, color }) => (
                <FloatingCursorIcon
                  key={name}
                  name={name}
                  Icon={Icon}
                  color={color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- ICON COMPONENT ----------------

function FloatingCursorIcon({ name, Icon, color }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      className="group relative flex flex-col items-center px-6 py-4 cursor-default"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setOffset({ x: 0, y: 0 });
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setOffset({
          x: ((e.clientX - rect.left) / rect.width - 0.8) * 10,
          y: ((e.clientY - rect.top) / rect.height - 0.8) * 10,
        });
      }}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ backgroundColor: color }}
      />

      {/* Icon */}
      {Icon && (
        <motion.div
          className="relative z-10 text-2xl md:text-3xl lg:text-8xl mb-4 filter grayscale transition-all duration-300 group-hover:grayscale-0"
          style={{ color }}
          animate={
            isHover
              ? { y: 0 } // ❌ no floating on hover
              : { y: ["0px", "-40px", "0px"] } // ✅ floating
          }
          transition={{
            y: {
              repeat: isHover ? 0 : Infinity,
              duration: 3,
              ease: "easeInOut",
            },
          }}
        >
          <Icon />
        </motion.div>
      )}

      {/* Text */}
      <span className="text-sm font-light font-body text-gray-500 transition-colors duration-300 group-hover:text-black">
        {name}
      </span>
    </motion.div>
  );
}
