import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./styles.css"; // Import your custom CSS
import { useAppSelector } from "../../../redux/store";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const appointments = useAppSelector((state) => state.appointments);
  // Convert appointments to events for react-big-calendar
  const events = appointments.map((appt) => {
    const start = moment(appt.fromDateTime).toDate();
    const end = moment(appt.fromDateTime).add(20, "minutes").toDate();

    return {
      title: `${appt.name} (${appt.email})`,
      start,
      end,
      appointmentState: appt.appointmentState,
    };
  });

  const eventStyleGetter = (event: any) => {
    const backgroundColor =
      event.appointmentState === "Pending"
        ? "#f0ad4e"
        : event.appointmentState === "Approved"
        ? "#5bc0de"
        : "#d9534f";

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0",
        display: "block",
      },
    };
  };

  return (
    <section className="departments section">
      <div className="container">
        <div className="container section-title">
          <h2>Your Calendar</h2>
          <p>view calendar</p>
        </div>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh" }}
          views={["month", "week", "day"]}
          defaultView="month"
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </section>
  );
};

export default CalendarComponent;
