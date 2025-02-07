import React from "react";


/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import "./WhyChooseGlue.css";

export const WhyChooseGlue = () => {
    return (
        <div id="WhyChooseGlue">
          <div className="w-[1200px] relative">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-16">
                <div className="max-w-xl">
                  <h2 className="text-[5.5rem] font-bold mb-4 text-[#d6ddf4]">
                    Why Choose GLUE?
                  </h2>
                  <p className="text-[1.3rem] text-[#d6ddf4]/70">
                    GLUE transforms how AI teams collaborate and build solutions.
                    It's intuitive, scalable, and built for real-world workflows.
                  </p>
                </div>
                <div className="relative group"></div>
              </div>
    
              <div className="grid grid-cols-2 gap-10">
                <div className="col-span-2 md:col-span-1 space-y-10">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="p-8 rounded-xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                      <div className="flex items-center mb-4">
                        <span className="material-symbols-outlined text-5xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                          groups
                        </span>
                        <h3 className="text-[2.1rem] font-semibold ml-4 text-[#d6ddf4]">
                          Team-Based Structure
                        </h3>
                      </div>
                      <p className="text-[1.3rem] text-[#d6ddf4]/70">
                        Mimics real-life organizations—models work together
                        naturally within teams.
                      </p>
                    </div>
                  </div>
    
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="p-8 rounded-xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                      <div className="flex items-center mb-4">
                        <span className="material-symbols-outlined text-5xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                          code
                        </span>
                        <h3 className="text-[2.1rem] font-semibold ml-4 text-[#d6ddf4]">
                          Expression Language
                        </h3>
                      </div>
                      <p className="text-[1.3rem] text-[#d6ddf4]/70">
                        Write applications quickly using an easy-to-understand
                        declarative syntax.
                      </p>
                    </div>
                  </div>
                </div>
    
                <div className="col-span-2 md:col-span-1 space-y-10 mt-10 md:mt-20">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="p-8 rounded-xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                      <div className="flex items-center mb-4">
                        <span className="material-symbols-outlined text-5xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                          build
                        </span>
                        <h3 className="text-[2.1rem] font-semibold ml-4 text-[#d6ddf4]">
                          Custom Tool Creation
                        </h3>
                      </div>
                      <p className="text-[1.3rem] text-[#d6ddf4]/70">
                        Build tools tailored to your needs, with seamless
                        integration into workflows.
                      </p>
                    </div>
                  </div>
    
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="p-8 rounded-xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
                      <div className="flex items-center mb-4">
                        <span className="material-symbols-outlined text-5xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4]">
                          share
                        </span>
                        <h3 className="text-[2.1rem] font-semibold ml-4 text-[#d6ddf4]">
                          Persistent Knowledge Sharing
                        </h3>
                      </div>
                      <p className="text-[1.3rem] text-[#d6ddf4]/70">
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
      );
    };
    