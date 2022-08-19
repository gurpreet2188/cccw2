import React, { useEffect, useState } from 'react'

function StocksTredning() {
    const [tredning, setTrending] = useState()
    useEffect(() => {
    const f = async () => {
      const res = await fetch('https://google-finance4.p.rapidapi.com/market-trends/?t=most-active&hl=en&gl=sg' , {
        headers:{
          'X-RapidAPI-Key': `${process.env.REACT_APP_RGF}`,
  	      'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
        }
      })

      const d = await res.json()
      localStorage.setItem('stockTredning', JSON.stringify(d))
      setTrending(d)
      console.log(d)
    }
    if (localStorage.stockTredning) {
        setTrending(JSON.parse(localStorage.stockTredning))
    }else {
        f()
    }
    // f()
  }, [])
  console.log(tredning?.items[0])
  return (
    <div className='flex flex-col p-2 overflow-x-scroll'>
        <h2>Stocks - Tredning</h2>
        <div className=''>
            <table>
                <thead className='text-center'>
                    <th scope='col' className='p-4'>
                        <tr>
                            Name
                        </tr>
                    </th>
                    <th scope='col' className='p-4'>
                        <tr>
                            Current Value
                        </tr>
                    </th>
                    <th scope='col' className='p-4'>
                        <tr>
                            Chart
                        </tr>
                    </th>
                </thead>
                <tbody className=''>
                {tredning ? tredning?.items.slice(0,10).map((v,i)=>{
                        return (
                            <tr key={i} className="text-[13px] border-b-[0.5px] w-[10px] p-8" >
                                <td className='text-left p-4'>
                                {v.info.title}
                                </td>
                                <td className='text-center'>
                                {v.price.last.value}
                                </td>
                            </tr>
                        )
                    }): 'Loading'}
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default StocksTredning