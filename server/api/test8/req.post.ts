import {readBody} from "h3";

export default defineEventHandler(async (event)=> {
    const headers = getHeaders(event);
    const query = getQuery(event);
    const routerParams = getRouterParams(event, {decode: true});
    const body = await readBody(event)
    return {
        headers,
        query,
        routerParams,
        body
    }
})