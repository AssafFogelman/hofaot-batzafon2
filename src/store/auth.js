const { createSlice } = require("@reduxjs/toolkit");

const initialAuthState = {
  loggedIn: false,
  tokenData: {
    _id: "",
    biz: false,
    isAdmin: false,
    iat: undefined,
  },
  serverUserData: {
    _id: "",
    name: "",
    email: "",
    biz: false,
    phone: "",
    bizUrl: "",
    wazeLocation: "",
    isAdmin: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, { payload }) {
      state.loggedIn = true;
      if (!payload)
        console.error("no data was sent to the redux variable 'tokenData'!");
      else state.tokenData = payload;
    },
    logout: (state) => initialAuthState,
    saveUserInfo: (state, { payload }) => {
      if (!payload) console.error("there was no payload!");
      state.serverUserData = payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
