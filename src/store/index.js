import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/pages/auth/authSlice';
import menuReducer from '../features/components/menus/menuSlicer';
import calendarReducer from '../features/slices/calendar';

export default configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    calendar: calendarReducer
  }
});
