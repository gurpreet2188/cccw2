import "./App.css";
import Crypto from "./data/crpyto";

function App() {
  const cName = 'bitcoin'
  const cryptoData = Crypto(cName);
  const crypObjUSD = cryptoData ? Object.values(cryptoData)[0]?.usd : 'none'
  // console.log(crypObjName);

  return <div className="App">

    <h1>{cName}</h1>
    <p>value: {crypObjUSD}</p>
  </div>;
}

export default App;
