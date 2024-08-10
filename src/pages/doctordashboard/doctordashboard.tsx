import AppointmentsTable from "../../components/appointmentstable/appointmentstable";
import CalendarComponent from "./doctorcalendarcomponent/doctorcalendarcomponent";

const DoctorDashboard = () => {
  return (
    <div>
      <AppointmentsTable />
      <CalendarComponent />
    </div>
  );
};

export default DoctorDashboard;
