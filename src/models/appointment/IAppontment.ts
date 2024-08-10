//identifying the type for our user
export type IAppointment = {
  email: string | null;
  name: string | null;
  fromDateTime: Date;
  appointmentState: string;
};
