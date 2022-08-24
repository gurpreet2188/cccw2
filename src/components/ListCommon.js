import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Charts from './charts'

function ListCommon({ HeaderData = [], PrimaryListData = [], PrimaryListDataEntries = [], charts = {}, urlType }) {
  const [flexBasis, setFlexBasis] = useState(0)
  const [color, setColor] = useState('#000000')
  console.log(PrimaryListDataEntries.length)
  useEffect(() => {
    let check = true
    if (check) {
      if (HeaderData.length > 0) {
        setFlexBasis(14.01)
      }
    }
    return () => {
      check = false
    }
  }, [HeaderData])

  console.log(flexBasis, 'test')

  const chartsLines = (mI) => {
      return (
      <div className={`basis-[${Math.ceil(flexBasis)}%]`}>
        <Charts xAxis={charts?.xAxis} vals={charts?.vals[mI]} yMax={0.05} yMin={0.05} w={30} h={35} type='compact' />
      </div>

    )
  }

  return (
    <div className='p-2 overflow-x-scroll w-[100%]  lg:overflow-hidden'>
      <div className='flex flex-col min-w-[450%] lg:min-w-[100%] rounded-md overflow-x-scroll space-y-6 lg:overflow-hidden'>
        <div className={`flex flex-row space-x-4 w-[100%]  flex-shrink-0 flex-grow-0 items-center bg-slate-50`}>
          {HeaderData.map((v,i)=>{
            return (
              <div key={i} className={`p-2  basis-[${Math.ceil(flexBasis)}%] text-center min-w-[${Math.ceil(flexBasis)}%]`}>{v}</div>
            )
          })}
        </div>
       {PrimaryListData.map((mV,mI)=>{

        return (
         <>
            <Link key={mI} to={urlType ? urlType(mV): '/'} className={`flex flex-row space-x-4 w-[100%] flex-shrink-0 flex-grow-0 items-center  bg-slate-50`}>
                {PrimaryListDataEntries.map((v, i) => {
                
                  // {console.log(v)}
                  if( i === 0) {
                    return (
                      <p key={i} className={`p-2  basis-[${Math.ceil(flexBasis)}%] text-center overflow-hidden text-ellipsis whitespace-nowrap`}>{v(mV, i)}</p>
  
                    )
                  }else {
                    return (
                      <p key={i} style={{color: parseFloat(v(mV, i)) ? parseFloat(v(mV, i)) > 0 ? '#000000' : '#ff6666' : '#000000'}} className={`p-2  basis-[${Math.ceil(flexBasis)}%] text-center`}>{parseFloat(v(mV, i)) ? parseFloat(v(mV, i)) : v(mV, i)}</p>
                    )
                  }
                })}
              {charts?.xAxis ? chartsLines(mI): ''}
            </Link>
         </>
        )
       })}
      </div>
    </div>
  )
}

export default ListCommon