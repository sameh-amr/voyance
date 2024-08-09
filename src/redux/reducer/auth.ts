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
};
const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    //encrypt user information before saving it inside the store
    setUserInfo: (state, action) => {
      var encryptedValues = encryptObject(action.payload);
      state.familyName = encryptedValues.familyName;
      state.email = encryptedValues.email;
      state.givenName = encryptedValues.givenName;
      state.picture = encryptedValues.picture;
      state.name = encryptedValues.name;
    },
    resetUserInfo: (state, action) => {
      state = {
        email: "",
        familyName: "",
        givenName: "",
        picture: "",
        name: "",
        role: "Patient",
      };
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUserInfo, resetUserInfo, setUserRole } = userReducer.actions;
export default userReducer;
