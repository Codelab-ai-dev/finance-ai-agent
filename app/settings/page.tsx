import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsComponent } from "@/components/settings-component"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
          <p className="text-muted-foreground">Administra tus preferencias y configuración de la cuenta.</p>
        </div>
        <SettingsComponent />
      </div>
    </DashboardLayout>
  )
}

