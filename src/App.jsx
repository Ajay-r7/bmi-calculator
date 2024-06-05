
import { useState } from 'react'
import './App.css'
import { Button, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';


function App() {
  const[weight,setWeight]=useState("")
  const[height,setHeight]=useState("")
  const[bmi,setBmi]=useState('')
  const[message,setMessage]=useState('')
  const[isheight,setIsHeight]=useState(true)
  const[isweight,setIsWeight]=useState(true)
  
  const validate=(e)=>{
    if(e.target.value.match(/^[0-9]*$/)){
      if(e.target.name=='height'){
      setHeight(e.target.value)
      setIsHeight(true)
    }
    else{
      setWeight(e.target.value)
      setIsWeight(true)
    }
  }else{
    if(e.target.name=='height'){
      
      setIsHeight(false)
    }
    else{
      
      setIsWeight(false)
    }
  }
}


  let calcBmi = (e)=>{
    e.preventDefault()
    if(weight===""||height===""){
      alert('Please enter a valid Weight and Height')
    }else{
      let bmi =(weight / (height / 100) ** 2);
      setBmi(bmi.toFixed(2))
      if(bmi < 18.5){
        setMessage('Underweight! You need to eat enough food')
      }else if(bmi>=18.5 && bmi<=24.9){
        setMessage('Healthy')
      }else if(bmi >= 25 && bmi<=29.9){
        setMessage('Overweight! Your need to Workout')
      }else{
        setMessage('Obese! Diet and Workout')
      }
    }
    
  }

  let imgSrc;
    if(bmi<1){
      imgSrc=null;
    }
    else{
      if(bmi<18.5){
      imgSrc='../src/assets/Underweight.gif';
    }
    else if(bmi>=18.5 && bmi<=24.9){
      imgSrc='../src/assets/Healthy.gif';
    }
    else if(bmi >= 25 && bmi<=29.9){
      imgSrc='../src/assets/overweight.gif';
    }
    else{
      imgSrc='../src/assets/mindy-exercise.gif';
    }
  }
  

  const handleReset = ()=>{
    setHeight("")
    setWeight("")
    setBmi("");
    setMessage("");
  }

  return (
    <>
      <div className="app ">
        <div className="container rounded">
          <h4 className="head" style={{textDecoration:'underline'}}>BMI Calculator.</h4>
          <form>
         
          <div className='text'>
          <TextField
          label="Enter Your Height"
          id="standard-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          variant="standard"
          value={height || ""}
          name='height'
          onChange={(e)=>validate(e)}
        />
        {!isheight&&
            <p style={{color:'rgb(90, 190, 400)',fontSize:'small',marginLeft:'10px',fontStyle:'italic'}}>~invalid input</p>}
          </div>
          <div className='text'>
          <TextField
          value={weight || ""}
          name='weight'
          onChange={(e)=>validate(e)}
          label="Enter Your Weight"
          id="standard-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
          variant="standard"
        />
        {!isweight &&
            <p style={{color:'rgb(90, 190, 400)',fontSize:'small',marginLeft:'10px',fontStyle:'italic'}}>~invalid input</p>}
          </div>
          </form>
          <div className="buttons">
            <Button variant='contained' style={{background:'#10223b'}} onClick={calcBmi}>Calculate</Button>
            <Button variant="contained" style={{border:'1px solid #08386ee7',background:'transparent'}} onClick={handleReset}>Reset</Button>
          </div>
          {bmi!=="" && <div className="result text-center">
            <p style={{ color: 'white' }}>Your BMI is : {bmi}</p>
            <p style={{ color: 'rgb(90, 130, 200)' }}>{message}</p>
            <div className="img-container">
              <img src={imgSrc} alt="" ></img>
            </div>
          </div>}
          
        </div>
      </div>
    </>
  )
}

export default App
