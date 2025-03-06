import { ChatInterface } from "@/components/chat-interface"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ChatPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Asistente Financiero IA</h2>
        <ChatInterface />
      </div>
    </DashboardLayout>
  )
}

