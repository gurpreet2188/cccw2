import { useEffect, useState } from "react"

export default function stocks(stockCode) {
    const [data, SetData] = useState()

    useEffect(() => {
        const f = async () => {
            const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockCode}&interval=5min&apikey=JHCGXCD0QXPF0BEV`)
            const d = await res.json()
            SetData(d)
        }
        f()
    }, [])

    return data
}
