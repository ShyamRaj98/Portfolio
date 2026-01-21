import MaskedScrollText from "./MaskedScrollText";

export default function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-10">
        {/* Top Row */}

        <div className="text-right font-display mb-10">
          <p className="font-semibold text-xl sm:text-3xl md:text-4xl lg:text-6xl">
            +91 81229 60486
          </p>

          <p className="break-all font-semibold text-xl sm:text-2xl md:text-3xl lg:text-6xl">
            shyamdeepu@gmail.com
          </p>

          <div
            className="flex flex-wrap justify-end gap-x-6 gap-y-2 
  text-xl sm:text-xl md:text-3xl lg:text-4xl uppercase tracking-wide mt-8"
          >
            <FooterLink href="https://www.linkedin.com/in/shyam-raj-29298b245/" target={"_blank"}>
              LinkedIn
            </FooterLink>
            <FooterLink href="https://github.com/ShyamRaj98" target={"_blank"}>Github</FooterLink>
          </div>
        </div>
        <div className="flex justify-between gap-10 md:gap-12">
          {/* Left: Navigation */}
          <div
            className="flex flex-col justify-end space-y-4 sm:space-y-6 uppercase font-display font-semibold
  text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide"
          >
            <FooterLink href="#about" arrow={false}>
              About Me
            </FooterLink>
            <FooterLink href="#services" arrow={false}>
              Experience
            </FooterLink>
            <FooterLink href="#works" arrow={false}>
              Projects
            </FooterLink>
          </div>

          {/* Center spacer */}
          <div className="hidden md:block" />

          {/* Right: Contact */}
          <div className="flex flex-col space-y-3 md:items-end">
            <p className="font-body text-xs sm:text-sm lg:text-lg text-gray-500 mt-18 leading-5 md:text-left">
              Address:
              <br />
              1/2 Rice Mill Road,Kuniamuthur
              <br />
              Coimbatore, India
            </p>
          </div>
        </div>

        {/* Bottom: Huge Name */}
        <div className="mt-16 sm:mt-20 overflow-hidden">
          <MaskedScrollText start="200%" duration={0.3}>
            <h1
              className=" 
            w-full text-center font-body font-bold tracking-tight leading-none
            text-[15.5vw]
            sm:text-[14vw]
            md:text-[12vw]
            lg:text-[10vw]
            xl:text-[15.5vw]
          "
            >
              SHYAM RAJ
            </h1>
          </MaskedScrollText>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children, arrow = true, target }) {
  const handleClick = (e) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <a
      href={href}
      target={target}
      onClick={handleClick}
      className="w-fit group relative inline-flex items-center gap-2 uppercase"
    >
      {/* TEXT */}
      <span className="relative z-10 w-fit">{children}</span>

      {/* ARROW */}
      {arrow && (
        <span
          className="
            inline-block transition-transform duration-300 ease-out
            group-hover:translate-x-2 group-hover:translate-y-[-5px]
          "
        >
          ↗
        </span>
      )}

      {/* BOTTOM LINE */}
      <span
        className="
          absolute left-0 -bottom-1 h-[2px] w-full
          bg-black
          scale-x-0 origin-left
          transition-transform duration-300 ease-out
          group-hover:scale-x-100
        "
      />
    </a>
  );
}
