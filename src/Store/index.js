import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const userIsLoggedIn = !!initialToken;
const initialEmail = localStorage.getItem("email");

const initialState = {
  token: initialToken,
  email: initialEmail,
  isLoggedIn: userIsLoggedIn,
  items: [],
  updateSend: false,
  mailDetails: false,
  openMessage: null,
};

const Authslice = createSlice({
  name: "auth",
  initialState: initialState,
  isLoggedIn: userIsLoggedIn,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    //   state.token = null;
    },
  },
});



const sendSlice = createSlice({
  name: "send",
  initialState: initialState,
  reducers: {
    replace(state, action) {
      state.items = action.payload.items;
      state.updateSend = action.payload.updateSend;
    },
    sendMail(state, action) {
      const newItem = action.payload;
      state.updateSend = true;
      state.items.push({
        id: Math.random().toString(),
        key: Math.random().toString(),
        date: newItem.date,
        seen: newItem.seen,
        sub: newItem.sub,
        email: newItem.email,
        text: newItem.text,
      });
    },
    getDetailOnClick: (state, action) => {
    state.openMessage = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    auth:Authslice.reducer, send:sendSlice.reducer
  },
});
export const Authactions = Authslice.actions;
export const sendActions= sendSlice.actions;
export const { getDetailOnClick, sendMail } = sendSlice.actions;
export default store;