import { AppSidebarSeller } from '@/components/sidebar-seller/app-sidebar-seller';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ROUTE_CONFIG } from '@/configs/router';
import useFindMenu from '@/hooks/use-find-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ListVerticalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const findMenuSelect = useFindMenu(pathname);

  return (
    <SidebarProvider>
      <AppSidebarSeller />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-[#F5F5F5] dark:bg-[#121212]">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <Link href={ROUTE_CONFIG.SELLER.DASHBOARD}>
                    Trang chủ
                  </Link>
                </BreadcrumbItem>
                {findMenuSelect.parent &&
                  findMenuSelect.parent.url !==
                    ROUTE_CONFIG.SELLER.DASHBOARD && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {findMenuSelect.parent.title}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                {findMenuSelect.child && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {findMenuSelect.child.title}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[#F5F5F5] dark:bg-[#121212]">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
