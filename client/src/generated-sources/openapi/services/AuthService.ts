/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postLogin(
        requestBody?: {
            username: string;
            password: string;
        },
    ): CancelablePromise<{
        token: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * Your GET endpoint
     * Ask for token to access file download etc
     * @returns any OK
     * @throws ApiError
     */
    public static getAccessToken(): CancelablePromise<{
        accessToken?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/access-token',
        });
    }

}
