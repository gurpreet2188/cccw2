async function historyRanged (setHistory, history, start, end, coinID, currency) {
   
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart/range?vs_currency=${currency}&from=${start}&to=${end}`)
        const d = await res.json()
        setHistory(history => [...history, d])
        console.log(d, 'test')
        return await d
}

export default historyRanged