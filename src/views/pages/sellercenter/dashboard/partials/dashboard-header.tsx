import { Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="border-b bg-card rounded-2xl">
      <div className="container mx-auto flex items-center justify-between p-6">
        <h1 className="text-2xl font-semibold text-balance">E-Commerce Dashboard</h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">16 Sep 2025 - 13 Oct 2025</span>
          </div>

          <Button variant="default" size="default" className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </header>
  )
}
