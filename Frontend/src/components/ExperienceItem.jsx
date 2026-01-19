import { motion } from "framer-motion";

export default function ExperienceItem({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative pl-10 border-l border-white/10"
    >
      <span className="absolute -left-[7px] top-2 w-3 h-3 bg-primary rounded-full" />

      <h3 className="text-2xl font-semibold">
        {data.role}{" "}
        <span className="text-primary">@ {data.company}</span>
      </h3>

      <p className="text-gray-500 mb-4">{data.period}</p>

      <ul className="list-disc list-inside text-gray-400 space-y-2">
        {data.points.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </motion.div>
  );
}
