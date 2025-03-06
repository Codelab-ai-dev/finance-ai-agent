import { DashboardLayout } from "@/components/dashboard-layout"
import { BudgetComponent } from "@/components/budget-component"

export default function BudgetPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Presupuesto</h2>
          <p className="text-muted-foreground">Gestiona y planifica tu presupuesto mensual.</p>
        </div>
        <BudgetComponent />
      </div>
    </DashboardLayout>
  )
}

