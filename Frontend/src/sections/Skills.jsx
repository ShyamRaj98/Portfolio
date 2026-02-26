import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/skills";
import MaskedScrollText from "../components/MaskedScrollText";

export default function Skills() {
  return (
    <section id="skills" className="bg-white py-15">
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

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      className="group relative flex flex-col items-center px-6 py-4"
      onMouseEnter={() => !isMobile && setIsHover(true)}
      onMouseLeave={() => {
        if (!isMobile) {
          setIsHover(false);
          setOffset({ x: 0, y: 0 });
        }
      }}
      onMouseMove={(e) => {
        if (isMobile) return; // ❌ disable on mobile

        const rect = e.currentTarget.getBoundingClientRect();
        setOffset({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 8,
        });
      }}
      animate={
        isMobile
          ? {} // no parallax on mobile
          : { x: offset.x, y: offset.y }
      }
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ backgroundColor: color }}
      />

      {/* Icon */}
      {Icon && (
        <motion.div
          className="relative z-10 text-4xl md:text-6xl lg:text-8xl mb-4 transition-all duration-300"
          style={{ color }}
          animate={
            isMobile
              ? { y: ["0px", "-8px", "0px"] } // small float mobile
              : isHover
              ? { y: 0 }
              : { y: ["0px", "-20px", "0px"] } // desktop float
          }
          transition={{
            y: {
              repeat: isHover ? 0 : Infinity,
              duration: isMobile ? 2.5 : 3,
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
