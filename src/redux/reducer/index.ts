import {createReducer} from '@reduxjs/toolkit';
import {onSetUser, onSetFiles} from '../actions';

const defaultState = {
  logged: false,
  user: {
    name: '',
    email: '',
    token: '',
    id: '',
  },
  files: undefined as undefined | Blob[],
};

const mainReducer = createReducer(defaultState, builder => {
  builder.addCase(onSetUser, (state, action) => {
    state.user = action.payload;
  });
  builder.addCase(onSetFiles, (state, action) => {
    state.files = action.payload;
  });
});

export default mainReducer;
