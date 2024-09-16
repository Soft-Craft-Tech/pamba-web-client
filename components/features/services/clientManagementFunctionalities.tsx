import ServiceInfoCard from "../../core/cards/serviceInfo"
export default function ClientManagementServices() {
    return (
      <div className="p-5 py-10 flex flex-col items-center gap-16 sm:p-10 lg:p-20">
        <ServiceInfoCard
          reverse={true}
          image="/screenshots/scheduling-page.svg"
          title="Appointment Scheduling"
          text="Pamba revolutionizes appointment scheduling with unparalleled ease and efficiency. 
                Seamlessly manage bookings and optimize your time with our intuitive platform."
          functions={[
            "Customizable calendar views for personalized organization",
            "Instant notification for immediate booking updates",
            "Effortlessly schedule client appointments",
          ]}
        />
        <ServiceInfoCard
          reverse={false}
          image="/screenshots/client-page.svg"
          title="Client Management"
          text="Effortlessly manage client relationships with Pamba's intuitive tools. 
                Elevate your service quality and satisfaction levels while staying organized and efficient."
          functions={[
            "Easy appointment scheduling and management",
            "Appointment reminders to reduce no-shows",
            "Client communication tools for seamless interactions",
            "History tracking to monitor client visits and preferences",
          ]}
        />
      </div>
    );
}