import React from 'react'
import Grid from '@mui/material/Grid'
import Author from './author'


function ShowAuthor() {
  return (
      <Grid  padding={5}>
          <Grid md={4} padding={3}>
              <Author/>
          </Grid>  
      </Grid>
  )
}

export default ShowAuthor