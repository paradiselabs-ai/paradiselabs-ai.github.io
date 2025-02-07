import React from "react";

import "./GlueSyntax.css";

export const GlueSyntax = () => {
	return (
		<div id="SyntaxSection">
		  <div className="w-full flex justify-center">
			<div className="w-[1200px] max-w-full px-2 sm:px-6 md:px-8 relative">
			  <div className="mt-12 sm:mt-24 relative z-10">
				<div className="max-w-4xl mx-auto mb-8 sm:mb-16">
				  <h2 className="text-[2rem] sm:text-[3rem] font-bold mb-4 sm:mb-6 text-[#61dafb] text-center bg-clip-text inline-block break-words w-full">
					Developer-Friendly Syntax
				  </h2>
				  <p className="text-[1rem] sm:text-[1.1rem] text-[#abb2bf] text-center mb-8 sm:mb-12 px-2">
					Experience the simplicity and flexibility of GLUE's intuitive
					syntax
				  </p>
	
				  <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 min-h-[600px]">
					<div className="w-full lg:w-1/2 h-full">
					  <div className="relative rounded-xl overflow-hidden h-full">
						<div className="backdrop-blur-xl bg-[#282c34] border border-[#abb2bf]/20 rounded-xl p-4 sm:p-8 relative z-10 h-full">
						  <div className="flex justify-between items-center mb-4">
							<div className="flex gap-2">
							  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500" />
							  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500" />
							  <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500" />
							</div>
							<span className="material-symbols-outlined text-[#abb2bf] text-sm sm:text-base cursor-pointer hover:text-[#61dafb] transition-colors duration-300">
							  content_copy
							</span>
						  </div>
						  <pre className="font-mono text-[#abb2bf] text-xs sm:text-base h-full overflow-x-auto">
							<code className="language-glue">
							  <span className="text-[#61dafb]">model</span>{" "}
							  researcher{" "}
							  {`{
	provider = openrouter
	role = `}
							  <span className="text-[#98c379]">
								"Research topics thoroughly."
							  </span>
							  {`
	adhesives = [glue, velcro]
}
			
`}
							  <span className="text-[#61dafb]">tool</span>{" "}
							  web_search{" "}
							  {`{
	provider = serp
}
			
`}
							  <span className="text-[#61dafb]">magnetize</span>{" "}
							  {`{
	research {
		lead = researcher
		tools = [web_search]
	}
}
			
`}
							  <span className="text-[#61dafb]">apply</span> glue
							</code>
						  </pre>
						</div>
					  </div>
					</div>
	
					<div className="w-full lg:w-1/2 h-full">
					  <div className="space-y-6 sm:space-y-8 h-full">
						<details className="group" open>
						  <summary className="flex items-center cursor-pointer p-2 hover:bg-[#282c34]/30 rounded-lg transition-colors duration-300">
							<span className="material-symbols-outlined text-[#61dafb] mr-2">
							  architecture
							</span>
							<h3 className="text-lg sm:text-xl font-semibold text-[#61dafb]">
							  Model Definition
							</h3>
						  </summary>
						  <div className="pl-6 sm:pl-8 mt-3 sm:mt-4 text-[#abb2bf] text-sm sm:text-base">
							<p className="mb-2">
							  The model researcher block defines a virtual assistant
							  specialized in conducting thorough research:
							</p>
							<ul className="list-disc pl-4 space-y-2">
							  <li>
								<span className="text-[#61dafb]">provider</span>:
								Specifies the service provider (openrouter)
							  </li>
							  <li>
								<span className="text-[#61dafb]">role</span>:
								Describes the purpose
							  </li>
							  <li>
								<span className="text-[#61dafb]">adhesives</span>:
								Lists connection types
							  </li>
							</ul>
						  </div>
						</details>
	
						<details className="group">
						  <summary className="flex items-center cursor-pointer p-2 hover:bg-[#282c34]/30 rounded-lg transition-colors duration-300">
							<span className="material-symbols-outlined text-[#61dafb] mr-2">
							  build
							</span>
							<h3 className="text-lg sm:text-xl font-semibold text-[#61dafb]">
							  Tool Integration
							</h3>
						  </summary>
						  <div className="pl-6 sm:pl-8 mt-3 sm:mt-4 text-[#abb2bf] text-sm sm:text-base">
							<p>
							  The tool web_search block integrates search capability
							  powered by the serp provider.
							</p>
						  </div>
						</details>
	
						<details className="group">
						  <summary className="flex items-center cursor-pointer p-2 hover:bg-[#282c34]/30 rounded-lg transition-colors duration-300">
							<span className="material-symbols-outlined text-[#61dafb] mr-2">
							  workflow
							</span>
							<h3 className="text-lg sm:text-xl font-semibold text-[#61dafb]">
							  Workflow Orchestration
							</h3>
						  </summary>
						  <div className="pl-6 sm:pl-8 mt-3 sm:mt-4 text-[#abb2bf] text-sm sm:text-base">
							<p>
							  The magnetize block orchestrates the workflow by
							  assigning roles and tools to work together seamlessly.
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
	  );
	};