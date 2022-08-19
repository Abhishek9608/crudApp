import thunkMiddleware from "redux-thunk";

import {
  createStore, 
  applyMiddleware, 
} from "redux";

import reducers from "./reducer";

export const configureStore = () => {
  const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
  );

  return store;
};
