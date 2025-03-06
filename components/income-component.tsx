"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, BarChart3, DollarSign, TrendingUp, Plus, Edit2, Trash2, Calendar, Briefcase } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Tipos de datos
type Income = {
  id: string
  source: string
  amount: number
  date: Date
  category: string
  isRecurring: boolean
  frequency?: "monthly" | "biweekly" | "weekly" | "yearly"
  notes?: string
}

type IncomeCategory = {
  id: string
  name: string
  color: string
  total: number
  percentage: number
}

// Datos de ejemplo
const sampleIncomes: Income[] = [
  {
    id: "i1",
    source: "Salario Principal",
    amount: 2850.0,
    date: new Date(2023, 3, 15),
    category: "Empleo",
    isRecurring: true,
    frequency: "monthly",
    notes: "Salario mensual de trabajo principal",
  },
  {
    id: "i2",
    source: "Proyecto Freelance",
    amount: 500.0,
    date: new Date(2023, 3, 28),
    category: "Freelance",
    isRecurring: false,
    notes: "Proyecto de diseño web para cliente",
  },
  {
    id: "i3",
    source: "Transferencia Recibida",
    amount: 1200.0,
    date: new Date(2023, 3, 25),
    category: "Otros",
    isRecurring: false,
    notes: "Reembolso de préstamo a familiar",
  },
  {
    id: "i4",
    source: "Dividendos",
    amount: 120.5,
    date: new Date(2023, 3, 10),
    category: "Inversiones",
    isRecurring: true,
    frequency: "monthly",
    notes: "Dividendos de acciones",
  },
  {
    id: "i5",
    source: "Alquiler Propiedad",
    amount: 800.0,
    date: new Date(2023, 3, 5),
    category: "Alquiler",
    isRecurring: true,
    frequency: "monthly",
    notes: "Alquiler del apartamento secundario",
  },
  {
    id: "i6",
    source: "Venta en Marketplace",
    amount: 150.0,
    date: new Date(2023, 3, 22),
    category: "Ventas",
    isRecurring: false,
    notes: "Venta de artículos usados",
  },
]

// Categorías de ingresos
const incomeCategories: IncomeCategory[] = [
  { id: "c1", name: "Empleo", color: "hsl(var(--chart-1))", total: 2850, percentage: 51 },
  { id: "c2", name: "Freelance", color: "hsl(var(--chart-2))", total: 500, percentage: 9 },
  { id: "c3", name: "Inversiones", color: "hsl(var(--chart-3))", total: 120.5, percentage: 2 },
  { id: "c4", name: "Alquiler", color: "hsl(var(--chart-4))", total: 800, percentage: 14 },
  { id: "c5", name: "Ventas", color: "hsl(var(--chart-5))", total: 150, percentage: 3 },
  { id: "c6", name: "Otros", color: "hsl(var(--chart-6))", total: 1200, percentage: 21 },
]

// Frecuencias disponibles
const frequencies = [
  { value: "weekly", label: "Semanal" },
  { value: "biweekly", label: "Quincenal" },
  { value: "monthly", label: "Mensual" },
  { value: "yearly", label: "Anual" },
]

