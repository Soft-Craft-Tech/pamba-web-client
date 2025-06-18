"use client";

import {
  useGetBusinessesAnalysis,
  useGetProfileCompletionStatus,
  useResendVerificationToken,
} from "@/app/api/businesses";
import { useGetSalesAnalysis } from "@/app/api/revenue";
import AppointmentsTable from "@/components/charts/appointments";
import AppointmentsCard from "@/components/charts/chartCard";
import FinancialSummary from "@/components/charts/financialsummary";
import Overview from "@/components/features/userAccount/dashboard/overview";
import AddProfileExpensesModal from "@/components/forms/addExpenses";
import { getUser } from "@/utils/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [verify, setVerify] = useState(false);

  const { mutateAsync: resendVerificationEmail, isPending } = useResendVerificationToken();
  const { data } = useGetProfileCompletionStatus();
  const { data: businessAnalysis } = useGetBusinessesAnalysis();
  const { data: revenueData } = useGetSalesAnalysis();
  const { client, business } = getUser();

  useEffect(() => {
    const sendVerificationEmail = async () => {
      if (verify) {
        await resendVerificationEmail(client? client?.email : business?.email);
        setVerify(false);
      }
    };
    sendVerificationEmail();
  }, [verify]);

  return (
    <div className="w-full flex flex-col gap-5">
      <AddProfileExpensesModal />

      {!client?.active && (
        <div className="flex flex-row items-center justify-between bg-orange-100 border border-orange-500 text-orange-700 p-5 rounded">
          <p>Please verify your email address before you proceed!</p>
          <button
            type="button"
            onClick={() => setVerify(true)}
            className="w-max py-2 px-5 bg-primary text-white font-semibold rounded-md capitalize disabled:opacity-50 disabled:cursor-wait"
            disabled={isPending}
          >
            Send Verification Email
          </button>
        </div>
      )}

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
