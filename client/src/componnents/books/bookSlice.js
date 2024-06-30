import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const fetchAllBooks = createAsyncThunk('fetchAllBooks' , async()=> {
    const response = await axios.get('http://localhost:4000/book/')
    return response.data
  })

export const addBook = createAsyncThunk("addBook", async (book) => {
  let response = await axios.post("http://localhost:4000/book/add/", book)
  return response.data
})


const initialState = {
    isABookAdded:{title:'', status:''},
    bookArr:[],
    fileImage:''
}

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: { 
    storeImageUrl: (state, action) => {
        state.fileImage = action.payload  
        alert(`action.payload${action.payload}`)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.fulfilled,(state,action)=>{
          state.bookArr = action.payload
      })
      .addCase(addBook.fulfilled, (state, action) => {
          state.isABookAdded.title = action.payload.title
          state.isABookAdded.status = "fulfilled"
          alert(`${state.isABookAdded.title} added succsecfuly`)
      })
      .addCase(addBook.rejected, (state, action) => {
          state.isABookAdded.status = "rejected"
          alert('Book not added')
      })
        .addCase(addBook.pending, (state, action) => {
          state.isABookAdded.status = "pending"     
      })
  }
})
export const {storeImageUrl} = bookSlice.actions
export default bookSlice.reducer
