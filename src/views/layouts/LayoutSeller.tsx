'use client';

import { ReactNode } from 'react';
import ListVerticalLayout from './ListVerticalLayout';

export default function LayoutSeller({ children }: { children: ReactNode }) {
  return (
    <div>
      <ListVerticalLayout>
        <main>{children}</main>
      </ListVerticalLayout>
    </div>
  );
}
