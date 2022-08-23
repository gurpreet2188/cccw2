import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Charts from './charts'

function ListCommon({ HeaderData = [], PrimaryListData = [], PrimaryListDataEntries = [], charts = {}, urlType }) {
  const [flexBasis, setFlexBasis] = useState(0)
  console.log(PrimaryListDataEntries.length)
  useEffect(() => {
    let check = true
    if (check) {
      if (HeaderData.length > 0) {
        setFlexBasis(100 / HeaderData.length)
      }
    }
    return () => {
      check = false
    }
  }, [HeaderData])

  console.log(charts, 'test')

  const chartsLines = (mI) => {
    console.log(charts?.xAxis[mI])
    return (
      <div className='basis-[15%] ml-auto'>
        <Charts xAxis={charts?.xAxis[mI]} vals={charts?.vals[mI]} yMax={0.05} yMin={0.05} w={30} h={35} type='compact' />
      </div>

    )
  }

  return (
    <div className='p-2'>
      <div className='w-[100%] rounded-md overflow-auto'>
        <ul className='flex flex-col space-y-4 w-fit overflow-scroll'>
          <li className='flex flex-row items-center bg-slate-100 p-2 h-[4rem] w-[100%]'>
            {HeaderData.map((v, i) => {
              return (
                <div key={i} style={{
                  flexBasis: flexBasis + '%', padding: '4px', textAlign: i !== 0 ? 'right' : 'left',
                  whiteSpace: i === 0 ? 'nowrap' : '', textOverflow: i === 0 ? 'ellipsis' : '', overFlow: i === 0 ? 'hidden' : ''
                }} >{v}</div>
              )
            })}
          </li>
          <div>

            <div className='flex flex-col space-y-2 w-[100%]'>
              {PrimaryListData.map((mV, mI) => {
                // console.log(urlType ? urlType(mV): '', 'Link')
                return (
                    <Link key={mI} to={urlType ? urlType(mV): '/'}>
                    <li  className='flex flex-row items-center space-y-4 h-fit bg-slate-50 p-4 w-[100%] '>
                   
                    {/* <div> */}
                    {PrimaryListDataEntries.map((v, i) => {
                      // {console.log(v)}
                      return (
                        <p key={i} style={{
                          flexBasis: flexBasis + '%', padding: '4px', textAlign: i !== 0 ? 'right' : 'left',
                          whiteSpace: i === 0 ? 'nowrap' : '', textOverflow: i === 0 ? 'ellipsis' : '', overFlow: i === 0 ? 'hidden' : ''
                        }} className='overflow-hidden'>{v(mV, i)}</p>

                      )
                    })}
                    {charts?.xAxis ? chartsLines(mI): ''}
                    {/* </div> */}
                  </li>
                    </Link>
                )
              })}
            </div>
          </div>
        </ul>

      </div>
    </div>
  )
}

export default ListCommon