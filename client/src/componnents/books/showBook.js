import React,{useEffect} from 'react'
import Books from './book'
import Grid from '@mui/material/Grid'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllBooks } from './bookSlice'

function ShowBook() {
  let isBookAdded = useSelector(state => state.books.isBookAdded)
  let booksArr = useSelector(state => state.books.bookArr)
  const disp = useDispatch()

  useEffect(
    () => { disp(fetchAllBooks() ) }, [ isBookAdded ]
  )

  return ( 
    <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} padding={3}>
        {booksArr.map(item =>
            <Grid md={4} key={item.id} padding={3}>
                <Books book = {item}/>
            </Grid>
        )}   
    </Grid>
  )
}

export default ShowBook