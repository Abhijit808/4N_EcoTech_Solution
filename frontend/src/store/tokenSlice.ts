import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./authslice";
import { RootState } from "./store";
const initialState: UserState = {
  loading: "idle",
  value: null,
  error: false,
};
export const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    Tokens: (state, action) => {
      if (state.value === action.payload) {
        return;
      }
      state.value = action.payload;
    },
  },
});
export const { Tokens } = tokenSlice.actions;
export const selectedtoken = (state: RootState) => state.token.value;
export default tokenSlice.reducer;
