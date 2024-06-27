const appointmentsData = [
  { id: 0, appointment: "Braiding", time: "Today - 11.30 AM" },
  { id: 1, appointment: "Braiding", time: "Today - 11.30 AM" },
  { id: 2, appointment: "Braiding", time: "Today - 11.30 AM" },
];

const AppointmentsCard = () => {
  const todaysDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="flex flex-col gap-4 px-4">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-lg font-semibold">Appointments</h2>
          <p className="text-xs font-normal text-gray-600 border border-stroke p-1 rounded-md">
            Today, {todaysDate}
          </p>
        </div>
        <p className="text-sm font-normal text-gray-600">Today</p>
        <div className="flex flex-col gap-4">
          {appointmentsData.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col gap-1.5 border border-stroke dark:border-strokedark p-3 rounded-md bg-gray-50"
            >
              <p className="font-normal pb-1">{appointment.appointment}</p>
              <p className="text-xs font-normal text-gray-600">
                {appointment.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsCard;
