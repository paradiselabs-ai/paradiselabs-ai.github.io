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
          <div className="px-8 py-12 mx-auto text-[#d6ddf4]">
            <div className="flex flex-col md:flex-row items-start justify-between mb-12 space-y-8 md:space-y-0 md:space-x-16">
              <div
                className="w-full md:w-1/2 space-y-6"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <h1 className="typography-h2 font-bold tracking-tight bg-gradient-to-r from-[#d6ddf4] to-[#a8b2e0] bg-clip-text text-transparent pb-2">
                Work Smarter, Not Harder
                </h1>
                <p className="typography-p !leading-relaxed backdrop-blur-xl bg-[#d6ddf4]/5 p-8 rounded-lg shadow-lg hover:bg-[#d6ddf4]/10 transition-all duration-300">
                  Break free from traditional AI constraints and watch your teams achieve what was previously impossible.
                </p>
              </div>
              <div
                className="w-full md:w-1/2"
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <p className="typography-p !leading-relaxed backdrop-blur-xl bg-[#d6ddf4]/5 p-8 rounded-lg shadow-lg hover:bg-[#d6ddf4]/10 transition-all duration-300">
                  Turn your vision into reality with a framework that adapts to how your teams naturally work, scaling effortlessly as you grow.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#d6ddf4]/5 hover:bg-[#d6ddf4]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <span className="material-symbols-outlined text-5xl text-[#d6ddf4] hover:scale-110 transition-transform">
                  group_work
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">
                    Human-Like Collaboration
                  </h2>
                  <p className="typography-p font-light !leading-relaxed text-[#d6ddf4]/90">
                    Watch your AI teams work together as naturally as your best human teams.
                  </p>
                </div>
              </div>

              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#d6ddf4]/5 hover:bg-[#d6ddf4]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="200"
              >
                <span className="material-symbols-outlined text-5xl text-[#d6ddf4] hover:scale-110 transition-transform">
                  settings_suggest
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">
                    Dynamic Resource Management
                  </h2>
                  <p className="typography-p font-light !leading-relaxed text-[#d6ddf4]/90">
                    Get the right resources exactly when and where you need them.
                  </p>
                </div>
              </div>

              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#d6ddf4]/5 hover:bg-[#d6ddf4]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="400"
              >
                <span className="material-symbols-outlined text-5xl text-[#d6ddf4] hover:scale-110 transition-transform">
                  rocket_launch
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">Future-Proof Design</h2>
                  <p className="typography-p font-light !leading-relaxed text-[#d6ddf4]/90">
                    Scale confidently knowing your foundation grows with you.
                  </p>
                </div>
              </div>

              <div
                className="flex flex-col items-start p-8 rounded-xl backdrop-blur-xl bg-[#d6ddf4]/5 hover:bg-[#d6ddf4]/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 space-y-6"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="600"
              >
                <span className="material-symbols-outlined text-5xl text-[#d6ddf4] hover:scale-110 transition-transform">
                  diversity_3
                </span>
                <div className="space-y-3">
                  <h2 className="typography-h3 font-semibold !leading-tight">
                    Community-Driven Growth
                  </h2>
                  <p className="typography-p font-light !leading-relaxed text-[#d6ddf4]/90">
                    Accelerate your success with insights from leading innovators.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div
                className="h-full lg:col-span-1 flex flex-col justify-between p-10 rounded-xl backdrop-blur-xl bg-gradient-to-br from-[#d6ddf4]/10 to-[#a8b2e0]/10 hover:from-[#d6ddf4]/15 hover:to-[#a8b2e0]/15 transition-all duration-300 border border-[#d6ddf4]/20 hover:border-[#d6ddf4]/30"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <div className="space-y-6">
                  <span className="material-symbols-outlined text-6xl text-[#d6ddf4]">
                    verified
                  </span>
                  <h3 className="typography-h3 font-bold text-[#d6ddf4]">
                    Shape the Future
                  </h3>
                  <p className="typography-p font-regular !leading-relaxed text-[#d6ddf4]/90">
                    Join our beta program to be among the first to revolutionize how your teams work with AI. Your feedback shapes the future of collaborative AI.
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 mt-8"
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-8 py-4 bg-[#F5F5DC]/5 border border-[#F8F9FA]/30 rounded-xl focus:outline-none focus:border-[#FBF8F1] focus:ring-2 focus:ring-[#FBF8F1]/20 transition-all duration-200 placeholder-[#F8F9FA]/40 text-[#F8F9FA]"
                    onInput={handleEmailInput}
                    required
                  />
                  <button
                    type="submit"
                    className= "w-full px-8 py-4 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group hover:shadow-lg"
                    disabled={isSubmitting || alreadyRegistered}
                  >
                    <span>{isSubmitting ? 'Processing...' : alreadyRegistered ? 'Already Registered' : 'Join Waitlist'}</span>
                  </button>
                  <p className="typography-xs font-light !leading-tight text-center text-[#F8F9FA]/70">
                    Limited spots available. Early access coming soon.
                  </p>
                </form>
              </div>

              <div
                className="lg:col-span-2 overflow-hidden rounded-xl backdrop-blur-xl bg-[#d6ddf4]/5 hover:bg-[#d6ddf4]/10 transition-all duration-300"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <div className="h-full flex flex-col">
                  <div className="grid grid-cols-3 gap-4 p-6 bg-[#d6ddf4]/10">
                    <h4 className="typography-h3 font-semibold !leading-tight">Your Needs</h4>
                    <h4 className="typography-h3 font-semibold !leading-tight">With GLUE</h4>
                    <h4 className="typography-h3 font-semibold !leading-tight">Without GLUE</h4>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#d6ddf4]/10 transition-colors duration-200">
                      <div className="typography-p font-medium">Team Innovation</div>
                      <div className="typography-p font-light text-[#d6ddf4]/90">
                        Natural collaboration
                      </div>
                      <div className="typography-p font-light text-[#d6ddf4]/90">Rigid processes</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#d6ddf4]/10 transition-colors duration-200">
                      <div className="typography-p font-light font-medium">Business Agility</div>
                      <div className="typography-p  font-light text-[#d6ddf4]/90">
                        Smart adaptation
                      </div>
                      <div className="typography-p font-light text-[#d6ddf4]/90">Fixed limits</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#d6ddf4]/10 transition-colors duration-200">
                      <div className="typography-p font-medium">Future Potential</div>
                      <div className="typography-p font-light text-[#d6ddf4]/90">Unlimited</div>
                      <div className="typography-p font-light text-[#d6ddf4]/90">Constrained</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#d6ddf4]/10 transition-colors duration-200">
                      <div className="typography-p font-medium">Setup Time</div>
                      <div className="typography-p font-light text-[#d6ddf4]/90">Minutes</div>
                      <div className="typography-p font-light text-[#d6ddf4]/90">Weeks</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-6 hover:bg-[#d6ddf4]/10 transition-colors duration-200">
                      <div className="typography-p font-medium">Time to Value</div>
                      <div className="typography-p font-light text-[#d6ddf4]/90">Immediate</div>
                      <div className="typography-p font-light text-[#d6ddf4]/90">Months</div>
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
