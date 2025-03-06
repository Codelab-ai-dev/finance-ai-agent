import { DashboardLayout } from "@/components/dashboard-layout"
import { FinanceDashboard } from "@/components/finance-dashboard"

export default function Home() {
  return (
    <DashboardLayout>
      <FinanceDashboard />
    </DashboardLayout>
  )
}

