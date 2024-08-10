import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../models/googleauth/IUser";
import { encryptObject } from "../../utils/Encyption/encryption";
//defining the state and actions for the userslice in our redux store
const initialState: IUser = {
  email: "",
  familyName: "",
  givenName: "",
  picture: "",
  name: "",
  role: "Patient",
  isAuthenticated: false,
};
const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    //encrypt user information before saving it inside the store
    setUserInfo: (state, action) => {
      var encryptedValues = encryptObject(action.payload);
      state.familyName = encryptedValues.family_name;
      state.email = encryptedValues.email;
      state.givenName = encryptedValues.given_name;
      state.picture = encryptedValues.picture;
      state.name = encryptedValues.name;
      state.isAuthenticated = true;
    },
    resetUserInfo: (state) => {
      return initialState;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUserInfo, resetUserInfo, setUserRole } = userReducer.actions;
export default userReducer;
