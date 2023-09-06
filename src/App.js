import logo from './logo.svg';
import './App.css';
import Quiz from './Quiz.js'
import React from 'react';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

function manipulateZim(prevValue) {
  // Perform your logic here to manipulate the state
  return !prevValue; // Return the manipulated value (inverted in this example)
}

function App() {

  const [zim, setZim] = React.useState(false);
  const [count,setCount] = React.useState(0)

  function handleZimUpdate() {
    const manipulatedValue = manipulateZim(zim);
    setZim(manipulatedValue);
  }
  const [dataDatas,setDataDatas] = React.useState([])
  React.useEffect(() => {
    async function fetchData() {
      const Api = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      const data = await Api.json()
      setDataDatas(data.results)
    }
  
    fetchData()
  }, [])
  let idd = []
  function IDK(id){
      if(!idd.includes(id)){
        idd.push(id)
        console.log(idd)
      }
      // else if(idd.includes(id)){
      //   let newA = idd.filter(item=> item!==id)
      //   idd = newA
      //   console.log(idd)
      //   }
    }
    
  const [emran,setEmran] = React.useState(false)
  const [score,setScore] = React.useState(0)
  function EmranY(){
    setEmran(true)
    setScore(idd.length)
  }
  
  const quizArray = dataDatas.map(data =>{
    return <Quiz id={uuidv4()} corr = {emran} fun = {IDK} Q = {data.question} A = {data.correct_answer} W = {data.incorrect_answers}/>
  })
 
 
  return (
    <>

    {
      zim ? 
      <div className='flex'>
      <div className='game'>
          {quizArray}
      </div>
      <div className='last-last'>
      {emran ? <h3 className='score-score'>You scored {score}/5 correct answers</h3>:''}
      <button onClick={EmranY} className='game-btn'>Submit</button></div>
      </div>
      
      
      : 
      <main className = 'main'>
      <div className = 'home'>
          <h1 className='home--title'>Quizzical</h1>
          <p className = 'home--desc'>Test your knowledge with a quick quiz!</p>
          <button onClick={handleZimUpdate} className='home--btn'>Start quiz</button>
      </div>
      </main>
    }
    </>
 )
}

export default App

