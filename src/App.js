import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/header'
import News from './components/news';

function App() {
  const timeSeries = '30'
  const stocks = Stocks({ dataType: 'data', stockCode: 'NVDA', time: timeSeries })
  const [data, setData] = useState()
  const [timeDates, setTimeDates] = useState()
  const [fixedDate, setFixedDate] = useState([])
  const [stockVal, setStockVal] = useState([])
  // const xAxis = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200]
  const [xAxis, setXAxis] = useState([])

  useEffect(() => {
    if (stocks) {
      // console.log(Object.keys(stocks['Time Series (60min)']))
      setTimeDates(Object.keys(stocks[`Time Series (${timeSeries}min)`]))
    }
  }, [stocks])


  useEffect(() => {
    if (stocks && timeDates) {
      const reorderTimedates = timeDates.reverse()
      const lastDateUnix = Date.parse(reorderTimedates[reorderTimedates.length - 1].split(' ')[0])
      const filterTimeDates = reorderTimedates.filter(v => Date.parse(v.split(' ')[0]) === lastDateUnix)
      const baseNum = 200 / filterTimeDates.length
      // console.log(baseNum, reorderTimedates, 'date')
      if (stockVal.length === 0) {
        filterTimeDates.map((v, i) => {
          setStockVal(stockVal => [...stockVal, parseFloat(stocks[`Time Series (${timeSeries}min)`][v]['2. high'])])
          setXAxis(xAxis => [...xAxis, (baseNum * i)])
        })
      }

    }

    // setStockVal(temp)
  }, [timeDates, stocks])
  // console.log(stockVal, 'stockval')
  // useEffect(() => {
  //   const f = async () => {
  //     const res = await fetch('https://google-finance4.p.rapidapi.com/market-trends/?t=most-active&hl=en&gl=SG' , {
  //       headers:{
  //         'X-RapidAPI-Key': 'f12a5d921emshbac7e919797abd5p1b88ecjsn6a241dfe72bb',
  // 	      'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
  //       }
  //     })

  //     const d = res.json()
  //     console.log(d)
  //   }
  //   f()
  // }, [])


  return (
    <div className="flex flex-col space-y-10 justify-center content-center">
      <Header/>
      <News/>
      {/* <Charts xAxis={xAxis} vals={stockVal ? stockVal : ''} yMax={0.1} yMin={0.1} /> */}
    </div>
  );
}

export default App;
