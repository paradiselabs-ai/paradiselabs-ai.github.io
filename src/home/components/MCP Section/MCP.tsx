import React from "react";


/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import "./MCP.css";

export const MCP = () => {
    return (
        <div id="MCP">
          <div className="w-full flex justify-center">
            <div className="w-[1400px] overflow-hidden">
              <div className="flex flex-col md:flex-row min-h-screen">
                <div className="w-full md:w-1/2 lg:w-5/12 relative overflow-hidden">
                  <div className="relative h-full flex items-center justify-center p-6 md:p-12">
                    <div className="relative z-10">
                      <div className="absolute -top-64 -left-64 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#f2d9e8]/5 rounded-full blur-3xl animate-pulse" />
                      <div className="absolute -bottom-64 -right-64 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#d6ddf4]/5 rounded-full blur-3xl animate-pulse" />
                      <div className="absolute top-16 right-16 md:top-32 md:right-32 w-24 md:w-32 h-24 md:h-32 bg-[#d7bdf8]/5 rounded-full blur-2xl animate-pulse" />
                      <span className="material-symbols-outlined text-6xl md:text-8xl text-[#d6ddf4] mb-6 md:mb-8 transform hover:scale-110 transition-all duration-300">
                        hub
                      </span>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#d6ddf4] mb-4 md:mb-6">
                        Multi-Client Protocol
                      </h2>
                      <p className="text-base md:text-lg text-[#d6ddf4]/80 leading-relaxed">
                        Connect, integrate, and scale your AI solutions with our
                        advanced MCP infrastructure.
                      </p>
                    </div>
                  </div>
                </div>
    
                <div className="w-full md:w-1/2 lg:w-7/12 p-6 md:p-12 lg:p-24 relative">
                  <div className="space-y-8 md:space-y-12 relative z-10">
                    <div>
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#d6ddf4] to-[#a9b4e8] bg-clip-text text-transparent mb-4 md:mb-6">
                        Streamline Development with <span style={{ WebkitTextFillColor: '#d7bdf8' }}>MCP</span>
                      </h1>
                      <p className="text-lg md:text-xl lg:text-2xl text-[#d6ddf4]/80 leading-relaxed">
                        Create and connect to MCP servers effortlessly with GLUE.
                      </p>
                    </div>
    
                    <div className="space-y-6 md:space-y-8">
                      <div className="flex items-start space-x-4 md:space-x-6 group hover:bg-[#d6ddf4]/5 p-4 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined text-2xl md:text-3xl text-[#d6ddf4] group-hover:scale-110 transition-transform">
                          bolt
                        </span>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-[#d6ddf4] mb-2">
                            Instant Server Creation
                          </h3>
                          <p className="text-sm md:text-base text-[#d6ddf4]/70 leading-relaxed">
                            Quickly create MCP servers and tools just by asking your
                            GLUE agent.
                          </p>
                        </div>
                      </div>
    
                      <div className="flex items-start space-x-4 md:space-x-6 group hover:bg-[#d6ddf4]/5 p-4 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined text-2xl md:text-3xl text-[#d6ddf4] group-hover:scale-110 transition-transform">
                          integration_instructions
                        </span>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-[#d6ddf4] mb-2">
                            Easy Integration
                          </h3>
                          <p className="text-sm md:text-base text-[#d6ddf4]/70 leading-relaxed">
                            Easily connect any existing MCP server to your apps.
                          </p>
                        </div>
                      </div>
    
                      <div className="flex items-start space-x-4 md:space-x-6 group hover:bg-[#d6ddf4]/5 p-4 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined text-2xl md:text-3xl text-[#d6ddf4] group-hover:scale-110 transition-transform">
                          travel_explore
                        </span>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-[#d6ddf4] mb-2">
                            Server Discovery
                          </h3>
                          <p className="text-sm md:text-base text-[#d6ddf4]/70 leading-relaxed">
                            Auto-updated MCP server list—find existing MCP servers
                            easily right in the terminal.
                          </p>
                        </div>
                      </div>
    
                      <div className="flex items-start space-x-4 md:space-x-6 group hover:bg-[#d6ddf4]/5 p-4 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined text-2xl md:text-3xl text-[#d6ddf4] group-hover:scale-110 transition-transform">
                          code
                        </span>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-[#d6ddf4] mb-2">
                            Seamless Development
                          </h3>
                          <p className="text-sm md:text-base text-[#d6ddf4]/70 leading-relaxed">
                            Build and deploy MCP tools with minimal setup.
                          </p>
                        </div>
                      </div>
                    </div>
    
                    <div className="backdrop-blur-xl bg-[#d6ddf4]/5 border border-[#d6ddf4]/10 rounded-2xl p-6 md:p-8 transform hover:scale-105 transition-all duration-500">
                      <h4 className="text-lg md:text-xl font-semibold text-[#d6ddf4] mb-3 md:mb-4">
                        What This Means for You
                      </h4>
                      <p className="text-sm md:text-base text-[#d6ddf4]/70 leading-relaxed">
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
    