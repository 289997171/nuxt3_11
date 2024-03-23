let counter = 0
export default defineEventHandler(async(event)=> {
    console.log('req counter2')
    const {waitFor} = getQuery(event)
    if (waitFor) {
        await new Promise(resolve => {
            setTimeout(resolve, Number(waitFor))
        })
    }
    return {
        counter: counter++
    }
})