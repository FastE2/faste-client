import Guard from '@/guards';
import LayoutPublic from '@/views/layouts/LayoutPublic';
import { ReactElement, ReactNode } from 'react';

type TProps = {
  authGuard?: boolean;
  guestGuard?: boolean;
  children: ReactNode;
  getLayout?: (page: ReactElement) => ReactNode;
};

const GuardLayoutWrapper = (props: TProps) => {
  const { children, authGuard = true, guestGuard = false, getLayout } = props;
  return (
    <Guard authGuard={authGuard} guestGuard={guestGuard}>
      {getLayout ? (
        getLayout(<>{children}</>)
      ) : (
        <LayoutPublic>{children}</LayoutPublic>
      )}
    </Guard>
  );
};

export default GuardLayoutWrapper;
