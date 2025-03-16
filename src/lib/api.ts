import { supabase } from './supabaseClient';

export interface WaitlistFormData {
  name: string;
  email: string;
  subscriber: boolean;
  created_at?: string;
  website?: string; // Honeypot field
  reason?: string; // What sparks their interest
}

// Simple API abstraction layer
export const api = {
  // CSRF protection
  csrf: {
    // Generate a token and store it in sessionStorage
    generateToken: (): string => {
      const token = Math.random().toString(36).substring(2, 15) + 
                    Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('csrf_token', token);
      return token;
    },
    
    // Get the current token from sessionStorage
    getToken: (): string | null => {
      return sessionStorage.getItem('csrf_token');
    },
    
    // Validate a token against the stored one
    validateToken: (token: string): boolean => {
      const storedToken = sessionStorage.getItem('csrf_token');
      return storedToken === token;
    }
  },

  // Helper for input sanitization
  sanitizeInput: {
    // Simple HTML escape function
    escapeHTML: (str: string): string => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    },
    
    // Email sanitization and validation
    email: (email: string): string => {
      // Normalize email (lowercase, trim whitespace)
      const sanitized = email.toLowerCase().trim();
      
      // Basic email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitized)) {
        throw new Error('Invalid email format');
      }
      
      return sanitized;
    },
    
    // Sanitize name input
    name: (name: string): string => {
      // Trim whitespace and escape HTML
      const sanitized = api.sanitizeInput.escapeHTML(name.trim());
      
      // Check if name is not empty after sanitization
      if (!sanitized) {
        throw new Error('Name cannot be empty');
      }
      
      return sanitized;
    },
    
    // Sanitize text input (for fields like reason)
    text: (text: string | undefined): string | undefined => {
      if (!text) return undefined;
      return api.sanitizeInput.escapeHTML(text.trim());
    },
    
    // Sanitize form data
    waitlistData: (data: WaitlistFormData): WaitlistFormData => {
      // Check honeypot field - if it's filled, we'll still process but flag it later
      const honeypotFilled = !!data.website;
      
      return {
        name: api.sanitizeInput.name(data.name),
        email: api.sanitizeInput.email(data.email),
        reason: data.reason ? api.sanitizeInput.text(data.reason) : undefined,
        subscriber: !!data.subscriber, // Convert to boolean
        created_at: new Date().toISOString(),
        website: honeypotFilled ? data.website : undefined // Keep honeypot data if filled
      };
    }
  },

  // Helper for rate limiting
  rateLimit: {
    // Store submission attempts with timestamps
    store: new Map<string, number[]>(),
    
    // Maximum attempts allowed in the time window
    maxAttempts: 5,
    
    // Time window in milliseconds (1 minute)
    timeWindow: 60 * 1000,
    
    // Check if an identifier has exceeded the rate limit
    check: function(identifier: string): boolean {
      const now = Date.now();
      const store = this.store;
      
      // Clean up expired entries
      if (store.has(identifier)) {
        const timestamps = store.get(identifier)!.filter(
          timestamp => now - timestamp < this.timeWindow
        );
        
        if (timestamps.length > 0) {
          store.set(identifier, timestamps);
        } else {
          store.delete(identifier);
        }
      }
      
      // Check count of attempts
      const attempts = store.get(identifier) || [];
      if (attempts.length >= this.maxAttempts) {
        return false;  // Rate limited
      }
      
      // Record this attempt
      attempts.push(now);
      store.set(identifier, attempts);
      return true;  // Not rate limited
    }
  },

  // Submit waitlist form data
  submitWaitlist: async function(data: WaitlistFormData, csrfToken?: string): Promise<{ success: boolean, error: any | null }> {
    try {
      // Validate CSRF token if provided
      if (csrfToken && !this.csrf.validateToken(csrfToken)) {
        const error = new Error('Invalid CSRF token') as any;
        error.code = 'INVALID_CSRF';
        throw error;
      }
      
      // Check honeypot field - if it contains any data, it's likely a bot
      if (data.website) {
        const error = new Error('Spam submission detected') as any;
        error.code = 'SPAM_DETECTED';
        throw error;
      }
      
      // Check rate limiting first
      if (!this.rateLimit.check(data.email)) {
        const error = new Error('Rate limit exceeded') as any;
        error.code = 'RATE_LIMITED';
        throw error;
      }
      
      // Sanitize input data
      const sanitizedData = this.sanitizeInput.waitlistData(data);
      
      // Remove honeypot field before sending to database
      delete sanitizedData.website;
      
      // Call to Supabase to insert data
      const { error } = await supabase
        .from('waitlist')
        .insert([sanitizedData]);
      
      if (error) throw error;
      
      return { success: true, error: null };
    } catch (error) {
      console.error('API error:', error);
      return { success: false, error };
    }
  }
}; 