"use client";
import * as React from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const events: Event[] = [
  {
    id: 1,
    title: "Meeting",
    start: new Date(2024, 4, 5, 10, 0),
    end: new Date(2024, 4, 5, 11, 0),
  },
  {
    id: 2,
    title: "Lunch",
    start: new Date(2024, 4, 6, 12, 0),
    end: new Date(2024, 4, 6, 13, 0),
  },
];

const Timeslots = () => {
  const defaultDate = React.useMemo(() => new Date(2015, 3, 12), []);

  return (
    <React.Fragment>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={events}
          step={15}
          timeslots={8}
          localizer={localizer}
        />
      </div>
    </React.Fragment>
  );
};

export default Timeslots;
