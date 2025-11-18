import OrderDetailPage from '@/views/pages/sellercenter/orders/[orderId]';
import { notFound } from 'next/navigation';

// server component
interface DetailOrderPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function Page({ params }: DetailOrderPageProps) {
  const { orderId } = await params;

  if (!orderId) {
    return notFound();
  }

  return <OrderDetailPage params={{ orderId }} />;
}
