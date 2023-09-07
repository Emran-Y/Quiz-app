import logo from './logo.svg';
import './App.css';
import Quiz from './Quiz.js'
import React from 'react';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize'
function manipulateZim(prevValue) {
  // Perform your logic here to manipulate the state
  return !prevValue; // Return the manipulated value (inverted in this example)
}

function App() {

  const { width, height } = useWindowSize()

  const [zim, setZim] = React.useState(false);
  const [cat, setCat] = React.useState('');
  const [formData, setFormData] = React.useState({
    favColor: ""
  });
  
  React.useEffect(() => {
    setCat(formData.favColor);
  }, [formData.favColor]);
  
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }
  
  const apicall = `https://opentdb.com/api.php?amount=5&type=multiple&category=${parseInt(cat)}`

  function handleZimUpdate() {
    const manipulatedValue = manipulateZim(zim);
    setZim(manipulatedValue);
  }
  const [dataDatas,setDataDatas] = React.useState([])
  React.useEffect(() => {
    async function fetchData() {
      
      let Api;
      if (cat === '') {
        
        Api = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      } else {
        Api = await fetch(apicall);
      }
      const data = await Api.json()
      setDataDatas(data.results)
    }
  
    fetchData()
  }, [cat])
  let idd = []
  function IDK(id){
      if(!idd.includes(id)){
        idd.push(id)
     }
      // else if(idd.includes(id)){
      //   let newA = idd.filter(item=> item!==id)
      //   idd = newA
      //   //   }
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
  const handleButtonClick = () => {
    window.location.reload();
  };
 
 
  return (
    <>

    {
      zim ? 
      <div className='flex'>
        {(score===5 && emran) && 
          <Confetti
            width={width}
            height={height}
          /> }
      <div className='game'>
          {quizArray}
      </div>
      <div className='last-last'>
      {emran ? <h3 className='score-score'>You scored {score}/5 correct answers</h3>:''}
      <button onClick={EmranY} className='game-btn'>Submit</button></div>
      {(score===5 && emran) && <div className ='on-high'>
        <p className='bravo-text'>Bravo! You've mastered the general knowledge quiz, achieving a flawless 5/5 or 100% score! Your expertise in worldly facts is truly remarkable!</p>
        <div className='bravo-btn'>
          <small className='bravo-text-mini'>Ready for more? Play again!</small>
          <button onClick={handleButtonClick} className='btn-bravo'>New game</button> 
        </div>
        </div>}
      </div>
      
      
      : 
      <main className = 'main'>
        <select 
                id="favColor" 
                value={formData.favColor}
                onChange={handleChange}
                name="favColor"
                className='drop-down'
            >
                <option value=''>select question category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musical and Theatres</option>
                <option value="14">Entertainment: Televison</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science Computers</option>
                <option value="19">Science Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">Entertainment: Japanese Anime & Manga</option>
                <option value="32">Entertainment: Cartoon & Animation</option>
        </select>
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

