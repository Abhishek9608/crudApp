import { AppThunk } from "./index";
import {ActionTypes} from './actionTypes'
import { data } from "../types";

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

export const addPost = (data : data): AppThunk => {
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

export const editPost = (data : data, id:number | undefined): AppThunk => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((json) =>{
      dispatch(fetchPosts())
    });
  }
}


export const deletePost = (id : number): AppThunk => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
    // body: JSON.stringify(id)
  })
    .then((response) => response.json())
    .then((json) =>{
      dispatch(fetchPosts())
    });
  }
}
