import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import mainStateReducer from '../app/services/mainStateSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    mainState: mainStateReducer,
  },
});
