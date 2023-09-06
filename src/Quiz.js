import './App.css';
import React from 'react';

export default function Quiz(props){
    let ch = [props.A]
    for(let i of props.W){
        ch.push(i)
    }
    const randomNumber = Math.floor(Math.random() * 4)
    let array = []
    
    for(let i = 0;i<4;i++){ 
        if(i===randomNumber){
            array.push(ch[0])
        }else{
            array.push(ch.pop())
        }
    }
    const [selectedOption, setSelectedOption] = React.useState('');

    const handleOptionSelect = (option) => {
        if (selectedOption === option) {
          setSelectedOption('');
        } else {
          setSelectedOption(option);
        }
      };
      console.log(ch[0])
      console.log(selectedOption)

      if(ch[0] ===selectedOption){
        props.fun(props.id)
      }
      
      
    
    return(
        <div className='quiz'>
            <h5 className='question' dangerouslySetInnerHTML={{ __html: props.Q }}></h5>
            <div className="choice">
        <div
          className={`option ${selectedOption === array[0] ? 'selected' : ''} ${(props.corr && array[0]===ch[0]) ? 'green':''} ${(props.corr && selectedOption === array[0]) ? 'red':''}`}
          onClick={() => handleOptionSelect(array[0])}
          dangerouslySetInnerHTML = {{ __html: array[0]}}
        >
         
        </div>

        <div
          className={`option ${selectedOption === array[1] ? 'selected' : ''} ${(props.corr && array[1]===ch[0]) ? 'green':''} ${(props.corr && selectedOption === array[1]) ? 'red':''}`}
          onClick={() => handleOptionSelect(array[1])}
          dangerouslySetInnerHTML = {{ __html: array[1]}}
        >

        </div>

        <div
          className={`option ${selectedOption === array[2] ? 'selected' : ''} ${(props.corr && array[2]===ch[0]) ? 'green':''} ${(props.corr && selectedOption === array[2]) ? 'red':''} `}
          onClick={() => handleOptionSelect(array[2])}
          dangerouslySetInnerHTML = {{ __html: array[2]}}
        >
          
        </div>

        <div
          className={`option ${selectedOption === array[3] ? 'selected' : ''} ${(props.corr && array[3]===ch[0]) ? 'green':''} ${(props.corr && selectedOption === array[3]) ? 'red':''}`}
          onClick={() => handleOptionSelect(array[3])}
          dangerouslySetInnerHTML = {{ __html: array[3]}}
        >
          
        </div>
      </div>
        </div>
    )
} 



{/* <h5 dangerouslySetInnerHTML={{ __html: props.Q }}></h5>
            <p className = 'correct-answer' dangerouslySetInnerHTML={{ __html: props.A }}></p> */}