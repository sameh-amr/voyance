import { useAppSelector } from "../../redux/store";
import { IAppointment } from "../../models/appointment/IAppontment";
import "./styles.css";
import { AppointmentState } from "../../constants/appointmentstate";
import { Roles } from "../../constants/role";
import { useDispatch } from "react-redux";
import {
  removeAppointment,
  updateAppointment,
} from "../../redux/reducer/appointment";
import { useState } from "react";

const AppointmentsTable = () => {
  const dispatch = useDispatch();
  const appointments: IAppointment[] = useAppSelector(
    (state) => state.appointments
  );
  const [appointmentDeleted, setAppointmentDeleted] = useState<boolean>(false);
  const [appointmentUpdated, setAppointmentUpdated] = useState<boolean>(false);

  const userRole: string = useAppSelector((state) => state.user.role);

  const onAppointmentStateChanged = (appointment: IAppointment, e: any) => {
    if (
      e.target.value === AppointmentState.APPROVED ||
      e.target.value === AppointmentState.DECLINED
    ) {
      dispatch(
        updateAppointment({
          ...appointment,
          appointmentState: e.target.value,
        })
      );
      setAppointmentUpdated(true);
      setTimeout(() => {
        setAppointmentUpdated(false);
      }, 3000);
    } else {
      dispatch(removeAppointment(appointment));
      setAppointmentDeleted(true);
      setTimeout(() => {
        setAppointmentDeleted(false);
      }, 3000);
    }
  };
  return (
    <section className="departments section light-background">
      <div className="container">
        <div className="container section-title">
          <h2>
            {userRole === Roles.PATIENT
              ? "Your History"
              : "Scheduled Appointments"}
          </h2>
          {userRole === Roles.PATIENT && (
            <p>this is where you can view your clinic history</p>
          )}
        </div>
        <div className="table-responsive">
          <div
            style={{ display: appointmentDeleted ? "block" : "none" }}
            className="error-message"
          >
            Appointment Deleted
          </div>

          <div
            style={{ display: appointmentUpdated ? "block" : "none" }}
            className="sent-message"
          >
            request has been updated successfully. Thank you!
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
                      {/*here i am telling react if this user is a patient and the appointment is approved or declined siable select and show him the state */}
                      {/*here i am telling react if this user is a patient and the appointment isnot yet approved or declined he can cancel it */}
                      {/*same with the doctor but switching the options */}

                      {appointment.appointmentState ===
                        AppointmentState.APPROVED ||
                      appointment.appointmentState ===
                        AppointmentState.DECLINED ? (
                        appointment.appointmentState
                      ) : (
                        <select
                          className="form-control"
                          value={appointment.appointmentState || "Pending"}
                          onChange={(e) =>
                            onAppointmentStateChanged(appointment, e)
                          }
                          disabled={
                            appointment.appointmentState ===
                              AppointmentState.APPROVED ||
                            appointment.appointmentState ===
                              AppointmentState.DECLINED
                          }
                        >
                          {userRole === Roles.PATIENT ? (
                            <>
                              <option disabled>Pending</option>
                              <option value="Cancel">Cancel</option>
                            </>
                          ) : (
                            <>
                              <option value="">Action</option>
                              <option value={AppointmentState.APPROVED}>
                                Accepted
                              </option>
                              <option value={AppointmentState.DECLINED}>
                                Declined
                              </option>
                            </>
                          )}
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
