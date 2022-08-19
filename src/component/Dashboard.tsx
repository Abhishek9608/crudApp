import  React, {useEffect} from 'react';
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
import {fetchPosts } from '../redux/action'

const  Dashboard = ()  => {
  const posts = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  console.log(posts)

  return (
    <>
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
        <PostModal/>
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
              <Button variant="contained">Edit</Button>
                <Button variant="outlined" >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        }
    </>
  );
}

export default Dashboard;