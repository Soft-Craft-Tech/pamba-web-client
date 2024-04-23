import { SettingsContextWrapper } from "@/context/userAccount/settingsContext";
import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SettingsContextWrapper>{children}</SettingsContextWrapper>
    </div>
  );
}
