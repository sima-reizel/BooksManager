import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import InputBase from '@mui/material/InputBase'
import Button from '@mui/material/Button'
import './navBar.css'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  const nav = useNavigate()
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar className='background' >
          <Button className='button2' onClick={()=>{nav('./ShowBook')}}>Books</Button>
          <Button className='button' onClick={()=>{nav('./ShowAuthor')}}>Authors</Button>
          <Button className='button' onClick={()=>{nav('./AddAuthor')}}>Create Author</Button>
          <Button className='button' onClick={()=>{nav('./AddBook')}}>Create Book</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default NavBar