import './App.css';
import Crypto from './data/crpyto';


function App() {
  const [data, setData] = useState()

  useEffect(() => {
    const f = async () => {
      const res = await fetch('https://google-finance4.p.rapidapi.com/market-trends/?t=most-active&hl=en&gl=SG' , {
        headers:{
          'X-RapidAPI-Key': 'f12a5d921emshbac7e919797abd5p1b88ecjsn6a241dfe72bb',
		      'X-RapidAPI-Host': 'google-finance4.p.rapidapi.com'
        }
      })

      const d = res.json()
      console.log(d)
      console.log(d)
    }
    f()
  }, [])

  return (
    <div className="App">
    </div>
  );
}

function IsLeapYear(year)
{
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
    {
        return 1;
    }
    return 0;
}

export default App;
