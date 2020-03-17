import axios, { AxiosInstance } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { normalize, Schema } from 'normalizr';

import { parseQueryString } from '../helpers/location';
import { timezoneOffset } from '..//helpers/date';

import { AppState } from '../reducers';

interface Response {
    data: any,
    meta?: object
}

type endpointFunction = (state: AppState) => string;

interface CallAPIAction {
    endpoint: string | endpointFunction
    types: string[],
    method: Methods,
    data?: object
    schema: Schema<any>,
    propsWithRequestAction?: object
}

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

const API_ROOT: string | undefined = process.env.REACT_APP_API_URI;
const instance: AxiosInstance = axios.create({
    baseURL: API_ROOT,
    headers: {
        'Vk-Params': window.btoa(JSON.stringify({
            ...parseQueryString(window.location.search),
            utc_offset: timezoneOffset()
        })),
        'Accept': 'application/json'
    }
});

export const CALL_API: string = 'call-api';

function callApi(endpoint: string, method: Methods, schema: Schema<any>, data?: object): Promise<any> {
    return instance({
        url: endpoint,
        method,
        data: (data) ? decamelizeKeys(data) : undefined
    }).then((response: Response) => {
        const data = parseResponseData(response);
        const camelizedData = camelizeKeys(data);

        return normalize(camelizedData, schema);
    });
};

function parseResponseData(response: Response): any {
    if (response.meta) {
        return response;
    }

    if (response.data) {
        return parseResponseData(response.data);
    }

    return response;
}

function parseError(error: any): any {
    if (error.response) {
        return parseError(error.response);
    }

    if (error.data) {
        return parseError(error.data);
    }

    if (error.message) {
        return error.message;
    }

    return error;
}

export default (store: any) => (next: any) => (action: any) => {
    const callAPI: CallAPIAction | undefined = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { endpoint } = callAPI;
    const { types, method, data, schema, propsWithRequestAction } = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint.');
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    if (!Methods[method]) {
        throw new Error('Expected method: GET, POST, PUT, DELETE.');
    }

    if (!schema) {
        throw new Error('Specify one of the exported Schemas.')
    }

    const actionWith = (data: object) => {
        const finalAction = { ...action, ...data };
        delete finalAction[CALL_API];

        return finalAction;
    };

    const [requestType, successType, failureType] = types;

    next(actionWith({ type: requestType, ...propsWithRequestAction }));

    return callApi(endpoint, method, schema, data)
        .then((response) => next(actionWith({
            type: successType,
            payload: response
        })))
        .catch(error => next(actionWith({
            type: failureType,
            error: parseError(error)
        })));
};