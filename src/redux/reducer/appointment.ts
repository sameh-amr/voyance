import { createSlice } from "@reduxjs/toolkit";
import { encryptObject } from "../../utils/Encyption/encryption";
import { IAppointment } from "../../models/appointment/IAppontment";
//defining the state and actions for the appointments in our redux store
const initialState: IAppointment[] = [];
const appointmentReducer = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    //encrypt user information before saving it inside the store
    setAppointmentInfo: (state, action) => {
      var newEntry: IAppointment = {
        email: action.payload.email,
        name: action.payload.name,
        fromDateTime: action.payload.fromDateTime,
      };
      var appointmentsEntriesArray = state;
      appointmentsEntriesArray.push(newEntry);
      state = appointmentsEntriesArray;
    },
    resetAppointments: (state, action) => {
      state = [];
    },
  },
});

export const { setAppointmentInfo, resetAppointments } = appointmentReducer.actions;
export default appointmentReducer;
