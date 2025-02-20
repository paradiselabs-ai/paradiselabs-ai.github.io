import React from "react";
import "./GlueSyntax.css";

export const GlueSyntax = () => {
  return (
    <div id="GlueSyntax" className="typography-root">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] max-w-full">
          <div className="px-4 sm:px-6 md:px-8 relative">
            <div className="mt-12 sm:mt-24 relative z-10">
              <div className="max-w-4xl mx-auto mb-8 sm:mb-16">
                <h2
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  className="typography-h2 !leading-tight font-bold mb-4 sm:mb-6 text-[#34B8CE] text-center bg-clip-text inline-block break-words w-full"
                >
                  Developer-Friendly Syntax
                </h2>
                <p
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                  className="typography-p !leading-relaxed text-[#F4F2FF] text-center mb-8 sm:mb-12"
                >
                  Transform complex AI concepts into business results with a syntax so intuitive, that developers can focus on innovation instead of implementation details
                </p>

                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                  <div className="w-full lg:w-1/2">
                    <div className="rounded-xl overflow-hidden">
                      <div className="backdrop-blur-xl bg-[#282c34] border border-[#F4F2FF]/20 rounded-xl p-4 sm:p-8">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex gap-2">
                            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500" />
                            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500" />
                            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500" />
                          </div>
                          <span className="material-symbols-outlined text-[#F4F2FF] text-sm sm:text-base cursor-pointer hover:text-[#34B8CE] transition-colors duration-300">
                            content_copy
                          </span>
                        </div>
                        <div className="overflow-x-auto">
                          <pre className="font-mono text-[#F4F2FF] sm:text-base whitespace-pre">
                            <code className="language-glue">
                              {/* Keywords/Declarations (font-regular) */}
                              <span className="text-[#34B8CE] font-normal">glue</span> app{" "}
                              <span className="font-normal">{`{`}</span>
                              <br />
                              &nbsp;&nbsp;name ={" "}
                              <span className="text-[#98c379] font-light">
                                "My-Research-App"
                              </span>
                              <br />
                              &nbsp;&nbsp;config{" "}
                              <span className="font-normal">{`{`}</span>
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;development ={" "}
                              <span className="font-light">true</span>
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;sticky ={" "}
                              <span className="font-light">false</span>
                              <br />
                              &nbsp;&nbsp;<span className="font-normal">{`}`}</span>
                              <br />
                              <span className="font-normal">{`}`}</span>
                              
                              <br />
                              {/* Keywords/Declarations (font-regular) */}
                              <span className="text-[#34B8CE] font-normal">model</span> researcher{" "}
                              <span className="font-normal">{`{`}</span>
                              <br />
                              &nbsp;&nbsp;provider ={" "}
                              <span className="text-[#98c379] font-light">openrouter</span>
                              <br />
                              &nbsp;&nbsp;role ={" "}
                              <span className="text-[#98c379] font-light">
                                "Research topics thoroughly."
                              </span>
                              <br />
                              &nbsp;&nbsp;adhesives ={" "}
                              <span className="font-light">[glue, velcro]</span>
                              <br />
                              <span className="font-normal">{`}`}</span>
                              
                              <br />
                              {/* Keywords/Declarations (font-regular) */}
                              <span className="text-[#34B8CE] font-normal">tool</span> web_search{" "}
                              <span className="font-normal">{`{`}</span>
                              <br />
                              &nbsp;&nbsp;provider ={" "}
                              <span className="text-[#98c379] font-light">serp</span>
                              <br />
                              <span className="font-normal">{`}`}</span>
                              
                              <br />
                              {/* Keywords/Declarations (font-regular) */}
                              <span className="text-[#34B8CE] font-normal">magnetize</span>{" "}
                              <span className="font-normal">{`{`}</span>
                              <br />
                              &nbsp;&nbsp;research{" "}
                              <span className="font-normal">{`{`}</span>
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;lead = researcher
                              <br />
                              &nbsp;&nbsp;&nbsp;&nbsp;tools ={" "}
                              <span className="font-light">[web_search]</span>
                              <br />
                              &nbsp;&nbsp;<span className="font-normal">{`}`}</span>
                              <br />
                              <span className="font-normal">{`}`}</span>
                              
                              <br />
                              {/* Keywords/Declarations (font-regular) */}
                              <span className="text-[#34B8CE] font-normal">apply</span> glue
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2">
                    <div className="space-y-6 sm:space-y-8">
                      <details className="group" open>
                        <summary className="flex items-center cursor-pointer p-2 hover:bg-[#282c34]/30 rounded-lg transition-colors duration-300">
                          <span className="material-symbols-outlined text-[#34B8CE] mr-2 group-hover:scale-110 transition-transform duration-300">
                            apps
                          </span>
                          <h3 className="typography-h3 !leading-tight font-semibold text-[#34B8CE]">
                            App Configuration
                          </h3>
                        </summary>
                        <div className="pl-6 sm:pl-8 mt-3 sm:mt-4 text-[#F4F2FF]">
                          <p className="typography-p !leading-relaxed mb-2">
                            The glue app block configures the application
                            settings:
                          </p>
                          <ul className="typography-p font-light !leading-relaxed list-disc pl-4 space-y-2">
                            <li>
                              <span className="text-[#34B8CE]">name</span>:
                              Defines the application name
                            </li>
                            <li>
                              <span className="text-[#34B8CE]">
                                development
                              </span>
                              : Enables development mode
                            </li>
                            <li>
                              <span className="text-[#34B8CE]">sticky</span>:
                              Controls persistence
                            </li>
                          </ul>
                        </div>
                      </details>

                      <details className="group">
                        <summary className="flex items-center cursor-pointer p-2 hover:bg-[#282c34]/30 rounded-lg transition-colors duration-300">
                          <span className="material-symbols-outlined text-[#34B8CE] mr-2 group-hover:scale-110 transition-transform duration-300">
                            architecture
                          </span>
                          <h3 className="typography-h3 !leading-tight font-semibold text-[#34B8CE]">
                            Model Definition
                          </h3>
                        </summary>
                        <div className="pl-6 sm:pl-8 mt-3 sm:mt-4 text-[#F4F2FF]">
                          <p className="typography-p !leading-relaxed mb-2">
                            The model researcher block defines a virtual
                            assistant specialized in conducting thorough
                            research:
                          </p>
                          <ul className="typography-p font-light !leading-relaxed list-disc pl-4 space-y-2">
                            <li>
                              <span className="text-[#34B8CE]">provider</span>:
                              Specifies the service provider (openrouter)
                            </li>
                            <li>
                              <span className="text-[#34B8CE]">role</span>:
                              Describes the purpose
                            </li>
                            <li>
                              <span className="text-[#34B8CE]">adhesives</span>:
                              Lists connection types
                            </li>
                          </ul>
                        </div>
                      </details>

                      <details className="group">
                        <summary className="flex items-center cursor-pointer p-2 hover:bg-[#282c34]/30 rounded-lg transition-colors duration-300">
                          <span className="material-symbols-outlined text-[#34B8CE] mr-2 group-hover:scale-110 transition-transform duration-300">
                            build
                          </span>
                          <h3 className="typography-h3 !leading-tight font-semibold text-[#34B8CE]">
                            Tool Integration
                          </h3>
                        </summary>
                        <div className="pl-6 sm:pl-8 mt-3 sm:mt-4 text-[#F4F2FF]">
                          <p className="typography-p !leading-relaxed">
                            The tool web_search block integrates search
                            capability powered by the serp provider.
                          </p>
                        </div>
                      </details>

                      <details className="group">
                        <summary className="flex items-center cursor-pointer p-2 hover:bg-[#282c34]/30 rounded-lg transition-colors duration-300">
                          <span className="material-symbols-outlined text-[#34B8CE] mr-2 group-hover:scale-110 transition-transform duration-300">
                            workflow
                          </span>
                          <h3 className="typography-h3 !leading-tight font-semibold text-[#34B8CE]">
                            Workflow Orchestration
                          </h3>
                        </summary>
                        <div className="pl-6 sm:pl-8 mt-3 sm:mt-4 text-[#F4F2FF]">
                          <p className="typography-p !leading-relaxed">
                            The magnetize block orchestrates the workflow by
                            assigning roles and tools to work together
                            seamlessly.
                          </p>
                        </div>
                      </details>
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
};