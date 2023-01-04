/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';
import type { Folder } from '../models/Folder';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SearchService {

    /**
     * Your GET endpoint
     * Search file or folder in scoped folder
     * @param path
     * @param searchQuery
     * @returns any
     * @throws ApiError
     */
    public static getSearch(
        path: string,
        searchQuery: string,
    ): CancelablePromise<{
        files: Array<File>;
        folders: Array<Folder>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search',
            query: {
                'path': path,
                'searchQuery': searchQuery,
            },
        });
    }

}
