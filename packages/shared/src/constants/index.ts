/**
 * SHARED-CONSTANTS
 * Application-wide constants shared between frontend and backend
 */

/**
 * API-ENDPOINTS
 * Centralized definition of all API routes
 * Used for consistent path references across the application
 */
export const API_ENDPOINTS = {
  /**
   * Authentication endpoints
   */
  AUTH: {
    /** @constant {string} - User login endpoint */
    LOGIN: '/auth/login',
    /** @constant {string} - User registration endpoint */
    REGISTER: '/auth/register',
    /** @constant {string} - Token refresh endpoint */
    REFRESH: '/auth/refresh',
    /** @constant {string} - Current user profile endpoint */
    ME: '/auth/me',
  },
  
  /**
   * User management endpoints
   */
  USERS: {
    /** @constant {string} - Base users resource path */
    BASE: '/users',
    /** @constant {string} - User profile management */
    PROFILE: '/users/profile',
  },
};

/**
 * APP-CONSTANTS
 * Application configuration constants
 */
export const APP_CONSTANTS = {
  /** @constant {number} - Default pagination size */
  PAGE_SIZE: 10,
  /** @constant {string} - Local storage key for access token */
  TOKEN_KEY: 'access_token',
  /** @constant {string} - Local storage key for refresh token */
  REFRESH_TOKEN_KEY: 'refresh_token',
};

/**
 * ERROR-CODES
 * Standardized error codes for API responses
 */
export const ERROR_CODES = {
  /** @constant {string} - Authentication failed */
  UNAUTHORIZED: 'UNAUTHORIZED',
  /** @constant {string} - Permission denied */
  FORBIDDEN: 'FORBIDDEN',
  /** @constant {string} - Resource not found */
  NOT_FOUND: 'NOT_FOUND',
  /** @constant {string} - Validation failed */
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  /** @constant {string} - Internal server error */
  SERVER_ERROR: 'SERVER_ERROR',
}; 