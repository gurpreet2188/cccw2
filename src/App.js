import { useEffect } from "react";
import "./App.css";
import Crypto from "./data/crpyto";

function App() {
  const cName = "bitcoin";
  const [cCoinData, cTrendingData, cMarketCapData] = Crypto(cName);
  console.log(cCoinData)
  const currentPrice = parseInt(cCoinData ? cCoinData[0]?.current_price : 0) 
  const priceChangePercentage24h = cCoinData ? cCoinData[0]?.price_change_percentage_24h : 0
  
  return (
    <div className="App">
      <h1>{cName}</h1>
      <p>current price: {currentPrice}</p>
      <p>price change percentage 24h: {priceChangePercentage24h.toFixed(2)}%</p>
      <h2>top 10 coins with the largest market capitalization</h2>
      {cMarketCapData
        ? cMarketCapData?.map((v, i) => {
          if(i < 5)
          {
            return (
              <p key = {i}>
                {i + 1}. {v?.name} |current price: {v?.current_price}$ |market cap: {v?.market_cap}$
              </p>
            );
          }
          })
        : "Loading..."}
      <h2>top 7 trending coins</h2>
      {cTrendingData
        ? cTrendingData?.coins.map((v, i) => {
            return (
              <p key = {i}>
                {i + 1}. {v?.item?.name} 
              </p>
            );
          })
        : "Loading..."}
    </div>
  );
}

export default App;
