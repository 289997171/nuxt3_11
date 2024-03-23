let counter = 0
export default defineEventHandler(async(event)=> {
    console.log('req clear')
    const {waitFor, res} = getQuery(event)
    if (waitFor) {
        await new Promise(resolve => {
            setTimeout(resolve, Number(waitFor))
        })
    }
    return {
        res
    }
})