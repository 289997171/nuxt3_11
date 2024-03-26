const maxSize = 100

export const useCasinoHistories = () => {
    const casinoHistoriesState = useState<any[]>('casinoHistories',()=> {
        // 这种写法有bug,当服务器先执行useCasinoHistories()那么一下函数将永远无法执行!
        // if (process.client) {
        //     console.log('casinoHistories addEventListener...')
        //     window.addEventListener('beforeunload', ()=> {
        //         localStorage.setItem('casinoHistories', JSON.stringify(casinoHistoriesState.value))
        //     })
        //     const _histories = JSON.parse(localStorage.getItem('casinoHistories'))
        //     return _histories ? _histories:[]
        // }
        return []
    })

    // 正确写法
    if (process.client) {
        callOnce('casinoHistories', ()=> {
            console.log('casinoHistories addEventListener...')
            window.addEventListener('beforeunload', ()=> {
                localStorage.setItem('casinoHistories', JSON.stringify(casinoHistoriesState.value))
            })
            const _histories = JSON.parse(localStorage.getItem('casinoHistories'))
            return _histories ? _histories:[]
        })
    }

    const addCasinoHistory = (gameInfo: any) => {
        if (process.server || !gameInfo) return
        // 判断最后一条是否相同,则直接return
        if (casinoHistoriesState.value[0]?._id === gameInfo._id) return
        // 1.casinoHistories删除以前的gameInfo 根据 gameId  去重
        const idx = casinoHistoriesState.value.findIndex(item => item._id === gameInfo._id)
        if (idx > -1) casinoHistoriesState.value.splice(idx, 1)
        // 添加到第一位,FIFO
        casinoHistoriesState.value.unshift(gameInfo)

        // 如果超过多少条'maxSize',删除前面的N条 FIFO
        if (casinoHistoriesState.value.length > maxSize) {
            casinoHistoriesState.value.splice(maxSize - 1, 1)
        }
    }

    return {casinoHistoriesState, addCasinoHistory}
}