import React, { useEffect, useState } from 'react'

function ListCommon({ HeaderData = [], PrimaryListData = [], PrimaryListDataEntries = [] }) {
  const [flexBasis, setFlexBasis] = useState(0)
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

  // console.log(flexBasis)



  return (
    <div className='p-2'>
      <div className='w-[100%] border border-black/10 rounded-md'>
        <ul className='flex flex-col space-y-4 w-[100%]'>
          <li className='flex flex-row items-center bg-slate-100 p-2 h-[4rem] w-[100%]'>
            {HeaderData.length > 0 ? HeaderData.map((v, i) => {
              return (
                <div key={i} style={{ flexBasis: flexBasis + '%', padding: '4px', textAlign: i !== 0 ? 'right' : 'left' }}>{v}</div>
              )
            }) : 'Loadind..'}
          </li>
          <div>

            <div className='flex flex-col space-y-2'>
              {PrimaryListData.length > 0 ? PrimaryListData.map((mV, mI) => {
                return (
                  <li key={mI} className='flex flex-row items-center space-y-4 h-[6rem] bg-slate-50 p-4'>
                    {/* <div> */}
                    {PrimaryListDataEntries.length > 0 ? PrimaryListDataEntries.map((v, i) => {
                      // {console.log(v)}
                      return (
                        <p key={i} style={{ flexBasis: flexBasis + '%', padding: '4px', textAlign: i !== 0 ? 'right' : 'left' }}>{v(mV)}</p>
                      )
                    }) : 'Loading....'}
                    {/* </div> */}
                  </li>
                )
              }) : 'Loading...'}
            </div>
          </div>
        </ul>

      </div>
    </div>
  )
}

export default ListCommon