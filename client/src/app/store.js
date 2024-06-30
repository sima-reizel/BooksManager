import { configureStore } from "@reduxjs/toolkit"
import authorSlice from "../componnents/authors/authorSlice"
import bookSlice from "../componnents/books/bookSlice"


export const store = configureStore({
   reducer: {
      authors: authorSlice,
      books: bookSlice
   }
})