export default defineNitroPlugin((nitro)=> {
    nitro.hooks.hook('request', event => {
        console.log('request');
        (event as any).begin = Date.now()
    })

    nitro.hooks.hook('beforeResponse', (event, {body}) => {
        console.log('beforeResponse cost', Date.now() - (event as any).begin)
        // console.log('body', body)
    })

    nitro.hooks.hook('afterResponse', (event, {body}) => {
        console.log('afterResponse cost', Date.now() - (event as any).begin)
        // console.log('body', body)
        delete (event as any).begin
    })
})