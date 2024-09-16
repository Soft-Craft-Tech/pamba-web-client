import ServiceInfoCard from "../../core/cards/serviceInfo";
export default function BusinessManagementServices() {
  return (
    <div className="p-5 py-10 flex flex-col items-center gap-16 sm:p-10 lg:p-20">
      <ServiceInfoCard
        reverse={false}
        image="/screenshots/inventory-page.svg"
        title="Sales management"
        text="Your sales is the most important part of your business. 
                Our platform makes it easy to see your sales by category. 
                You get better visibility into the performance of each service so that you can make better decisions."
        functions={[
          "Categorize sales according to services provided",
          "See which clients gave you the most business",
          "Know how much you make in sales per month",
          "Automate payments into your Pamba account",
        ]}
      />
      <ServiceInfoCard
        reverse={true}
        image="/screenshots/expenses-page.svg"
        title="Expense management"
        text="Managing your expenses is vital to maintaining profitability. Our platform helps you easily track where your money is going, so you can control costs and boost your bottom line."
        functions={[
          "Categorize expenses to see your exact spending",
          "Track vendor payments to know who you’re paying and how much",
          "Monitor your spending to stay on budget",
          "Schedule and automate payments to avoid late fees",
        ]}
      />
      {/* <ServiceInfoCard
        reverse={false}
        image="/screenshots/inventory-page.svg"
        title="Inventory management"
        text="Keep your business running smoothly with inventory management. We help you track stock levels and avoid shortages, ensuring that you always have what your customers need."
        functions={[
          "Categorize stock by type to easily see what items are available in each category.",
          "Identify top-selling items to know which products are flying off the shelves.",
          "Track stock levels to monitor your inventory in real-time and avoid shortages.",
          "Automate restocking to set up automatic orders when stock runs low.",
        ]}
      /> */}
    </div>
  );
}
