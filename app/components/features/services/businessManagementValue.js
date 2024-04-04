import ValuePrepositionCard from "../../core/cards/pambaValueCards";
export default function ServiceValues() {
    return (
        <div className="w-full h-auto bg-white p-20 flex flex-col items-center gap-16">
            <h2 className="font-bold text-3xl w-max">What Pamba brings to your Business</h2>
            <div className="flex gap-10">
                <ValuePrepositionCard
                    title="Everything in one app"
                    text="Pamba consolidates all business essentials seamlessly in one app, 
                    providing you with a centralized hub that meets all your needs"
                    image="/dashboard-icon.svg"
                />
                <ValuePrepositionCard
                    title="Analytics"
                    text="Get data visualizations and derive actionable insights from your business data. Promote data driven decision making."
                    image="/insights-icon.svg"
                />
                <ValuePrepositionCard
                    title="Convenience"
                    text="Access Pamba app on your laptop, phone and tablet. Wherever you go, your business is with you."
                    image="/responsive-icon.svg"
                />
            </div>
        </div>
    )
}