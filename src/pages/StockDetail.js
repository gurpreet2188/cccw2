import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommonDetails from '../components/commonDetails'
import calcXY from '../data/calcXY'
import detail from '../data/stocks/detail'

function StockDetail() {
    const { stockSym } = useParams()
    const [details, setDetail] = useState()
    const [price,setPrice] = useState(0)
    const [change, setChange] = useState(0)
    const [vals, setVals] = useState()
    const [xAxis, setXAxis] = useState()
    const [intra, setIntra] = useState()
    const size = 300
    // console.log(stockSym)
    useEffect(() => {
        let check = true
        if (check) {
            if (stockSym) {
                detail(stockSym, setDetail)
            }
        }

        return () => {
            check = false
        }
    }, [stockSym])

    useEffect(() => {
        let check = true
        if (check) {
            let vals = []
            let pr = 0
            let ch = 0
            if (localStorage.trendingIntra) {

                const d = JSON.parse(localStorage.trendingIntra)
                vals = d.filter(v => v.Metadata.Symbol === stockSym)
            } else if (localStorage.trendingStockVals) {
                const d = JSON.parse(localStorage.trendingIntra)
                vals = d.filter(v => v.Metadata.Symbol === stockSym)
            }
            if (localStorage.stockTrending) {
                const d = JSON.parse(localStorage.stockTrending)
                console.log(d)
                const currentStock = d.items.filter(v => v.info.ticker_symbols[0] === stockSym)
                console.log(currentStock)
                pr = parseFloat(currentStock[0].price?.last?.value)
                ch = parseFloat(currentStock[0].price?.after_hours?.change_percent)
            }
            console.log(vals)
            setIntra(vals)
            setPrice(pr)
            setChange(ch)

        }
        return () => {
            check = false
        }

    }, [localStorage.trendingIntra, localStorage.trendingStockVals, stockSym])

    useEffect(() => {
        let check = true
        if (check) {
            if (intra){
                // let v = []
                // let x = []
                let filteredData = intra[0].Results.slice(-20)
                // let baseNum
                const [v, x] = calcXY(filteredData, 'High', size)
                console.log(v, x)
                setVals(v)
                setXAxis(x)
            }
        }

        return () => {
            check = false
        }
    }, [intra])



    // console.log(intra)

    const commonDetail = () => {
        return (
            <CommonDetails name={details.Name} sym={details.Symbol} summary={details.Description} price={price} change={change} chart={{'xAxis': xAxis, 'vals': vals}} />
        )
    }
    return (
        <div className='p-2'>
            {(xAxis && vals && details) ? commonDetail() : 'Loading...'}
        </div>
    )
}

export default StockDetail