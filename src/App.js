import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Header from './components/header'
import News from './components/news';
import Stocks from './data/stocks';
import StockPage from './components/stockPage';
import StockDetailPage from './components/stockDetailPage';
import NewsPage from './components/newsPage';
import Contactus from './components/contactus';

function App() {
  const [data, setData] = useState()

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
      {/* <News/> */}
      {/* <StockPage/> */}
      {/* <StockDetailPage/> */}
      {/* <NewsPage/> */}
      <Contactus/>
    </div>
  );
}

export default App;
