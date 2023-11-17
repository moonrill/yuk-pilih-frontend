import {configureStore} from '@reduxjs/toolkit';
import { authSlice } from './reducer/authSlice';
import { formPollSlice } from './reducer/formPollSlice';
import { loginSlice } from './reducer/loginSlice';
import { modalSlice } from './reducer/modalSlice';
import { resetPasswordSlice } from './reducer/resetPasswordSlice';
import { authApi } from './services/authApi';
import { pollApi } from './services/pollApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [pollApi.reducerPath]: pollApi.reducer,
    auth: authSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
    login: loginSlice.reducer,
    modal: modalSlice.reducer,
    formPoll: formPollSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, pollApi.middleware),
})
