"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, PieChart, LineChart, ChartContainer } from "@/components/ui/chart"
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  Wallet,
  ShoppingCart,
  Film,
} from "lucide-react"

// Tipos de datos
type TimeRange = "7d" | "30d" | "90d" | "12m" | "all"
type ChartType = "expenses" | "income" | "savings" | "categories" | "trends"

// Datos de ejemplo para gráficos
const expensesData = [
  { name: "Ene", value: 2400 },
  { name: "Feb", value: 1800 },
  { name: "Mar", value: 2200 },
  { name: "Abr", value: 2600 },
  { name: "May", value: 2000 },
  { name: "Jun", value: 2400 },
  { name: "Jul", value: 2800 },
]

const incomeData = [
  { name: "Ene", value: 3500 },
  { name: "Feb", value: 3500 },
  { name: "Mar", value: 3700 },
  { name: "Abr", value: 3900 },
  { name: "May", value: 3500 },
  { name: "Jun", value: 3500 },
  { name: "Jul", value: 4200 },
]

const savingsData = [
  { name: "Ene", value: 1100 },
  { name: "Feb", value: 1700 },
  { name: "Mar", value: 1500 },
  { name: "Abr", value: 1300 },
  { name: "May", value: 1500 },
  { name: "Jun", value: 1100 },
  { name: "Jul", value: 1400 },
]

