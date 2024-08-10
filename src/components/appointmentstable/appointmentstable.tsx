import { useAppSelector } from "../../redux/store";
import { IAppointment } from "../../models/appointment/IAppontment";
import "./styles.css";

const AppointmentsTable = () => {
  const appointments: IAppointment[] = useAppSelector(
    (state) => state.appointments
  );
  return (
    <section className="departments section light-background">
      <div className="container">
        <div className="container section-title">
          <h2>Your history</h2>
          <p>this is where you can view your clinic history</p>
        </div>
        <div className="table-responsive">
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
              {appointments.map((appointment: IAppointment, index: number) => (
                <tr key={index}>
                  <td>{appointment.email}</td>
                  <td>{appointment.name}</td>
                  <td>{new Date(appointment.fromDateTime).toLocaleString()}</td>
                  <td>
                    <select
                      className="form-control"
                      value={appointment.appointmentState || "Pending"}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AppointmentsTable;
