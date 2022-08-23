async function listAll(setData, pageNum, signal) {
    if (localStorage.getItem('cryptoAll' + pageNum)) {
        console.log('crypto con')
        setData(JSON.parse(localStorage.getItem('cryptoAll' + pageNum)))
        return
    }

    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageNum}&sparkline=false`, {signal})
    const d = await res.json()
    console.log(d)
    setData(d)
    localStorage.setItem('cryptoAll' + pageNum, JSON.stringify(d))
    return

}

export default listAll