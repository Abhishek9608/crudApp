import { AppThunk } from "./index";
import {ActionTypes} from './actionTypes'

export const fetchPosts = () : AppThunk  =>{
  return (dispatch, getState) => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        dispatch({
          type: ActionTypes.GET_POSTS,
          posts: json
        })
      });
  };
}

export const addPost = (data : {title:string, description: string}): AppThunk => {
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((json) =>{
      dispatch(fetchPosts())
    });
  }
}
