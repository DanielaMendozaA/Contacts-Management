import { configureStore } from '@reduxjs/toolkit'

import contactsReducer from '../redux/features/contactSlice';
import userReducer from '../redux/features/userSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


