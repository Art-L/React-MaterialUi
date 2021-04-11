import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  brandsResponse: null,
  phonesResponse:[],
  brandsLoading: false,
  phonesLoading: false
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.


export const mainStateSlice = createSlice({
  name: 'mainState',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPhones: (state, phones) => {
      state.phonesResponse = phones;
    },
    addPhones: (state, phones) => {

        state.phonesResponse.concat(phones);
      },
    setBrands: (state, brands) => {

        state.brandsResponse = brands;
      },
    setBrandsLoading: (state, isLoading) => {

        state.phonesLoading = isLoading;
      },
    setPhonesLoading: (state, isLoading) => {

        state.phonesLoading = isLoading;
      },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
  },
});

export const { setPhones, addPhones, setBrands, setPhonesLoading } = mainStateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getBrands = (state) => state.mainState.brandsResponse;
export const getPhones = (state) => state.mainState.phonesResponse;
export const getPrandsLoading = (state) => state.mainState.brandsLoading;
export const getPhonesLoading = (state) => state.mainState.phonesLoading;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default mainStateSlice.reducer;
