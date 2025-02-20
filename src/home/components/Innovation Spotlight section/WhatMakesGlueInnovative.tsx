import React, { FormEvent, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import "./WhatMakesGlueInnovative.css";

export const WhatMakesGlueInnovative = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.querySelector("#email") as HTMLInputElement;
    const email = emailInput.value.toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      emailInput.setCustomValidity("Please enter a valid email address");
      emailInput.reportValidity();
      return;
    }

    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    button.disabled = true;
    setIsSubmitting(true);

    // First state - Processing animation
    button.innerHTML = `
      <div class="flex items-center justify-center gap-3">
        <span class="animate-pulse typography-p !leading-base">Processing your request...</span>
      </div>
    `;

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({
          name: 'Beta Signup',
          email: email,
          Form: '',
          subscriber: true,
          created_at: new Date().toISOString()
        });

      if (error) throw error;
      
      // Success state
      setTimeout(() => {
        button.innerHTML = `
          <div class="flex items-center justify-center gap-3">
            <span>🎉</span>
            <span class="typography-p !leading-base">Welcome to GLUE!</span>
          </div>
        `;
        button.className = "w-full px-8 py-4 bg-emerald-500 text-white font-medium typography-p !leading-base rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-lg";
      }, 2000);

    } catch (error: any) {
      console.error('Signup error:', error);
      
      if (error.code === 'PGRST409' || error.code === '23505') {
        // Already registered case
        setTimeout(() => {
          button.innerHTML = `Already Registered`;
          button.className = "w-full px-8 py-4 bg-yellow-500 text-white font-medium typography-p !leading-base rounded-xl transition-all duration-500";
          setAlreadyRegistered(true);
          
          // Revert to initial state after 2.5 seconds
          setTimeout(() => {
            button.innerHTML = `Join Waitlist`;
            button.className = "w-full px-8 py-4 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group hover:shadow-lg";
            button.disabled = false;
            setIsSubmitting(false);
            setAlreadyRegistered(false);
          }, 2500);
        }, 2000);
      } else {
        // Other errors - revert to initial state
        button.innerHTML = `Join Waitlist`;
        button.className = "w-full px-8 py-4 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group hover:shadow-lg";
        button.disabled = false;
        setIsSubmitting(false);
      }
    }
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(e.target.value)) {
      e.target.setCustomValidity("Please enter a valid email address");
    } else {
      e.target.setCustomValidity("");
    }
  };
  return (
    <div id="WhatMakesGlueInnovative" className="typography-root">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl">
          <div className="px-8 py-12 mx-auto text-[#F8F8FF]">
            <div className="flex flex-col md:flex-row items-start justify-between mb-12 space-y-8 md:space-y-0 md:space-x-16">
              <div
                className="w-full md:w-1/2 space-y-6"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <h1 className="typography-h2 font-bold tracking-tight pb-2 text-white">
                Work Smarter, Not Harder
                </h1>
                <p className="typography-p !leading-relaxed backdrop-blur-xl bg-[#F8F8FF]/5 p-8 rounded-lg shadow-lg hover:bg-[#F8F8FF]/10 transition-all duration-300">
                  Break free from traditional AI constraints and watch your teams achieve what was previously impossible.
                </p>
              </div>
              <div
                className="w-full md:w-1/2"
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <p className="typography-p !leading-relaxed backdrop-blur-xl bg-[#F8F8FF]/5 p-8 rounded-lg shadow-lg hover:bg-[#F8F8FF]/10 transition-all duration-300">
                  Turn your vision into reality with a framework that adapts to team up like humans, boosting productivity and reshaping work
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#F8F8FF]/5 hover:bg-[#F8F8FF]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <span className="material-symbols-outlined text-5xl text-[#F8F8FF] hover:scale-110 transition-transform">
                  group_work
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">
                    Human-Like Collaboration
                  </h2>
                  <p className="typography-p font-light !leading-relaxed text-[#F8F8FF]/90">
                  See AI agents collaborate as naturally as your top teams.
                  </p>
                </div>
              </div>

              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#F8F8FF]/5 hover:bg-[#F8F8FF]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                <span className="material-symbols-outlined text-5xl text-[#F8F8FF] hover:scale-110 transition-transform">
                  settings_suggest
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">
                    Dynamic Resource Management
                  </h2>
                  <p className="typography-p font-light !leading-relaxed text-[#F8F8FF]/90">
                  Get your AI the resources it needs, when it needs them.
                  </p>
                </div>
              </div>

              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#F8F8FF]/5 hover:bg-[#F8F8FF]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="400"
              >
                <span className="material-symbols-outlined text-5xl text-[#F8F8FF] hover:scale-110 transition-transform">
                  rocket_launch
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">Future-Proof Design</h2>
                  <p className="typography-p font-light !leading-relaxed text-[#F8F8FF]/90">
                  Scale with confidence—your foundation grows as you do.
                  </p>
                </div>
              </div>

              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#F8F8FF]/5 hover:bg-[#F8F8FF]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="600"
              >
                <span className="material-symbols-outlined text-5xl text-[#F8F8FF] hover:scale-110 transition-transform">
                  diversity_3
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">
                    Community-Driven Growth
                  </h2>
                  <p className="typography-p font-light !leading-relaxed text-[#F8F8FF]/90">
                  Tap into innovators' insights to accelerate success.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
              <div
                className="lg:col-span-2 overflow-hidden rounded-xl backdrop-blur-xl bg-[#F8F8FF]/5 hover:bg-[#F8F8FF]/10 transition-all duration-300"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <div className="h-full flex flex-col">
                  <div className="grid grid-cols-3 gap-4 p-6 bg-[#F8F8FF]/10">
                    <h4 className="typography-h3 font-semibold !leading-tight text-center">Your Needs</h4>
                    <h4 className="typography-h3 font-semibold !leading-tight text-center">With GLUE</h4>
                    <h4 className="typography-h3 font-semibold !leading-tight text-center">Without GLUE</h4>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#F8F8FF]/10 transition-colors duration-200">
                      <div className="typography-p font-medium text-center">Team Innovation</div>
                      <div className="typography-p text-center font-light text-[#F8F8FF]/90">
                        Natural collaboration
                      </div>
                      <div className="typography-p font-light text-[#F8F8FF]/90 text-center">Rigid processes</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#F8F8FF]/10 text-center transition-colors duration-200">
                      <div className="typography-p font-light font-medium">Business Agility</div>
                      <div className="typography-p  font-light text-[#F8F8FF]/90">
                        Smart adaptation
                      </div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Fixed limits</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#F8F8FF]/10 text-center transition-colors duration-200">
                      <div className="typography-p font-medium">Future Potential</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Unlimited potential</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Constrained growth</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#F8F8FF]/10 transition-colors text-center duration-200">
                      <div className="typography-p font-medium">Setup Time</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Setup in minutes</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Setup in weeks</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#F8F8FF]/10 transition-colors text-center duration-200">
                      <div className="typography-p font-medium">Time to Value</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Immediate value</div>
                      <div className="typography-p font-light text-[#F8F8FF]/90">Months to value</div>
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

export default WhatMakesGlueInnovative;
