/**
 * Secure Logger Utility
 * - Development: Logs everything for debugging
 * - Production: Only logs non-sensitive errors
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  /**
   * Debug - Only visible in development
   */
  debug: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },

  /**
   * Info - Safe to log in production
   */
  info: (message: string) => {
    console.log(`[INFO] ${message}`);
  },

  /**
   * Error - Always visible, but don't pass sensitive data
   * Pass only error message, not full error object with credentials
   */
  error: (message: string, error?: any) => {
    if (isDevelopment && error) {
      console.error(`[ERROR] ${message}`, error);
    } else {
      console.error(`[ERROR] ${message}`);
    }
  },

  /**
   * Success - For operation confirmations
   */
  success: (message: string) => {
    console.log(`[✓] ${message}`);
  },
};

export default logger;
