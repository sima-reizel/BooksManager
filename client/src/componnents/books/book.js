import React, { useState, useRef ,useEffect} from "react"
import {styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { fetchAllBooks } from "./bookSlice"
import { useSelector, useDispatch } from 'react-redux'
import Alert from '@mui/material/Alert'

function Books({book}) {

  const [expanded, setExpanded] = useState(false)
  let isBookAdded = useSelector(state => state.books.isBookAdded)
  const disp = useDispatch()

  useEffect(
    () => { disp(fetchAllBooks()) }, [ isBookAdded ]
  )

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }))
  
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardHeader
        avatar={
          <Avatar style={{fontSize: '15px', textAlign:'center'}}sx={{ bgcolor: 'black'}} aria-label="recipe">
            {book.category}
          </Avatar>
        }
        subheader = {`$${book.price}`}
        title = {book.title}  
      />
      <CardMedia
        component="img"
        height="194"
        image = {`../${book.img}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
           {book.author}
        </Typography>
          {
            book.status &&
            <Alert severity="success">This is active</Alert>
          }
          {
            !book.status &&
            <Alert severity="error">This is not active</Alert>
          }
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{book.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
export default Books