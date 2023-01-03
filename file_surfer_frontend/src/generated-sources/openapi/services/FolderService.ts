/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';
import type { Folder } from '../models/Folder';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FolderService {

    /**
     * Your GET endpoint
     * Open a folder and returns list of files and folders inside
     * @param path
     * @returns any
     * @throws ApiError
     */
    public static getFolder(
        path: string,
    ): CancelablePromise<{
        files?: Array<File>;
        folders?: Array<Folder>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folder',
            query: {
                'path': path,
            },
        });
    }

    /**
     * create new folder at location defined in path
     * @param path
     * @returns any
     * @throws ApiError
     */
    public static postFolder(
        path: string,
    ): CancelablePromise<{
        success?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/folder',
            query: {
                'path': path,
            },
        });
    }

    /**
     * delete folder defined in path
     * @param path
     * @returns any
     * @throws ApiError
     */
    public static deleteFolder(
        path: string,
    ): CancelablePromise<{
        success?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/folder',
            query: {
                'path': path,
            },
        });
    }

    /**
     * Used to rename a folder
     * @param path
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static patchFolder(
        path: string,
        requestBody?: {
            name?: string;
        },
    ): CancelablePromise<{
        success?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/folder',
            query: {
                'path': path,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
