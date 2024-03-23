let counter = 0
export default defineEventHandler(async(event)=> {
    console.log('req counter')
    return {
        counter: counter++
    }
})