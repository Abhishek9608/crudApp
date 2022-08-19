import { post } from "../../types";
import { ActionTypes } from "../actionTypes";

interface AddPost {
  type: ActionTypes.ADD_POST;
  todoDetails: { id: string; description: string };
}
interface DeletePost {
  type: ActionTypes.DELETE_POST;
  todoId: string;
}
interface UpdatePost {
  type: ActionTypes.UPDATE_POST;
  todoDetails: { id: string; description: string };
}

interface GetPosts {
  type: ActionTypes.GET_POSTS;
  posts: Array<post>
}

export type PostsAction = 
AddPost | 
DeletePost | 
UpdatePost |
GetPosts;
