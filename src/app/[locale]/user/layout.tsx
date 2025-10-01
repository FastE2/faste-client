import AppSidebar from '@/components/sidebar-user/app-sidebar-user';
import { SidebarProvider } from '@/components/ui/sidebar';
import GuardLayoutWrapper from '@/hocs/GuardLayoutWrapper';
import LayoutPublic from '@/views/layouts/LayoutPublic';
import { ReactElement } from 'react';

export default function ListVerticalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GuardLayoutWrapper
      getLayout={(page: ReactElement) => <LayoutPublic>{page}</LayoutPublic>}
      authGuard={true}
      guestGuard={false}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <SidebarProvider>
          <AppSidebar />
          <div className='bg-white h-fit dark:bg-black w-full rounded-xl p-4'>{children}</div>
        </SidebarProvider>
      </div>
    </GuardLayoutWrapper>
  );
}
