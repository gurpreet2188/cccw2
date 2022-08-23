async function historyRanged (setHistory, start, end, coinID, currency) {
   
        const f = async () => {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart/range?vs_currency=${currency}&from=${start}&to=${end}`)
                const d = await res.json()
                localStorage.setItem('cryptoHistory' + coinID, JSON.stringify(d))
                setHistory(d)
            }
        
            if (localStorage.getItem('cryptoHistory' + coinID)) {
                setHistory(JSON.parse(localStorage.getItem('cryptoHistory' + coinID)))
            } else {
                f()
            }
            return
}

export default historyRanged

//https://api.coingecko.com/api/v3/coins/${coinID}/market_chart/range?vs_currency=${currency}&from=${start}&to=${end}