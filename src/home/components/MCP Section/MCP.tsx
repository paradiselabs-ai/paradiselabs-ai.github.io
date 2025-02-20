import React from "react";
import "./MCP.css";

export const MCP = () => {
  return (
    <div id="MCP" className="typography-root">
      <div className="w-full flex justify-center">
        <div className="w-[1400px] overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-screen">
            <div className="w-full md:w-1/2 lg:w-7/12 pl-24 md:pl-32 lg:pl-48 p-12 md:p-16 lg:p-32 relative overflow-hidden">  
              <div className="space-y-12 md:space-y-16 relative z-10">
                <div className="text-center md:text-left mb-12 md:mb-16" data-aos="fade-right">
                  <h1 className="typography-h2 !leading-tight font-bold mb-6 md:mb-8">
                    Streamline Development with MCP
                  </h1>
                  <p className="typography-p !leading-relaxed text-[#F8F6FF]/80">
                    Turn technical complexity into business agility. GLUE's MCP infrastructure powers AI agents to work together flawlessly, freeing you to focus on value.
                  </p>
                </div>
                <div className="space-y-6 md:space-y-8">
                  <div 
                    className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 p-6 md:p-8 rounded-2xl"
                    data-aos="fade-up"
                    data-aos-delay="90"
                  >
                    <span className="material-symbols-outlined text-4xl md:text-3xl text-[#F8F6FF]">
                      bolt
                    </span>
                    <div className="text-center md:text-left">
                      <h3 className="typography-h3 !leading-tight font-bold text-[#F8F6FF] mb-3">
                        Instant Server Creation
                      </h3>
                      <p className="typography-p font-light !leading-relaxed text-[#F8F6FF]/70">
                      Easily launch MCP servers and tools by simply asking your GLUE AI agent.
                      </p>
                    </div>
                  </div>

                  <div 
                    className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 p-6 md:p-8 rounded-2xl"
                    data-aos="fade-up"
                    data-aos-delay="110"
                  >
                    <span className="material-symbols-outlined text-4xl md:text-3xl text-[#F8F6FF]">
                      integration_instructions
                    </span>
                    <div className="text-center md:text-left">
                      <h3 className="typography-h3 !leading-tight font-bold text-[#F8F6FF] mb-3">
                        Easy Integration
                      </h3>
                      <p className="typography-p font-light !leading-relaxed text-[#F8F6FF]/70">
                      Seamlessly integrate any MCP server into your apps with just a click.
                      </p>
                    </div>
                  </div>

                  <div 
                    className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 p-6 md:p-8 rounded-2xl"
                    data-aos="fade-up"
                    data-aos-delay="120"
                  >
                    <span className="material-symbols-outlined text-4xl md:text-3xl text-[#F8F6FF]">
                      travel_explore
                    </span>
                    <div className="text-center md:text-left">
                      <h3 className="typography-h3 !leading-tight font-bold text-[#F8F6FF] mb-3">
                        Server Discovery
                      </h3>
                      <p className="typography-p font-light !leading-relaxed text-[#F8F6FF]/70">
                      Take full control of MCP servers—right from your terminal.
                      </p>
                    </div>
                  </div>

                  <div 
                    className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 p-6 md:p-8 rounded-2xl"
                    data-aos="fade-up"
                    data-aos-delay="130"
                  >
                    <span className="material-symbols-outlined text-4xl md:text-3xl text-[#F8F6FF]">
                      code
                    </span>
                    <div className="text-center md:text-left">
                      <h3 className="typography-h3 !leading-tight font-bold text-[#F8F6FF] mb-3">
                        Seamless Development
                      </h3>
                      <p className="typography-p font-light !leading-relaxed text-[#F8F6FF]/70">
                      Build and deploy MCP tools faster, with less setup.
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className="backdrop-blur-xl bg-[#F8F6FF]/5 border border-[#F8F6FF]/10 rounded-2xl p-8 md:p-10 mt-12 md:mt-16"
                  data-aos="fade-up"
                  data-aos-delay="140"
                >
                  <h4 className="typography-h3 !leading-tight font-bold text-[#FCF9FA] mb-4 md:mb-6 text-center md:text-left">
                    What This Means for You
                  </h4>
                  <p className="typography-p font-light !leading-relaxed text-[#FCF9FA]/70 text-center md:text-left">
                    Accelerate your development process with instant access to MCP servers and tools. GLUE's integration with MCP empowers you to build and connect AI solutions faster than ever.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-5/12 relative overflow-hidden p-12 md:p-16 pr-24 md:pr-32 lg:pr-48">
              <div className="relative h-full flex items-center justify-center">
                <div className="relative z-10" data-aos="fade-left">
                  <span className="material-symbols-outlined text-5xl md:text-7xl lg:text-9xl text-[#F8F6FF] mb-8 md:mb-10 block text-center">
                    hub
                  </span>
                  <h2 className="typography-h2 !leading-tight font-bold text-[#F8F6FF] mb-6 md:mb-8 text-center">
                    Multi-Client Protocol
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
};

export default MCP;