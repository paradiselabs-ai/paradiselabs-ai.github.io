import React, { useEffect, memo } from "react";
import "./HowDoesGlueWork.css";

// Singleton for font loading (unchanged)
const loadMaterialSymbols = (() => {
  let loaded = false;
  return () => {
    if (!loaded && !document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined";
      document.head.appendChild(link);
      loaded = true;
    }
  };
})();

// Define strict TypeScript types
type MaterialIcon = "rocket_launch" | "group" | "sync_alt" | "psychology";
type AOSAnimation = "fade-up" | "fade-right" | "fade-left";

interface Step {
  icon: MaterialIcon;
  title: string;
  description: string;
  aos: AOSAnimation;
  textAlign: "left" | "right"; // Controls text alignment and spacer position
  spacerBefore: boolean; // Determines if spacer comes before or after content
}

// Step data with const assertion for immutability and type inference
const steps: readonly Step[] = [
  {
    icon: "group",
    title: "Accelerate Innovation Together",
    description:
      "Shatter barriers slowing progress. You'll complete projects in weeks, not months, with seamless AI-human teamwork.",
    aos: "fade-right",
    textAlign: "right",
    spacerBefore: false, // Spacer after content (on the left)
  },
  {
    icon: "sync_alt",
    title: "Turn Insights into Action",
    description:
      "Watch information flow between AI agents, empowering faster, sharper decisions that keep you ahead of market changes.",
    aos: "fade-left",
    textAlign: "left",
    spacerBefore: true, // Spacer before content (on the right)
  },
  {
    icon: "psychology",
    title: "Build Lasting Knowledge",
    description:
      "Transform every project into a foundation for future success, making each a stepping stone with AI preserving your expertise.",
    aos: "fade-right",
    textAlign: "right",
    spacerBefore: false, // Spacer after content (on the left)
  },
] as const;

// Memoized Step component with correct positioning
const Step = memo<{
  step: Step;
  index: number;
}>(({ step, index }) => {
  const { icon, title, description, aos, textAlign, spacerBefore } = step;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16" data-aos={aos}>
      {spacerBefore && <div className="hidden md:block md:w-1/2" />}
      <div
        className={`w-full md:w-1/2 text-center md:text-${textAlign} transform-gpu hover:${
          textAlign === "right" ? "-translate-x-2" : "translate-x-2"
        } transition-all duration-500 p-4 md:p-10`}
      >
        <span
          className={`material-symbols-outlined text-5xl md:text-6xl text-[#F5F2FF] mb-4 md:mb-6 animate-${
            icon === "sync_alt" ? "spin-slow" : "bounce-slow"
          }`}
        >
          {icon}
        </span>
        <h3 className="typography-h3 !leading-tight mb-4 md:mb-6 text-[#F5F2FF] animate-slide-up">
          {title}
        </h3>
        <p
          className={`typography-p font-light !leading-relaxed text-[#F5F2FF]/70 animate-fade-in max-w-xl ${
            textAlign === "right" ? "md:ml-auto" : ""
          }`}
        >
          {description}
        </p>
      </div>
      {!spacerBefore && <div className="hidden md:block md:w-1/2" />}
    </div>
  );
});
Step.displayName = "Step";

// Main component with improved TypeScript and performance
export const HowDoesGlueWork: React.FC = () => {
  useEffect(() => {
    loadMaterialSymbols();
  }, []); // Runs once on mount

  return (
    <div id="HowDoesGlueWork" className="typography-root">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] max-w-full px-2 sm:px-4 md:px-6">
          <div className="relative py-8 md:py-16">
            <section
              className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 mb-16 md:mb-32 group/section"
              data-aos="fade-up"
            >
              <div className="w-full lg:w-3/5 p-4 md:p-8">
                <h2 className="typography-h2 !leading-tight mb-4 md:mb-8 text-[#F5F2FF] font-bold animate-slide-up">
                Unlock the Power to Achieve Your Dreams with AI
                </h2>
                <p className="typography-p !leading-relaxed text-[#F5F2FF]/70 animate-fade-in max-w-2xl">
                  Turn AI challenges into your edge. Watch your teams innovate faster, make sharper decisions, and build
                  lasting knowledge with AI agents that work smarter.
                </p>
              </div>
            </section>

            <section className="relative mb-16 md:mb-32">
              <div className="absolute left-1/2 top-0 w-0.5 md:w-1 h-full bg-[#F5F2FF]/10 animate-glow hidden md:block" />
              <div className="space-y-16 md:space-y-32">
                {steps.map((step, index) => (
                  <Step key={`${step.icon}-${index}`} step={step} index={index} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
HowDoesGlueWork.displayName = "HowDoesGlueWork";