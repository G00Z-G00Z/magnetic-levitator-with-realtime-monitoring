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

/**
 * Interface of all devices' jwt tokens
 */
export interface JWTDevicesPayload {
  /**
   * Device id
   */
  sub: string;
  /**
   * OwnerId
   */
  ownerId: string;
  name: string;
  /**
   * Only available types
   */
  type: string;
}
