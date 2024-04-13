import { SettingsContextWrapper } from "@/app/context/userAccount/settingsContext"
export default function SettingsLayout({children}) {
    return(
        <div>
            <SettingsContextWrapper>
                {children}
            </SettingsContextWrapper>
        </div>
    )
}