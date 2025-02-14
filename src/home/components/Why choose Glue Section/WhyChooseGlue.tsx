import React from "react";
import "./WhyChooseGlue.css";

export const WhyChooseGlue = () => {
  return (
    <div id="WhyChooseGlue">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] relative px-8 sm:px-12 lg:px-16">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 lg:mb-24 animate-fade-in">
              <div className="max-w-xl lg:mt-20 space-y-12">
                <h2 className="typography-root typography-h2 !leading-tight font-bold text-[#d6ddf4] lg:tracking-tight lg:whitespace-nowrap animate-slide-up">
                  Build Better AI Solutions
                </h2>
                <p className="typography-root typography-p !leading-relaxed text-[#d6ddf4]/70 max-w-2xl animate-slide-up delay-100">
                  Transform how your teams collaborate and deliver AI solutions with tools that adapt to your workflow, not the other way around.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="space-y-8 lg:space-y-16">
                <div className="relative group" data-aos="fade-up">
                  <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                        groups
                      </span>
                      <h3 className="typography-root typography-h3 !leading-tight font-semibold ml-6 text-[#d6ddf4]">
                        Natural Team Collaboration
                      </h3>
                    </div>
                    <p className="typography-root typography-p !leading-relaxed text-[#d6ddf4]/70">
                      Work the way your team already does, with built-in structures that mirror your organization's natural workflow and communication patterns.
                    </p>
                  </div>
                </div>

                <div
                  className="relative group"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                        code
                      </span>
                      <h3 className="typography-root typography-h3 !leading-tight font-semibold ml-6 text-[#d6ddf4]">
                        Simplified Development
                      </h3>
                    </div>
                    <p className="typography-root typography-p !leading-relaxed text-[#d6ddf4]/70">
                      Build solutions faster with our intuitive expression language that reduces complexity while maintaining the power you need for AI development.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8 lg:space-y-16 md:mt-24">
                <div
                  className="relative group"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                        build
                      </span>
                      <h3 className="typography-root typography-h3 !leading-tight font-semibold ml-6 text-[#d6ddf4]">
                        Customizable Tools
                      </h3>
                    </div>
                    <p className="typography-root typography-p !leading-relaxed text-[#d6ddf4]/70">
                      Create and adapt tools that fit your specific needs, with seamless integration into your existing development and deployment workflows.
                    </p>
                  </div>
                </div>

                <div
                  className="relative group"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                        share
                      </span>
                      <h3 className="typography-root typography-h3 !leading-tight font-semibold ml-6 text-[#d6ddf4]">
                        Knowledge Retention
                      </h3>
                    </div>
                    <p className="typography-root typography-p !leading-relaxed text-[#d6ddf4]/70">
                      Preserve and share critical insights across teams with built-in knowledge management that makes collaboration and onboarding more effective.
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