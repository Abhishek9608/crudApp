import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {addPost } from '../redux/action'
import {useAppDispatch} from '../redux/types/hooks'



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PostModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data , setData] = React.useState<{title:string, description: string}>({
    title:"",
    description:""
  });
  const dispatch = useAppDispatch();


  const handleChnage = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
    setData({
        ...data,
        [e.target.name ]: e.target.value
    })
  } 

  const handleAdd = () => {
    dispatch(addPost(data))
    setData({ title:"", description:""})
  }

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Add Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Post
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            name="title"
            value={data.title}
            placeholder="Minimum 3 rows"
            style={{ width: 400 }}
            onChange={handleChnage}
            />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Description
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            name="description"
            value={data.description}
            placeholder="Minimum 3 rows"
            style={{ width: 400 }}
            onChange={handleChnage}
    />
      <Button variant="contained" onClick={handleAdd} >Add</Button>
        </Box>
      </Modal>
    </div>
  );
}