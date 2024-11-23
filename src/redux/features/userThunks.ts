import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearToken, setToken } from './userSlice';


export const saveToken = createAsyncThunk(
  'user/saveToken',
  async (token: string, { dispatch }) => {
    await AsyncStorage.setItem('token', token);
    dispatch(setToken(token));
  }
);

export const removeToken = createAsyncThunk(
  'user/removeToken',
  async (_, { dispatch }) => {
    await AsyncStorage.removeItem('token');
    dispatch(clearToken());
  }
);
