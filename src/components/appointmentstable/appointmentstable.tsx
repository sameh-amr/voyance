import { useAppSelector } from "../../redux/store";
import { IAppointment } from "../../models/appointment/IAppontment";
import "./styles.css";
import { IUser } from "../../models/googleauth/IUser";
import { AppointmentState } from "../../constants/appointmentstate";
import { Roles } from "../../constants/role";
import { useDispatch } from "react-redux";
import { removeAppointment } from "../../redux/reducer/appointment";
import { useState } from "react";

const AppointmentsTable = () => {
  const dispatch = useDispatch();
  const appointments: IAppointment[] = useAppSelector(
    (state) => state.appointments
  );
  const [appointmentDeleted, setAppointmentDeleted] = useState<boolean>(false);
  const userRole: string = useAppSelector((state) => state.user.role);

  const onAppointmentStateChanged = (appointment: IAppointment) => {
    dispatch(removeAppointment(appointment));
    setAppointmentDeleted(true);
    const timer = setTimeout(() => {
      setAppointmentDeleted(false);
    }, 3000);
  };
  return (
    <section className="departments section light-background">
      <div className="container">
        <div className="container section-title">
          <h2>Your history</h2>
          <p>this is where you can view your clinic history</p>
        </div>
        <div className="table-responsive">
          <div
            style={{ display: appointmentDeleted ? "block" : "none" }}
            className="error-message"
          >
            Appointment Deleted
          </div>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Date & Time</th>
                <th>Appointment State</th>
              </tr>
            </thead>
            <tbody>
              {!appointments || appointments.length === 0 ? (
                <span>Nothing to view yet !</span>
              ) : (
                appointments.map((appointment: IAppointment, index: number) => (
                  <tr key={index}>
                    <td>{appointment.email}</td>
                    <td>{appointment.name}</td>
                    <td>
                      {new Date(appointment.fromDateTime!).toLocaleString()}
                    </td>
                    <td>
                      {(userRole === Roles.PATIENT &&
                        appointment.appointmentState ===
                          AppointmentState.APPROVED) ||
                      appointment.appointmentState ===
                        AppointmentState.DECLINED ? (
                        appointment.appointmentState
                      ) : (
                        <select
                          className="form-control"
                          value={appointment.appointmentState || "Pending"}
                          onChange={() =>
                            onAppointmentStateChanged(appointment)
                          }
                        >
                          <option disabled>Pending</option>
                          <option value="Cancel">Cancel</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AppointmentsTable;
