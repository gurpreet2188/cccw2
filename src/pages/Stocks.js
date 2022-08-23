import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ListCommon from '../components/ListCommon'
import stocksIntraExtra from '../data/stocksIntraExtra'
import Charts from '../components/charts'

function Stocks() {
  const [data, setData] = useState()
  const [intra, setIntra] = useState()
  const [filtered, setFiltered] = useState([])
  const [stockPage, setStockPage] = useState(0)
  const [vals, setVals] = useState([])
  const [rednerList, setRenderLis] = useState(false)
  const [finalVals, setFinalVals] = useState([])
  const [finalXAxis, setFinalXAxis] = useState([])
  const [xAxis, setXAxis] = useState([])
  const [symbols, setSymbols] = useState()
  const [header, setHeader] = useState([])
  const [primaryList, setPrimaryList] = useState()
  const [primaryListEntries, setPrimaryListEntries] = useState([])
  const [detailURL, setDetailURL] = useState()
  const currentURL = useLocation()
  const size = 35
  useEffect(() => {
    let check = true
    if (check) {
      // console.log('check')
      if (localStorage.stockTrending) {
        setData(JSON.parse(localStorage.stockTrending))
      }
    }

    return () => {
      check = false
    }
  }, [])

  const roundNum = (num) => {
    return +(Math.round(num + 'e+2') + 'e-2')
  }

  useEffect(() => {
    let check = true
    if (check) {
      if (filtered.length > 0) {
        setHeader(['Name', 'Ticker', 'Value', 'Change', 'Change %', 'Previous Close', 'Tracking'])
        setPrimaryList(filtered[stockPage])
        // filtered[stockPage].map((v, i) => {
        //   setPrimaryList(primaryList => [...primaryList, v])
        // })
        setPrimaryListEntries([(v) => v?.info?.title,
        (v) => v?.info?.ticker,
        (v, i) => roundNum(v?.price?.last?.value),
        (v, i) => roundNum(v?.price?.last?.today_change),
        (v, i) => roundNum(v?.price?.last?.today_change_percent) + '%',
        (v, i) => roundNum(v?.price?.previous_close)])
      }
    }

    return () => {
      check = false
    }
  }, [filtered, stockPage])

  useEffect(() => {
    let check = true
    if (check) {
      if (currentURL.pathname) {
        setStockPage(parseInt(currentURL.pathname[currentURL.pathname.length - 1]) - 1)
      }
    }

    return () => {
      check = false
    }
  }, [filtered, currentURL.pathname])

  console.log(stockPage, 'page')

  useEffect(() => {
    let t = []
    let check = true
    if (check) {
      if (filtered.length === 0) {
        for (let i = 0; i < data?.items.length; i += 10) {
          const c = data?.items.slice(i, i + 10)
          t.push(c)
        }
        setFiltered(t)
        // console.log('test vals')
      }
    }
    return () => {
      check = false
    }
  }, [data])

  useEffect(() => {
    let check = true
    if (check) {
      if (primaryList) {
        // const temp = tredning.items.slice(0, 7)
        // console.log(temp[0].info.ticker_symbols[0])
        let s = []
        primaryList.map((v) => {
          s = [...s, v.info.ticker_symbols[0]]
        })
        setSymbols(s)
      }
    }


    return () => {
      check = false
    }

  }, [primaryList])

  useEffect(() => {
    let check = true
    if (check) {
      if (symbols) {
        stocksIntraExtra(symbols, '30', setIntra)
      }
    }


    return () => {
      check = false
    }
  }, [symbols])

  useEffect(() => {
    let check = true
    if (check) {
      if (intra instanceof Array) {
        let vl = []
        let x = []
        // console.log(intra, 'test')
        let t = []

        const reorder = (a, b, i, stop) => {
          console.log(a[i].info.ticker_symbols[0], b[i].Metadata.Symbol, 'reorder')
          if (i === stop) {
            return
          }
          for (let x = 0; x < a.length; x++) {
            if (a[x].info.ticker_symbols[0] === b[i].Metadata.Symbol) {
              t.push(b[i])
              console.log(b[i])
            }
          }
          // if (a[i].info.ticker_symbols[0] === b[i].Metadata.Symbol) {
          //   // return reorder(a, b, i + 1, stop)
          // }

          return reorder(a, b, i + 1, stop)

        }

        reorder(primaryList, intra, 0, (primaryList.length - 1))
        console.log(t, 'reorder')
        t.map((v) => {
          // console.log(v.Results, 'test')
          //get unix date
          // const lastUnixDate = Date.parse(v?.Results[v?.Results?.length - 1].Date.split(' ')[0])
          //filter through 
          // let filteredData = v?.Results.filter(f => Date.parse(f?.Date.split(' ')[0]) === lastUnixDate)
          // if (filteredData.length < 3) {
          const filteredData = v?.Results.slice(-20)
          // }
          console.log(filteredData, 'test')
          //set short listed
          // setShortList(filteredData)
          // baseNum
          const baseNum = size / filteredData.length
          // console.log(baseNum, 'test')
          //set vals
          // console.log('test')
          // if (vals.length === 0) {
          // let vl = []
          // let x = []
          filteredData.map((fv, fi) => {
            vl = [...vl, parseFloat(fv?.High)]
            x = [...x, (baseNum * fi)]
            // setVals(vals => [...vals, parseFloat(fv?.High)])
            // setXAxis(xAxis => [...xAxis, (baseNum * fi)])
          })
          // 

          // console.log(x, )

          // }
        })
        setVals(vl)
        setXAxis(x)
      }

    }

    return () => {
      check = false
    }

  }, [intra])
  // 
  console.log(finalXAxis, 'xaxis')


  // useEffect(() => {
  //   // if (Array.isArray(xAxis)) {
  //     if (xAxis instanceof Array) {
  //       setRenderLis(true)

  //     }
  //   // }
  // }, [xAxis, vals])

  useEffect(() => {
    let check = true
    if (check) {
      if (vals && xAxis) {
        let fv = []
        let fx = []
        let uN = []
        for (let i = 0; i < vals.length; i += 10) {
          const c = vals.slice(i, i + 10)
          fv.push(c)
        }
        for (let i = 0; i < xAxis.length; i += 10) {
          const c = xAxis.slice(i, i + 10)
          fx.push(c)
        }
        setFinalVals(fv)
        setFinalXAxis(fx)
        // console.log('test vals')
        setDetailURL(() => (v) => '/stocks-detail/' + v?.info?.ticker_symbols[0] )
      }
    }
    return () => {
      check = false
    }
  }, [vals, xAxis])

  // console.log(detailURL ? detailURL(primaryList[0]) : '', 'Link')


  const listCommon = () => {
    return (
      <ListCommon HeaderData={header} PrimaryListData={primaryList} PrimaryListDataEntries={primaryListEntries} charts={{ 'xAxis': finalXAxis, 'vals': finalVals }} urlType={detailURL} />
    )
  }


  return (
    <div className='flex flex-col items-center space-y-4 p-2'>
      <div className='w-[100%] border border-black/10 rounded-md'>
        {(xAxis && finalVals) ? listCommon() : 'Loading...'}
      </div>
      <div className='flex flex-row space-x-4 items-center'>
        {filtered.length > 0 ? filtered.map((v, i) => {
          return (
            <Link to={`/stocks/${i + 1}`} onClick={() => {
              setStockPage(i)

            }} key={i}>{i + 1}</Link>
          )
        }) : ''}
      </div>
    </div>
  )
}

export default Stocks