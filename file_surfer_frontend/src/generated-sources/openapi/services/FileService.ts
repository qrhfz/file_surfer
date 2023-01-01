/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FileService {

    /**
     * Your GET endpoint
     * returns file info. if type is text* it will returns it content as content property
     * @param path
     * @returns any OK
     * @throws ApiError
     */
    public static getFile(
        path: string,
    ): CancelablePromise<{
        info?: File;
        content?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/file',
            query: {
                'path': path,
            },
        });
    }

    /**
     * create new empty file
     * @param path
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postFile(
        path: string,
        requestBody?: {
            name?: string;
            type?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/file',
            query: {
                'path': path,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete file
     * @param path
     * @returns any OK
     * @throws ApiError
     */
    public static deleteFile(
        path: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/file',
            query: {
                'path': path,
            },
        });
    }

    /**
     * rename file name
     * @param path
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static patchFile(
        path: string,
        requestBody?: {
            name?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/file',
            query: {
                'path': path,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
