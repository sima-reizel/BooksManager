import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Books from './componnents/books/book'
import ShowBook from './componnents/books/showBook'
import Authors from './componnents/authors/author'
import ShowAuthor from './componnents/authors/showAuthor'
import AddAuthor from './componnents/authors/addAuthor'
import AddBook from './componnents/books/addBook'
import NavBar from './componnents/navBar/navBar'
import './App.css'

function App() {
  return (
    <BrowserRouter>  
      <NavBar/>
        <Routes>
          <Route path='/' element = {<ShowBook/>}/>
          <Route path = 'authors' element = {<Authors/>}/>
          <Route path = 'showAuthor' element = {<ShowAuthor/>}/>
          <Route path = 'addAuthor' element = {<AddAuthor/>}/>
          <Route path = 'addAuthor/showAuthor' element = {<ShowAuthor/>}/>
          <Route path = 'addBook' element = {<AddBook/>}/>
          <Route path = 'books' element = {<Books/>}/>
          <Route path = 'showBook' element = {<ShowBook/>}/>
          <Route path = 'AddBook/ShowBook' element = {<ShowBook/>}/>
        </Routes>
    </BrowserRouter> 
  )
}

export default App;
