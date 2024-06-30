import React, {useRef, useEffect, useState, useMemo} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import './book.css'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'
import { addBook } from './bookSlice'
import {fetchAllAuthors} from '../authors/authorSlice'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

function AddBook() {
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const isAuthorAdded = useSelector( state => state.authors.isAuthorAdded)
  const isABookAdded = useSelector( state => state.books.isABookAdded)
  const authorArr = useSelector(state => state.authors.authorArr)
  const titleRef = useRef(null)
  const priceRef = useRef(null)
  const imgRef = useRef(null)
  const categoryRef = useRef(null)
  const descriptionRef = useRef(null)
  const [price, setPrice] = useState('')
  const [error, setError] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [errorFields, setErrorFields] = useState({
    title: false,
    description: false,
    category: false,
    author: false
  })
  const nav = useNavigate()
  const disp = useDispatch()

  useEffect(
    () => { disp(fetchAllAuthors())}, [isAuthorAdded, isABookAdded, submit]
  )
  
  // useEffect(() => {
  //   if (isABookAdded.status === 'fulfilled') {
  //     nav('./FinishProcess')
  //   }
  // }, [authorArr])

  const handleAuthorChange = (event) => {
    setErrorFields({author: true})
    setSelectedAuthor(event.target.value)
  }

const handlePriceChange = (event) => {
  const inputValue = event.target.value;
  if (!isNaN(inputValue)) {
    const numericValue = parseInt(inputValue, 10);
    if (numericValue >= 10 && numericValue <= 100) {
      setPrice(inputValue);
      setError(false);
      setErrorText('');
    } else {
      setPrice(inputValue);
      setError(true);
      setErrorText('Price must be between 10 and 100');
    }
  } else {
    setPrice(inputValue);
    setError(true);
    setErrorText('Price must be a valid number');
  }
};

const handleTitleChange =(event)=>{
  const inputValue = event.target.value
  if(!inputValue)
    setErrorFields({title: true})
  else
  setErrorFields({title: false})
} 

const handledecChange =(event)=>{
  const inputValue = event.target.value
  if(!inputValue)
    setErrorFields({description: true})
  else
  setErrorFields({description: false})
}

const handleCatChange =(event)=>{
  const inputValue = event.target.value
  if(!inputValue)
    setErrorFields({category: true})
  else
  setErrorFields({category: false})
}

const SubmitAuthor = () =>{
  if (!titleRef.current.value.trim()) {
    setErrorFields({title: true})
    return
  }
  if (!priceRef.current.value.trim()) {
    setError(true)
    setErrorText('Price is required')
    return
  }
  if (!descriptionRef.current.value.trim()) {
    setErrorFields({description: true})
    return
  }
  if (!categoryRef.current.value.trim()) {
    setErrorFields({category: true})
    return
  }
    disp(addBook({title: titleRef.current.value, price: priceRef.current.value,
      author: selectedAuthor, img: imgRef.current.value, category: categoryRef.current.value, description: descriptionRef.current.value  }))
      nav('./ShowBook')
    
}
  
  return (
    <Grid  padding={2}>
      <Grid md={4} padding={3} margin={3}>
        <h3>Create new book</h3>
        
        <Box 
          component="form"
          sx={{
              '& .MuiTextField-root': { m: 3, width: '100ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className='box'>
              <TextField
                  id="outlined-multiline-flexible"
                  label="Title"
                  inputRef={titleRef}
                  onChange={handleTitleChange}
                  error={errorFields.title}
                  helperText={errorFields.title? 'Title is required' : ''}
                  fullWidth
              />
              <TextField
                  id="outlined-number"
                  type="number"
                  label="Price"
                  value={price}
                  inputRef ={priceRef}
                  onChange={handlePriceChange}
                  helperText={error ? errorText :''}
                  error={error}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
              />
              <TextField
                  id="outlined-multiline-flexible"
                  label="Book Description"
                  multiline
                  onChange={handledecChange}
                  error={errorFields.description}
                  helperText={errorFields.description ? 'Description is required' : ''}
                  inputRef ={descriptionRef}
                  required
              />
              <TextField
                  id="outlined-multiline-flexible"
                  label="Category"
                  multiline
                  onChange={handleCatChange}
                  error={errorFields.category}
                  helperText={errorFields.category ? 'Category is required' : ''}
                  inputRef ={categoryRef}
                  required
              />
              <FormControl style={{ marginRight: '80%' }}>
                <NativeSelect
                    value={selectedAuthor}
                    onChange={handleAuthorChange}
                    inputProps={{
                      name: 'author',
                      id: 'author-native',
                    }}
                    required
                  >
                  <option value="">Select an Author</option>
                  {authorArr.map((author) => (
                    <option key={author.name} value={author.name}>{author.name}</option>
                  ))}
                </NativeSelect>
              </FormControl>
              <h3 class="h3">Choose the book picture</h3>
              <input class="form-control" type="file"  accept= "image/*" ref ={imgRef} />
              <Button className='form-control' onClick={()=>{SubmitAuthor()}} variant="text">Submit</Button>
          </div>
        </Box>
      </Grid>
    </Grid>
  )
}
export default AddBook
