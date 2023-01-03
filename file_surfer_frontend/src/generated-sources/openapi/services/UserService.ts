/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Role } from '../models/Role';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Your GET endpoint
     * Get user info
     * @param id
     * @returns User OK
     * @throws ApiError
     */
    public static getUser(
        id: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * create new user
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postUserId(
        id: string,
        requestBody?: {
            username: string;
            password: string;
            role: Role;
        },
    ): CancelablePromise<{
        success?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * rename or change password
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static patchUserId(
        id: string,
        requestBody?: {
            username?: string;
            password?: string;
            role?: Role;
        },
    ): CancelablePromise<{
        success?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * delete user
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static deleteUserId(
        id: string,
    ): CancelablePromise<{
        success?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user/{id}',
            path: {
                'id': id,
            },
        });
    }

}
