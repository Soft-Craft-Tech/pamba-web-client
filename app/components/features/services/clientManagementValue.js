import ValuePrepositionCard from "../../core/cards/pambaValueCards";

export default function ClientManagementValue() {
    return (
        <div className="w-full h-auto bg-white p-20 flex flex-col items-center gap-16">
            <h2 className="font-bold text-3xl w-max">Effortless client and appointment management.</h2>
            <div className="flex gap-10">
                <ValuePrepositionCard
                    title="Easy Scheduling"
                    text="Pamba streamlines client appointment management, enabling efficient scheduling. 
                    It empowers you to plan your day more effectively and maximize productivity."
                    image="/calendar-icon.svg"
                />
                <ValuePrepositionCard
                    title="Instant Notifications"
                    text="Experience instant notification functionality within Pamba, ensuring you receive immediate alerts as soon as appointments are booked. "
                    image="/notification-icon.svg"
                />
            </div>
        </div>
    )
}