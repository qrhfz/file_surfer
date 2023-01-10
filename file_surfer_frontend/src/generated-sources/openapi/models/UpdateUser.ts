/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseUser } from './BaseUser';

export type UpdateUser = (BaseUser & {
    password?: string;
});

