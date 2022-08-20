import { useEffect, useState } from "react"

export default function Crpyto(cryptoName) {
    const [data, SetData] = useState()
    //current price
    let vs_currencies = 'usd'
    let currentPriceURL = 'https://api.coingecko.com/api/v3/simple/price?ids=' + cryptoName + '&vs_currencies=' + vs_currencies

    //historical data
    let day = 30
    let month = 12
    let year = 2017
    let historicalDataURL = 'https://api.coingecko.com/api/v3/coins/bitcoin/history?date=' + day.toString() + '-' + month.toString() + '-' + year.toString();

    useEffect(() => {
        const f = async () => {
            const res = await fetch(currentPriceURL)
            const d = await res.json()
            SetData(d)
        }
        f()
    }, [])

    return data
}
