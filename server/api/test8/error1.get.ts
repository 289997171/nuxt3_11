export default defineEventHandler(async(event)=> {

    throw createError({
        status: 400,
        message: '测试错误'
    })
})