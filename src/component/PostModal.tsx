import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {addPost } from '../redux/action'
import {useAppDispatch} from '../redux/types/hooks'
import { data, post } from '../types';


interface PostModalProps { 
  open: boolean; 
  handleClose: () => void; 
  handleClick: (data: data)=> void;
  selectedCard: post | null
}

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

export default function PostModal(props: PostModalProps) {
  const {open, handleClose, handleClick, selectedCard} = props;
  const [data , setData] = React.useState<data>({
    title:"",
    body: ""
  });

  useEffect(() => {
    if(selectedCard){
      setData({title: selectedCard.title, body: selectedCard.body})
    }
  },[])

  const handleChnage = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
    setData({
        ...data,
        [e.target.name ]: e.target.value
    })
  } 

  return (
    <div role="modal">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            name="title"
            data-testid='title'
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
            name="body"
            data-testid='body'
            value={data.body}
            placeholder="Minimum 3 rows"
            style={{ width: 400 }}
            onChange={handleChnage}
    />
      <Button variant="contained" onClick={() => handleClick(data)}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}