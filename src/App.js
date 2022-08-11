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
  console.log(cTrendingData)

  return <div className="App">

    <h1>{cName}</h1>
    <p>current price: {currentPrice}</p>
    <p>past price: {pastPrice}</p>
    <p>profit rate: {(profitRate).toFixed(2)}%</p>
  </div>;
}

export default App;
