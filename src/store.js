import {configureStore} from '@reduxjs/toolkit';
import { loginSlice } from './reducer/loginSlice';
import { modalSlice } from './reducer/modalSlice';
import { authApi } from './services/authApi';
import { pollApi } from './services/pollApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [pollApi.reducerPath]: pollApi.reducer,
    modal: modalSlice.reducer,
    login: loginSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, pollApi.middleware),
})
