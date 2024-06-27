const appointmentsEndpoints: { [key: string]: string } = {
  bookAppointments: "/appointments/book/web-appointments",
  rescheduleAppointments: "/appointments/reschedule/",
  cancelAppointments: "/appointments/cancel/",
  singleClientAppointments: "/appointments/my-appointments",
  assignAppointment: "/appointments/assign-appointment/",
  fetchAllAppointments: "/appointments/business-appointments",
  singleAppointment: "/appointments/",
  endAppointment: "/appointments/end-appointment/",
  sendAppointmentReminder: "/appointments/send-reminders",
};

export default appointmentsEndpoints;
