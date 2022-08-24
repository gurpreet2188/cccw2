import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Charts from './charts'

function CommonDetails({ price, change, name, misc1, misc2, sym, summary, country, chart = {} }) {
  // const spanRef = useRef < HTMLSpanElement > (null)
  //   useEffect(() => {
  //     let check = true
  //     if (check) {
  //         if (spanRef.current) {
  //             spanRef.current.innerHTML = summary
  //         }
  //     }

  //     return () => {
  //         check = false
  //     }
  // }, [spanRef.current, summary])

  //style={{backgroundImage : misc2 ? `linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url(${misc2})` : ''
  return (
    <div className='flex flex-col md space-y-6'>
      <span className='hidden justify-start self-start text-[1.5rem] font-light text-[0.8rem] text-center m-auto'></span>
      <div className='flex flex-col md:flex-row space-y-6 md:space-x-[30%] md:items-center md:justify-center md:border md:border-black/10'>
      <div className='flex flex-col  items-center space-x-4  p-2 border border-black/5 '>
        <div className='flex flex-col md:space-y-8 justify-between content-center items-center self-start'>
          <div className='flex felx-row space-x-2 items-center'>
            <img className={`w-[1rem] h-[1rem] ${misc2 ? '' : 'hidden'}`}  src={misc2} />
            <h2 className='justify-start self-start text-[1.5rem] font-light'>{name}</h2>
          </div>
          <h2 style={{ display: misc1 ? '' : 'none' }} className=' justify-start self-start text-center text-[0.8rem]'>{misc1}</h2>
        </div>
        <div className='flex flex-row md:flex-col md:space-y-6 items-center self-start'>
          <h1 className='text-[3rem] tracking-wider md:text-left font-light '>${price}</h1>
          <p className='tracking-wider md:text-left md:self-start' style={{ color: parseFloat(change) > 0 ? '#00cc00' : '#ff6666' }}><span> <FontAwesomeIcon icon={parseFloat(change) > 0 ? faAngleUp : faAngleDown} /> </span> {parseFloat(change)}%</p>
        </div>
      </div>
      <div className=''>
        <Charts h={300} w={300} vals={chart.vals} xAxis={chart.xAxis} yMax={0.05} yMin={0.05} />
      </div>
      </div>
      <div className='flex flex-col space-y-6'>
        <p style={{ display: country ? '' : 'none' }}>Country: {country}</p>
        <p>Symbol: {sym}</p>
        {/* <span ref={{}} /> */}
        <p>Description: {summary} </p>
      </div>
    </div>
  )
}

export default CommonDetails