import  React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import PostModal from './PostModal';
import {useAppDispatch, useAppSelector} from '../redux/types/hooks'
import {addPost, deletePost, editPost, fetchPosts } from '../redux/action'
import { data, post } from '../types';

const  Dashboard = ()  => {
  const [modalType, setModalType] = useState('')
  const [open, setOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState<post | null>(null)


  const posts = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    dispatch(fetchPosts())
  }, [])


  const handleAdd = (data:data) => {
    dispatch(addPost(data))
    handleClose()
  }

  const handleEdit = (data:data) => {
    dispatch(editPost(data, selectedCard?.id))
    handleClose()
  }

  const handleDelete = (id: number) => {
    dispatch(deletePost(id))
  }
 
  const handleType =(type: string, data:post | null) => {
    if(type == 'edit'){
      setSelectedCard(data)
    }
    setModalType(type);
    handleOpen()
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BLOGS
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
              </IconButton>
            </div>
        </Toolbar>
      </AppBar>
      </Box>

      <div style={{marginTop:"20px"}} >
      <Button variant="contained" onClick={() => handleType('add', null)}>Add Post</Button>
      </div>
        {
          posts?.slice(0 , 10)?.map((item) => (
            <Card style={{margin:"50px"}} >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.body}
                </Typography>
              </CardContent>
              <CardActions>
                
              <Button variant="contained" onClick={() => handleType('edit', item)}>Edit</Button>
              {/* <PostModal buttonText={"Edit"} /> */}
                <Button variant="outlined" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        }
        <PostModal 
          open={open}
          handleClose={handleClose}
          handleClick={modalType === 'add' ? handleAdd : handleEdit}
          selectedCard={modalType === 'edit' ? selectedCard : null}
        />
    </div>
  );
}

export default Dashboard;