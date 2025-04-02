/**
 * SHARED-UTILITIES
 * Common utility functions shared between frontend and backend
 */

/**
 * Formats a date into YYYY-MM-DD format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 * @example
 * formatDate(new Date(2023, 0, 1)) // "2023-01-01"
 * formatDate("2023-01-01T00:00:00.000Z") // "2023-01-01"
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 * @example
 * isValidEmail("user@example.com") // true
 * isValidEmail("invalid-email") // false
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * Requires at least 8 chars, 1 letter, 1 number, 1 special char
 * @param {string} password - Password to validate
 * @returns {boolean} True if password meets requirements
 * @example
 * isValidPassword("Abcd1234!") // true
 * isValidPassword("weak") // false
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Truncates text to specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} [maxLength=100] - Maximum length before truncation
 * @returns {string} Truncated text
 * @example
 * truncateText("This is a long text", 10) // "This is a..."
 */
export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Converts object keys to camelCase
 * @param {Record<string, any>} obj - Object to transform
 * @returns {Record<string, any>} Transformed object
 */
export const toCamelCase = (obj: Record<string, any>): Record<string, any> => {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item));
  }
  
  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    acc[camelKey] = toCamelCase(obj[key]);
    return acc;
  }, {} as Record<string, any>);
}; 