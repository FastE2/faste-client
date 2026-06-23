import Guard from '@/guards';
import LayoutPublic from '@/views/layouts/LayoutPublic/LayoutPublic';
import { ReactElement, ReactNode } from 'react';

type TProps = {
  authGuard?: boolean;
  guestGuard?: boolean;
  children: ReactNode;
  getLayout?: (page: ReactElement) => ReactNode;
  roles?: string[];
};

const GuardLayoutWrapper = (props: TProps) => {
  const { children, authGuard = true, guestGuard = false, getLayout, roles } = props;
  const content = getLayout ? getLayout(<>{children}</>) : <LayoutPublic>{children}</LayoutPublic>;

  if (!authGuard && !guestGuard) {
    return content;
  }

  return (
    <Guard authGuard={authGuard} guestGuard={guestGuard} roles={roles}>
      {content}
    </Guard>
  );
};

export default GuardLayoutWrapper;
