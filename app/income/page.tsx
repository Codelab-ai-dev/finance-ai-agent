import { DashboardLayout } from "@/components/dashboard-layout"
import { IncomeComponent } from "@/components/income-component"

export default function IncomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Ingresos</h2>
          <p className="text-muted-foreground">Gestiona y analiza tus fuentes de ingresos.</p>
        </div>
        <IncomeComponent />
      </div>
    </DashboardLayout>
  )
}

