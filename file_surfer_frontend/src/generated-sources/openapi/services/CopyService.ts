/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CopyService {

    /**
     * Copy list of files and folders defined in sources to destination folder
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postCopy(
        requestBody?: {
            sources?: Array<string>;
            destination?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/copy',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
