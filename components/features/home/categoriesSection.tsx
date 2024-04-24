import Category from "../../core/cards/categoryCard"
export default function CategoriesSection() {
    return (
        <section className="px-5 pb-16 flex justify-center lg:px-20 lg:pb-16">
            <div className="w-full flex flex-wrap gap-6 justify-center lg:w-2/3">
                <Category img="/salon-icon.svg" text="Hair Salon" />
                <Category img="/barbershop-icon.svg" text="Barbershop" />
                <Category img="/spa-icon.svg" text="Spa" />
                <Category img="/nails-icon.svg" text="Nail Parlor" />
                <Category img="/tattoo-icon.svg" text="Tattoo Parlor" />
                <Category img="/makeup-icon.svg" text="Makeup" />
                <Category img="/waxing-icon.svg" text="Waxing Salon" />
                <Category img="/wedding-icon.svg" text="Wedding Stylist" />
            </div>
        </section>
    )
}