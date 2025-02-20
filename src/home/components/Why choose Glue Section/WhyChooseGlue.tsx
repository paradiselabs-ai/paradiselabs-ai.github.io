import React from "react";
import "./WhyChooseGlue.css";

export const WhyChooseGlue = () => {
  return (
    <div id="WhyChooseGlue">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] relative px-8 sm:px-12 lg:px-16">
          <div className="relative z-10">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 lg:mb-24 animate-fade-in">
              <div className="max-w-xl lg:mt-20 space-y-12">
                <h2 className="typography-root typography-h2 !leading-tight font-bold text-[#F2F0FF] lg:tracking-tight lg:whitespace-nowrap animate-slide-up">
                  Build Better AI Solutions
                </h2>
                <p className="typography-root typography-p !leading-relaxed text-[#F2F0FF]/70 max-w-2xl animate-slide-up delay-100">
                  Say goodbye to AI complexity. GLUE empowers your teams to collaborate, innovate, and deploy AI agents for business—automate tasks, boost growth, or elevate support—all within your existing workflows.
                </p>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="space-y-8 lg:space-y-16">
                {/* Feature 1: Natural Team Collaboration */}
                <div className="relative group" data-aos="fade-up">
                  <div className="absolute inset-0 bg-[#F2F0FF]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#F2F0FF]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#F2F0FF]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#F2F0FF]">
                        groups
                      </span>
                      <h3 className="typography-root typography-h3 !leading-tight font-semibold ml-6 text-[#F2F0FF]">
                        Natural Team Collaboration
                      </h3>
                    </div>
                    <p className="typography-root font-light typography-p !leading-relaxed text-[#F2F0FF]/70">
                      Mirror how your best teams work, turning barriers into accelerators for success.
                    </p>
                  </div>
                </div>

                {/* Feature 2: Simplified Development */}
                <div className="relative group" data-aos="fade-up" data-aos-delay="200">
                  <div className="absolute inset-0 bg-[#F2F0FF]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#F2F0FF]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#F2F0FF]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#F2F0FF]">
                        code
                      </span>
                      <h3 className="typography-root typography-h3 !leading-tight font-semibold ml-6 text-[#F2F0FF]">
                        Simplified Development
                      </h3>
                    </div>
                    <p className="typography-root font-light typography-p !leading-relaxed text-[#F2F0FF]/70">
                      Create AI agents quickly with an intuitive language that cuts complexity without losing power.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8 lg:space-y-16 md:mt-24">
                {/* Feature 3: Customizable Tools */}
                <div className="relative group" data-aos="fade-up" data-aos-delay="400">
                  <div className="absolute inset-0 bg-[#F2F0FF]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#F2F0FF]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#F2F0FF]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#F2F0FF]">
                        build
                      </span>
                      <h3 className="typography-root typography-h3 !leading-tight font-semibold ml-6 text-[#F2F0FF]">
                        Customizable Tools
                      </h3>
                    </div>
                    <p className="typography-root font-light typography-p !leading-relaxed text-[#F2F0FF]/70">
                      Create and tailor tools for your needs, integrating seamlessly into your development workflows.
                    </p>
                  </div>
                </div>

                {/* Feature 4: Knowledge Retention */}
                <div className="relative group" data-aos="fade-up" data-aos-delay="600">
                  <div className="absolute inset-0 bg-[#F2F0FF]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#F2F0FF]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#F2F0FF]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#F2F0FF]">
                        share
                      </span>
                      <h3 className="typography-root typography-h3 !leading-tight font-semibold ml-6 text-[#F2F0FF]">
                        Knowledge Retention
                      </h3>
                    </div>
                    <p className="typography-root font-light typography-p !leading-relaxed text-[#F2F0FF]/70">
                      Preserve and grow intelligence across teams with built-in knowledge management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};