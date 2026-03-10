import { LoginForm } from '@/components/login-form';
import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import LayoutPublic from '@/views/layouts/LayoutPublic';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Đăng nhập tài khoản - FastE',
};

export default function LoginPage() {
  return (
    <GuardLayoutWrapper
      guestGuard={true}
      getLayout={(page: ReactNode) => <LayoutPublic>{page}</LayoutPublic>}
    >
      <div className="bg-muted flex  flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginForm />
        </div>
      </div>
    </GuardLayoutWrapper>
  );
}
