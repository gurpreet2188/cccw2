function stocksIntra(stockCode, time) {
    let data
    if (localStorage.trendingStockVals) {
        data = JSON.parse(localStorage.trendingStockVals)
    } else {
        let urls = []
        stockCode.map((v) => {
            urls.push(`https://apistocks.p.rapidapi.com/intraday?symbol=${v}&interval=${time}min&maxreturn=100`)
        })
        Promise.all(urls.map((v) => {
            return fetch(v, {
                headers: {
                    'X-RapidAPI-Key': `${process.env.REACT_APP_RGF}`,
                    'X-RapidAPI-Host': 'apistocks.p.rapidapi.com'
                }
            }).then((r) => {
                return r.json()
            }).then((data) => {
                return data
            })
        })).then((val) => {
            data = val
            localStorage.setItem('trendingStockVals', JSON.stringify(val))

        }).catch(console.error.bind(console))
    }
    return data
}

export default stocksIntra