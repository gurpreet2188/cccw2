function stocksTrending(setTrending) {
    const f = async () => {
        const res = await fetch('https://google-finance4.p.rapidapi.com/market-trends/?t=most-active&hl=en&gl=us', {
            headers: {
                'X-RapidAPI-Key': `${process.env.REACT_APP_RGF}`,
                'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
            }
        })

        const d = await res.json()
        localStorage.setItem('stockTredning', JSON.stringify(d))
        setTrending(d)
        // console.log(d)
    }
    if (localStorage.stockTredning) {
        setTrending(JSON.parse(localStorage.stockTredning))
    } else {
        f()
    }
    return
}

export default stocksTrending