'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CalendarDays,
  Layers,
  LayoutTemplate,
  Plus,
  MonitorSmartphone,
  Box,
  ArrowRight,
} from 'lucide-react';
import { getAllTemplatesBySeller } from '@/services/template.service';
import { useRouter } from 'next/navigation';

interface Template {
  id: number;
  name: string;
  categoriesView: number[];
  WidgetIds: number[];
  sellerId: number;
  isActive: boolean;
  platform: string;
  theme: string;
  createdAt: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

export default function TemplateListPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getAllTemplatesBySeller();
        setTemplates(res.data.data);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Empty State Component ---
  if (!isLoading && templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="bg-muted/30 p-6 rounded-full mb-2">
          <Box className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight">
          Chưa có mẫu giao diện nào
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Bạn chưa tạo bất kỳ template nào. Hãy bắt đầu tạo giao diện đầu tiên
          của bạn ngay hôm nay.
        </p>
        <Button className="mt-4" size="lg">
          <Plus className="mr-2 h-4 w-4" /> Tạo Template Mới
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Template Của Tôi
          </h1>
          <p className="text-muted-foreground mt-1">
            Quản lý và theo dõi trạng thái các mẫu giao diện bán hàng.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Tạo Mới
        </Button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? // --- Loading State (Skeletons) ---
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="h-full flex flex-col rounded-2xl">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent className="flex-grow space-y-3 py-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2 mt-4">
                    <Skeleton className="h-6 w-12 rounded-md" />
                    <Skeleton className="h-6 w-12 rounded-md" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full rounded-lg" />
                </CardFooter>
              </Card>
            ))
          : // --- Data Render ---
            templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: Template }) {
  const router = useRouter();
  return (
    <Card className="group h-full flex flex-col justify-between rounded-2xl border-border/50 shadow-sm  transition-all duration-300  overflow-hidden bg-card">
      {/* Card Header */}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-none tracking-tight group-hover:text-primary transition-colors">
              {template.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>{template.theme}</span>
            </div>
          </div>
          <Badge
            variant={template.isActive ? 'default' : 'secondary'}
            className={`${
              template.isActive
                ? 'bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/20 dark:text-green-400'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
            } border-0 font-medium px-2.5 py-0.5`}
          >
            {template.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="py-2 space-y-4 flex-grow">
        {/* Platform Badge */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <MonitorSmartphone className="w-4 h-4" /> Platform
          </span>
          <Badge
            variant="outline"
            className="font-normal border-primary/20 bg-primary/5 text-primary"
          >
            {template.platform}
          </Badge>
        </div>

        {/* Categories */}
        <div className="space-y-1.5">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3 h-3" /> Categories View
          </span>
          <div className="flex flex-wrap gap-1.5">
            {template.categoriesView.length > 0 ? (
              template.categoriesView.map((catId) => (
                <Badge
                  key={catId}
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 h-5 bg-muted text-muted-foreground hover:bg-muted/80"
                >
                  ID: {catId}
                </Badge>
              ))
            ) : (
              <span className="text-xs text-muted-foreground italic">None</span>
            )}
          </div>
        </div>
      </CardContent>

      {/* Separator visual trick */}
      <div className="h-px bg-border/50 w-full my-2" />

      {/* Card Footer */}
      <CardFooter className="pt-0 pb-4 flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground gap-1.5">
          <CalendarDays className="w-3.5 h-3.5" />
          {formatDate(template.createdAt)}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-xs font-medium hover:bg-primary/10 hover:text-primary group-hover:translate-x-1 transition-transform p-0 px-2 h-8 cursor-pointer"
          onClick={() =>
            router.push(`/sellercenter/seller-store/template/${template.id}`)
          }
        >
          Xem chi tiết <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
