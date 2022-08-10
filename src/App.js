import './App.css';
import Crypto from './data/crpyto';


function App() {
  const cryptoData = Crypto()
  console.log(cryptoData)

  return (
    <div className="App">
    </div>
  );
}

export default App;
