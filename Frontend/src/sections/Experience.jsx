import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { experience } from "../data/experience";
import WaveNumber from "../components/WaveNumber";
import RevealText from "../components/RevealText";
import MaskedScrollText from "../components/MaskedScrollText";

export default function Experience() {
  const [active, setActive] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="experience">
      <div className="w-full bg-white pt-20 pb-50">
        <MaskedScrollText start="110%" duration={0.5}>
          <h2 className="w-full text-center text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[15rem] text-nowrap font-extrabold uppercase tracking-tight py-2">
            Experience
          </h2>
        </MaskedScrollText>
        <div
          className={`flex w-full border-t-2 border-black ${
            isMobile ? "flex-col" : "flex-row min-h-[400px]"
          }`}
        >
          {experience.map((item, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={item.id}
                layout={!isMobile}
                onMouseEnter={() => !isMobile && setActive(index)}
                onMouseLeave={() => !isMobile && setActive(null)}
                onClick={() => isMobile && setActive(isActive ? null : index)}
                className={`
                relative overflow-hidden bg-white cursor-pointer
                border-black
                ${isMobile ? "border-b" : "border-r-2"}
              `}
                animate={!isMobile ? { flex: isActive ? 3 : 1 } : {}}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                {/* HEADER */}
                <div
                  className={`p-6 flex ${
                    !isMobile && isActive ? "flex-row" : "flex-col"
                  } justify-between items-center`}
                >
                  <div className="flex flex-nowrap items-center justify-center text-md font-semibold">
                    <WaveNumber value={item.periodStart} /> -{" "}
                    {item.periodEnd === "Present" ? (
                      "Present"
                    ) : (
                      <WaveNumber value={item.periodEnd} />
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-nowrap uppercase">
                      {item.role}
                    </h3>
                    <h4 className="text-sm font-semibold text-nowrap uppercase">
                      {item.company}
                    </h4>
                  </div>
                </div>

                {/* 🔥 BOTTOM HOVER LINE */}
                {!isMobile && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black origin-left"
                  />
                )}

                {/* MOBILE CONTENT */}
                {isMobile && isActive && item.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-6"
                  >
                    <ul className="mb-4 space-y-1 text-sm font-semibold uppercase">
                      {item.tags?.map((tag) => (
                        <li key={tag} className="para h-fit m-0 p-0">
                          <RevealText delay={0.5} duration={0.5}>
                            /{tag}
                          </RevealText>
                        </li>
                      ))}
                    </ul>

                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                      {item.description.map((point, i) => (
                        <li
                          key={i}
                          className="para text-sm leading-relaxed uppercase"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* DESKTOP ACTIVE CONTENT */}
                {!isMobile && isActive && item.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center px-6"
                  >
                    <div className="max-w-md">
                      <ul className="mb-6 space-y-1 text-sm font-semibold uppercase">
                        {item.tags?.map((tag) => (
                          <li key={tag}>/{tag}</li>
                        ))}
                      </ul>

                      <ul className="list-disc list-inside text-gray-400 space-y-2">
                        {item.description.map((point, i) => (
                          <li
                            key={i}
                            className="para text-sm leading-relaxed uppercase"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
