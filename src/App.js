import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import Stocks from './data/stocks';


export default function App() {
  const d = ['IBM']
  let s = []
  useEffect(()=>{
    console.log('sssssss')
  },[])
  // const [stockData, histData] = Stocks(d[0])
  // useEffect(()=>{
  //   for (let i = 0; i<= d.length; i++) {
  //     const [stockData, histData] = Stocks(d[i])
  //     s.push(stockData)
  //   }

  // },[])
  // console.log(histData)
  // console.log(stockData)
  // console.log(stockData)

  return (
    <div className="">
      <Header/>
    </div>
  );
}


