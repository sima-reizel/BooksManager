import React,{useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Drawer } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllAuthors, editAuthorStatus } from './authorSlice';


export default function DataTable() {

  let isAuthorAdded = useSelector(state => state.authors.isAuthorAdded)
  let fileImage = useSelector(state => state.authors.fileImage)
  let authorArr = useSelector(state => state.authors.authorArr)
  authorArr = authorArr.reduce((acc, item, index) => [...acc, { ...item, id: index }], [])
  const disp = useDispatch()
  useEffect(
    () => { disp(fetchAllAuthors()) }, [ isAuthorAdded ]
  )
  const label = { inputProps: { 'aria-label': 'Color switch demo' } }
  const PinkSwitch = styled(Switch)(({ theme }) => ({
      '& .MuiSwitch-switchBase.Mui-checked': {
        color: pink[600],
        '&:hover': {
          backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
        },
      },
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: pink[600],
      },
  }))
    
  const columns = [
    {
      field: 'img',
      headerName: 'Profile',
      width: 100,
      renderCell: (params) => (
        <Avatar alt="Profile" src ={fileImage + '/' +  params.row.img} />
      ),
    },
    { field: 'name', headerName: 'Name', width: 130},
    { field: 'listOfBooks', headerName: 'List Of Books', width: 130},
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    { field: 'country', headerName: 'Country', description: 'This column has a value getter and is not sortable.', width: 160 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
          <PinkSwitch onChange={(e)=>{ disp(editAuthorStatus({name: params.row.name, status: e.target.checked}))}} {...label} defaultChecked = {params.row.status}/>
      ),
    },
  ]

  return (
    <div className='back' style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={ authorArr }
        columns={ columns }
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
      />
    </div>
  )
}