const categoryData = [
  { name: "Vivienda", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Alimentación", value: 20, color: "hsl(var(--chart-2))" },
  { name: "Transporte", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Entretenimiento", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Servicios", value: 10, color: "hsl(var(--chart-5))" },
  { name: "Otros", value: 10, color: "hsl(var(--chart-6))" },
]

const trendData = [
  { name: "Ene", expenses: 2400, income: 3500, savings: 1100 },
  { name: "Feb", expenses: 1800, income: 3500, savings: 1700 },
  { name: "Mar", expenses: 2200, income: 3700, savings: 1500 },
  { name: "Abr", expenses: 2600, income: 3900, savings: 1300 },
  { name: "May", expenses: 2000, income: 3500, savings: 1500 },
  { name: "Jun", expenses: 2400, income: 3500, savings: 1100 },
  { name: "Jul", expenses: 2800, income: 4200, savings: 1400 },
]

// Datos de estadísticas
const stats = {
  totalIncome: 25800,
  totalExpenses: 16200,
  totalSavings: 9600,
  incomeGrowth: 8.5,
  expenseGrowth: 4.2,
  savingsGrowth: 12.3,
  topExpenseCategory: "Vivienda",
  topExpenseAmount: 5670,
  largestTransaction: 1200,
  largestTransactionName: "Alquiler",
  averageMonthlyExpense: 2314,
  averageMonthlyIncome: 3686,
}

// Datos de predicciones
const predictions = [
  {
    id: 1,
    title: "Ahorro proyectado",
    description: "Basado en tus patrones actuales",
    value: "€12,500",
    timeframe: "próximos 6 meses",
    trend: "up",
    percentage: 15,
  },
  {
    id: 2,
    title: "Gastos proyectados",
    description: "Si mantienes tus hábitos actuales",
    value: "€18,200",
    timeframe: "próximos 6 meses",
    trend: "up",
    percentage: 6,
  },
  {
    id: 3,
    title: "Objetivo de ahorro",
    description: "Para alcanzar tu meta de €20,000",
    value: "€1,733",
    timeframe: "ahorro mensual necesario",
    trend: "neutral",
    percentage: 0,
  },
]

// Datos de insights
const insights = [
  {
    id: 1,
    title: "Gastos en Entretenimiento",
    description:
      "Tus gastos en entretenimiento han aumentado un 15% respecto al mes anterior. Considera revisar estas transacciones.",
    icon: <Film className="h-5 w-5" />,
    severity: "warning",
  },
  {
    id: 2,
    title: "Ahorro Consistente",
    description: "Has mantenido un ahorro constante durante los últimos 3 meses. ¡Sigue así!",
    icon: <TrendingUp className="h-5 w-5" />,
    severity: "success",
  },
  {
    id: 3,
    title: "Oportunidad de Inversión",
    description:
      "Con tu nivel actual de ahorro, podrías considerar invertir una parte para obtener mejores rendimientos.",
    icon: <DollarSign className="h-5 w-5" />,
    severity: "info",
  },
]

export function AnalysisComponent() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d")
  const [activeChart, setActiveChart] = useState<ChartType>("expenses")

  return (
    <div className="space-y-6">
      {/* Controles y filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período de tiempo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 90 días</SelectItem>
              <SelectItem value="12m">Último año</SelectItem>
              <SelectItem value="all">Todo el tiempo</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Personalizar
          </Button>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Datos
        </Button>
      </div>

      {/* Resumen de estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">€{stats.totalIncome.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">{stats.incomeGrowth}%</span>
              <span className="ml-1">vs período anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">€{stats.totalExpenses.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-rose-500" />
              <span className="text-rose-500">{stats.expenseGrowth}%</span>
              <span className="ml-1">vs período anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ahorros Totales</CardTitle>
            <Wallet className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">€{stats.totalSavings.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">{stats.savingsGrowth}%</span>
              <span className="ml-1">vs período anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mayor Gasto</CardTitle>
            <ShoppingCart className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.topExpenseAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.topExpenseCategory} ({Math.round((stats.topExpenseAmount / stats.totalExpenses) * 100)}% del total)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principales */}
      <Tabs defaultValue="expenses" className="space-y-4" onValueChange={(value) => setActiveChart(value as ChartType)}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
          <TabsTrigger value="income">Ingresos</TabsTrigger>
          <TabsTrigger value="savings">Ahorros</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Gastos</CardTitle>
              <CardDescription>Evolución de tus gastos en el tiempo</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer>
                <BarChart data={expensesData}>
                  {/* No necesitamos estos elementos ya que están manejados por Chart.js */}
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Ingresos</CardTitle>
              <CardDescription>Evolución de tus ingresos en el tiempo</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer>
                <BarChart data={incomeData}>
                  {/* No necesitamos estos elementos ya que están manejados por Chart.js */}
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Ahorros</CardTitle>
              <CardDescription>Evolución de tus ahorros en el tiempo</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer>
                <BarChart data={savingsData}>
                  {/* No necesitamos estos elementos ya que están manejados por Chart.js */}
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Categorías</CardTitle>
              <CardDescription>Desglose de gastos por categoría</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer>
                <PieChart data={categoryData}>
                  {/* No necesitamos estos elementos ya que están manejados por Chart.js */}
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendencias Financieras</CardTitle>
              <CardDescription>Comparativa de ingresos, gastos y ahorros</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer>
                <LineChart data={trendData}>
                  {/* No necesitamos estos elementos ya que están manejados por Chart.js */}
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Predicciones e Insights */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Predicciones */}
        <Card>
          <CardHeader>
            <CardTitle>Predicciones Financieras</CardTitle>
            <CardDescription>Proyecciones basadas en tus datos históricos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{prediction.title}</h4>
                      <p className="text-sm text-muted-foreground">{prediction.description}</p>
                    </div>
                    <Badge
                      variant={
                        prediction.trend === "up" ? "default" : prediction.trend === "down" ? "destructive" : "outline"
                      }
                    >
                      {prediction.trend === "up" ? (
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                      ) : prediction.trend === "down" ? (
                        <ArrowDownRight className="mr-1 h-3 w-3" />
                      ) : null}
                      {prediction.percentage > 0
                        ? `+${prediction.percentage}%`
                        : prediction.percentage < 0
                          ? `${prediction.percentage}%`
                          : "Estable"}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">{prediction.value}</div>
                    <p className="text-xs text-muted-foreground">{prediction.timeframe}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Insights Financieros</CardTitle>
            <CardDescription>Análisis y recomendaciones personalizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className={`border rounded-lg p-4 ${
                    insight.severity === "warning"
                      ? "border-amber-500/20 bg-amber-500/10"
                      : insight.severity === "success"
                        ? "border-emerald-500/20 bg-emerald-500/10"
                        : "border-blue-500/20 bg-blue-500/10"
                  }`}
                >
                  <div className="flex gap-3">
                    <div
                      className={`
                      p-2 rounded-full shrink-0
                      ${
                        insight.severity === "warning"
                          ? "bg-amber-500/20 text-amber-500"
                          : insight.severity === "success"
                            ? "bg-emerald-500/20 text-emerald-500"
                            : "bg-blue-500/20 text-blue-500"
                      }
                    `}
                    >
                      {insight.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas detalladas */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas Detalladas</CardTitle>
          <CardDescription>Métricas clave sobre tu situación financiera</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Ratio de Ahorro</h4>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {Math.round((stats.totalSavings / stats.totalIncome) * 100)}%
                </span>
                <Badge variant="outline">Recomendado: 20%</Badge>
              </div>
              <Progress value={(stats.totalSavings / stats.totalIncome) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Porcentaje de ingresos que estás ahorrando</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Gastos vs Ingresos</h4>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {Math.round((stats.totalExpenses / stats.totalIncome) * 100)}%
                </span>
                <Badge variant="outline">Recomendado: &lt;70%</Badge>
              </div>
              <Progress value={(stats.totalExpenses / stats.totalIncome) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Porcentaje de ingresos que estás gastando</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Promedio Mensual</h4>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                    <span className="text-sm">Ingresos: €{stats.averageMonthlyIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowDownRight className="mr-1 h-3 w-3 text-rose-500" />
                    <span className="text-sm">Gastos: €{stats.averageMonthlyExpense.toLocaleString()}</span>
                  </div>
                </div>
                <Badge variant="outline">Mensual</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Promedios basados en los últimos 6 meses</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Mayor Transacción</h4>
              <div className="text-2xl font-bold">€{stats.largestTransaction.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.largestTransactionName} - {Math.round((stats.largestTransaction / stats.totalExpenses) * 100)}%
                del total de gastos
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Categorías Principales</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--chart-1)] mr-2"></div>
                  <span className="text-xs">Vivienda: 35%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--chart-2)] mr-2"></div>
                  <span className="text-xs">Alimentación: 20%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--chart-3)] mr-2"></div>
                  <span className="text-xs">Transporte: 15%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--chart-4)] mr-2"></div>
                  <span className="text-xs">Entretenimiento: 10%</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Tendencia de Ahorro</h4>
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-emerald-500" />
                <span className="text-2xl font-bold text-emerald-500">+{stats.savingsGrowth}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Incremento en tus ahorros respecto al período anterior</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

