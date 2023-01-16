/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FolderService {

    /**
     * List contents inside a directory
     * Open a folder and returns list of files and folders inside
     * @returns File success
     * @throws ApiError
     */
    public static getFolderBase(): CancelablePromise<Array<File>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folder',
        });
    }

    /**
     * List contents inside a directory
     * Open a folder and returns list of files and folders inside
     * @param path
     * @returns File success
     * @throws ApiError
     */
    public static getFolder(
        path: string,
    ): CancelablePromise<Array<File>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folder/{path}',
            path: {
                'path': path,
            },
        });
    }

    /**
     * Search directory content in base directory
     * Search file or folder in scoped folder
     * @param search
     * @returns File
     * @throws ApiError
     */
    public static getSearchBase(
        search: string,
    ): CancelablePromise<Array<File>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search',
            query: {
                'search': search,
            },
        });
    }

    /**
     * Search directory content
     * Search file or folder in scoped folder
     * @param path
     * @param search
     * @returns File
     * @throws ApiError
     */
    public static getSearch(
        path: string,
        search: string,
    ): CancelablePromise<Array<File>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/{path}',
            path: {
                'path': path,
            },
            query: {
                'search': search,
            },
        });
    }

}
