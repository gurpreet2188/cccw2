import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ListCommon from '../components/ListCommon'

function Stocks() {
  const [data, setData] = useState()
  const [filtered, setFiltered] = useState([])
  const [stockPage, setStockPage] = useState(0)
  const [rendertrigger, setRenderTrigger] = useState(false)
  const [header, setHeader] = useState([])
  const [primaryList, setPrimaryList] = useState([])
  const [primaryListEntries, setPrimaryListEntries] = useState([])
  const currentURL = useLocation()
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
        setHeader(['Name', 'Value', 'Change'])
        setPrimaryList(filtered[stockPage])
        // filtered[stockPage].map((v, i) => {
        //   setPrimaryList(primaryList => [...primaryList, v])
        // })
        setPrimaryListEntries([(v) => v?.info?.title, (v) => roundNum(v?.price?.last?.value), (v) => roundNum(v?.price?.last?.today_change)])
      }
    }

    return () => {
      check = false
    }
  }, [filtered, stockPage])

  useEffect(()=>{
    let check = true
    if (check) {
        if(currentURL.pathname) {
          setStockPage(parseInt(currentURL.pathname[currentURL.pathname.length - 1]) -1)
        }
    }

    return ()=>{
      check = false
    }
  },[filtered, currentURL.pathname])

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
  }, [data, rendertrigger])

  console.log(filtered)




  return (
    <div className='flex flex-col items-center space-y-4 p-2'>
      <div className='w-[100%] border border-black/10 rounded-md'>

        <ListCommon HeaderData={header} PrimaryListData={primaryList} PrimaryListDataEntries={primaryListEntries} />
      </div>
      <div className='flex flex-row space-x-4 items-center'>
      {filtered.length > 0 ? filtered.map((v, i) => {
          return (
            <Link to={`/stocks/${i+1}`} onClick={()=>{
              setStockPage(i)

            }} key={i}>{i+1}</Link>
          )
        }) : ''}
      </div>
    </div>
  )
}

export default Stocks