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
        appointmentState: action.payload.appointmentState,
      };
      var appointmentsEntriesArray = state;
      appointmentsEntriesArray.push(newEntry);
      state = appointmentsEntriesArray;
    },

    removeAppointment: (state, action) => {
      return state.filter(
        (appointment) =>
          appointment.email !== action.payload.email ||
          appointment.name !== action.payload.name ||
          appointment.fromDateTime !== action.payload.fromDateTime
      );
    },
    resetAppointments: (state, action) => {
      state = [];
    },
  },
});

export const { setAppointmentInfo, resetAppointments, removeAppointment } =
  appointmentReducer.actions;
export default appointmentReducer;
