function detail(setData, coinID) {
    const f = async () => {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false`)
        const d = await res.json()
        localStorage.setItem('cryptoDetail' + coinID, JSON.stringify(d))
        setData(d)
    }

    if (localStorage.getItem('cryptoDetail' + coinID)) {
        setData(JSON.parse(localStorage.getItem('cryptoDetail' + coinID)))
    } else {
        f()
    }
    return
}

export default detail