import React, { FormEvent, useState, useCallback, useMemo, useRef, useEffect } from "react";
import { api } from "../../../lib/api";
import "./Waitlist.css";
import { Check } from 'lucide-react';
import { APIErrorBoundary, useErrorHandler } from "../../../components/error";
import { useWaitlistState, useUserState, useUIState } from "../../../context/hooks";

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

// Wrap the form in this wrapper component to use the error handler
const WaitlistForm = React.memo(() => {
  const [isChecked, setIsChecked] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const { error, handleError, resetError } = useErrorHandler();

  // Use our state management hooks
  const { isRegistered, setRegistered } = useUserState();
  const { 
    submissionInProgress, 
    setSubmissionInProgress,
    setSubmissionSuccess,
    setSubmissionError,
    resetWaitlistState
  } = useWaitlistState();
  const { addAlert } = useUIState();
  
  const emailRegex = useMemo(() => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, []);

  // Generate CSRF token on component mount
  useEffect(() => {
    const token = api.csrf.generateToken();
    setCsrfToken(token);
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetError(); // Reset any previous errors
    resetWaitlistState(); // Reset waitlist state
    
    // If already registered, no need to submit again
    if (isRegistered) {
      addAlert('info', "You're already registered for early access!");
      return;
    }
    
    const form = e.currentTarget;
    const nameInput = form.querySelector("#name") as HTMLInputElement;
    const emailInput = form.querySelector("#email") as HTMLInputElement;
    const reasonInput = form.querySelector("#reason") as HTMLTextAreaElement;
    const faxInput = form.querySelector("#fax") as HTMLInputElement;
    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;

    if (faxInput.value) {
      addAlert('warning', "Bot detected! Submission blocked.");
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
      "reason": reasonInput.value,
      "subscriber": isChecked
    };

    button.disabled = true;
    setSubmissionInProgress(true);
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
      // Check rate limit first
      if (!api.rateLimit.check(emailValue)) {
        throw { code: 'RATE_LIMITED', message: 'Too many attempts. Please try again later.' };
      }

      // Submit form using the API abstraction with CSRF token
      const { success, error } = await api.submitWaitlist({
        name: formData.Name,
        email: formData.Email,
        reason: formData.reason,
        subscriber: formData.subscriber
      }, csrfToken || undefined);

      if (!success) throw error;

      // Store that user has registered
      setRegistered(true);
      setSubmissionSuccess(true);

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
        
        // Add a success message and set focus to it for screen readers
        const formElement = button.closest('form');
        if (formElement) {
          const successMessage = document.createElement('div');
          successMessage.id = 'success-message';
          successMessage.className = 'text-emerald-400 font-medium mt-4 text-center';
          successMessage.setAttribute('tabindex', '-1');
          successMessage.setAttribute('role', 'alert');
          successMessage.textContent = 'Registration successful! We\'ll be in touch soon.';
          formElement.appendChild(successMessage);
          successMessage.focus();
        }
        
        addAlert('success', 'Registration successful! We\'ll be in touch soon.');
      }, 2000);

    } catch (error: any) {
      // Handle error with our error handler
      handleError(error);
      setSubmissionError(error instanceof Error ? error : new Error(error.message || 'Unknown error'));
      setSubmissionInProgress(false);

      // Rest of error handling code remains the same
      console.error('Submission error:', error);

      if (error.code === 'RATE_LIMITED') {
        addAlert('warning', 'Too many attempts. Please try again later.');
        setTimeout(() => {
          button.innerHTML = `Rate Limit Exceeded`;
          button.className = "relative mt-2 sm:mt-3 bg-orange-500 text-white font-medium typography-p !leading-base rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-500";

          setTimeout(() => {
            button.innerHTML = `Start Your Journey`;
            button.className = "relative mt-2 sm:mt-3 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group";
            button.disabled = false;
          }, 2500);
        }, 2000);
      } else if (error.code === 'PGRST409' || error.code === '23505') {
        // If duplicate email detected, mark as already registered
        setRegistered(true);
        addAlert('info', 'This email is already registered for early access!');
        
        setTimeout(() => {
          button.innerHTML = `Already Registered`;
          button.className = "relative mt-2 sm:mt-3 bg-yellow-500 text-white font-medium typography-p !leading-base rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-500";

          setTimeout(() => {
            button.innerHTML = `Start Your Journey`;
            button.className = "relative mt-2 sm:mt-3 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group";
            button.disabled = false;
          }, 2500);
        }, 2000);
      } else if (error.message === 'Invalid email format') {
        // Show email validation error
        const emailError = document.getElementById('email-error');
        const emailField = document.getElementById('email');
        
        if (emailError) {
          emailError.textContent = 'Please enter a valid email address';
          emailError.classList.remove('hidden');
          emailError.style.display = 'block';
        }
        
        if (emailField) {
          emailField.focus();
        }
        
        addAlert('error', 'Please enter a valid email address.');
        
        setTimeout(() => {
          button.innerHTML = `Start Your Journey`;
          button.className = "relative mt-2 sm:mt-3 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group";
          button.disabled = false;
        }, 1000);
      } else if (error.message === 'Name cannot be empty') {
        // Show name validation error
        const nameField = document.getElementById('name');
        
        if (nameField) {
          nameField.classList.add('border-red-400');
          nameField.focus();
          
          // Create or update name error message
          let nameError = document.getElementById('name-error');
          if (!nameError) {
            nameError = document.createElement('div');
            nameError.id = 'name-error';
            nameError.className = 'text-red-400 text-sm mt-1';
            nameField.parentNode?.appendChild(nameError);
          }
          
          nameError.textContent = 'Name cannot be empty';
        }
        
        addAlert('error', 'Please enter your name.');
        
        setTimeout(() => {
          button.innerHTML = `Start Your Journey`;
          button.className = "relative mt-2 sm:mt-3 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group";
          button.disabled = false;
        }, 1000);
      } else if (error.code === 'INVALID_CSRF') {
        // Regenerate CSRF token and show error
        const newToken = api.csrf.generateToken();
        setCsrfToken(newToken);
        
        addAlert('error', 'Security error occurred. Please try again.');
        
        setTimeout(() => {
          button.innerHTML = `Security Error`;
          button.className = "relative mt-2 sm:mt-3 bg-red-500 text-white font-medium typography-p !leading-base rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-500";

          setTimeout(() => {
            button.innerHTML = `Start Your Journey`;
            button.className = "relative mt-2 sm:mt-3 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group";
            button.disabled = false;
          }, 2500);
        }, 2000);
      } else if (error.code === 'SPAM_DETECTED') {
        // For spam submissions, we show a success message to the bot
        // but don't actually process the submission
        setRegistered(true);
        
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
      } else {
        addAlert('error', 'An unexpected error occurred. Please try again later.');
        button.innerHTML = `Start Your Journey`;
        button.className = "relative mt-2 sm:mt-3 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group";
        button.disabled = false;
      }
    }
  }, [isChecked, emailRegex, isRegistered, csrfToken, handleError, resetError, addAlert, setRegistered, resetWaitlistState, setSubmissionInProgress, setSubmissionSuccess, setSubmissionError]);

  const handleEmailInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const errorElement = document.getElementById('email-error');
    if (!emailRegex.test(e.target.value)) {
      e.target.setCustomValidity("Please enter a valid email address");
      if (errorElement) {
        errorElement.classList.remove('hidden');
        errorElement.style.display = 'block';
      }
    } else {
      e.target.setCustomValidity("");
      if (errorElement) {
        errorElement.classList.add('hidden');
        errorElement.style.display = 'none';
      }
    }
  }, [emailRegex]);

  const handleCheckboxToggle = useCallback(() => {
    setIsChecked(prev => !prev);
  }, []);

  // If there's an error that wasn't handled by the specific cases above, show the error message
  if (error) {
    // We'll let the APIErrorBoundary handle this in the parent component
    throw error;
  }

  // The form JSX remains the same
  return (
    <div className="w-full flex justify-center">
      <div className="w-[480px] min-h-[580px] rounded-2xl shadow-[0_8px_30px_rgb(248,249,250,0.2)] p-6 sm:p-14 relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-[#F8F9FA]/10 to-[#F8F9FA]/5">
        <header className="mb-8 sm:mb-12 relative z-20">
          <h2 className="typography-h2 text-center mb-4 sm:mb-6 tracking-tight relative">
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
          </h2>
          <p className="typography-p !leading-relaxed text-[#F8F9FA] text-center px-2 sm:px-0">
            Be first to explore GLUE's open-source platform for AI agents and agentic AI workflows.
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
              id="name-label"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              aria-labelledby="name-label"
              aria-required="true"
              className="border border-[#F8F9FA]/30 font-light rounded-xl p-3.5 sm:p-4 bg-[#F5F5DC]/5 transition-all duration-200 focus:border-[#FBF8F1] focus:ring-2 focus:ring-[#FBF8F1]/20 focus:outline-none hover:border-[#FBF8F1]/60 placeholder-[#F8F9FA]/40 text-[#F8F9FA] text-base !leading-base"
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="typography-p !leading-lg tracking-wide text-[#F8F9FA] font-medium"
              id="email-label"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email address"
              aria-labelledby="email-label"
              aria-required="true"
              aria-describedby="email-error"
              className="border border-[#F8F9FA]/30 font-light rounded-xl p-3.5 sm:p-4 bg-[#F5F5DC]/5 transition-all duration-200 focus:border-[#FBF8F1] focus:ring-2 focus:ring-[#FBF8F1]/20 focus:outline-none hover:border-[#FBF8F1]/60 placeholder-[#F8F9FA]/40 text-[#F8F9FA] text-base !leading-base"
              onInput={handleEmailInput}
            />
            <div id="email-error" className="text-red-400 text-sm hidden" style={{ display: 'none' }}>
              Please enter a valid email address
            </div>
          </div>
          
          {/* Honeypot fields remain the same */}
          <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
            <label htmlFor="website">Website (Leave this empty)</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
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
            <div className="checkbox-container">
              <div
                id="newsletter-checkbox"
                onClick={handleCheckboxToggle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCheckboxToggle();
                  }
                }}
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
                aria-labelledby="newsletter-label"
                tabIndex={0}
              >
                <CheckIcon isChecked={isChecked} />
              </div>
            </div>
            <label
              id="newsletter-label"
              htmlFor="newsletter-checkbox"
              style={{ marginTop: '-2px', marginBottom: '-2px' }}
              className="text-base !leading-base text-[#F8F9FA] tracking-wide hover:text-[#FBF8F1] transition-colors duration-200 cursor-pointer"
              onClick={handleCheckboxToggle}
            >
              Keep me updated with exclusive launch details
            </label>
          </div>
          <button
            type="submit"
            className="relative mt-2 sm:mt-3 bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 typography-p !leading-relaxed rounded-xl py-3.5 sm:py-4 px-6 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(248,249,250,0.3)] active:translate-y-[1px] active:shadow-sm group disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submissionInProgress}
          >
            <ButtonContent />
          </button>
        </form>
      </div>
    </div>
  );
});

