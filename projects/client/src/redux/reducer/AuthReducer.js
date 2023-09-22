import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    name: "",
    email: "",
    isActive: "",
    avatar: ""
  },
  login: false,
};

export const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, email, isActive, avatar } = action.payload;
      state.user = { id, name, email, isActive, avatar };
    },
    loginSuccess: (state, action) => {
      state.login = true;
      localStorage.setItem("token", action.payload);
    },
    logoutSuccess: (state) => {
      state.login = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logoutSuccess } = AuthReducer.actions;

export default AuthReducer.reducer;