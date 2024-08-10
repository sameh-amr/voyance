import React, { useState } from "react";
import DatePicker from "react-datepicker";

const DateTimePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const isValidDate = (date: Date) => {
    const day = date.getDay();

    // Disable weekends
    if (day === 5 || day === 6) return false;

    return true;
  };

  const isValidTime = (date: Date) => {
    const currentDate = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Disable weekends

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

  const timeClassName = (date: Date) => {
    const time = date.getTime();

    if (time === new Date().setHours(9, 20, 0, 0)) return "pending-time";
    if (time === new Date().setHours(10, 0, 0, 0)) return "approved-time";

    return "";
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(new Date(date ?? ""));
        console.error(new Date(date ?? ""));
      }}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={20}
      timeCaption="Time"
      filterDate={isValidDate}
      filterTime={isValidTime}
      timeClassName={timeClassName}
      dateFormat="yyyy-MM-dd HH:mm:ss"
    />
  );
};

export default DateTimePickerComponent;
