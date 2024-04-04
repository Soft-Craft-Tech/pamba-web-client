import PasswordResetForm from "../../components/forms/resetPassword"
export default function ResetPassword({params}) {
    return (
        <div className="">
            <PasswordResetForm token={params?.token} />
        </div>
    )
}