// The main Waitlist component - now with error boundary
export const Waitlist = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { addAlert } = useUIState();
  
  const handleApiError = (error: Error) => {
    console.error('API Error in Waitlist:', error);
    // Add an alert for the user
    addAlert('error', 'We encountered an error processing your request. Please try again later.');
    // In a production app, we'd send this to an error monitoring service
  };

  return (
    <div id="Waitlist" className="typography-root" ref={ref}>
      <div>
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="typography-h2 text-[#F6F2FF] !leading-tight">
                Turn Your AI Vision into Reality with GLUE
              </h2>
              <p className="typography-p text-[#F6F2FF] !leading-relaxed">
                Join an open-source wave making AI practical. GLUE's AI agents outpace SaaS with superior adaptability.
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
                  description="Supercharge with GLUE's open-source platform."
                />
              </div>
            </div>

            <APIErrorBoundary 
              onError={handleApiError}
              fallback={({ error, resetBoundary }) => (
                <div className="w-[480px] min-h-[400px] rounded-2xl shadow-[0_8px_30px_rgb(248,249,250,0.2)] p-6 sm:p-14 relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-[#F8F9FA]/10 to-[#F8F9FA]/5">
                  <div className="text-center mb-8">
                    <svg 
                      className="h-16 w-16 text-amber-400 mx-auto mb-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="typography-h2 text-[#F6F2FF] !leading-tight">Connection Issue</h2>
                    <p className="typography-p text-[#F6F2FF]/80 mt-4 mb-6">
                      We couldn't process your request. Please try again in a moment.
                    </p>
                    <button
                      onClick={resetBoundary}
                      className="bg-gradient-to-r from-[#FBF8F1] to-[#F8F9FA] text-gray-800 py-3 px-6 rounded-xl hover:translate-y-[-2px] transition-all duration-300"
                    >
                      Try Again
                    </button>
                  </div>
                  <details className="text-[#F6F2FF]/60 text-sm">
                    <summary className="cursor-pointer">Error details</summary>
                    <p className="mt-2 p-2 bg-[#F8F9FA]/5 rounded">{error.message}</p>
                  </details>
                </div>
              )}
            >
              <WaitlistForm />
            </APIErrorBoundary>
          </div>
        </section>
      </div>
    </div>
  );
});

// Set display names
Waitlist.displayName = 'Waitlist';
WaitlistForm.displayName = 'WaitlistForm';
FeatureItem.displayName = 'FeatureItem';
CheckIcon.displayName = 'CheckIcon';
ButtonContent.displayName = 'ButtonContent';