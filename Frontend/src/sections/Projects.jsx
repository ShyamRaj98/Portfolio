import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../data/projects.js";
import MaskedScrollText from "../components/MaskedScrollText.jsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PremiumDots,
  ScrollingImage,
} from "../components/FrameInsideScrollImage.jsx";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [activeTab]);
  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(projects.map((p) => p.category))];
    return cats;
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeTab === "All") return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <section id="projects" className="bg-black py-20">
      <MaskedScrollText start="110%" duration={0.5}>
        <h2 className="w-full text-white text-center text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[14rem] font-extrabold uppercase tracking-tight py-2">
          Project
        </h2>
      </MaskedScrollText>

      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-6 py-2 rounded-full border transition
            ${
              activeTab === cat
                ? "bg-white text-black border-white"
                : "text-white border-white/30 hover:border-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div
        key={activeTab}
        className="relative"
        style={{
          height: `${filteredProjects.length * 100}vh`,
        }}
      >
        {filteredProjects.map((item, index) => (
          <ProjectCard key={item.id} index={index} {...item} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  index,
  color,
  title,
  description,
  tech,
  live,
  github,
  image,
  category,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(10px)"],
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % image.length);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, image.length]);

  return (
    <div
      ref={ref}
      className="sticky top-0 h-screen flex items-center justify-center"
      style={{ zIndex: 50 - index }}
    >
      <motion.div
        style={{ scale, filter: blur, opacity }}
        className="w-full h-full flex items-center justify-center"
      >
        <div
          className="w-[90%] h-[85%] rounded-3xl flex flex-col md:flex-row gap-5 items-center justify-center text-white p-6"
          style={{ backgroundColor: color }}
        >
          {/* IMAGE */}
          <div className="w-full md:w-1/2 flex items-center justify-center overflow-hidden">
            <ScrollingImage
              images={image}
              setPaused={setPaused}
              active={active}
            />
          </div>

          {/* CONTENT */}
          <div className="w-full md:w-1/2">
            {/* Category Badge */}
            <span className="px-4 py-1 text-xs uppercase bg-white/20 rounded-full">
              {category}
            </span>

            <PremiumDots
              active={active}
              count={image.length}
              onChange={setActive}
            />

            <h1 className="text-xl md:text-2xl font-bold mt-2">{title}</h1>

            <p className="text-sm md:text-base mt-2">{description}</p>

            <div className="flex flex-wrap gap-2 mt-4 mb-6">
              {tech.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {live && (
                <a href={live} target="_blank" className="underline">
                  Live
                </a>
              )}
              {github && (
                <a href={github} target="_blank" className="underline">
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
