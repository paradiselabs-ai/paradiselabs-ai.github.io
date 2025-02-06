import React from "react";

import "./GlueKeyFeatures.css";

export const GlueKeyFeatures = () => {
  return (
    <div id="webcrumbs"> 
            	<div className="w-[1200px] max-w-full px-4 sm:px-6 md:px-8 relative">
    	    <div className="relative z-10">
    	        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 sm:mb-10 md:mb-14 lg:mb-16">
    	            <div className="max-w-xl">
    	                <h2 className="text-[2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] font-bold mb-4 text-[#d6ddf4] leading-tight">Key Features</h2>
    	                <p className="text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] text-[#d6ddf4]/70">Discover the powerful features that make GLUE your ideal solution for AI system management.</p>
    	            </div>
    	        </div>
    	
    	        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    	            {Array.from({ length: 6 }).map((_, index) => (
    	                <div className="relative group" key={index}>
    	                    <div className="absolute inset-0 bg-[#d6ddf4]/10 rounded-xl blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
    	                    <div className="h-full p-4 sm:p-6 md:p-7 rounded-xl backdrop-blur-2xl bg-white/5 border border-white/20 hover:border-[#d6ddf4]/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative z-10 group-hover:bg-white/10">
    	                        <div className="flex items-start gap-3 mb-4">
    	                            <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl text-[#d6ddf4]/60 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#d6ddf4] shrink-0">
    	                                {['extension', 'diversity_3', 'build', 'architecture', 'code', 'settings'][index]}
    	                            </span>
    	                            <h3 className="text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem] font-semibold text-[#d6ddf4] leading-tight">
    	                                {['Adhesive Bindings', 'Flexible Teams', 'Built-In Tools', 'Scalable Architecture', 'Expression Language', 'System Controls'][index]}
    	                            </h3>
    	                        </div>
    	                        <p className="text-[0.9rem] sm:text-base text-[#d6ddf4]/70">
    	                            {[
    	                                'Control how results are shared—team-wide (GLUE), session-based (VELCRO), or disposable (TAPE).',
    	                                'Define leads, members, and available tools for each team with complete flexibility and control.',
    	                                'Start with powerful tools like web search, code interpreters, and file handlers—or create your own.',
    	                                'Easily add new models, tools, and teams as your project grows without compromising performance.',
    	                                'Simplify app creation with an intuitive language designed for clarity and speed in development.',
    	                                'Complete control over system settings, permissions, and resource allocation across your organization.'
    	                            ][index]}
    	                        </p>
    	                    </div>
    	                </div>
    	            ))}
    	        </div>
    	    </div>
    	</div> 
            </div>
  )
}

