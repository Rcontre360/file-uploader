import {configureStore} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatcher,
  useSelector as selector,
} from 'react-redux';
import mainReducer from '../reducer';

export const store = configureStore({
  reducer: mainReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = selector;
export const useDispatch = () => dispatcher<AppDispatch>();
