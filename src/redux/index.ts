import { ThunkAction } from "redux-thunk";
import { configureStore } from "./configureStore";

// Redux store
export const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type ActionType = ReturnType<typeof store.dispatch>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionType
>;
