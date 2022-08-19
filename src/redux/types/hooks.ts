import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ActionType, RootState } from "../index";


export const useAppDispatch: () => ThunkDispatch<
  RootState,
  unknown,
  ActionType
> = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
