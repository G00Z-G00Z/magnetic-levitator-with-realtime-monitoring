/**
 * Interface of all jwt tokens
 */
export interface JWTPayload {
  /**
   * This is the user id
   */
  sub: string;
  email: string;
  name: string;
}
