import './App.css';
import Stocks from './data/stocks';


function App() {
  const stockData = Stocks(`HKD`)
  console.log(stockData)



  return (
    <div className="App">
    </div>
  );
}

export default App;
