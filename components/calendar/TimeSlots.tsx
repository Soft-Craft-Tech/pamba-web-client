"use client";
import { Fragment, useRef } from "react";
import { Typography } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import { SchedulerRef } from "@aldabil/react-scheduler/types";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { EVENTS, RESOURCES } from "@/utils/data";

function Calendar() {
  const calendarRef = useRef<SchedulerRef>(null);

  return (
    <Fragment>
      <Scheduler
        ref={calendarRef}
        events={EVENTS}
        resources={RESOURCES}
        resourceFields={{
          idField: "admin_id",
          textField: "title",
          subTextField: "mobile",
          avatarField: "title",
          colorField: "color",
        }}
        // fields={[
        //   {
        //     name: "admin_id",
        //     type: "select",
        //     default: RESOURCES[0].admin_id,
        //     options: RESOURCES.map((res) => {
        //       return {
        //         id: res.admin_id,
        //         text: `${res.title} (${res.mobile})`,
        //         value: res.admin_id,
        //       };
        //     }),
        //     config: { label: "Assignee", required: true },
        //   },
        // ]}
        // viewerExtraComponent={(fields, event) => {
        //   return (
        //     <div>
        //       {fields.map((field, i) => {
        //         if (field.name === "admin_id") {
        //           const admin = field?.options?.find(
        //             (fe) => fe.id === event.admin_id
        //           );
        //           return (
        //             <Typography
        //               key={i}
        //               style={{ display: "flex", alignItems: "center" }}
        //               color="textSecondary"
        //               variant="caption"
        //               noWrap
        //             >
        //               <PersonRoundedIcon /> {admin?.text}
        //             </Typography>
        //           );
        //         } else {
        //           return "";
        //         }
        //       })}
        //     </div>
        //   );
        // }}
      />
    </Fragment>
  );
}

export default Calendar;
