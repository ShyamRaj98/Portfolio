export function Experience() {
  const experience = [
    {
      title: "Front-End Developer",
      org: "Media Twelve",
      period: "2022 – Present",
    },
    {
      title: "Front-End Developer",
      org: "Cleverso Software Solutions",
      period: "2020 – 2022",
    },
  ];

  const education = [
    {
      title: "Bachelor of Computer Applications (BCA)",
      org: "Sree Narayana Guru College",
      period: "2016 – 2019",
    },
    {
      title: "HSC",
      org: "CSI Boys Higher Secondary School",
      period: "2015 – 2016",
    },
  ];

  return (
    <section id="experience" className="py-12">
      <h3 className="section-title text-white">
        Experience & Education
      </h3>

      {/* Experience */}
      <div className="mt-8 space-y-6 border-l border-gray-700 pl-6">
        {experience.map((it, idx) => (
          <div
            key={idx}
            className="relative p-4 rounded-lg bg-gray-800 border border-gray-700
                       hover:border-pink-500 transition"
          >
            <span className="absolute -left-[10px] top-6 w-4 h-4 rounded-full 
                             bg-gradient-to-r from-pink-500 to-violet-600" />
            <div className="font-semibold text-white">
              {it.title}
            </div>
            <div className="text-sm text-gray-400">
              {it.org} • {it.period}
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mt-10 space-y-6 border-l border-gray-700 pl-6">
        {education.map((it, idx) => (
          <div
            key={idx}
            className="relative p-4 rounded-lg bg-gray-800 border border-gray-700
                       hover:border-violet-500 transition"
          >
            <span className="absolute -left-[10px] top-6 w-4 h-4 rounded-full 
                             bg-gray-400" />
            <div className="font-semibold text-white">
              {it.title}
            </div>
            <div className="text-sm text-gray-400">
              {it.org} • {it.period}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
