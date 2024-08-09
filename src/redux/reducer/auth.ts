import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/googleauth/IUser";
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
      state = action.payload;
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
