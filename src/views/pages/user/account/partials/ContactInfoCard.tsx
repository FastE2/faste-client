import { Button } from '@/components/ui/button';
import { maskString, maskStringEmail } from '@/helpers/mask-string';
import { useTranslation } from 'react-i18next';

type TProps = {
  email: string;
  phoneNumber: string;
};

const ContactInfoCard = (props: TProps) => {
  const {t} = useTranslation()
  const {email, phoneNumber} = props
  return (
    <div className="flex flex-col gap-y-4">
      <div>{t('account.phoneEmail')}</div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm">Số điện thoại:</div>
          <div className="text-sm">{phoneNumber ? maskString(phoneNumber) : "Thêm số điện thoại"}</div>
        </div>
        <Button variant={'outline'}>{t('common.update')}</Button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm">Địa chỉ email:</div>
          <div className="text-sm">{email ? maskStringEmail(email) : "Thêm email"}</div>
        </div>
        <Button variant={'outline'}>{t('common.update')}</Button>
      </div>
    </div>
  );
};

export default ContactInfoCard;
