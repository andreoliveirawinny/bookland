import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    mobileOpen: false,
    page: 'DASHBOARD'
  },
  reducers: {
    setPage: (state, { payload: page }) => {
      console.log('WHAT')
      state.page = page;
    },
    toggleMobileOpen: state => {
      state.mobileOpen = !state.mobileOpen;
    }
  },
});

export const { setPage,toggleMobileOpen } = menuSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMenu = state => state.menu.page;
export const isMobileOpen = state => state.menu.mobileOpen;

export default menuSlice.reducer;
