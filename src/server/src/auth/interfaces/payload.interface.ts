/**
 * Interface of all users' jwt tokens
 */
export interface JWTUserPayload {
  /**
   * This is the user id
   */
  sub: string;
  email: string;
  name: string;
}
