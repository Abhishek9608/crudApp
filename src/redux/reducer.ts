import { PostsAction } from "./types/action";
import { ActionTypes } from "./actionTypes";

interface stateType {
  posts: Array<Record<string, unknown>>
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
