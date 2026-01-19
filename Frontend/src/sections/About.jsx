import { motion } from "framer-motion";
import MaskedScrollText from "../components/MaskedScrollText";
import ScrollRevealText from "../components/ScrollRevealText";

export default function About() {
  return (
    <>
      {/* Title */}
      <section id="about">
        <MaskedScrollText start="150%" duration={0.3}>
          <h2 className="w-full text-center text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[15rem] text-nowrap font-extrabold uppercase tracking-tight py-2">
            About us
          </h2>
        </MaskedScrollText>
        <div id="about" className="py-6 pb-30 bg-[#101010]">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="text-white text-start text-md md:text-lg para mr-auto">
              <ScrollRevealText start="60%">Hello!</ScrollRevealText>
              <ScrollRevealText start="60%">I'm Shyam Raj</ScrollRevealText>
            </div>
            <div className="max-w-[400px] text-white text-start text-md md:text-lg pt-10 para mx-auto">
              <ScrollRevealText className={"w-fit text-nowrap"}>
                I’m a Front-End Developer with 3+ years
              </ScrollRevealText>
              <ScrollRevealText className={"w-fit text-nowrap"}>
                of experience building high-performance,
              </ScrollRevealText>
              <ScrollRevealText className={"text-nowrap"}>
                visually refined, and user-focused web applications.
              </ScrollRevealText>
              <ScrollRevealText className={"text-nowrap"}>
                with hands-on experience in
              </ScrollRevealText>
            </div>
            <div className="max-w-[430px] text-white text-start text-md md:text-lg pt-10 para ml-auto">
              <ScrollRevealText className={"text-nowrap"}>
                My expertise includes JavaScript, React,
              </ScrollRevealText>
              <ScrollRevealText className={"text-nowrap"}>
                Tailwind CSS, REST APIs,
              </ScrollRevealText>
              <ScrollRevealText className={"text-nowrap"}>
                MERN stack, React Native, Firebase,
              </ScrollRevealText>
              <ScrollRevealText className={"text-nowrap"}>
                and Shopify / WordPress (WooCommerce).
              </ScrollRevealText>
              <ScrollRevealText className={"text-nowrap"}>
                I enjoy transforming complex requirements
              </ScrollRevealText>
              <ScrollRevealText className={"text-nowrap"}>
                into elegant, scalable interfaces,
              </ScrollRevealText>
              <ScrollRevealText className={"text-nowrap"}>
                focusing on performance, clean code,
              </ScrollRevealText>
              <ScrollRevealText className={"text-nowrap"}>
                and thoughtful design.
              </ScrollRevealText>
            </div>
          </div>
          <hr className="my-10 mx-6 border-0.5 border-[#b7b7b77c] max-w-[1800px] m-auto" />
          <div className="mx-6 px-6">
            <h2 className="para lg:text-4xl font-light text-gray-200">
              Built a strong foundation in problem-solving and analytical
              thinking,
            </h2>
            <h2 className="text-end para text-xl md:text-2xl lg:text-4xl font-light text-gray-200 mb-20">
              later transitioning into frontend development through hands-on
              projects and continuous upskilling.
            </h2>
            <MaskedScrollText start="100%" duration={0.3}>
              <h2 className="w-full head text-white text-center text-[3rem] sm:text-[4rem] md:text-[7rem] lg:text-[8rem] font-semibold text-nowrap uppercase tracking-tighter py-2">
                Education
              </h2>
            </MaskedScrollText>
            <div className="text-white text-start text-lg para">
              <ScrollRevealText start="80%">
                Bachelor of Engineering (Mechanical Engineering)
              </ScrollRevealText>
              <ScrollRevealText start="80%">
                Karpagam Institution of Technology, Coimbatore
              </ScrollRevealText>
              <ScrollRevealText start="80%">2019 – 2023</ScrollRevealText>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
