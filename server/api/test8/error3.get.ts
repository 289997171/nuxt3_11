export default defineEventHandler(async(event)=> {

    return {
        code: 1001,
        message: '自定义错误'
    }
})