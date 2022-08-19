import { PostsAction } from "./types/action";
import { ActionTypes } from "./actionTypes";
import { post } from "../types";

interface stateType {
  posts: Array<post>
}

const initialState: stateType = {
  posts: []
};


function TodosReducer(
  state: Readonly<stateType> = initialState,
  action: PostsAction
): stateType {
  switch (action.type) {
    case ActionTypes.GET_POSTS:
      return {
        ...state,
        posts: action.posts
      };

    default:
      return state;
  }
}

export default TodosReducer;
