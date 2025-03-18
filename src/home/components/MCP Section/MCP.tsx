import React, { memo, useMemo } from "react";
import "./MCP.css";

// Memoized FeatureCard component
const FeatureCard = memo(
  ({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: string }) => (
    <div
      className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 p-6 md:p-6 rounded-2xl"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <span className="material-icons text-4xl md:text-3xl text-[#F8F6FF] md-36">{icon}</span>
      <div className="text-center md:text-left">
        <strong className="typography-h3 !leading-tight font-bold text-[#F8F6FF] mb-3 block">{title}</strong>
        <p className="typography-p font-light !leading-relaxed text-[#F8F6FF]/70">{desc}</p>
      </div>
    </div>
  )
);
FeatureCard.displayName = "FeatureCard";

// Memoized MCP component
export const MCP = memo(() => {
  // Memoize feature data
  const features = useMemo(
    () => [
      {
        icon: "flash_on",
        title: "Instant Server Creation",
        desc: "Easily launch MCP servers and tools by simply asking your GLUE AI agent.",
        delay: "90",
      },
      {
        icon: "link",
        title: "Easy Integration",
        desc: "Seamlessly integrate any MCP server into your apps with just a click.",
        delay: "110",
      },
      {
        icon: "search",
        title: "Server Discovery",
        desc: "Take full control of MCP servers—right from your terminal.",
        delay: "120",
      },
      {
        icon: "speed",
        title: "Seamless Development",
        desc: "Build and deploy MCP tools faster, with less setup.",
        delay: "130",
      },
    ],
    []
  );

  return (
    <div id="MCP" className="typography-root">
      <div className="w-full flex justify-center">
        <div className="w-[1400px] overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-screen">
            <div className="w-full lg:w-7/12 pl-24 p-12 md:p-16 relative overflow-hidden">
              <div className="space-y-12 md:space-y-16 relative z-10">
                <div className="text-center md:text-left mb-12 md:mb-16" data-aos="fade-right">
                  <h2 className="typography-h2 !leading-tight font-bold mb-6 md:mb-8">
                  Unleash Your Code with MCP
                  </h2>
                  <p className="typography-p !leading-relaxed text-[#F8F6FF]/80">
                    Turn technical complexity into business agility. GLUE's MCP infrastructure powers AI agents to work together flawlessly, freeing you to focus on value.
                  </p>
                </div>
                <div className="space-y-6 md:space-y-8">
                  {features.map((feature) => (
                    <FeatureCard
                      key={feature.title}
                      icon={feature.icon}
                      title={feature.title}
                      desc={feature.desc}
                      delay={feature.delay}
                    />
                  ))}
                </div>
                <div
                  className="backdrop-blur-xl bg-[#F8F6FF]/5 border border-[#F8F6FF]/10 rounded-3xl p-8 md:p-10 mt-12 md:mt-16"
                  data-aos="fade-up"
                  data-aos-delay="140"
                >
                  <h3 className="typography-h3 !leading-tight font-bold text-[#FCF9FA] mb-9 md:mb-6 text-center md:text-left">
                    What This Means for You
                  </h3>
                  <p className="typography-p font-light !leading-relaxed text-[#FCF9FA]/70 text-center md:text-left">
                    Accelerate your development process with instant access to MCP servers and tools. GLUE's integration with MCP empowers you to build and connect AI solutions faster than ever.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-5/12 relative overflow-hidden p-12 md:p-16 pr-24 md:pr-32 lg:pr-48">
              <div className="relative h-full flex items-center justify-center">
                <div className="relative z-10" data-aos="fade-left">
                  <span className="material-icons text-5xl md:text-7xl lg:text-9xl text-[#F8F6FF] mb-8 md:mb-10 block text-center md-48">
                  device_hub
                  </span>
                  <h2 className="typography-h2 !leading-tight font-bold text-[#F8F6FF] mb-6 md:mb-8 text-center">
                  Model Context Protocol
                  </h2>
                  <p className="typography-p font-light !leading-relaxed text-[#F8F6FF]/80 text-center">
                    Connect, integrate, and scale your AI solutions with our advanced MCP infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
MCP.displayName = "MCP";

export default MCP;