"use client";
import { useGetProfileCompletionStatus } from "@/app/api/requests";
import AppointmentsTable from "@/components/charts/appointments";
import AppointmentsCard from "@/components/charts/chartCard";
import FinancialSummary from "@/components/charts/financialsummary";
import Overview from "@/components/features/userAccount/dashboard/overview";
import Link from "next/link";

export default function DashboardPage() {
  const { data } = useGetProfileCompletionStatus();

  return (
    <div className="w-full flex flex-col gap-5">
      {!data?.expenseAccounts && (
        <div className="flex flex-row justify-between gap-7 w-full h-auto bg-white p-5 rounded-md shadow-sm ">
          <p>Your profile is incomplete</p>
          <Link
            href="/user/complete-profile"
            className="w-max py-2 px-5 bg-primary text-white font-semibold rounded-md"
          >
            Complete Profile
          </Link>
        </div>
      )}
      <Overview />
      <FinancialSummary />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <AppointmentsTable />
        </div>
        <AppointmentsCard />
      </div>
    </div>
  );
}
