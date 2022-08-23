function stocksIntraExtra(stockCode, time, setData) {
    console.log(stockCode)
    // let data
    if (localStorage.trendingIntra) {
        setData(JSON.parse(localStorage.trendingIntra))
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
            setData(val)
            localStorage.setItem('trendingIntra', JSON.stringify(val))

        }).catch(console.error.bind(console))
    }
    return
}

export default stocksIntraExtra