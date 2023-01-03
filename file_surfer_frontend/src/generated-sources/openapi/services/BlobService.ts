/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlobService {

    /**
     * Your GET endpoint
     * Download file at given path
     * @param path
     * @returns binary OK
     * @throws ApiError
     */
    public static getBlob(
        path: string,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/blob',
            query: {
                'path': path,
            },
        });
    }

    /**
     * Upload a file to folder defined in path
     * @param path
     * @param formData
     * @returns any
     * @throws ApiError
     */
    public static postBlob(
        path: string,
        formData?: {
            files: Array<string>;
        },
    ): CancelablePromise<{
        success?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/blob',
            query: {
                'path': path,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

}
