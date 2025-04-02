/**
 * SHARED-TYPES
 * Central type definitions used across frontend and backend
 */

/**
 * User entity representing application user
 * @typedef {Object} User
 * @property {string} id - Unique identifier UUID format
 * @property {string} email - Email address (unique)
 * @property {string} name - User display name
 * @property {'admin' | 'user'} role - User access level
 * @property {Date} createdAt - Account creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Authentication response returned after successful login
 * @typedef {Object} AuthResponse
 * @property {string} accessToken - JWT token for API authorization
 * @property {User} user - User profile information
 */
export interface AuthResponse {
  accessToken: string;
  user: User;
}

/**
 * Resource validation result
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether validation passed
 * @property {string[]} errors - List of validation error messages
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Pagination parameters for list requests
 * @typedef {Object} PaginationParams
 * @property {number} page - Current page (1-indexed)
 * @property {number} pageSize - Items per page
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

// 추가 도메인별 타입은 여기에 정의하거나 하위 파일로 분리 