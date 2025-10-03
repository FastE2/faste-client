import { IMenuItem, SELLER_MENU_ITEMS } from '@/configs/sidebar-items';

export default function useFindMenu(pathname: string) {
  let parent: IMenuItem | undefined;
  let child: IMenuItem | undefined;

  for (const item of SELLER_MENU_ITEMS) {
    if (item.url === pathname) {
      parent = item;
      break;
    }

    if (item.items) {
      const foundChild = item.items.find((sub) => sub.url === pathname);
      if (foundChild) {
        parent = item;
        child = foundChild;
        break;
      }
    }
  }

  return { parent, child };
}
