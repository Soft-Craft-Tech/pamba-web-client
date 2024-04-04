import ServiceInfoCard from "../../core/cards/serviceInfo"
export default function BusinessManagementServices() {
    return (
        <div className="p-20 flex flex-col items-center gap-16">
            <ServiceInfoCard
                reverse={false} 
                image="/sales.svg"
                title="Sales management"
                text="Your sales is the most important part of your business. 
                Our platform makes it easy to see your sales by category. 
                You get better visibility into the performance of each service so that you can make better decisions."
                functions={[
                    "Categorize sales according to services provided",
                    "See which clients gave you the most business",
                    "Know how much you make in sales per month",
                    "Automate payments into your Pamba account"
                ]}
            />
            <ServiceInfoCard
                reverse={true} 
                image="/expenses-snapshot.svg"
                title="Expense management"
                text="Your sales is the most important part of your business. Our platform makes it easy to see your sales by category. 
                You get better visibility into the performance of each service so that you can make better decisions."
                functions={[
                    "Categorize sales according to services provided",
                    "See which clients gave you the most business",
                    "Know how much you make in sales per month",
                    "Automate payments into your Pamba account"
                ]}
            />
            <ServiceInfoCard
                reverse={false} 
                image="/expenses-snapshot.svg"
                title="Inventory management"
                text="Your sales is the most important part of your business. Our platform makes it easy to see your sales by category. 
                You get better visibility into the performance of each service so that you can make better decisions."
                functions={[
                    "Categorize sales according to services provided",
                    "See which clients gave you the most business",
                    "Know how much you make in sales per month",
                    "Automate payments into your Pamba account"
                ]}
            />
        </div>
    )
}