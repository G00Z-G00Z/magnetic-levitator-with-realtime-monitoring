import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic'


/**
 * Sets a route public
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
