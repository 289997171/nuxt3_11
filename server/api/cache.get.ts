let counter = 0
export default defineCachedEventHandler(async(event)=> {
    console.log('req cache')
    return {
        counter: counter++
    }
}, {
    // getKey: event => {
    //     return 'key的生成规则';
    // }
    maxAge: 60 * 60
})