import React from "react";
import "./GlueKeyFeatures.css";

export const GlueKeyFeatures = () => {
  return (
    <div id="GlueKeyFeatures" className="typography-root">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] max-w-full px-4">
          <div className="relative">
            <div className="mb-24" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="typography-h2 !leading-tight font-bold mb-8 bg-gradient-to-r from-white to-white/70 bg-clip-text tracking-tight">
                Key Features
              </h2>
              <p className="typography-p !leading-relaxed opacity-80 max-w-3xl">
                Turn your AI vision into reality with powerful capabilities that put your team's success first.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14">
              {[
                {
                  icon: "extension",
                  title: "Adhesive Bindings",
                  desc: "Share knowledge exactly how your AI agents needs it—whether team-wide (GLUE), project-based (VELCRO), or quick exchanges (TAPE).",
                  delay: "0",
                },
                {
                  icon: "diversity_3",
                  title: "Flexible Teams",
                  desc: "Let your AI agents work their way, with the perfect balance of flexibility and structure to deliver results faster.",
                  delay: "200",
                },
                {
                  icon: "build",
                  title: "Built-In Tools",
                  desc: "Hit the ground running with essential tools like web search, code interpreters, and file handlers—then expand as you grow.",
                  delay: "400",
                },
                {
                  icon: "architecture",
                  title: "Scalable Architecture",
                  desc: "Focus on innovation while your infrastructure grows seamlessly with your success, without missing a beat.",
                  delay: "200",
                },
                {
                  icon: "code",
                  title: "Expression Language",
                  desc: "Build faster and smarter with an intuitive language that lets you focus on creating, not configuring.",
                  delay: "400",
                },
                {
                  icon: "settings",
                  title: "System Controls",
                  desc: "Keep your AI agents secure and efficient with complete visibility and control over your AI resources.",
                  delay: "600",
                },
              ].map((item, index) => (
                <div
                  className="relative z-10 p-10 rounded-3xl bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent border border-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={item.delay}
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-out"
                >
                  <div className="flex flex-col h-full gap-8">
                    <div className="relative">
                      <span className="material-symbols-outlined text-7xl bg-gradient-to-br from-white to-white/80 bg-clip-text transition-transform duration-300 hover:scale-110">
                        {item.icon}
                      </span>
                    </div>
                    <div className="space-y-5">
                      <h3 className="typography-h3 !leading-tight font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text tracking-tight relative">
                        {item.title}
                      </h3>
                      <p className="typography-p font-light !leading-relaxed opacity-70">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};