export function IncomeComponent() {
  const [incomes, setIncomes] = useState<Income[]>(sampleIncomes)
  const [categories, setCategories] = useState<IncomeCategory[]>(incomeCategories)
  const [selectedMonth, setSelectedMonth] = useState<string>("Abril 2023")
  const [activeTab, setActiveTab] = useState("overview")
  const [isAddIncomeDialogOpen, setIsAddIncomeDialogOpen] = useState(false)
  const [newIncome, setNewIncome] = useState<Partial<Income>>({
    date: new Date(),
    isRecurring: false,
  })

  // Calcular totales
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)
  const recurringIncome = incomes.filter((income) => income.isRecurring).reduce((sum, income) => sum + income.amount, 0)
  const nonRecurringIncome = totalIncome - recurringIncome
  const averageIncome = totalIncome / incomes.length

  // Manejar la adición de un nuevo ingreso
  const handleAddIncome = () => {
    if (!newIncome.source || !newIncome.amount || !newIncome.category) return

    const income: Income = {
      id: `i${Date.now()}`,
      source: newIncome.source,
      amount: newIncome.amount,
      date: newIncome.date || new Date(),
      category: newIncome.category,
      isRecurring: newIncome.isRecurring || false,
      frequency: newIncome.isRecurring ? newIncome.frequency : undefined,
      notes: newIncome.notes,
    }

    setIncomes([...incomes, income])
    setIsAddIncomeDialogOpen(false)
    setNewIncome({
      date: new Date(),
      isRecurring: false,
    })

    // Actualizar categorías
    const categoryIndex = categories.findIndex((cat) => cat.name === income.category)
    if (categoryIndex !== -1) {
      const updatedCategories = [...categories]
      updatedCategories[categoryIndex].total += income.amount

      // Recalcular porcentajes
      const newTotal = updatedCategories.reduce((sum, cat) => sum + cat.total, 0)
      updatedCategories.forEach((cat) => {
        cat.percentage = Math.round((cat.total / newTotal) * 100)
      })

      setCategories(updatedCategories)
    }
  }

  return (
    <div className="space-y-6">
      {/* Selector de mes y acciones */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Abril 2023">Abril 2023</SelectItem>
              <SelectItem value="Marzo 2023">Marzo 2023</SelectItem>
              <SelectItem value="Febrero 2023">Febrero 2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddIncomeDialogOpen} onOpenChange={setIsAddIncomeDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Ingreso
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Añadir Nuevo Ingreso</DialogTitle>
                <DialogDescription>Registra una nueva fuente de ingresos.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="income-source" className="text-right">
                    Fuente
                  </Label>
                  <Input
                    id="income-source"
                    placeholder="Ej: Salario, Freelance"
                    className="col-span-3"
                    value={newIncome.source || ""}
                    onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="income-amount" className="text-right">
                    Cantidad
                  </Label>
                  <Input
                    id="income-amount"
                    type="number"
                    placeholder="0.00"
                    className="col-span-3"
                    value={newIncome.amount || ""}
                    onChange={(e) => setNewIncome({ ...newIncome, amount: Number(e.target.value) })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="income-category" className="text-right">
                    Categoría
                  </Label>
                  <Select
                    value={newIncome.category}
                    onValueChange={(value) => setNewIncome({ ...newIncome, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona la categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Recurrente</Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <input
                      type="checkbox"
                      id="income-recurring"
                      checked={newIncome.isRecurring || false}
                      onChange={(e) => setNewIncome({ ...newIncome, isRecurring: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="income-recurring" className="text-sm font-normal">
                      Este ingreso es recurrente
                    </Label>
                  </div>
                </div>
                {newIncome.isRecurring && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="income-frequency" className="text-right">
                      Frecuencia
                    </Label>
                    <Select
                      value={newIncome.frequency}
                      onValueChange={(value: "monthly" | "biweekly" | "weekly" | "yearly") =>
                        setNewIncome({ ...newIncome, frequency: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecciona la frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencies.map((freq) => (
                          <SelectItem key={freq.value} value={freq.value}>
                            {freq.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="income-notes" className="text-right">
                    Notas
                  </Label>
                  <Input
                    id="income-notes"
                    placeholder="Notas adicionales"
                    className="col-span-3"
                    value={newIncome.notes || ""}
                    onChange={(e) => setNewIncome({ ...newIncome, notes: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddIncome}>Guardar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Resumen de ingresos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total de ingresos en {selectedMonth}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Recurrentes</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${recurringIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Ingresos mensuales fijos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Puntuales</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${nonRecurringIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Ingresos no recurrentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio por Ingreso</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Promedio por fuente de ingreso</p>
          </CardContent>
        </Card>
      </div>

      {/* Pestañas de contenido */}
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="sources">Fuentes</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Distribución de Ingresos</CardTitle>
                <CardDescription>Por categoría en {selectedMonth}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Gráfico de distribución de ingresos</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Categorías de Ingresos</CardTitle>
                <CardDescription>Distribución por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                          <span>{category.name}</span>
                        </div>
                        <span className="font-medium">${category.total.toFixed(2)}</span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">{category.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fuentes de Ingresos</CardTitle>
              <CardDescription>Detalle de todas tus fuentes de ingresos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomes.map((income) => (
                  <div key={income.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-emerald-500/10">
                        <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-medium">{income.source}</p>
                        <div className="flex items-center text-sm text-muted-foreground space-x-2">
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {format(income.date, "dd MMM yyyy", { locale: es })}
                          </span>
                          <span className="flex items-center">
                            <Briefcase className="mr-1 h-3 w-3" />
                            {income.category}
                          </span>
                        </div>
                        {income.notes && <p className="text-xs text-muted-foreground mt-1">{income.notes}</p>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium text-emerald-500">${income.amount.toFixed(2)}</p>
                        {income.isRecurring && (
                          <Badge variant="outline" className="text-xs">
                            {frequencies.find((f) => f.value === income.frequency)?.label || "Recurrente"}
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Ingresos</CardTitle>
              <CardDescription>Tendencias y comparativas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Gráficos de análisis de ingresos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

