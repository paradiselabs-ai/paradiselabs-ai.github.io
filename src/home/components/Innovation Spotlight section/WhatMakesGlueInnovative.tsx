import React from "react";
import "./WhatMakesGlueInnovative.css";

// Wrap the component with React.memo to prevent unnecessary re-renders
export const WhatMakesGlueInnovative = React.memo(() => {
  return (
    <div id="WhatMakesGlueInnovative" className="typography-root">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="px-8 py-12 mx-auto text-[#F8F8FF]">
            <div className="flex flex-col md:flex-row items-start justify-between mb-12 space-y-8 md:space-y-0 md:space-x-16">
              <div
                className="w-full md:w-1/2 space-y-6"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <h1 className="typography-h2 font-bold tracking-tight pb-2 text-white">
                  Maximize Efficiency with AI
                </h1>
                <p className="typography-p !leading-relaxed backdrop-blur-xl bg-[#F8F8FF]/5 p-8 rounded-lg shadow-lg hover:bg-[#F8F8FF]/10 transition-all duration-300">
                  Break through classic AI limits and elevate your teams.
                </p>
              </div>
              <div
                className="w-full md:w-1/2"
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <p className="typography-p !leading-relaxed backdrop-blur-xl bg-[#F8F8FF]/5 p-8 rounded-lg shadow-lg hover:bg-[#F8F8FF]/10 transition-all duration-300">
                  Bring your vision to life with AI that bonds like humans, enhancing productivity and transforming work.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#F8F8FF]/5 hover:bg-[#F8F8FF]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <span className="material-symbols-outlined text-5xl text-[#F8F8FF] hover:scale-110 transition-transform">
                  group_work
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">
                    Human-Like Collaboration
                  </h2>
                  <p className="typography-p font-light !leading-relaxed text-[#F8F8FF]/90">
                    Watch AI agents collaborate as naturally as your teams.
                  </p>
                </div>
              </div>

              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#F8F8FF]/5 hover:bg-[#F8F8FF]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                <span className="material-symbols-outlined text-5xl text-[#F8F8FF] hover:scale-110 transition-transform">
                  settings_suggest
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">
                    Dynamic Resource Management
                  </h2>
                  <p className="typography-p font-light !leading-relaxed text-[#F8F8FF]/90">
                    Get your AI the resources it needs, when it needs them.
                  </p>
                </div>
              </div>

              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#F8F8FF]/5 hover:bg-[#F8F8FF]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="400"
              >
                <span className="material-symbols-outlined text-5xl text-[#F8F8FF] hover:scale-110 transition-transform">
                  architecture
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">Future-Proof Architecture</h2>
                  <p className="typography-p font-light !leading-relaxed text-[#F8F8FF]/90">
                    Scale easily with AI agents that expand your infrastructure.
                  </p>
                </div>
              </div>

              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#F8F8FF]/5 hover:bg-[#F8F8FF]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="600"
              >
                <span className="material-symbols-outlined text-5xl text-[#F8F8FF] hover:scale-110 transition-transform">
                  build
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">
                    Integrated Toolsets+
                  </h2>
                  <p className="typography-p font-light !leading-relaxed text-[#F8F8FF]/90">
                    Launch with web search, code tools—expand as needed.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
              <div
                className="lg:col-span-2 overflow-hidden rounded-xl backdrop-blur-xl bg-[#F8F8FF]/5 hover:bg-[#F8F8FF]/10 transition-all duration-300"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <div className="h-full flex flex-col">
                  <div className="grid grid-cols-3 gap-4 p-6 bg-[#F8F8FF]/10">
                    <h4 className="typography-h3 font-semibold !leading-tight text-center">Your Needs</h4>
                    <h4 className="typography-h3 font-semibold !leading-tight text-center">With GLUE</h4>
                    <h4 className="typography-h3 font-semibold !leading-tight text-center">Without GLUE</h4>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#F8F8FF]/10 transition-colors duration-200">
                      <div className="typography-p font-medium text-center">Team Innovation</div>
                      <div className="typography-p text-center font-light text-[#F8F8FF]/90">
                        Natural collaboration
                      </div>
                      <div className="typography-p font-light text-[#F8F8FF]/90 text-center">Rigid processes</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#F8F8FF]/10 text-center transition-colors duration-200">
                      <div className="typography-p font-light font-medium">Business Agility</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">
                        Smart adaptation
                      </div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Fixed limits</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#F8F8FF]/10 text-center transition-colors duration-200">
                      <div className="typography-p font-medium">Future Potential</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Unlimited potential</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Constrained growth</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#F8F8FF]/10 transition-colors text-center duration-200">
                      <div className="typography-p font-medium">Setup Time</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Setup in minutes</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Setup in weeks</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#F8F8FF]/10 transition-colors text-center duration-200">
                      <div className="typography-p font-medium">Time to Value</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Immediate value</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Months to value</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WhatMakesGlueInnovative;