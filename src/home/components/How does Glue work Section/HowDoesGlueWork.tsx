import React, { useEffect } from "react";
import "./HowDoesGlueWork.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

export const HowDoesGlueWork = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
      easing: 'ease-in-out-quad',
    });
  }, []);
  return (
    <div id="HowDoesGlueWork">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] max-w-full px-2 sm:px-4 md:px-6">
          <div className="relative py-16">
            <section
              className="flex flex-col lg:flex-row items-center gap-16 mb-32 group/section"
              data-aos="fade-up"
            >
              <div className="lg:w-3/5 p-8">
                <h2 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem] font-bold mb-8 text-[#d6ddf4] leading-tight animate-slide-up">
                  How Does GLUE Work?
                </h2>
                <p className="text-[1rem] sm:text-[1.2rem] md:text-[1.4rem] text-[#d6ddf4]/70 leading-relaxed animate-fade-in max-w-2xl">
                  GLUE brings order to complex AI systems through three core
                  principles that streamline collaboration and enhance
                  productivity.
                </p>
              </div>
              <div className="lg:w-2/5 relative animate-float p-12">
                <div className="absolute -inset-6 bg-[#d6ddf4]/10 rounded-full blur-3xl animate-pulse" />
                <span className="material-symbols-outlined text-9xl text-[#d6ddf4] block text-center transform-gpu hover:scale-110 transition-all duration-300">
                  construction
                </span>
              </div>
            </section>

            <section className="relative mb-32">
              <div className="absolute left-1/2 top-0 w-1 h-full bg-[#d6ddf4]/10 animate-glow" />
              <div className="space-y-32">
                <div
                  className="flex flex-col md:flex-row items-center gap-16"
                  data-aos="fade-right"
                >
                  <div className="md:w-1/2 text-right transform-gpu hover:-translate-x-2 transition-all duration-500 p-10">
                    <span className="material-symbols-outlined text-6xl text-[#d6ddf4] mb-6 animate-bounce-slow">
                      group
                    </span>
                    <h3 className="text-[2.2rem] font-bold mb-6 text-[#d6ddf4] animate-slide-up">
                      Natural Team Collaboration
                    </h3>
                    <p className="text-[1.2rem] leading-relaxed text-[#d6ddf4]/70 animate-fade-in max-w-xl ml-auto">
                      Teams communicate freely, just like human teams, while
                      maintaining clear roles and responsibilities.
                    </p>
                  </div>
                  <div className="md:w-1/2" />
                </div>

                <div
                  className="flex flex-col md:flex-row items-center gap-16"
                  data-aos="fade-left"
                >
                  <div className="md:w-1/2" />
                  <div className="md:w-1/2 transform-gpu hover:translate-x-2 transition-all duration-500 p-10">
                    <span className="material-symbols-outlined text-6xl text-[#d6ddf4] mb-6 animate-spin-slow">
                      sync_alt
                    </span>
                    <h3 className="text-[2.2rem] font-bold mb-6 text-[#d6ddf4] animate-slide-up">
                      Magnetic Information Flow
                    </h3>
                    <p className="text-[1.2rem] leading-relaxed text-[#d6ddf4]/70 animate-fade-in max-w-xl">
                      Data flows naturally between teams via push, pull, or
                      repulsion patterns—keeping everything connected but
                      organized.
                    </p>
                  </div>
                </div>

                <div
                  className="flex flex-col md:flex-row items-center gap-16"
                  data-aos="fade-right"
                >
                  <div className="md:w-1/2 text-right transform-gpu hover:-translate-x-2 transition-all duration-500 p-10">
                    <span className="material-symbols-outlined text-6xl text-[#d6ddf4] mb-6 animate-bounce-slow">
                      tools_power_drill
                    </span>
                    <h3 className="text-[2.2rem] font-bold mb-6 text-[#d6ddf4] animate-slide-up">
                      Models with Adhesive Tools
                    </h3>
                    <p className="text-[1.2rem] leading-relaxed text-[#d6ddf4]/70 animate-fade-in max-w-xl ml-auto">
                      Models use tools with different persistence levels (GLUE
                      for shared knowledge, VELCRO for sessions, TAPE for
                      one-time tasks).
                    </p>
                  </div>
                  <div className="md:w-1/2" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};