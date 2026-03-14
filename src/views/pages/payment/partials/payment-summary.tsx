import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import type { PaymentStatus } from '@/hooks/use-payment-state';
import { formatCurrencyWithExchange } from '@/utils';
import { useTranslation } from 'react-i18next';

interface PaymentSummaryProps {
  transactionData: any;
  paymentStatus?: PaymentStatus;
}

export default function PaymentSummary({
  transactionData,
  paymentStatus = 'idle',
}: PaymentSummaryProps) {
  const { t, i18n } = useTranslation();

  const getStatusBadge = () => {
    switch (paymentStatus) {
      case 'success':
        return (
          <Badge className="bg-green-600 hover:bg-green-700">{t('order.tabs.completed')}</Badge>
        );
      case 'processing':
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700">{t('order.tabs.shipping')}</Badge>
        );
      case 'error':
        return <Badge className="bg-red-600 hover:bg-red-700">{t('order.tabs.cancelled')}</Badge>;
      default:
        return (
          <Badge className="bg-slate-600 hover:bg-slate-700">{t('order.tabs.pending')}</Badge>
        );
    }
  };

  return (
    <Card className="border-0 shadow-lg sticky top-8 max-h-[450px]">
      <CardHeader className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{t('payment.summary.title')}</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Order ID */}
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              {t('payment.summary.orderId')}
            </p>
            <p className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
              {transactionData?.id}
            </p>
          </div>

          <Separator className="bg-slate-200 dark:bg-slate-800" />

          {/* Description */}
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              {t('payment.summary.description')}
            </p>
            <p className="text-sm text-slate-900 dark:text-white">
              {`DH${transactionData?.id}`}
            </p>
          </div>

          <Separator className="bg-slate-200 dark:bg-slate-800" />

          {/* Total Amount */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              {t('payment.summary.amount')}
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {formatCurrencyWithExchange(Number(transactionData?.total), {
                language: i18n.language as 'vi' | 'en' | 'cn' | 'kr',
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
