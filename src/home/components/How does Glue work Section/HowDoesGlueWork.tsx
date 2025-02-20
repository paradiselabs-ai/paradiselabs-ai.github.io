import React from "react";
import "./HowDoesGlueWork.css";

export const HowDoesGlueWork = () => {
  return (
    <div id="HowDoesGlueWork" className="typography-root">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] max-w-full px-2 sm:px-4 md:px-6">
          <div className="relative py-8 md:py-16">
            <section
              className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 mb-16 md:mb-32 group/section"
              data-aos="fade-up"
            >
              <div className="w-full lg:w-3/5 p-4 md:p-8">
                <h2 className="typography-h2 !leading-tight mb-4 md:mb-8 text-[#F5F2FF] font-bold animate-slide-up">
                  Transform Your AI Initiative into Results
                </h2>
                <p className="typography-p !leading-relaxed text-[#F5F2FF]/70 animate-fade-in max-w-2xl">
                  Turn the complexity of AI systems into your competitive advantage. 
                  Watch your teams innovate faster, make better decisions, and build 
                  lasting organizational knowledge.
                </p>
              </div>
              <div className="w-full lg:w-2/5 relative animate-float p-6 md:p-12">
                <div className="absolute -inset-6 bg-[#F5F2FF]/10 rounded-full blur-3xl animate-pulse" />
                <span className="material-symbols-outlined text-7xl md:text-9xl text-[#F5F2FF] block text-center transform-gpu hover:scale-110 transition-all duration-300">
                  rocket_launch
                </span>
              </div>
            </section>

            <section className="relative mb-16 md:mb-32">
              <div className="absolute left-1/2 top-0 w-0.5 md:w-1 h-full bg-[#F5F2FF]/10 animate-glow hidden md:block" />
              <div className="space-y-16 md:space-y-32">
                <div
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
                  data-aos="fade-right"
                >
                  <div className="w-full md:w-1/2 text-center md:text-right transform-gpu hover:-translate-x-2 transition-all duration-500 p-4 md:p-10">
                    <span className="material-symbols-outlined text-5xl md:text-6xl text-[#F5F2FF] mb-4 md:mb-6 animate-bounce-slow">
                      group
                    </span>
                    <h3 className="typography-h3 !leading-tight mb-4 md:mb-6 text-[#F5F2FF] animate-slide-up">
                      Accelerate Innovation Together
                    </h3>
                    <p className="typography-p font-light !leading-relaxed text-[#F5F2FF]/70 animate-fade-in max-w-xl md:ml-auto">
                      Break down the barriers that slow your progress. When teams collaborate 
                      seamlessly, you'll see projects that once took months complete in weeks.
                    </p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>

                <div
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
                  data-aos="fade-left"
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="w-full md:w-1/2 text-center md:text-left transform-gpu hover:translate-x-2 transition-all duration-500 p-4 md:p-10">
                    <span className="material-symbols-outlined text-5xl md:text-6xl text-[#F5F2FF] mb-4 md:mb-6 animate-spin-slow">
                      sync_alt
                    </span>
                    <h3 className="typography-h3 !leading-tight mb-4 md:mb-6 text-[#F5F2FF] animate-slide-up">
                      Turn Insights into Action
                    </h3>
                    <p className="typography-p font-light !leading-relaxed text-[#F5F2FF]/70 animate-fade-in max-w-xl">
                      Watch information flow effortlessly between teams, empowering faster, 
                      more informed decisions that keep you ahead of market changes.
                    </p>
                  </div>
                </div>

                <div
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
                  data-aos="fade-right"
                >
                  <div className="w-full md:w-1/2 text-center md:text-right transform-gpu hover:-translate-x-2 transition-all duration-500 p-4 md:p-10">
                    <span className="material-symbols-outlined text-5xl md:text-6xl text-[#F5F2FF] mb-4 md:mb-6 animate-bounce-slow">
                      psychology
                    </span>
                    <h3 className="typography-h3 !leading-tight mb-4 md:mb-6 text-[#F5F2FF] animate-slide-up">
                      Build Lasting Knowledge
                    </h3>
                    <p className="typography-p font-light !leading-relaxed text-[#F5F2FF]/70 animate-fade-in max-w-xl md:ml-auto">
                      Transform every project into a foundation for future success. Your teams' 
                      expertise becomes your organization's lasting competitive advantage.
                    </p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};