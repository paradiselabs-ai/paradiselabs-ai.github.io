import React, { memo } from "react";
import "./GlueKeyFeatures.css";

// Define strict TypeScript types
type MaterialIcon = "extension" | "diversity_3" | "build" | "architecture" | "code" | "settings";

interface Feature {
  icon: MaterialIcon;
  title: string;
  desc: string;
  delay: string;
}

// Feature data (static, immutable)
const features: readonly Feature[] = [
  {
    icon: "extension",
    title: "Adhesive Bindings",
    desc: "Link AI agents with team-wide (GLUE), project-specific (VELCRO), or instant (TAPE) knowledge sharing.",
    delay: "0",
  },
  {
    icon: "diversity_3",
    title: "Flexible Teams",
    desc: "Balance autonomy and structure as AI agents deliver results your way.",
    delay: "200",
  },
  {
    icon: "build",
    title: "Built-In Tools",
    desc: "Launch with web search, code interpreters, and more—expand as needed.",
    delay: "400",
  },
  {
    icon: "architecture",
    title: "Scalable Architecture",
    desc: "Focus on innovation as AI agents seamlessly scale your infrastructure.",
    delay: "200",
  },
  {
    icon: "code",
    title: "Expression Language",
    desc: "Build faster with an intuitive language that lets you create, not configure.",
    delay: "400",
  },
  {
    icon: "settings",
    title: "System Controls",
    desc: "Keep AI agents secure and efficient with full resource oversight.",
    delay: "600",
  },
] as const;

// Memoized FeatureCard (key removed from here)
const FeatureCard = memo<{ feature: Feature; index: number }>(({ feature }) => (
  <div
    className="relative z-10 p-10 rounded-3xl bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent border border-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5"
    data-aos="fade-up"
    data-aos-delay={feature.delay}
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
  >
    <div className="flex flex-col h-full gap-8">
      <div className="relative">
        <span className="material-symbols-outlined text-7xl text-white transition-transform duration-300 hover:scale-110">
          {feature.icon}
        </span>
      </div>
      <div className="space-y-5">
        <h3 className="typography-h3 !leading-tight font-bold text-white tracking-tight relative">
          {feature.title}
        </h3>
        <p className="typography-p font-light !leading-relaxed opacity-70">{feature.desc}</p>
      </div>
    </div>
  </div>
));
FeatureCard.displayName = "FeatureCard";

// Main component with key prop in map
export const GlueKeyFeatures: React.FC = () => {
  return (
    <div id="GlueKeyFeatures" className="typography-root">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] max-w-full px-4">
          <div className="relative">
            <div className="mb-24" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="typography-h2 !leading-tight font-bold mb-8 tracking-tight">
                Key Benefits
              </h2>
              <p className="typography-p !leading-relaxed opacity-80 max-w-3xl">
                Transform your AI vision into results with capabilities designed for success.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14">
              {features.map((item, index) => (
                <FeatureCard key={index} feature={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};