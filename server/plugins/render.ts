export default defineNitroPlugin((nitro)=> {
    nitro.hooks.hook('render:island', (islandResponse, { event, islandContext }) => {
        console.log('render:island')
    })

    nitro.hooks.hook('render:html', (html, { event }) => {
        console.log('render:html')
    })

    nitro.hooks.hook('render:response', (response, { event }) => {
        console.log('render:response')
    })
})