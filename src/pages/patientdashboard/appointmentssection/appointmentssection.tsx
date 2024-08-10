import { useState } from "react";
import DateTimePickerComponent from "../../../components/datetimepicker/datetimepicker";
import InputComponent from "../../../components/input/input";
import { useAppSelector } from "../../../redux/store";
import { decryptObject } from "../../../utils/Encyption/encryption";
import { IAppointment } from "../../../models/appointment/IAppontment";
import { useDispatch } from "react-redux";
import { setAppointmentInfo } from "../../../redux/reducer/appointment";
import { AppointmentState } from "../../../constants/appointmentstate";
import "./styles.css";

const AppointmentsSection = () => {
  const userData = decryptObject(useAppSelector((state) => state.user));
  const dispatch = useDispatch();

  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment>({
    name: userData.name,
    email: userData.email,
    fromDateTime: new Date(),
    appointmentState: AppointmentState.PENDING,
  });

  const [appointmentScheduled, setAppointmentScheduled] =
    useState<boolean>(false);
  const [appointentError, setAppointmentError] = useState<boolean>(false);

  const onstartDateTimeChange = (value: Date | null) => {
    setSelectedAppointment({
      ...selectedAppointment,
      fromDateTime: value ?? new Date(),
    });
  };

  //dispatch the action for storing the new appointment for the user
  function onMakeAnAppointmentClicked(event: any): void {
    try {
      dispatch(setAppointmentInfo(selectedAppointment));
      setAppointmentScheduled(true);
      setTimeout(() => {
        setAppointmentScheduled(false);
      }, 2000);
    } catch (err) {
      setAppointmentError(true);
      setTimeout(() => {
        setAppointmentError(false);
      }, 2000);
    }
    setSelectedAppointment({
      name: userData.name,
      email: userData.email,
      fromDateTime: new Date(),
      appointmentState: AppointmentState.PENDING,
    });
  }

  return (
    <section id="appointment" className="appointment section">
      <div className="container section-title">
        <h2>Appointment</h2>
        <p>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>
      <div className="container" data-aos-delay="100">
        <div role="form" className="php-email-form">
          <div className="row">
            <div className="col-md-4 form-group">
              <InputComponent
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeHolder="Your Name"
                required={false}
                disabled={true}
                value={userData.name ?? ""}
              />
            </div>
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <InputComponent
                type="text"
                name="email"
                className="form-control"
                id="email"
                placeHolder="Your Email"
                required={false}
                disabled={true}
                value={userData.email ?? ""}
              />
            </div>
            <div className="col-md-4 form-group mt-3 mt-md-0">
              <DateTimePickerComponent
                selectedDateAndTime={selectedAppointment.fromDateTime}
                onChange={onstartDateTimeChange}
              />
            </div>
          </div>
          <div className="mt-3">
            {appointentError && (
              <div
                style={{ display: appointentError ? "block" : "none" }}
                className="error-message"
              >
                Something went wrong
              </div>
            )}

            <div
              style={{ display: appointmentScheduled ? "block" : "none" }}
              className="sent-message"
            >
              Your appointment request has been sent successfully. Thank you!
            </div>

            <div className="text-center">
              <button
                className="appointment-btn"
                onClick={onMakeAnAppointmentClicked}
              >
                Make an Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentsSection;
