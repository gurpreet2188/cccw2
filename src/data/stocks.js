import { useEffect, useState } from "react"
import Papa from "papaparse"

export default function stocks(stockCode) {
    const [data, SetData] = useState()
    const [histData, setHisData] = useState()

    useEffect(() => {
        //https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=demo
        //https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockCode}&interval=5min&apikey=JHCGXCD0QXPF0BEV
        const f = async () => {
            const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockCode}&interval=5min&apikey=JHCGXCD0QXPF0BEV`)
            const d = await res.json()
            SetData(d)
        }
        f()

        const stocksCSV = async () => {
            // const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=demo`)
            Papa.parse('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=IBM&interval=15min&slice=year1month1&apikey=demo', {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: (r)=> {
                    // setHisData(r.data)
                    console.log(r.data)
                }
            })

        }
        stocksCSV()
    }, [])

    return [data, histData]
}
