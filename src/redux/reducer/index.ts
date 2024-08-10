//a single index file for exporting all our reducers to avoid too many exports inside the store
import userReducer from "./auth";
import appointmentReducer from "./appointment";
export { userReducer,appointmentReducer };
