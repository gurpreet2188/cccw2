import { useEffect } from "react";
import "./App.css";
import Crypto from "./data/crpyto";

function App() {
  const cName = 'bitcoin'
  const [cCurrentData, cHistoricalData, cTrendingData] = Crypto(cName)
  const currentPrice = parseInt(cCurrentData ? Object.values(cCurrentData)[0]?.usd : 'none')
  const pastPrice = parseInt(cHistoricalData?.market_data?.current_price?.usd) 
  const profitRate = (currentPrice - pastPrice) / pastPrice * 100;
  console.log(cCurrentData)
  console.log(cHistoricalData)
  console.log(cTrendingData?.coins[0]?.item?.name)

  return <div className="App">

    <h1>{cName}</h1>
    <p>current price: {currentPrice}</p>
    <p>profit rate: {(profitRate).toFixed(2)}%</p>
    <h2>top 7 trending coins</h2>
    {cTrendingData ? cTrendingData?.coins.map((v, i) => {
      return(<p>{i + 1}. {v?.item?.name}</p>)
    }) : 'Loading...'}
  </div>;
}

export default App;
