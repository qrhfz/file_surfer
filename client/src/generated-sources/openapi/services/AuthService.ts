/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login
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
     * @returns void
     * @throws ApiError
     */
    public static logout(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/logout',
        });
    }

    /**
     * Create access token to download file
     * Ask for token to access file download etc
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postAccessToken(
        requestBody?: {
            path?: string;
        },
    ): CancelablePromise<{
        accessToken?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/access-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
