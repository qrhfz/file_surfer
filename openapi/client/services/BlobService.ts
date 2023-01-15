/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';

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
            url: '/file/{path}/blob',
            path: {
                'path': path,
            },
        });
    }

    /**
     * Upload a file
     * Upload a file to folder defined in path
     * @param formData
     * @returns File File uploaded successfully
     * @throws ApiError
     */
    public static upload(
        formData?: {
            path: string;
            files: Array<Blob>;
        },
    ): CancelablePromise<Array<File>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

}
