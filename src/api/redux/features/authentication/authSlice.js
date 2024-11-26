import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const initialState = {
  user: null,
  token: token ? token : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      const { user } = payload;
      state.user = user;
      state.token = "mock-token"; // Since we're not using real tokens
      Cookies.set("token", "mock-token", {
        secure: true,
        expires: 1,
      });
    },
    logOut: (state) => {
      Cookies.remove("token");
      state.token = null;
      state.user = null;
    },
  },
});

export const { logOut, setCredentials } = authSlice.actions;
export default authSlice.reducer;
