import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects } from ".././data/projects.js";
import MaskedScrollText from "../components/MaskedScrollText.jsx";

export default function Projects() {
  return (
    <section id="projects" className="bg-black py-20">
      <MaskedScrollText start="110%" duration={0.5}>
        <h2 className="w-full text-white text-center text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[14rem] text-nowrap font-extrabold uppercase tracking-tight py-2">
          Project
        </h2>
      </MaskedScrollText>
      <div className="relative h-[300vh]">
        {projects.map((item, index) => (
          <StickyCard key={item.id} index={index} {...item} />
        ))}
      </div>
    </section>
  );
}

function StickyCard({ index, color, title, description, tech, live, github }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Shrink when next card comes
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  // Blur when pushed back
  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(10px)"],
  );

  // Fade slightly
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <div
      ref={ref}
      className="sticky top-0 h-screen flex items-center justify-center"
      style={{
        zIndex: projects.length - index,
      }}
    >
      <motion.div
        style={{
          scale,
          filter: blur,
          opacity,
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <div
          className="w-[90%] h-[85%] rounded-3xl flex flex-col gap-5 md:flex-row items-end justify-center text-white text-5xl font-bold p-5"
          style={{ backgroundColor: color }}
        >
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <img src="https://dummyimage.com/600x400/000/fff" alt="image" />
          </div>

          <div className="w-full md:w-1/2 ">
            <h1 className="text-lg md:text-xl lg:text-2xl">{title}</h1>
            <p className="text-sm md:text-base lg:text-lg">{description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {tech.map((tech, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a href={live} className="text-primary hover:underline">
                Live
              </a>
              <a href={github} className="text-primary hover:underline">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
