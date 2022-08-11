import './App.css';
import Stocks from './data/stocks';


function App() {
  const [stockData, histData] = Stocks(`IBM`)
  console.log(stockData)
  console.log(histData)



  return (
    <div className="App">
    </div>
  );
}

export default App;
