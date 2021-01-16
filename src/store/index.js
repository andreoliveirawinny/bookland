import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/pages/auth/authSlice';
import menuReducer from '../features/components/menus/menuSlicer';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    menu: menuReducer
  }
});
