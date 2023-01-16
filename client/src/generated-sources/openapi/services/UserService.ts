/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewUser } from '../models/NewUser';
import type { UpdateUser } from '../models/UpdateUser';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * get list of user
     * @returns User list of users
     * @throws ApiError
     */
    public static getUsers(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user',
        });
    }

    /**
     * Create new user.
     * create new user
     * @param requestBody
     * @returns NewUser created user
     * @throws ApiError
     */
    public static postUser(
        requestBody?: NewUser,
    ): CancelablePromise<NewUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get a user info
     * @param id
     * @returns User single user
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
     * Change user data
     * edit user
     * @param id
     * @param requestBody
     * @returns User edited user
     * @throws ApiError
     */
    public static patchUser(
        id: string,
        requestBody?: UpdateUser,
    ): CancelablePromise<User> {
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
     * Get current loggedin user info
     * @returns User Sucess get current user
     * @throws ApiError
     */
    public static getUserMe(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/me',
        });
    }

    /**
     * Edit currently logged in user data
     * @param requestBody
     * @returns User return updated user
     * @throws ApiError
     */
    public static patchCurrentUser(
        requestBody?: UpdateUser,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user/me',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
