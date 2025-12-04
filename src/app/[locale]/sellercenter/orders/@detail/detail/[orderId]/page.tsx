import OrderDetailPage from '@/views/pages/sellercenter/orders/[orderId]';
import { notFound } from 'next/navigation';

interface DetailOrderPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderDetailSlot({
  params,
}: DetailOrderPageProps) {
  const { orderId } = await params;

  if (!orderId) {
    return notFound();
  }
  return <OrderDetailPage orderId={orderId} />;
}
