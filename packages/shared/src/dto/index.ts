/**
 * SHARED-DTOS
 * Data Transfer Objects used for API request/response validation
 * Used by both frontend and backend for type-checking
 */

/**
 * Login request DTO
 * @typedef {Object} LoginDto
 * @property {string} email - User email address
 * @property {string} password - User password (plain text before hash)
 */
export interface LoginDto {
  email: string;
  password: string;
}

/**
 * Register request DTO
 * @typedef {Object} RegisterDto
 * @property {string} email - User email address (must be unique)
 * @property {string} password - User password (will be hashed)
 * @property {string} name - User display name
 */
export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

/**
 * Standard API response wrapper
 * @typedef {Object} ApiResponse
 * @template T - Type of data payload
 * @property {T} data - Response payload
 * @property {string} message - Response message
 * @property {number} statusCode - HTTP status code
 */
export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

/**
 * Paginated response wrapper
 * @typedef {Object} PaginatedResponse
 * @template T - Type of items in the collection
 * @property {T[]} items - Array of items for current page
 * @property {number} total - Total count of all items
 * @property {number} page - Current page number (1-indexed)
 * @property {number} pageSize - Items per page
 * @property {number} totalPages - Total number of pages
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * User creation DTO (admin operations)
 * @typedef {Object} CreateUserDto
 * @property {string} email - User email address
 * @property {string} password - User password
 * @property {string} name - User display name
 * @property {'admin' | 'user'} [role='user'] - User role
 */
export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'user';
}

/**
 * User update DTO
 * @typedef {Object} UpdateUserDto
 * @property {string} [name] - User display name
 * @property {string} [password] - New password
 * @property {'admin' | 'user'} [role] - User role
 */
export interface UpdateUserDto {
  name?: string;
  password?: string;
  role?: 'admin' | 'user';
} 