import React, { memo, useMemo, useEffect, ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./GlueSyntax.css";

// Memoized CodeBlock component with AOS
const CodeBlock = memo(() => (
  <div
    className="rounded-xl overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="800"
    data-aos-easing="ease-in-out"
  >
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
            <span className="text-[#34B8CE] font-normal">glue</span> app{" "}
            <span className="font-normal">{"{"}</span>
            <br />
            {"  "}name = <span className="text-[#98c379] font-light">"My-Research-App"</span>
            <br />
            {"  "}config <span className="font-normal">{"{"}</span>
            <br />
            {"    "}development = <span className="font-light">true</span>
            <br />
            {"    "}sticky = <span className="font-light">false</span>
            <br />
            {"  "}<span className="font-normal">{"}"}</span>
            <br />
            <span className="font-normal">{"}"}</span>
            <br />
            <br />
            <span className="text-[#34B8CE] font-normal">model</span> researcher{" "}
            <span className="font-normal">{"{"}</span>
            <br />
            {"  "}provider = <span className="text-[#98c379] font-light">openrouter</span>
            <br />
            {"  "}role = <span className="text-[#98c379] font-light">"Research topics thoroughly."</span>
            <br />
            {"  "}adhesives = <span className="font-light">[glue, velcro]</span>
            <br />
            <span className="font-normal">{"}"}</span>
            <br />
            <br />
            <span className="text-[#34B8CE] font-normal">tool</span> web_search{" "}
            <span className="font-normal">{"{"}</span>
            <br />
            {"  "}provider = <span className="text-[#98c379] font-light">serp</span>
            <br />
            <span className="font-normal">{"}"}</span>
            <br />
            <br />
            <span className="text-[#34B8CE] font-normal">magnetize</span>{" "}
            <span className="font-normal">{"{"}</span>
            <br />
            {"  "}research <span className="font-normal">{"{"}</span>
            <br />
            {"    "}lead = researcher
            <br />
            {"    "}tools = <span className="font-light">[web_search]</span>
            <br />
            {"  "}<span className="font-normal">{"}"}</span>
            <br />
            <span className="font-normal">{"}"}</span>
            <br />
            <br />
            <span className="text-[#34B8CE] font-normal">apply</span> glue
          </code>
        </pre>
      </div>
    </div>
  </div>
));
CodeBlock.displayName = "CodeBlock";

// Define props interface for DetailsSection
interface DetailsSectionProps {
  title: string;
  icon: string;
  children: ReactNode;
  open?: boolean;
}

// Memoized DetailsSection component with AOS and typed props
const DetailsSection = memo(
  ({ title, icon, children, open = false }: DetailsSectionProps) => (
    <details
      className="group"
      open={open}
      data-aos="fade-left"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-delay="200"
    >
      <summary className="flex items-center cursor-pointer p-2 rounded-lg transition-colors duration-300">
        <span className="material-symbols-outlined text-[#34B8CE] mr-2 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
        <h3 className="typography-h3 !leading-tight font-semibold text-[#34B8CE]">{title}</h3>
      </summary>
      <div
        className="pl-6 sm:pl-8 mt-3 sm:mt-4 text-[#F4F2FF]"
      >
        {children}
      </div>
    </details>
  )
);
DetailsSection.displayName = "DetailsSection";

// Define interface for details content items
interface DetailsContentItem {
  title: string;
  icon: string;
  open: boolean;
  content: ReactNode;
}

export const GlueSyntax: React.FC = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 100,
    });
  }, []);

  // Memoize the details sections with typed array
  const detailsContent = useMemo<DetailsContentItem[]>(
    () => [
      {
        title: "App Configuration",
        icon: "apps",
        open: true,
        content: (
          <>
            <p className="typography-p !leading-relaxed mb-2">
              The glue app block configures the application settings:
            </p>
            <ul className="typography-p font-light !leading-relaxed list-disc pl-4 space-y-2">
              <li><span className="text-[#34B8CE]">name</span>: Defines the application name</li>
              <li><span className="text-[#34B8CE]">development</span>: Enables development mode</li>
              <li><span className="text-[#34B8CE]">sticky</span>: Controls persistence</li>
            </ul>
          </>
        ),
      },
      {
        title: "Model Definition",
        icon: "architecture",
        open: false,
        content: (
          <>
            <p className="typography-p !leading-relaxed mb-2">
              The model researcher block defines a virtual assistant specialized in conducting thorough research:
            </p>
            <ul className="typography-p font-light !leading-relaxed list-disc pl-4 space-y-2">
              <li><span className="text-[#34B8CE]">provider</span>: Specifies the service provider (openrouter)</li>
              <li><span className="text-[#34B8CE]">role</span>: Describes the purpose</li>
              <li><span className="text-[#34B8CE]">adhesives</span>: Lists connection types</li>
            </ul>
          </>
        ),
      },
      {
        title: "Tool Integration",
        icon: "build",
        open: false,
        content: (
          <p className="typography-p !leading-relaxed">
            The tool web_search block integrates search capability powered by the serp provider.
          </p>
        ),
      },
      {
        title: "Workflow Orchestration",
        icon: "workflow",
        open: false,
        content: (
          <p className="typography-p !leading-relaxed">
            The magnetize block orchestrates the workflow by assigning roles and tools to work together seamlessly.
          </p>
        ),
      },
    ],
    []
  );

  return (
    <div id="GlueSyntax" className="typography-root">
      <div className="w-full flex justify-center">
        <div className="w-[1200px] max-w-full">
          <div className="px-4 sm:px-6 md:px-8 relative">
            <div className="mt-12 sm:mt-24 relative z-10">
              <div className="max-w-4xl mx-auto mb-8 sm:mb-16">
                <h2
                  className="typography-h2 !leading-tight font-bold mb-4 sm:mb-6 text-[#34B8CE] text-center bg-clip-text inline-block break-words w-full"
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  data-aos-easing="ease-out"
                >
                  Developer-Friendly Syntax
                </h2>
                <p
                  className="typography-p !leading-relaxed text-[#F4F2FF] text-center mb-8 sm:mb-12"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay="200"
                  data-aos-easing="ease-out"
                >
                  Simplify tough AI concepts into results with an easy system that lets developers build fast.
                </p>

                <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                  <div className="w-full lg:w-1/2">
                    <CodeBlock />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="space-y-6 sm:space-y-8">
                      {detailsContent.map((item, index) => (
                        <DetailsSection
                          key={item.title}
                          title={item.title}
                          icon={item.icon}
                          open={item.open}
                          data-aos-delay={`${index * 200}`}
                        >
                          {item.content}
                        </DetailsSection>
                      ))}
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