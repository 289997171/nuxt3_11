import type {FetchContext, FetchResponse} from "ofetch";

export const $myFetch = $fetch.create({
    // baseURL?: string;
    // body?: RequestInit["body"] | Record<string, any>;
    // ignoreResponseError?: boolean;
    // params?: Record<string, any>;
    // query?: Record<string, any>;
    // parseResponse?: (responseText: string) => any;
    // responseType?: R;
    // /**
    //  * @experimental Set to "half" to enable duplex streaming.
    //  * Will be automatically set to "half" when using a ReadableStream as body.
    //  * https://fetch.spec.whatwg.org/#enumdef-requestduplex
    //  */
    // duplex?: "half" | undefined;
    // /** timeout in milliseconds */
    // timeout?: number;
    // retry?: number | false;
    // /** Delay between retries in milliseconds. */
    // retryDelay?: number;
    // /** Default is [408, 409, 425, 429, 500, 502, 503, 504] */
    // retryStatusCodes?: number[];
    // onRequest?(context: FetchContext): Promise<void> | void;
    // onRequestError?(context: FetchContext & {
    //     error: Error;
    // }): Promise<void> | void;
    // onResponse?(context: FetchContext & {
    //     response: FetchResponse<R>;
    // }): Promise<void> | void;
    // onResponseError?(context: FetchContext & {
    //     response: FetchResponse<R>;
    // }): Promise<void> | void;

    onRequest(context: FetchContext): Promise<void> | void {
        console.log('开始请求', JSON.stringify(context));

        // TODO 添加通用header
        if (context.options.headers) (context.options.headers as any).token1111 = 'token1111'
        else context.options.headers = {'token1111': 'token1111'}
    },

    onRequestError(context: FetchContext & { error: Error }): Promise<void> | void {
        console.error('请求错误', JSON.stringify(context))
        if (process.server) {
            // 服务器端通用处理
        } else {
            // 客户端通用处理
        }
    },

    onResponse(context: FetchContext & { response: FetchResponse<ResponseType> }): Promise<void> | void {
        console.log('接收到响应', JSON.stringify(context))
        if (process.client && context.response.status == 200 && context.response._data.code) {
            alert(`自定义错误 - ${context.response._data.message}`)
        }
    },

    onResponseError(context: FetchContext & { response: FetchResponse<ResponseType> }): Promise<void> | void {
        console.log('接收到响应错误', JSON.stringify(context))
        if (process.server) {
            // 服务器端通用处理
        } else {
            // 客户端通用处理
            //showError({status: context.response.status, statusMessage: context.response.statusText})
            // if (context.response.status >= 500) {
            //     // TODO 因为500错误会retry,需要考虑多次提示的情况
            // } else
                alert(`错误${context.response._data.message}`)
        }
    }
})