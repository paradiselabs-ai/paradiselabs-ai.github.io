import React, { FormEvent, useState } from "react";
import "./Waitlist.css";
import { Check } from 'lucide-react';

export const Waitlist = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameInput = form.querySelector("#name") as HTMLInputElement;
    const emailInput = form.querySelector("#email") as HTMLInputElement;
    const reasonInput = form.querySelector("#reason") as HTMLTextAreaElement;
    
    const emailValue = emailInput.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

    console.log(formData);

    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
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
    setTimeout(() => {
      button.innerHTML = `
        <div class="flex items-center justify-center gap-3">
          <span class="animate-bounce">🎉</span>
          <span class="typography-p !leading-base">Welcome to GLUE!</span>
          <svg class="w-5 h-5 text-white animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      `;
      button.className =
        "relative mt-2 sm:mt-3 bg-emerald-500 text-white font-medium typography-p !leading-base rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-500 transform hover:scale-105 hover:shadow-lg";
    }, 2000);
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
    <div id="Waitlist" className="typography-root">
      <div>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="typography-h2 text-[#d6ddf7] !leading-tight">
              Turn Your AI Vision into Reality with GLUE
              </h2>
              <p className="typography-p text-[#d6ddf4] !leading-relaxed">
              Be part of the open-source movement turning AI concepts into real-world solutions. Our platform empowers you to focus on what matters most - creating innovations that solve meaningful problems.
              </p>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="typography-h3 text-[#f7d794]">
                    Get Early Access:
                  </h3>
                  <div className="flex items-start gap-3 group hover:-translate-y-0.5 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 mt-1 text-[#b0eac4] group-hover:text-[#b0eac4] transition-colors duration-300"
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
                    <span className="typography-p !leading-relaxed text-[#d6ddf4] group-hover:text-[#b0eac4] transition-colors duration-300">
                    Join a thriving open ecosystem and help shape the future of AI integration with your contributions.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 group hover:-translate-y-0.5 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 mt-1 text-[#b0eac4] group-hover:text-[#b0eac4] transition-colors duration-300"
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
                    <span className="typography-p !leading-relaxed text-[#d6ddf4] group-hover:text-[#b0eac4] transition-colors duration-300">
                    Turn complex AI workflows into seamless solutions using GLUE's intuitive tools
                    </span>
                  </div>
                  <div className="flex items-start gap-3 group hover:-translate-y-0.5 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 mt-1 text-[#b0eac4] group-hover:text-[#b0eac4] transition-colors duration-300"
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
                    <span className="typography-p !leading-relaxed text-[#d6ddf4] group-hover:text-[#b0eac4] transition-colors duration-300">
                    Move from concept to deployment faster than ever before
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="typography-h3 text-[#f7d794]">
                  Succeed With Dedicated Support:
                  </h3>
                  <div className="flex items-start gap-3 group hover:-translate-y-0.5 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 mt-1 text-[#b0eac4] group-hover:text-[#b0eac4] transition-colors duration-300"
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
                    <span className="typography-p !leading-relaxed text-[#d6ddf4] group-hover:text-[#b0eac4] transition-colors duration-300">
                    Our team partners with you at every step, ensuring your innovations make a real-world impact.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-[480px] min-h-[580px] rounded-2xl shadow-[0_8px_30px_rgb(248,249,250,0.2)] p-6 sm:p-14 relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-[#F8F9FA]/10 to-[#F8F9FA]/5">
                <header className="mb-8 sm:mb-12 relative z-20">
                  <h1 className="typography-h2 text-center mb-4 sm:mb-6 bg-gradient-to-r from-[#F8F9FA] to-[#FBF8F1] bg-clip-text text-transparent tracking-tight relative">
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
                  Be among the first to experience GLUE by joining our exclusive early-access program.
                  </p>
                </header>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6 sm:gap-8 relative z-20"
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-lg !leading-lg tracking-wide text-[#F8F9FA] font-medium"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="border border-[#F8F9FA]/30 rounded-xl p-3.5 sm:p-4 bg-[#F5F5DC]/5 transition-all duration-200 focus:border-[#FBF8F1] focus:ring-2 focus:ring-[#FBF8F1]/20 focus:outline-none hover:border-[#FBF8F1]/60 placeholder-[#F8F9FA]/40 text-[#F8F9FA] text-lg !leading-lg"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-lg !leading-lg tracking-wide text-[#F8F9FA] font-medium"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="border border-[#F8F9FA]/30 rounded-xl p-3.5 sm:p-4 bg-[#F5F5DC]/5 transition-all duration-200 focus:border-[#FBF8F1] focus:ring-2 focus:ring-[#FBF8F1]/20 focus:outline-none hover:border-[#FBF8F1]/60 placeholder-[#F8F9FA]/40 text-[#F8F9FA] text-lg !leading-lg"
                      placeholder="Enter your email address"
                      onInput={handleEmailInput}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="reason"
                        className="text-lg !leading-lg tracking-wide text-[#F8F9FA] font-medium"
                      >
                        What sparks your interest?
                      </label>
                      <span className="text-lg !leading-lg text-[#F8F9FA]/60">
                        (optional)
                      </span>
                    </div>
                    <textarea
                      id="reason"
                      name="reason"
                      rows={3}
                      className="border border-[#F8F9FA]/30 rounded-xl p-3.5 sm:p-4 bg-[#F5F5DC]/5 transition-all duration-200 focus:border-[#FBF8F1] focus:ring-2 focus:ring-[#FBF8F1]/20 focus:outline-none hover:border-[#FBF8F1]/60 resize-none placeholder-[#F8F9FA]/40 text-[#F8F9FA] text-lg !leading-lg"
                      placeholder="Tell us what excites you about our revolutionary platform..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="relative mt-2 sm:mt-3 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Secure Your Early Access</span>
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
                  </button>
                  <div className="flex items-center gap-3 mt-1 sm:mt-2">
                    <div className="relative inline-flex items-center">
                      <div 
                        onClick={() => setIsChecked(!isChecked)}
                        className={`
                          w-5 h-5 
                          border-2 
                          rounded-md 
                          transition-all 
                          duration-200 
                          flex 
                          items-center 
                          justify-center
                          cursor
                          -pointer
                          ${isChecked ? 'bg-[#FBF8F1] border-[#FBF8F1]' : 'border-[#F8F9FA]/30 bg-transparent hover:border-[#FBF8F1]/60'}
                          focus:ring-2 
                          focus:ring-[#FBF8F1]/20
                        `}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                      >
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
                      </div>
                    </div>
                    <label
                      htmlFor="newsletter"
                      className="text-lg !leading-lg text-[#F8F9FA] tracking-wide hover:text-[#FBF8F1] transition-colors duration-200 cursor-pointer"
                    >
                      Keep me updated with exclusive launch details
                    </label>
                  </div>
                </form>
                <p className="text-xs !leading-xs text-center mt-8 sm:mt-10 text-[#F8F9FA]/60 px-2 sm:px-0 relative z-20">
                  By joining our waitlist, you agree to our Terms of Service and
                  Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};