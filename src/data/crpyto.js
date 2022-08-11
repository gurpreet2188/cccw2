import { useEffect, useState } from "react"

export default function Crpyto(cryptoName) {
    const [currentPrice, SetCurrentPrice] = useState()
    const [historicalData, SetHistoricalData] = useState()
    const [trendingCoins, SetTrendingCoins] = useState()
    //current price
    const vs_currencies = 'usd'
    const currentPriceURL = 'https://api.coingecko.com/api/v3/simple/price?ids=' + cryptoName + '&vs_currencies=' + vs_currencies

    //historical data
    const currentDate = new Date()
    const previousDate = currentDate.setDate(currentDate.getDate() - 1)
    let day = new Date(previousDate).getDate() 
    let month = new Date(previousDate).getMonth() 
    let year = new Date(previousDate).getFullYear()
    console.log(year)

    const historicalDataURL = 'https://api.coingecko.com/api/v3/coins/' + cryptoName + '/history?date=' + day + '-' + month + '-' + year;
    
    //trending coins
    const trendingURL = 'https://api.coingecko.com/api/v3/search/trending'

    //market cap

    useEffect(() => {
        const f1 = async () => {
            const res = await fetch(currentPriceURL)
            const d = await res.json()
            SetCurrentPrice(d)
        }
        f1()
        const f2 = async () => {
            const res = await fetch(historicalDataURL)
            const d = await res.json()
            SetHistoricalData(d)
        }
        f2()
        const f3 = async () => {
            const res = await fetch(trendingURL)
            const d = await res.json()
            SetTrendingCoins(d)
        }
        f3()
    }, [])

    return [currentPrice, historicalData, trendingCoins]
}
