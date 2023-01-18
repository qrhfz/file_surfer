/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseUser } from './BaseUser';
import type { Role } from './Role';

export type NewUser = (BaseUser & {
    password: string;
} & {
    username: string;
    role: Role;
    base: string;
    write: boolean;
});

