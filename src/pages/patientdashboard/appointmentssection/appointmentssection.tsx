import DateTimePickerComponent from "../../../components/datetimepicker/datetimepicker";
import InputComponent from "../../../components/input/input";
import { useAppSelector } from "../../../redux/store";
import { decryptObject } from "../../../utils/Encyption/encryption";

const AppointmentsSection = () => {
  //decrypting user data before displaying it to the user
  const userData = decryptObject(useAppSelector((state) => state.user));

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
        <form
          action="forms/appointment.php"
          method="post"
          role="form"
          className="php-email-form"
        >
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
              <DateTimePickerComponent />
            </div>
          </div>
          <div className="mt-3">
            <div className="loading">Loading</div>
            <div className="error-message"></div>
            <div className="sent-message">
              Your appointment request has been sent successfully. Thank you!
            </div>
            <div className="text-center">
              <button type="submit">Make an Appointment</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AppointmentsSection;
