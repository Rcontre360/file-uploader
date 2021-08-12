import {createReducer} from '@reduxjs/toolkit';
import {onSetUser} from '../actions';

const defaultState = {
  logged: false,
  user: {
    name: '',
    email: '',
    token: '',
    id: '',
  },
  files: undefined,
};

const mainReducer = createReducer(defaultState, builder => {
  builder.addCase(onSetUser, (state, action) => {
    state.user = action.payload;
  });
});

export default mainReducer;
