import DashboardPage from "@/views/pages/sellercenter/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Seller Dashboard - FastE',
  description: 'Manage your sales, track performance, and grow your business with FastE\'s Seller Dashboard. Access real-time analytics, order management, and inventory tracking all in one place.',
};

export default function Page() {
  return (
    <>
      <DashboardPage />
    </>
  );
}
