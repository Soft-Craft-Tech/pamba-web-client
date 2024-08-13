import ServiceCard from "../../core/cards/serviceCard"
export default function Services() {
    return (
        <section>
            <ServiceCard 
                bgWhite={true}
                img={"/screenshots/scheduling.svg"}
                title="Appointment Scheduling"
                text="Elevate customer satisfaction with our intuitive appointment management system. 
                Enable clients to book appointments online, receive timely notifications, and effortlessly manage their bookings, enhancing their overall experience."
                url="/services/scheduling"
            />
            <ServiceCard
                bgWhite={false}
                img={"/screenshots/book-keeping.svg"}
                title="Book Keeping and Financial Management"
                text="Streamline your business's financial management with our comprehensive Book Keeping and Financial Management service. 
                Effortlessly handle revenue, and reporting in one intuitive platform. 
                Simplify your finances and focus on growing your business with ease."
                url="/services/business-management"
            />
            <ServiceCard
                bgWhite={true}
                img={"/screenshots/staff.svg"}
                title="Staff and Client Management"
                text="Efficiently manage your staff and clients with our integrated system. 
                Streamline scheduling to meet customer demand while minimizing overstaffing, ensuring optimal productivity for your business."
                url="/services/business-management"
            />
            <ServiceCard
                bgWhite={false}
                img={"/screenshots/reports.svg"} 
                title="Reporting and Analytics"
                text="Easily track sales, expenses, and other key metrics vital to your business's success. 
                Gain valuable insights at a glance, empowering informed decision-making for enhanced performance."
                url="/services/reporting"
            />
            
        </section>
    )
}