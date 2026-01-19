import { motion } from "framer-motion";
import HoverScaleText from "../components/HoverScaleText";
import RevealText from "../components/RevealText";

export default function Hero() {
  return (
    <section className="w-screen h-[90vh]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <HoverScaleText
          text="DEVELOPER"
          maxScale={1.6}
          influence={50}
          className="text-black w-fit font-[500] text-[8rem] md:text-[10rem] lg:text-[12rem] overflow-visible"
        />
        <p className="max-w-[500px] text-center text-md uppercase">
          experienced front-end & UI developer, crafting memorable web
          experiences for brands of all sizes.
        </p>
      </div>
    </section>
  );
}
