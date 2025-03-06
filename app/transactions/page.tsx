import { DashboardLayout } from "@/components/dashboard-layout"
import { TransactionsComponent } from "@/components/transactions-component"

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transacciones</h2>
          <p className="text-muted-foreground">Gestiona y visualiza todas tus transacciones financieras.</p>
        </div>
        <TransactionsComponent />
      </div>
    </DashboardLayout>
  )
}

