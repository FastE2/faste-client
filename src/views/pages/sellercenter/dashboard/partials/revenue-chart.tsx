"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "January", desktop: 2100, mobile: 1800 },
  { month: "February", desktop: 3200, mobile: 2400 },
  { month: "March", desktop: 2800, mobile: 1600 },
  { month: "April", desktop: 1600, mobile: 2000 },
  { month: "May", desktop: 1800, mobile: 2200 },
  { month: "June", desktop: 3400, mobile: 2100 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Total Revenue</CardTitle>
          <p className="text-sm text-muted-foreground">Income in the last 28 days</p>
        </div>

        <div className="flex items-center gap-6 pt-4">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Desktop</p>
            <p className="text-2xl font-bold">24,828</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mobile</p>
            <p className="text-2xl font-bold">25,010</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                className="text-xs"
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
