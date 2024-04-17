import KPI from "../cards/KPICards";
export default function Overview() {
  return (
    <div className="flex w-full h-60 gap-5">
      <div className="bg-white rounded-md h-full w-full p-5 text-secondary shadow-md flex items-center gap-5">
        <div className="flex flex-col justify-between h-full w-full">
          <div>
            <h2 className="text-primary font-semibold text-2xl">
              Welcome back
            </h2>
            <p className="text-sm font-light text-muted">
              Here&apos;s what happening in your business today
            </p>
          </div>
          <div>
            <h4 className="font-semibold">
              Ksh <span className="text-xl font-bold">50, 000</span>
            </h4>
            <p className="font-light text-sm text-muted">
              Today&apos;s Revenue
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl">200</h4>
            <p className="font-light text-sm text-muted">
              Scheduled appointments
            </p>
          </div>
        </div>
      </div>
      <div className="h-full w-full grid grid-cols-2 grid-rows-2 gap-3">
        <KPI
          title="This month Revenue"
          value={50000}
          change={10}
          positiveChange={false}
          financial={true}
        />
        <KPI
          title="This month Appointments"
          value={500}
          change={10}
          positiveChange={true}
          financial={false}
        />
        <KPI
          title="This month Expenses"
          value={20000}
          change={10}
          positiveChange={true}
          financial={true}
        />
      </div>
    </div>
  );
}
