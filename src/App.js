import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState()

  const daysInEachMonth = [
    [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
    [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
  ];

  let newDate = new Date;
  let day = newDate.getDay;
  let month = newDate.getMonth;
  let year = newDate.getFullYear;

  //week chart
  let weekChart = new array(7).fill(0);
  let tempDay = day;
  let tempMonth = month;
  let tempYear = year;
  for (let i = 0; i < 7; i++) 
  {
    let dateString = tempDay.toString() + '-' + tempMonth.toString() + '-' + tempYear.toString();
    weekChart[weekChart.length - 1 - i] = dateString;
    tempDay--;
    if(tempDay < 1)
    {
      tempMonth--;
      if(tempMonth < 1)
      {
        tempMonth = 12;
        tempYear--;
      }
      tempDay = daysInEachMonth[IsLeapYear(tempYear)][tempMonth - 1];
    }
  }

  //month chart
  // let monthChart = [0, 0, 0, 0, 0]
  // tempDay = day;
  // tempMonth = month;
  // tempYear = year;
  // for (let i = 0; i < 7; i++) {
  //   let dateString = tempDay.toString() + '-' + tempMonth.toString() + '-' + tempYear.toString();
  //   weekChart[weekChart.length - 1 - i] = dateString;
  //   tempDay--;
  //   if(tempDay < 1)
  //   {
  //     tempMonth--;
  //     if(tempMonth < 1)
  //     {
  //       tempMonth = 12;
  //       tempYear--;
  //     }
  //     tempDay = daysInEachMonth[IsLeapYear(tempYear)][tempMonth - 1];
  //   }
  // }

  //year chart
  let yearChart = new Array()
  tempDay = day;
  tempMonth = month;
  tempYear = year;
  for (let i = 0; i < 12; i++) 
  {
    let dateString = tempDay.toString() + '-' + tempMonth.toString() + '-' + tempYear.toString();
    yearChart[yearChart.length - 1 - i] = dateString;
    tempMonth--;
    if(tempMonth < 1)
    {
      tempYear--;
    }
  }
  //five year chart
  let fiveYearChart = []
  tempDay = day;
  tempMonth = month;
  tempYear = year;
  for (let i = 0; i < 12; i++) 
  {
    let dateString = tempDay.toString() + '-' + tempMonth.toString() + '-' + tempYear.toString();
    fiveYearChart[fiveYearChart.length - 1 - i] = dateString;
    tempMonth--;
    if(tempMonth < 1)
    {
      tempYear--;
    }
  }
  
  //let maxChart = []

  date 
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
