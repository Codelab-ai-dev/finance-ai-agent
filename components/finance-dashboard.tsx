"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Wallet, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function FinanceDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Financiero</h2>
          <p className="text-muted-foreground">Bienvenido de nuevo. Aquí está el resumen de tus finanzas.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <DollarSign className="mr-2 h-4 w-4" />
            Añadir Ingreso
          </Button>
          <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Añadir Gasto
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analytics">Análisis</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <OverviewCard
              title="Saldo Total"
              value="$12,580.00"
              description="Balance actual"
              trend="+12.5%"
              trendUp={true}
              icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
            />
            <OverviewCard
              title="Ingresos"
              value="$4,550.00"
              description="Este mes"
              trend="+8.2%"
              trendUp={true}
              icon={<ArrowUpRight className="h-4 w-4 text-emerald-500" />}
            />
            <OverviewCard
              title="Gastos"
              value="$2,890.00"
              description="Este mes"
              trend="+4.1%"
              trendUp={false}
              icon={<ArrowDownRight className="h-4 w-4 text-rose-500" />}
            />
            <OverviewCard
              title="Ahorros"
              value="$1,660.00"
              description="Este mes"
              trend="+16.4%"
              trendUp={true}
              icon={<TrendingUp className="h-4 w-4 text-blue-500" />}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Flujo de Efectivo</CardTitle>
                <CardDescription>Ingresos vs Gastos en los últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Gráfico de flujo de efectivo</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribución de Gastos</CardTitle>
                <CardDescription>Categorías principales este mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ExpenseCategory name="Vivienda" amount="$950.00" percentage={32} />
                  <ExpenseCategory name="Alimentación" amount="$580.00" percentage={20} />
                  <ExpenseCategory name="Transporte" amount="$420.00" percentage={15} />
                  <ExpenseCategory name="Entretenimiento" amount="$350.00" percentage={12} />
                  <ExpenseCategory name="Servicios" amount="$290.00" percentage={10} />
                  <ExpenseCategory name="Otros" amount="$300.00" percentage={11} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Transacciones Recientes</CardTitle>
                <CardDescription>Tus últimas 5 transacciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Transaction
                    name="Supermercado El Corte"
                    category="Alimentación"
                    date="Hoy"
                    amount="-$125.40"
                    isExpense={true}
                  />
                  <Transaction
                    name="Transferencia Recibida"
                    category="Ingresos"
                    date="Ayer"
                    amount="+$1,200.00"
                    isExpense={false}
                  />
                  <Transaction
                    name="Netflix"
                    category="Entretenimiento"
                    date="23 Abr"
                    amount="-$15.99"
                    isExpense={true}
                  />
                  <Transaction name="Uber" category="Transporte" date="22 Abr" amount="-$24.50" isExpense={true} />
                  <Transaction
                    name="Pago Nómina"
                    category="Ingresos"
                    date="15 Abr"
                    amount="+$2,850.00"
                    isExpense={false}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Presupuesto Mensual</CardTitle>
                <CardDescription>Progreso actual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <BudgetItem category="Alimentación" spent={580} total={700} percentage={83} />
                  <BudgetItem category="Transporte" spent={420} total={500} percentage={84} />
                  <BudgetItem category="Entretenimiento" spent={350} total={300} percentage={117} isOverBudget={true} />
                  <BudgetItem category="Servicios" spent={290} total={350} percentage={83} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
          <p className="text-muted-foreground">Contenido de análisis detallado</p>
        </TabsContent>

        <TabsContent value="reports" className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
          <p className="text-muted-foreground">Informes financieros personalizados</p>
        </TabsContent>

        <TabsContent
          value="notifications"
          className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md"
        >
          <p className="text-muted-foreground">Alertas y notificaciones financieras</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface OverviewCardProps {
  title: string
  value: string
  description: string
  trend: string
  trendUp: boolean
  icon: React.ReactNode
}

function OverviewCard({ title, value, description, trend, trendUp, icon }: OverviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className={`text-xs mt-1 ${trendUp ? "text-emerald-500" : "text-rose-500"}`}>{trend}</div>
      </CardContent>
    </Card>
  )
}

interface ExpenseCategoryProps {
  name: string
  amount: string
  percentage: number
}

function ExpenseCategory({ name, amount, percentage }: ExpenseCategoryProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{name}</span>
        <span className="font-medium">{amount}</span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="text-xs text-muted-foreground text-right">{percentage}%</div>
    </div>
  )
}

interface TransactionProps {
  name: string
  category: string
  date: string
  amount: string
  isExpense: boolean
}

function Transaction({ name, category, date, amount, isExpense }: TransactionProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${isExpense ? "bg-rose-500/10" : "bg-emerald-500/10"}`}>
          {isExpense ? (
            <ArrowDownRight className={`h-4 w-4 text-rose-500`} />
          ) : (
            <ArrowUpRight className={`h-4 w-4 text-emerald-500`} />
          )}
        </div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-medium ${isExpense ? "text-rose-500" : "text-emerald-500"}`}>{amount}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  )
}

interface BudgetItemProps {
  category: string
  spent: number
  total: number
  percentage: number
  isOverBudget?: boolean
}

function BudgetItem({ category, spent, total, percentage, isOverBudget = false }: BudgetItemProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{category}</span>
        <span className={isOverBudget ? "text-rose-500" : ""}>
          ${spent} / ${total}
        </span>
      </div>
      <Progress
        value={isOverBudget ? 100 : percentage}
        className={`h-2 ${isOverBudget ? "bg-rose-500/20" : ""}`}
        indicatorClassName={isOverBudget ? "bg-rose-500" : ""}
      />
      <div className="text-xs text-muted-foreground text-right">{percentage}%</div>
    </div>
  )
}

