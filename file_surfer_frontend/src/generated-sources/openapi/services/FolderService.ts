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
        files: Array<File>;
        folders: Array<Folder>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/folder',
            query: {
                'path': path,
            },
        });
    }

}
