/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewUser } from '../models/NewUser';
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
            url: '/user/',
        });
    }

    /**
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
     * create new user
     * @param id
     * @returns NewUser created user
     * @throws ApiError
     */
    public static postUser(
        id: string,
    ): CancelablePromise<NewUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * edit user
     * @param id
     * @returns User edited user
     * @throws ApiError
     */
    public static patchUser(
        id: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/user/{id}',
            path: {
                'id': id,
            },
        });
    }

}
