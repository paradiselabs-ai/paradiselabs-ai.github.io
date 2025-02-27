import React, { FormEvent, useState, useCallback, useMemo } from "react";
import { supabase } from "../../../lib/supabaseClient";
import "./Waitlist.css";
import { Check } from 'lucide-react';

// Memoized CheckIcon component
const CheckIcon = React.memo(({ isChecked }: { isChecked: boolean }) => (
  <Check
    aria-hidden="true"
    className={`
      w-3 h-3
      text-gray-800
      transition-all
      duration-200
      ${isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
    `}
  />
));

// Memoized ButtonContent component
const ButtonContent = React.memo(() => (
  <>
    <span>Start Your Journey</span>
    <svg
      className="absolute -right-2 -top-2 w-7 sm:w-8 h-7 sm:h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-0 group-hover:rotate-12"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M16,8 C16,8 20,2 26,8 C32,14 16,24 16,24 C16,24 0,14 6,8 C12,2 16,8 16,8"
        fill="#BB479C"
      />
    </svg>
  </>
));

// Memoized FeatureItem component
const FeatureItem = React.memo(({ title, description }: { title: string; description: string }) => (
  <>
    <h3 className="typography-h3 text-[#FF9E7D]">{title}</h3>
    <div className="flex items-start gap-3 group hover:-translate-y-0.5 transition-transform duration-300">
      <svg
        className="w-5 h-5 mt-1 text-[#2ECC8E] group-hover:text-[#2ECC8E] transition-colors duration-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M5 13l4 4L19 7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="typography-p font-light !leading-relaxed text-[#F6F2FF] group-hover:text-[#2ECC8E] transition-colors duration-300">
        {description}
      </span>
    </div>
  </>
));

export const Waitlist = React.memo(() => {
  const [isChecked, setIsChecked] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const emailRegex = useMemo(() => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.querySelector("#name") as HTMLInputElement;
    const emailInput = form.querySelector("#email") as HTMLInputElement;
    const reasonInput = form.querySelector("#reason") as HTMLTextAreaElement;
    const faxInput = form.querySelector("#fax") as HTMLInputElement;
    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;

    if (faxInput.value) {
      alert("Bot detected! Submission blocked.");
      return;
    }

    const emailValue = emailInput.value.toLowerCase();

    if (!emailRegex.test(emailValue)) {
      emailInput.setCustomValidity("Please enter a valid email address");
      emailInput.reportValidity();
      return;
    }

    const formData = {
      "Name": nameInput.value,
      "Email": emailValue,
      "Form": reasonInput.value,
      "subscriber": isChecked
    };

    button.disabled = true;
    button.innerHTML = `
      <div class="flex items-center justify-center gap-3">
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="animate-pulse typography-p !leading-base">Processing your request...</span>
      </div>
    `;

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({
          name: formData.Name,
          email: formData.Email,
          Form: formData.Form,
          subscriber: formData.subscriber,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      setTimeout(() => {
        button.innerHTML = `
          <div class="flex items-center justify-center gap-3">
            <span>🎉</span>
            <span class="typography-p !leading-base">Welcome to GLUE!</span>
            <svg class="w-5 h-5 text-white animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        `;
        button.className = "relative mt-2 sm:mt-3 bg-emerald-500 text-white font-medium typography-p !leading-base rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-500 transform hover:scale-105 hover:shadow-lg";
      }, 2000);

    } catch (error: any) {
      console.error('Submission error:', error);

      if (error.code === 'PGRST409' || error.code === '23505') {
        setTimeout(() => {
          button.innerHTML = `Already Registered`;
          button.className = "relative mt-2 sm:mt-3 bg-yellow-500 text-white font-medium typography-p !leading-base rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-500";

          setTimeout(() => {
            button.innerHTML = `Start Your Journey`;
            button.className = "relative mt-2 sm:mt-3 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group";
            button.disabled = false;
          }, 2500);
        }, 2000);
      } else {
        button.innerHTML = `Start Your Journey`;
        button.className = "relative mt-2 sm:mt-3 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group";
        button.disabled = false;
      }
    }
  }, [isChecked, emailRegex]);

  const handleEmailInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!emailRegex.test(e.target.value)) {
      e.target.setCustomValidity("Please enter a valid email address");
    } else {
      e.target.setCustomValidity("");
    }
  }, [emailRegex]);

  const handleCheckboxToggle = useCallback(() => {
    setIsChecked(prev => !prev);
  }, []);

  return (
    <div id="Waitlist" className="typography-root">
      <div>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="typography-h2 text-[#F6F2FF] !leading-tight">
                Turn Your AI Vision into Reality with GLUE
              </h2>
              <p className="typography-p text-[#F6F2FF] !leading-relaxed">
                Join an open-source wave making AI practical. GLUE’s AI agents outpace SaaS with superior adaptability.
              </p>
              <div className="space-y-6">
                <FeatureItem 
                  title="Master AI Integration."
                  description="Infuse your ideas to AI agent workflows."
                />
                <FeatureItem 
                  title="Transform Workflows Now."
                  description="Automate and optimize with simple syntax."
                />
                <FeatureItem 
                  title="Accelerate from Idea to Launch."
                  description="Supercharge with GLUE’s open-source platform."
                />
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-[480px] min-h-[580px] rounded-2xl shadow-[0_8px_30px_rgb(248,249,250,0.2)] p-6 sm:p-14 relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-[#F8F9FA]/10 to-[#F8F9FA]/5">
                <header className="mb-8 sm:mb-12 relative z-20">
                  <h1 className="typography-h2 text-center mb-4 sm:mb-6 tracking-tight relative">
                    Get Early Access
                    <svg
                      className="absolute -right-6 sm:-right-8 top-0 w-5 sm:w-6 h-5 sm:h-6 text-[#FBF8F1] animate-pulse"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M12,2 L15,8 L21,9 L16.5,14 L18,20 L12,17 L6,20 L7.5,14 L3,9 L9,8 L12,2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </h1>
                  <p className="typography-p !leading-relaxed text-[#F8F9FA] text-center px-2 sm:px-0">
                    Be first to explore GLUE’s open-source platform for AI agents and agentic AI workflows.
                  </p>
                </header>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 sm:gap-8 relative z-20"
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="typography-p !leading-lg tracking-wide text-[#F8F9FA] font-medium"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="border border-[#F8F9FA]/30 font-light rounded-xl p-3.5 sm:p-4 bg-[#F5F5DC]/5 transition-all duration-200 focus:border-[#FBF8F1] focus:ring-2 focus:ring-[#FBF8F1]/20 focus:outline-none hover:border-[#FBF8F1]/60 placeholder-[#F8F9FA]/40 text-[#F8F9FA] text-base !leading-base"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="typography-p !leading-lg tracking-wide text-[#F8F9FA] font-medium"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="border border-[#F8F9FA]/30 font-light rounded-xl p-3.5 sm:p-4 bg-[#F5F5DC]/5 transition-all duration-200 focus:border-[#FBF8F1] focus:ring-2 focus:ring-[#FBF8F1]/20 focus:outline-none hover:border-[#FBF8F1]/60 placeholder-[#F8F9FA]/40 text-[#F8F9FA] text-base !leading-base"
                      placeholder="Enter your email address"
                      onInput={handleEmailInput}
                    />
                  </div>
                  <div style={{ position: 'absolute', left: '-9999px' }}>
                    <label htmlFor="fax">Fax Number</label>
                    <input type="text" id="fax" name="fax" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="reason"
                        className="typography-p !leading-lg tracking-wide text-[#F8F9FA] font-medium"
                      >
                        What sparks your interest?
                      </label>
                      <span className="text-base !leading-base text-[#F8F9FA]/60">
                        optional
                      </span>
                    </div>
                    <textarea
                      id="reason"
                      name="reason"
                      rows={3}
                      maxLength={200}
                      className="border border-[#F8F9FA]/30 font-light rounded-xl p-3.5 sm:p-4 bg-[#F5F5DC]/5 transition-all duration-200 focus:border-[#FBF8F1] focus:ring-2 focus:ring-[#FBF8F1]/20 focus:outline-none hover:border-[#FBF8F1]/60 resize-none placeholder-[#F8F9FA]/40 text-[#F8F9FA] text-base !leading-base"
                      placeholder="Tell us what excites you about our revolutionary platform..."
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-1 sm:mt-2">
                    <div className="relative inline-flex items-center">
                      <div
                        onClick={handleCheckboxToggle}
                        className={`
                          w-5 h-5
                          border-2
                          rounded-md
                          transition-all
                          duration-200
                          flex
                          items-center
                          justify-center
                          cursor-pointer
                          ${isChecked ? 'bg-[#FBF8F1] border-[#FBF8F1]' : 'border-[#F8F9FA]/30 bg-transparent hover:border-[#FBF8F1]/60'}
                          focus:ring-2
                          focus:ring-[#FBF8F1]/20
                        `}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                      >
                        <CheckIcon isChecked={isChecked} />
                      </div>
                    </div>
                    <label
                      htmlFor="newsletter"
                      style={{ marginTop: '-2px', marginBottom: '-2px' }}
                      className="text-base !leading-base text-[#F8F9FA] tracking-wide hover:text-[#FBF8F1] transition-colors duration-200 cursor-pointer"
                    >
                      Keep me updated with exclusive launch details
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="relative mt-2 sm:mt-3 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ButtonContent />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});

Waitlist.displayName = 'Waitlist';
FeatureItem.displayName = 'FeatureItem';
CheckIcon.displayName = 'CheckIcon';
ButtonContent.displayName = 'ButtonContent';