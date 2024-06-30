import React, {useRef, useEffect, useContext, useState } from "react"
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import './author.css'
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { addAuthor, storeImageUrl } from './authorSlice'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

function AddAuthor() {

const disp = useDispatch()
const nav = useNavigate()
const nameRef = useRef(null)
const ageRef = useRef(null)
const countryRef = useRef(null)
const imgRef = useRef(null)
const [age, setAge] = useState('')
const [error, setError] = useState(false)
const [errorText, setErrorText] = useState('')
const [errorFields, setErrorFields] = useState({
  name: false,
  age: false,
  country: false
})

const handleAgeChange = (event) => {
  const inputValue = event.target.value
  if (!isNaN(inputValue)) {
    const numericValue = parseInt(inputValue, 10)
    if (numericValue >= 20 && numericValue <= 120) {
      setAge(inputValue)
      setError(false)
      setErrorText('')
    } else {
      setAge(inputValue)
      setError(true)
      setErrorText('Age must be between 20 and 120')
    }
  } else {
    setAge(inputValue);
    setError(true);
    setErrorText('Age must be a valid number');
  }
}

const handleNameChange =(event)=>{
  const inputValue = event.target.value
  if(!inputValue)
    setErrorFields({name: true})
  else
  setErrorFields({name: false})
} 

const handleCouChange =(event)=>{
  const inputValue = event.target.value
  if(!inputValue)
    setErrorFields({country: true})
  else
  setErrorFields({country: false})
}

const submitBook = () =>{
  if (!nameRef.current.value.trim()) {
    setErrorFields({name: true})
    return
  }
  if (!ageRef.current.value.trim()) {
    setError(true)
    setErrorText('Age is required')
    return
  }
  if (!countryRef.current.value.trim()) {
    setErrorFields({country: true})
    return
  }
  disp(addAuthor({name: nameRef.current.value, age: ageRef.current.value, country: countryRef.current.value, img: imgRef.current.value }))
  nav('./ShowAuthor')
}

  return (
    <Grid  padding={2}>
      <Grid md={4} padding={3} margin={3}>
        <Box 
          component="form"
          sx={{
              '& .MuiTextField-root': { m: 3, width: '100ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className='back'>
              <TextField
                id="outlined-multiline-flexible"
                label="Enter your name"
                multiline
                inputRef = { nameRef }
                onChange={handleNameChange}
                error={errorFields.name}
                helperText={errorFields.name? 'Name is required' : ''}
                required
              />
              <TextField
                id="outlined-number"
                type="number"
                label="Enter your age"
                inputRef = { ageRef }
                value={age}
                onChange={handleAgeChange}
                helperText={error ? errorText :''}
                error={error}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Enter your country"
                multiline
                inputRef = { countryRef }
                onChange={handleCouChange}
                error={errorFields.country}
                helperText={errorFields.country? 'Country is required' : ''}
                required
              />
              <h3 class="h3">choose your picture</h3>
              <input class="form-control" type="file" ref={ imgRef }/>
              <Button className='form-control' onClick={()=>{submitBook()}} variant="text">Submit</Button>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}
export default AddAuthor