import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Navbar() {
  const menuRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["About", "Skill", "Experience", "Project"];
  const sectionMap = {
    About:"about",
    Skill: "skills",
    Experience: "experience",
    Project: "projects",
    Contact: "contact",
  };
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useEffect(() => {
    menuRef.current.forEach((el) => {
      if (!el) return;

      const letters = el.querySelectorAll(".letter");
      const cloneLetters = el.querySelectorAll(".letter-clone");

      gsap.set(cloneLetters, { y: "100%" });

      // Only apply hover on desktop
      const handleMouseEnter = () => {
        if (window.innerWidth >= 768) {
          gsap.to(letters, {
            y: "-100%",
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(cloneLetters, {
            y: "0%",
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      };

      const handleMouseLeave = () => {
        if (window.innerWidth >= 768) {
          gsap.to(letters, {
            y: "0%",
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(cloneLetters, {
            y: "100%",
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      };

      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <>
      <header className="relative">
        <nav
          className="fixed top-0 left-0 z-50 w-full flex md:flex-row flex-col gap-2 items-center justify-between px-6 md:px-8 py-4 bg-transparent"
          style={{ color: "white", mixBlendMode: "difference" }}
        >
          <div className="w-full md:w-auto flex md:block justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                width="50"
                height="50"
              >
                <circle cx="25" cy="25" r="20" fill="currentColor" />
              </motion.svg>

              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-bold text-2xl tracking-wide text-nowrap"
                data-cursor
              >
                Shyam Raj
              </motion.h1>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden relative">
              <button
                className="flex flex-col gap-1 w-6 h-6"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="block h-0.5 w-full bg-white"></span>
                <span className="block h-0.5 w-full bg-white"></span>
                <span className="block h-0.5 w-full bg-white"></span>
              </button>
            </div>
          </div>
          {/* Desktop Menu */}
          <div className="w-full hidden md:flex">
            <div className="w-full flex flex-col md:flex-row">
              <ul className={"md:mx-auto w-fit md:flex gap-6"}>
                {menuItems.map((item, idx) => (
                  <li
                    key={item}
                    ref={(el) => (menuRef.current[idx] = el)}
                    onClick={() => scrollToSection(sectionMap[item])}
                    className="relative overflow-hidden cursor-pointer text-xl"
                  >
                    <span className="flex relative">
                      {item.split("").map((char, i) => (
                        <span key={i} className="letter inline-block transform">
                          {char}
                        </span>
                      ))}
                    </span>
                    <span className="flex absolute top-0 left-0">
                      {item.split("").map((char, i) => (
                        <span
                          key={i}
                          className="letter-clone inline-block transform text"
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection(sectionMap["Contact"])}
                className="font-display text-2xl font-semibold text-nowrap uppercase"
              >
                Contact me
              </button>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={isOpen}
        onClose={() => setIsOpen(false)}
        menuItems={menuItems}
        scrollToSection={scrollToSection}
      />
    </>
  );
}

function MobileMenu({ open, menuItems, onClose, scrollToSection }) {
  const menuRef = useRef([]);
  const sectionMap = {
    Skill: "skills",
    Experience: "experience",
    Project: "projects",
    Contact: "contact",
  };
  useEffect(() => {
    if (!open) return;

    menuRef.current.forEach((el) => {
      if (!el) return;
      const letters = el.querySelectorAll(".letter");
      const cloneLetters = el.querySelectorAll(".letter-clone");

      gsap.set(cloneLetters, { y: "100%" });

      const animateIn = () => {
        gsap.to(letters, {
          y: "-100%",
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(cloneLetters, {
          y: "0%",
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      const animateOut = () => {
        gsap.to(letters, {
          y: "0%",
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(cloneLetters, {
          y: "100%",
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      // Animate on menu open
      animateIn();

      // Add hover effect inside mobile menu
      el.addEventListener("mouseenter", animateIn);
      el.addEventListener("mouseleave", animateOut);

      return () => {
        el.removeEventListener("mouseenter", animateIn);
        el.removeEventListener("mouseleave", animateOut);
      };
    });
  }, [open]);

  if (!open) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-40 bg-white pt-30 px-25"
    >
      <ul className="flex flex-col items-center justify-center gap-8">
        {menuItems.map((item, idx) => (
          <li
            key={item}
            ref={(el) => (menuRef.current[idx] = el)}
            onClick={() => {
              scrollToSection(sectionMap[item]);
              onClose(); // close mobile menu after click
            }}
            className="relative overflow-hidden cursor-pointer text-center text-3xl font-semibold"
          >
            <span className="head flex relative">
              {item.split("").map((char, i) => (
                <span key={i} className="letter inline-block transform">
                  {char}
                </span>
              ))}
            </span>
            <span className="head flex absolute top-0 left-0">
              {item.split("").map((char, i) => (
                <span
                  key={i}
                  className="letter-clone inline-block transform text-emerald-500"
                >
                  {char}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={
          () => {
            scrollToSection(sectionMap["Contact"]);
            onClose();
            }}
        className="para font-display text-2xl font-semibold text-nowrap uppercase"
      >
        Contact me
      </button>
    </motion.div>
  );
}
