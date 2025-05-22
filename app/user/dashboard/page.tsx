"use client";
import {
  useGetBusinessesAnalysis,
  useGetProfileCompletionStatus,
} from "@/app/api/businesses";
import { useGetSalesAnalysis } from "@/app/api/revenue";
import AppointmentsTable from "@/components/charts/appointments";
import AppointmentsCard from "@/components/charts/chartCard";
import FinancialSummary from "@/components/charts/financialsummary";
import Overview from "@/components/features/userAccount/dashboard/overview";
import AddProfileExpensesModal from "@/components/forms/addExpenses";
import { getUser } from "@/utils/auth";
import Link from "next/link";

export default function DashboardPage() {
  const { data } = useGetProfileCompletionStatus();
  const { data: businessAnalysis } = useGetBusinessesAnalysis();
  const { data: revenueData } = useGetSalesAnalysis();
  const { client } = getUser();

  return (
    <div className="w-full flex flex-col gap-5">
      <AddProfileExpensesModal />

      {/* {!client?.verified && (
        <div className="flex flex-row items-center justify-between bg-orange-100 border border-orange-500 text-orange-700 p-5 rounded">
          <p>Please verify your email address before you proceed!</p>
          <Link
            href="/user/complete-profile"
            className="w-max py-2 px-5 bg-primary text-white font-semibold rounded-md"
          >
            Send Verification Email
          </Link>
        </div>
      )} */}

      {(!data?.openingAndClosing || !client?.weekday_opening) && (
        <div className="flex flex-row items-center justify-between gap-7 w-full h-auto bg-white p-5 rounded-md shadow-sm ">
          <p>Please complete your profile to unlock all features.</p>
          <Link
            href="/user/complete-profile"
            className="w-max py-2 px-5 bg-primary text-white font-semibold rounded-md"
          >
            Complete Profile
          </Link>
        </div>
      )}
      <Overview {...businessAnalysis} />
      <FinancialSummary
        lifetime_expenses={businessAnalysis?.lifetime_expenses}
        lifetime_sales={revenueData?.lifetime_sales}
      />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <AppointmentsTable {...businessAnalysis} />
        </div>
        <AppointmentsCard />
      </div>
    </div>
  );
}
