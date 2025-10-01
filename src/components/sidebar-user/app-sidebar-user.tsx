'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  Command,
  Frame,
  Home,
  Inbox,
  PieChart,
  Search,
  Settings,
  Settings2,
  SquareTerminal,
} from 'lucide-react';
import { USER_MENU_ITEMS } from '@/configs/sidebar-items';
import { NavMain } from './nav-main-user';
import Image from 'next/image';

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

const data = {
  user: {
    title: 'User',
    name: 'shadcn',
    email: 'm@example.com',
  },
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export default function AppSidebar() {
  return (
    <Sidebar
      side="right"
      variant="floating"
      collapsible="none"
      className="w-[300px] h-auto relative bg-transparent"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-4 mb-4 w-full h-auto">
            <div>
              <Image
                src={'/nftt-1.png'}
                alt={'ok'}
                width={100}
                height={100}
                className="rounded-full w-15 h-15 object-cover object-center"
              />
            </div>
            <div>
              <h3 className="font-medium">customer_user_name</h3>
            </div>
          </SidebarGroupLabel>
          <div className="w-full bg-[#dddd] h-[1px]"></div>
          <NavMain items={USER_MENU_ITEMS} />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
