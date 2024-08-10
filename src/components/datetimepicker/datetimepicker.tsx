import DatePicker from "react-datepicker";
import { IAppointment } from "../../models/appointment/IAppontment";
import { useAppSelector } from "../../redux/store";

const DateTimePickerComponent = (props: {
  selectedDateAndTime: Date;
  onChange: (selectedValue: Date | null) => void;
}) => {
  const { selectedDateAndTime, onChange } = props;
  const currentAppointments: IAppointment[] = useAppSelector(
    (state) => state.appointments
  );

  const isValidDate = (date: Date) => {
    const day = date.getDay();

    // Disable weekends
    if (day === 5 || day === 6) return false;

    return true;
  };

  const isValidTime = (date: Date) => {
    const currentDate = date;
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const existingAppointment = currentAppointments.find((appointment) => {
      const existingDate = new Date(appointment.fromDateTime);
      return (
        existingDate.getFullYear() === date.getFullYear() &&
        existingDate.getMonth() === date.getMonth() &&
        existingDate.getDate() === date.getDate() &&
        existingDate.getHours() === hours &&
        existingDate.getMinutes() === minutes
      );
    });

    // Return false if the date and time already exist
    if (existingAppointment) return false;
    // Allow only 9 am to 5 pm
    if (hours < 9 || hours >= 17) return false;

    // Specify 20-minute intervals
    if (minutes % 20 !== 0) return false;

    // Disable times before the current time on the current date
    if (
      (date.getDate() === currentDate.getDate() &&
        hours < currentDate.getHours()) ||
      (hours === currentDate.getHours() && minutes < currentDate.getMinutes())
    ) {
      return false;
    }

    // // Disable approved time slot
    // if (hours === 10 && minutes === 0) return false;

    return true;
  };

  return (
    <DatePicker
      selected={selectedDateAndTime}
      onChange={onChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={20}
      timeCaption="Time"
      filterDate={isValidDate}
      filterTime={isValidTime}
      dateFormat="yyyy-MM-dd HH:mm:ss"
      minDate={new Date()}
      className="w-100"
    />
  );
};

export default DateTimePickerComponent;
