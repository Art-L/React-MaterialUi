import { configureStore } from '@reduxjs/toolkit';
import mainStateReducer from '../app/services/mainStateSlice'
export const store = configureStore({
  reducer: {
    mainState: mainStateReducer,
  },
});
