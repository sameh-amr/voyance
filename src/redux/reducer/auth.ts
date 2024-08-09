import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/googleauth/IUser";
//defining the state and actions for the userslice in our redux store
const initialState: IUser = {
  email: "",
  familyName: "",
  givenName: "",
  googleId: "",
  imageUrl: "",
  name: "",
};
const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.familyName = action.payload.familyName;
      state.email = action.payload.email;
      state.givenName = action.payload.givenName;
      state.googleId = action.payload.googleId;
      state.imageUrl = action.payload.imageUrl;
      state.name = action.payload.name;
    },
    resetUserInfo: (state, action) => {
      state = {
        email: "",
        familyName: "",
        givenName: "",
        googleId: "",
        imageUrl: "",
        name: "",
      };
    },
  },
});

export const { setUserInfo, resetUserInfo } = userReducer.actions;
export default userReducer;
