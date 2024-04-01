export default function PasswordResetForm() {
    return (
        <form className="flex flex-col gap-4">
            <input className="w-full h-10 border rounded-md py-1 px-2" name="password" type="password" placeholder="Password" required />
            <input className="w-full h-10 border rounded-md py-1 px-2" name="confirmPassword" type="password" placeholder="Confirm Password" required />
            <button className="bg-primary text-white w-full h-10 rounded-md">Submit</button>
        </form>
    )
}