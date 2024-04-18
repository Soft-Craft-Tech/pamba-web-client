import ChangePassword from "./changePasswordForm"
export default function PasswordSecurity() {
    return (
        <div className="flex flex-col gap-5">
            <h2 className="font-semibold ">Change Password</h2>
            <ChangePassword />
        </div>
    )
}