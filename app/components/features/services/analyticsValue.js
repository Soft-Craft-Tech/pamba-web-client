import ValuePrepositionCard from "../../core/cards/pambaValueCards";

export default function AnalyticsValue() {
    return (
        <div className="w-full h-auto bg-white p-20 flex flex-col items-center gap-16">
            <h2 className="font-bold text-3xl w-max">Use your business data to make informed decisions.</h2>
            <div className="flex gap-10">
                <ValuePrepositionCard
                    title="Export Data"
                    text="Pamba allows you to export data to CSV/Excel formats for further in-depth analysis, empowering users to make informed decisions ."
                    image="/reports-icon.svg"
                />
                <ValuePrepositionCard
                    title="Analytics"
                    text="Get data visualizations and derive actionable insights from your business data. Promote data driven decision making."
                    image="/insights-icon.svg"
                />
            </div>
        </div>
    )
}