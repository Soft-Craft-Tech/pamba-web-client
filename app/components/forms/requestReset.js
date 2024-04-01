export default function RequestResetForm() {
    return (
        <form className="flex flex-col gap-4">
            <input type="email" required name="email" placeholder="Email" className="w-full h-10 border rounded-md py-1 px-2" />
            <button className="bg-primary text-white w-full h-10 rounded-md">Submit</button>
        </form>
    )
}