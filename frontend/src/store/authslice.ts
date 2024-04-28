import { createSlice } from "@reduxjs/toolkit";
import { User, onAuthStateChanged } from "firebase/auth";
import { RootState } from "./store";
import { auth } from "../firebaseConfig";

export interface UserState {
  loading: string;
  value: User | null;
  error: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  loading: "idle",
  value: null,
  error: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    retainUser: (state, action) => {
      if (state.value === action.payload) {
        return;
      }
      console.log(action.type);

      state.value = action.payload;
      state.loading = "success";
      state.error = false;
    },
    loginstatus: (state, action) => {
      state.error = action.payload;
      state.loading = "success";
    },
  },
});
export const checkAuth = () => (dispatch: any, getState: any) => {
  const state = getState();
  let userLog = state.auth.error;
  const sub = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(retainUser(user));
    } else {
      dispatch(loginstatus((userLog = true)));
    }
  });
  return sub;
};

export const { retainUser } = authSlice.actions;
export const { loginstatus } = authSlice.actions;

export const selecteduser = (state: RootState) => state.auth.value;
export const loading = (state: RootState) => state.auth.loading;
export const err = (state: RootState) => state.auth.error;
export default authSlice.reducer;
