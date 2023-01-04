/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClipboardService {

    /**
     * Copy list of files and folders defined in sources to destination folder
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postCopy(
        requestBody?: {
            sources?: Array<string>;
            destination?: string;
        },
    ): CancelablePromise<{
        success: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/copy',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Move list of files and folders defined in sources to destination folder
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static postMove(
        requestBody?: {
            sources?: Array<string>;
            destination?: string;
        },
    ): CancelablePromise<{
        success: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/move',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
