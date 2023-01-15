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
     * @returns File Get File success
     * @throws ApiError
     */
    public static getFile(
        path: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/file/{path}',
            path: {
                'path': path,
            },
        });
    }

    /**
     * Create new file.
     * Create a new empty file
     * @param path
     * @param isDir
     * @returns File Creating new empty file success
     * @throws ApiError
     */
    public static postFile(
        path: string,
        isDir: boolean,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/file/{path}',
            path: {
                'path': path,
            },
            query: {
                'isDir': isDir,
            },
        });
    }

    /**
     * Rename a file
     * Rename a file
     * @param path
     * @param requestBody
     * @returns File File renamed successfully
     * @throws ApiError
     */
    public static patchFile(
        path: string,
        requestBody?: {
            name?: string;
        },
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/file/{path}',
            path: {
                'path': path,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete a file
     * Delete a file
     * @param path
     * @returns void
     * @throws ApiError
     */
    public static deleteFile(
        path: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/file/{path}',
            path: {
                'path': path,
            },
        });
    }

}
