import { DashboardLayout } from "@/components/dashboard-layout"
import { AnalysisComponent } from "@/components/analysis-component"

export default function AnalysisPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Análisis Financiero</h2>
          <p className="text-muted-foreground">Visualiza y analiza tus datos financieros en detalle.</p>
        </div>
        <AnalysisComponent />
      </div>
    </DashboardLayout>
  )
}

