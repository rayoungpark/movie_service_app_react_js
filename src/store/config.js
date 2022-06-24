// import {createLogger} from 'redux-logger';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import movieSlice from "./slices/movieSlice";

// const logger = createLogger();

const rootReducer = combineReducers({
  movie: movieSlice.reducer,
});

const initialState = {};

export const store = configureStore({
  reducer: rootReducer,
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(""),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
  enhancers: (defualtEnhancers) => [...defualtEnhancers],
});

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();

export default store;
