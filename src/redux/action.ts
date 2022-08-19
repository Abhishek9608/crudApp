import { AppThunk } from "./index";
import {ActionTypes} from './actionTypes'

export function fetchPosts(): AppThunk {
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
