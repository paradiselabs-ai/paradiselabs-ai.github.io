import React from "react";

import "./GlueKeyFeatures.css";

export const GlueKeyFeatures = () => {
	return (
		<div id="GlueKeyFeatures">
		  <div className="w-full flex justify-center">
			<div className="w-[1200px] max-w-full px-4">
			  <div className="relative">
				<div className="mb-24" data-aos="fade-up" data-aos-duration="1000">
				  <h2 className="text-4xl sm:text-5xl lg:text-[5.5rem] font-bold mb-8 leading-tight bg-gradient-to-r from-white to-white/70 bg-clip-text tracking-tight">
					Key Features
				  </h2>
				  <p className="text-lg sm:text-xl opacity-80 max-w-3xl leading-relaxed">
					Discover the powerful features that make GLUE your ideal
					solution for AI system management.
				  </p>
				</div>
	
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14">
				  {[
					{
					  icon: "extension",
					  title: "Adhesive Bindings",
					  desc: "Control how results are shared—team-wide (GLUE), session-based (VELCRO), or disposable (TAPE).",
					  delay: "0",
					},
					{
					  icon: "diversity_3",
					  title: "Flexible Teams",
					  desc: "Define leads, members, and available tools for each team with complete flexibility and control.",
					  delay: "200",
					},
					{
					  icon: "build",
					  title: "Built-In Tools",
					  desc: "Start with powerful tools like web search, code interpreters, and file handlers—or create your own.",
					  delay: "400",
					},
					{
					  icon: "architecture",
					  title: "Scalable Architecture",
					  desc: "Easily add new models, tools, and teams as your project grows without compromising performance.",
					  delay: "200",
					},
					{
					  icon: "code",
					  title: "Expression Language",
					  desc: "Simplify app creation with an intuitive language designed for clarity and speed in development.",
					  delay: "400",
					},
					{
					  icon: "settings",
					  title: "System Controls",
					  desc: "Complete control over system settings, permissions, and resource allocation across your organization.",
					  delay: "600",
					},
				  ].map((item, index) => (
					<div
					  className="relative z-10 p-10 rounded-3xl bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent border border-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5"
					  key={index}
					  data-aos="fade-up"
					  data-aos-delay={item.delay}
					  data-aos-duration="1000"
					  data-aos-easing="ease-in-out"
					>
					  <div className="flex flex-col h-full gap-8">
						<div className="relative">
						  <span className="material-symbols-outlined text-7xl bg-gradient-to-br from-white to-white/80 bg-clip-text transition-transform duration-300 hover:scale-110">
							{item.icon}
						  </span>
						</div>
						<div className="space-y-5">
						  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text tracking-tight relative">
							{item.title}
						  </h3>
						  <p className="text-base opacity-70 leading-relaxed">
							{item.desc}
						  </p>
						</div>
					  </div>
					</div>
				  ))}
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  );
	};
	