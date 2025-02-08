import React from "react";
import "./WhyChooseGlue.css";

export const WhyChooseGlue = () => {
  return (
    <div id="WhyChooseGlue">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] relative px-8 sm:px-12 lg:px-16">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 lg:mb-24">
              <div className="max-w-xl lg:mt-20 space-y-12">
                <h2 className="text-4xl sm:text-5xl lg:text-[5.5rem] leading-tight font-bold text-[#d6ddf4] lg:tracking-tight lg:whitespace-nowrap">
                  Why Choose GLUE?
                </h2>
                <p className="text-base sm:text-lg lg:text-[1.3rem] text-[#d6ddf4]/70 max-w-2xl">
                  GLUE transforms how AI teams collaborate and build solutions.
                  It's intuitive, scalable, and built for real-world workflows.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="space-y-8 lg:space-y-16">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                        groups
                      </span>
                      <h3 className="text-2xl lg:text-[2.1rem] font-semibold ml-6 text-[#d6ddf4]">
                        Team-Based Structure
                      </h3>
                    </div>
                    <p className="text-lg lg:text-[1.3rem] text-[#d6ddf4]/70">
                      Mimics real-life organizations—models work together
                      naturally within teams.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                        code
                      </span>
                      <h3 className="text-2xl lg:text-[2.1rem] font-semibold ml-6 text-[#d6ddf4]">
                        Expression Language
                      </h3>
                    </div>
                    <p className="text-lg lg:text-[1.3rem] text-[#d6ddf4]/70">
                      Write applications quickly using an easy-to-understand
                      declarative syntax.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8 lg:space-y-16 md:mt-24">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                        build
                      </span>
                      <h3 className="text-2xl lg:text-[2.1rem] font-semibold ml-6 text-[#d6ddf4]">
                        Custom Tool Creation
                      </h3>
                    </div>
                    <p className="text-lg lg:text-[1.3rem] text-[#d6ddf4]/70">
                      Build tools tailored to your needs, with seamless
                      integration into workflows.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-2xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                  <div className="p-8 lg:p-10 rounded-2xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                    <div className="flex items-center mb-6">
                      <span className="material-symbols-outlined text-5xl lg:text-6xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                        share
                      </span>
                      <h3 className="text-2xl lg:text-[2.1rem] font-semibold ml-6 text-[#d6ddf4]">
                        Persistent Knowledge Sharing
                      </h3>
                    </div>
                    <p className="text-lg lg:text-[1.3rem] text-[#d6ddf4]/70">
                      Share insights across teams effortlessly with adhesive
                      bindings.
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