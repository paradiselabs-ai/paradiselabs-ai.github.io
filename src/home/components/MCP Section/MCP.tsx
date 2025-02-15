import React from "react";
import "./MCP.css";

export const MCP = () => {
  return (
    <div id="MCP" className="typography-root">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-screen">
            <div className="w-full md:w-1/2 lg:w-5/12 relative overflow-hidden p-4 md:p-0">
              <div className="relative h-full flex items-center justify-center p-4 md:p-12">
                <div className="relative z-10">
                  <div className="absolute -top-64 -left-64 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#f2d9e8]/5 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-64 -right-64 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#d6ddf4]/5 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute top-16 right-16 md:top-32 md:right-32 w-24 md:w-32 h-24 md:h-32 bg-[#d7bdf8]/5 rounded-full blur-2xl animate-pulse" />
                  <span className="material-symbols-outlined text-4xl md:text-8xl text-[#d6ddf4] mb-4 md:mb-8 transform hover:scale-110 transition-all duration-300 block text-center">
                    hub
                  </span>
                  <h2 className="typography-h3 text-[#d6ddf4] mb-3 md:mb-6 text-center !leading-tight">
                  Enterprise-Ready Integration
                  </h2>
                  <p className="typography-p text-[#d6ddf4]/80 !leading-relaxed text-center">
                    Connect, integrate, and scale your AI solutions with our
                    advanced MCP infrastructure.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-7/12 p-4 md:p-12 lg:p-24 relative overflow-hidden">
              <div className="space-y-6 md:space-y-12 relative z-10">
                <div className="text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#d6ddf4] to-[#a9b4e8] bg-clip-text text-transparent mb-3 md:mb-6 !leading-tight">
                    Streamline Development with MCP
                  </h1>
                  <p className="typography-p text-[#d6ddf4]/80 !leading-relaxed">
                  Turn technical complexity into business agility. GLUE's MCP infrastructure ensures your AI solutions work together seamlessly, letting you focus on driving business value instead of managing connections.
                  </p>
                </div>

                <div className="space-y-4 md:space-y-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-6 group p-4 rounded-xl transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl md:text-3xl text-[#d6ddf4] group-hover:scale-110 transition-transform">
                      bolt
                    </span>
                    <div className="text-center md:text-left">
                      <h3 className="typography-h3 text-[#d6ddf4] mb-2 !leading-tight">
                        Instant Server Creation
                      </h3>
                      <p className="typography-p font-light text-[#d6ddf4]/70 !leading-relaxed">
                        Quickly create MCP servers and tools just by asking your
                        GLUE agent.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-6 group p-4 rounded-xl transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl md:text-3xl text-[#d6ddf4] group-hover:scale-110 transition-transform">
                      integration_instructions
                    </span>
                    <div className="text-center md:text-left">
                      <h3 className="typography-h3 text-[#d6ddf4] mb-2 !leading-tight">
                        Easy Integration
                      </h3>
                      <p className="typography-p font-light text-[#d6ddf4]/70 !leading-relaxed">
                        Easily connect any existing MCP server to your apps.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-6 group p-4 rounded-xl transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl md:text-3xl text-[#d6ddf4] group-hover:scale-110 transition-transform">
                      travel_explore
                    </span>
                    <div className="text-center md:text-left">
                      <h3 className="typography-h3 text-[#d6ddf4] mb-2 !leading-tight">
                        Server Discovery
                      </h3>
                      <p className="typography-p font-light text-[#d6ddf4]/70 !leading-relaxed">
                        Auto-updated MCP server list—find existing MCP servers
                        easily right in the terminal.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-6 group p-4 rounded-xl transition-all duration-300">
                    <span className="material-symbols-outlined text-3xl md:text-3xl text-[#d6ddf4] group-hover:scale-110 transition-transform">
                      code
                    </span>
                    <div className="text-center md:text-left">
                      <h3 className="typography-h3 text-[#d6ddf4] mb-2 !leading-tight">
                        Seamless Development
                      </h3>
                      <p className="typography-p font-light text-[#d6ddf4]/70 !leading-relaxed">
                        Build and deploy MCP tools with minimal setup.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-[#d6ddf4]/5 border border-[#d6ddf4]/10 rounded-2xl p-4 md:p-8 transform hover:scale-105 transition-all duration-500">
                  <h4 className="typography-h3 text-[#d6ddf4] mb-3 md:mb-4 text-center md:text-left !leading-tight">
                    What This Means for You
                  </h4>
                  <p className="typography-p text-[#d6ddf4]/70 !leading-relaxed text-center md:text-left">
                    Accelerate your development process with instant access to
                    MCP servers and tools. GLUE's integration with MCP empowers
                    you to build and connect AI solutions faster than ever.
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