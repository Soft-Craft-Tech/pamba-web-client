import ServiceInfoCard from "../../core/cards/serviceInfo";
export default function AnalyticsService() {
  return (
    <div className="p-5 py-10 flex flex-col items-center gap-16 sm:p-10 lg:p-20">
      <ServiceInfoCard
        reverse={true}
        image="/pamba-analytics.svg"
        title="Reports and Analytics"
        text="Pamba's Analytics and Reporting empowers businesses to drive growth through data-driven decision-making. 
                Gain valuable insights into sales, expenses, and performance metrics, and leverage them to craft strategies for sustainable success."
        functions={[
          "Track sales performance over time",
          "Monitor expenses and financial trends",
          "Export data to CSV format for further analysis",
        ]}
      />
    </div>
  );
}
