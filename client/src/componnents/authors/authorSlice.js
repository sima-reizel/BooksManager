import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchAllAuthors = createAsyncThunk('fetchAllAuthors' , async()=> {
    const response = await axios.get('http://localhost:4000/author/')
    return response.data
  })

export const addAuthor = createAsyncThunk("addAuthor", async (author) => {
  let res = await axios.post("http://localhost:4000/author/add/", author)
  return res.data
})

export const editAuthorStatus = createAsyncThunk("editAuthorStatus", async (dataToEdit) => {
    let res = await axios.post("http://localhost:4000/author/edit/", dataToEdit)
    return res.data
  })

const initialState = {
    isAuthorAdded:{name:'', status:''},
    authorArr:[],
    fileImage:''
}

const authorSlice = createSlice({
    name: "author",
    initialState,
    reducers: { 
        storeImageUrl: (state, action) => {
            state.fileImage = action.payload;   
            alert(`action.payload${action.payload}`)
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllAuthors.fulfilled,(state,action)=>{
             state.authorArr = action.payload
        })
        .addCase(addAuthor.fulfilled, (state, action) => {
            state.isAuthorAdded.name = action.payload.name
            state.isAuthorAdded.status = "fulfilled"
            alert(`${state.isAuthorAdded.name} added succsecfuly`)
        })
        .addCase(addAuthor.rejected, (state, action) => {
            state.isAuthorAdded.status = "error"
            alert('Author not added')
        })
        .addCase(addAuthor.pending, (state, action) => {
            state.isAuthorAdded.status = "pending"     
        })
        .addCase(editAuthorStatus.fulfilled, (state, action) => {
            state.isAuthorAdded.name = action.payload.name
            state.isAuthorAdded.status = "fulfilled"
        })
        .addCase(editAuthorStatus.rejected, (state, action) => {
            state.isAuthorAdded.status = "error"
        })
        .addCase(editAuthorStatus.pending, (state, action) => {
            state.isAuthorAdded.status = "pending"     
        })
    }
})

export const {storeImageUrl} = authorSlice.actions
export default authorSlice.reducer
