'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const data = [
  { month: 'Feb', current: 32000, previous: 28000 },
  { month: 'Mar', current: 28000, previous: 26000 },
  { month: 'Apr', current: 35000, previous: 27000 },
  { month: 'May', current: 31000, previous: 28000 },
  { month: 'Jun', current: 38000, previous: 29000 },
  { month: 'Jul', current: 26000, previous: 30000 },
  { month: 'Aug', current: 36000, previous: 31000 },
  { month: 'Sep', current: 33000, previous: 32000 },
  { month: 'Oct', current: 38000, previous: 33000 },
  { month: 'Nov', current: 35000, previous: 34000 },
  { month: 'Dec', current: 42000, previous: 35000 },
];

const chartConfig = {
  current: {
    label: 'Current Period',
    color: 'hsl(var(--foreground))',
  },
  previous: {
    label: 'Previous Period',
    color: 'hsl(var(--muted-foreground))',
  },
};

export function ReturningRateChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">
              Returning Rate
            </CardTitle>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">$42,379</p>
              <span className="text-sm font-medium text-success">+2.5%</span>
            </div>
          </div>

          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs"
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="current"
                stroke="var(--color-current)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="var(--color-previous)"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
