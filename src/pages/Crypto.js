import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ListCommon from '../components/ListCommon'
import listAll from '../data/crypto/listAll'

function Crypto() {
  const [data, setData] = useState()
  const [header, setHeader] = useState()
  const [pageNum, setPageNum] = useState(1)
  const [detailURL, setDetailURL] = useState()
  const [primaryList, setPrimaryList] = useState()
  const [primaryListEntries, setPrimaryListEntries] = useState()
  const currentURL = useLocation()

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    listAll(setData, pageNum, signal)
    return () => {
      controller.abort()
    }
  }, [pageNum])

  // useEffect(()=>{
  //   let check = true
  //   if (check) {

  //   }

  //   return()=>{
  //     check = false
  //   }
  // },[data])

  useEffect(()=>{
    let check = true
    if (check) {
      if (currentURL.pathname) {
        setPageNum(parseInt(currentURL.pathname[currentURL.pathname.length - 1]))
      }
    }

    return()=>{
      check = false
    }
  },[currentURL.pathname])

  useEffect(() => {
    let check = true
    if (check) {
      if (data) {
        setDetailURL(()=> (v)=> '/crypto-detail/'+ v?.id)
        setHeader(['Name', 'Symbol', 'Price', 'Change(24h)', 'Change_%(24h)', 'High(24h)', 'Market Cap', 'Rank(Market Cap)',])
        setPrimaryListEntries([
          (v,i) => v?.name,
          (v,i) => v?.symbol,
          (v,i) => v?.current_price,
          (v,i) => v?.price_change_24h,
          (v,i) => v?.price_change_percentage_24h,
          (v,i) => v?.high_24h,
          (v,i) => v?.market_cap,
          (v,i) => v?.market_cap_rank,
        ])
        setPrimaryList(data)

      }
    }

    return () => {
      check = false
    }
  }, [data])

  console.log(primaryList ? primaryList.length : '')

  const listCommon = () => {
    // primaryList.map(v => {
    //   primaryListEntries.map(vv =>{
    //     console.log(vv(v))
    //   })
    // })
    // header.map(v => console.log(v))
    return (<ListCommon HeaderData={header} PrimaryListData={primaryList} PrimaryListDataEntries={primaryListEntries} urlType={detailURL}/>)
  }

  return (
    <div className='flex flex-col items-center space-y-4 p-2'>
      <h1  className='self-start text-[28px] tracking-wider font-light'>More News</h1>
      <div className='w-[100%] border border-black/10 rounded-md'>
        {
          (primaryList && primaryListEntries && header) ? listCommon() : 'Loading...'
        }
      </div>
      <div className='flex flex-row space-x-4 items-center'>
        {primaryList ? primaryList.map((v, i) => {
          return (
            <Link to={`/crypto/${i + 1}`} onClick={() => {
              setPageNum(i+1)

            }} key={i}>{i + 1}</Link>
          )
        }) : ''}
      </div>
    </div>
  )
}

export default Crypto