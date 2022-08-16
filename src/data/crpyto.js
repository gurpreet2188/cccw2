import { useEffect, useState } from "react"

export default function Crpyto(cryptoName) {
    const [coinData, SetCoinData] = useState()
    //const [historicalData, SetHistoricalData] = useState()
    const [trendingCoins, SetTrendingCoins] = useState()
    const [marketCapData, SetMarketCapData] = useState()
    //current price
    const vs_currencies = 'usd'
    //const currentPriceURL = 'https://api.coingecko.com/api/v3/simple/price?ids=' + crytpoName + '&vs_currencies=' + vs_currencies
    const coinDataURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=' + vs_currencies + '&ids=' + cryptoName + '&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    //historical data
    //const currentDate = new Date()
    //const previousDate = new Date(new Date().setDate(new Date().getDate() - 1))
    //let day = new Date(previousDate).getDate() 
    //let month = new Date(previousDate).getMonth() + 1
    //let year = new Date(previousDate).getFullYear()
    //console.log(day, month, year)

  

    //const historicalDataURL = 'https://api.coingecko.com/api/v3/coins/' + cryptoName + '/history?date=' + day.toString() + '-' + month.toString() + '-' + year.toString();
    
    //trending coins
    const trendingURL = 'https://api.coingecko.com/api/v3/search/trending'

    //market cap
    const marketCapURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

    useEffect(() => {
        const f1 = async () => {
            const res = await fetch(coinDataURL)
            const d = await res.json()
            SetCoinData(d)
        }
        f1()
        const f2 = async () => {
            const res = await fetch(trendingURL)
            const d = await res.json()
            SetTrendingCoins(d)
        }
        f2()
        const f3 = async () => {
            const res = await fetch(marketCapURL)
            const d = await res.json()
            SetMarketCapData(d)
        }
        f3()
    }, [])

    return [coinData, trendingCoins, marketCapData]
}
