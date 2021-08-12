import {createAction} from '@reduxjs/toolkit';
import {SET_USER, SET_FILES} from '../action_types';
import {create} from 'yup/lib/Reference';

export const onSetUser = createAction<User>(SET_USER);

export const onSetFiles = createAction<Blob[]>(SET_FILES);
