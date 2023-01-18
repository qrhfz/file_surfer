/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseUser } from './BaseUser';
import type { Role } from './Role';
import type { userId } from './userId';

export type User = (userId & BaseUser & {
    username: string;
    role: Role;
});

