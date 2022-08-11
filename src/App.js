import { useEffect } from "react";
import "./App.css";
import Crypto from "./data/crpyto";

function App() {
  const cName = 'bitcoin'
  const cryptoData = Crypto(cName);
  const cCurrentData = cryptoData[0];
  const cHistoricalData = cryptoData[1];
  const cTrendingData = cryptoData[2];
  const currentPrice = cCurrentData ? Object.values(cCurrentData)[0]?.usd : 'none'
  const pastPrice = cHistoricalData ? Object.values(cHistoricalData)[4]?.market_data?.current_price?.usd : 'none'
  //const profitRate = (currentPrice - pastPrice) / pastPrice * 100;
  console.log(cCurrentData)
  console.log(cHistoricalData)
  console.log(cTrendingData)

  return <div className="App">

    <h1>{cName}</h1>
    <p>current price: {currentPrice}</p>
    <p>past price: {pastPrice}</p>
  </div>;
}

export default App;
