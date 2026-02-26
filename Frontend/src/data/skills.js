import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaWordpress,
  FaFigma,
} from "react-icons/fa";

import { IoLogoFirebase } from "react-icons/io5";

import {
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiWoocommerce,
  SiBootstrap,
  SiVercel,
  SiNetlify,
  SiVite,
  SiCoreldraw,
  SiAdobephotoshop,
} from "react-icons/si";

export const skills = [
  {
    title: "Frontend",
    items: [
      { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    ],
  },
  {
    title: "Mobile",
    items: [
      { name: "React Native", icon: FaReact, color: "#61DAFB" },
      { name: "Firebase", icon: IoLogoFirebase, color: "#FFCA28" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#000000" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#000000" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "WooCommerce", icon: SiWoocommerce, color: "#96588A" },
      { name: "WordPress", icon: FaWordpress, color: "#21759B" },
      { name: "Vercel", icon: SiVercel, color: "#000000" },
      { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
    ],
  },
  {
    title: "Design (Basic)",
    items: [
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
      { name: "CorelDraw", icon: SiCoreldraw, color: "#00A651" },
      { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
    ],
  },
];