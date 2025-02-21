import React, { useEffect, memo } from "react";
import "./WhyChooseGlue.css";

// Singleton for font loading (unchanged, already optimal)
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

// Define feature type with strict icon options for better type safety
type FeatureIcon = "groups" | "code" | "build" | "share";
interface Feature {
  icon: FeatureIcon;
  title: string;
  description: string;
  delay: number;
}

// Feature data with const assertion for immutability and inference
const features = [
  {
    icon: "groups",
    title: "Natural Team Collaboration",
    description: "Mirror how your best teams work, turning barriers into accelerators for success.",
    delay: 0,
  },
  {
    icon: "code",
    title: "Simplified Development",
    description: "Create AI agents quickly with an intuitive language that cuts complexity without losing power.",
    delay: 200,
  },
  {
    icon: "build",
    title: "Customizable Tools",
    description: "Create and tailor tools for your needs, integrating seamlessly into your development workflows.",
    delay: 400,
  },
  {
    icon: "share",
    title: "Knowledge Retention",
    description: "Preserve and grow intelligence across teams with built-in knowledge management.",
    delay: 600,
  },
] as const satisfies readonly Feature[];

// Memoized FeatureCard to prevent unnecessary re-renders
const FeatureCard = memo<Feature>(({ icon, title, description, delay }) => (
  <div className="relative group" data-aos="fade-up" data-aos-delay={delay}>
    <div className="absolute inset-0 bg-[#F2F0FF]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
    <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#F2F0FF]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
      <div className="flex items-center mb-6">
        <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#F2F0FF]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#F2F0FF]">
          {icon}
        </span>
        <h3 className="typography-root typography-h3 !leading-tight font-semibold ml-6 text-[#F2F0FF]">
          {title}
        </h3>
      </div>
      <p className="typography-root font-light typography-p !leading-relaxed text-[#F2F0FF]/70">
        {description}
      </p>
    </div>
  </div>
));
FeatureCard.displayName = "FeatureCard"; // For debugging in React DevTools

// Main component with lazy-loaded features section
export const WhyChooseGlue: React.FC = () => {
  useEffect(loadMaterialSymbols, []); // Runs once on mount

  return (
    <div id="WhyChooseGlue">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] relative px-8 sm:px-12 lg:px-16">
          <div className="relative z-10">
            <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 lg:mb-24 animate-fade-in">
              <div className="max-w-xl lg:mt-20 space-y-12">
                <h2 className="typography-root typography-h2 !leading-tight font-bold text-[#F2F0FF] lg:tracking-tight lg:whitespace-nowrap animate-slide-up">
                  Build Better AI Solutions
                </h2>
                <p className="typography-root typography-p !leading-relaxed text-[#F2F0FF]/70 max-w-2xl animate-slide-up delay-100">
                  Say goodbye to AI complexity. GLUE empowers your teams to collaborate, innovate, and deploy AI agents
                  for business—automate tasks, boost growth, or elevate support—all within your existing workflows.
                </p>
              </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="space-y-8 lg:space-y-16">
                {features.slice(0, 2).map((feature, idx) => (
                  <FeatureCard key={`${feature.icon}-${idx}`} {...feature} />
                ))}
              </div>
              <div className="space-y-8 lg:space-y-16 md:mt-24">
                {features.slice(2).map((feature, idx) => (
                  <FeatureCard key={`${feature.icon}-${idx}`} {...feature} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
WhyChooseGlue.displayName = "WhyChooseGlue"; // For debugging in React DevTools