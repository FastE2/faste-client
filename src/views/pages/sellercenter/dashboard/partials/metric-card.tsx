import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface MetricCardProps {
  label: string
  value: string
  change: string
  trend: "up" | "down"
}

export function MetricCard({ label, value, change, trend }: MetricCardProps) {
  const isPositive = trend === "up"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <p className="text-sm text-muted-foreground">{label}</p>
            <span className={`text-sm font-medium ${isPositive ? "text-success" : "text-destructive"}`}>{change}</span>
          </div>

          <p className="text-3xl font-bold">{value}</p>

          <Button
            variant="ghost"
            size="sm"
            className="group -ml-3 gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            View more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
