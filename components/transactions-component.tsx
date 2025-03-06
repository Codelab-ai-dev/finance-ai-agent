"use client"

import { useState } from "react"
import {
  ArrowDownUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Download,
  Calendar,
  CreditCard,
  DollarSign,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Tipos de datos
type Transaction = {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: Date
  paymentMethod: string
  status: "completed" | "pending" | "failed"
}

// Datos de ejemplo
const sampleTransactions: Transaction[] = [
  {
    id: "t1",
    description: "Pago de Nómina",
    amount: 2850.0,
    type: "income",
    category: "Salario",
    date: new Date(2023, 3, 15),
    paymentMethod: "Transferencia Bancaria",
    status: "completed",
  },
  {
    id: "t2",
    description: "Supermercado El Corte",
    amount: 125.4,
    type: "expense",
    category: "Alimentación",
    date: new Date(2023, 3, 18),
    paymentMethod: "Tarjeta de Débito",
    status: "completed",
  },
  {
    id: "t3",
    description: "Netflix",
    amount: 15.99,
    type: "expense",
    category: "Entretenimiento",
    date: new Date(2023, 3, 20),
    paymentMethod: "Tarjeta de Crédito",
    status: "completed",
  },
  {
    id: "t4",
    description: "Uber",
    amount: 24.5,
    type: "expense",
    category: "Transporte",
    date: new Date(2023, 3, 22),
    paymentMethod: "Tarjeta de Crédito",
    status: "completed",
  },
  {
    id: "t5",
    description: "Transferencia Recibida",
    amount: 1200.0,
    type: "income",
    category: "Ingresos",
    date: new Date(2023, 3, 25),
    paymentMethod: "Transferencia Bancaria",
    status: "completed",
  },
  {
    id: "t6",
    description: "Pago de Alquiler",
    amount: 950.0,
    type: "expense",
    category: "Vivienda",
    date: new Date(2023, 3, 5),
    paymentMethod: "Transferencia Bancaria",
    status: "completed",
  },
  {
    id: "t7",
    description: "Restaurante La Plaza",
    amount: 78.5,
    type: "expense",
    category: "Alimentación",
    date: new Date(2023, 3, 12),
    paymentMethod: "Tarjeta de Crédito",
    status: "completed",
  },
  {
    id: "t8",
    description: "Pago Freelance",
    amount: 500.0,
    type: "income",
    category: "Ingresos",
    date: new Date(2023, 3, 28),
    paymentMethod: "Transferencia Bancaria",
    status: "pending",
  },
  {
    id: "t9",
    description: "Factura de Luz",
    amount: 85.2,
    type: "expense",
    category: "Servicios",
    date: new Date(2023, 3, 10),
    paymentMethod: "Domiciliación Bancaria",
    status: "completed",
  },
  {
    id: "t10",
    description: "Factura de Internet",
    amount: 59.99,
    type: "expense",
    category: "Servicios",
    date: new Date(2023, 3, 14),
    paymentMethod: "Domiciliación Bancaria",
    status: "completed",
  },
]

// Categorías disponibles
const categories = [
  "Todas",
  "Alimentación",
  "Transporte",
  "Entretenimiento",
  "Vivienda",
  "Servicios",
  "Salario",
  "Ingresos",
]

// Métodos de pago
const paymentMethods = [
  "Todos",
  "Tarjeta de Crédito",
  "Tarjeta de Débito",
  "Transferencia Bancaria",
  "Efectivo",
  "Domiciliación Bancaria",
]

export function TransactionsComponent() {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Todos")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    type: "expense",
    status: "completed",
    date: new Date(),
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filtrar transacciones
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todas" || transaction.category === selectedCategory
    const matchesType =
      selectedType === "all" ||
      (selectedType === "income" && transaction.type === "income") ||
      (selectedType === "expense" && transaction.type === "expense")
    const matchesPaymentMethod =
      selectedPaymentMethod === "Todos" || transaction.paymentMethod === selectedPaymentMethod

    return matchesSearch && matchesCategory && matchesType && matchesPaymentMethod
  })

  // Ordenar transacciones
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.date.getTime() - b.date.getTime()
    } else {
      return b.date.getTime() - a.date.getTime()
    }
  })

  // Calcular totales
  const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  // Manejar la adición de una nueva transacción
  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount) return

    const transaction: Transaction = {
      id: `t${Date.now()}`,
      description: newTransaction.description || "",
      amount: newTransaction.amount || 0,
      type: newTransaction.type || "expense",
      category: newTransaction.category || "Otros",
      date: newTransaction.date || new Date(),
      paymentMethod: newTransaction.paymentMethod || "Efectivo",
      status: newTransaction.status || "completed",
    }

    setTransactions([transaction, ...transactions])
    setIsAddDialogOpen(false)
    setNewTransaction({
      type: "expense",
      status: "completed",
      date: new Date(),
    })
  }

  return (
    <div className="space-y-6">
      {/* Resumen de transacciones */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total de ingresos en el período seleccionado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-500">${totalExpense.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total de gastos en el período seleccionado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
              ${balance.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Diferencia entre ingresos y gastos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y acciones */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar transacciones..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Método de pago" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              title={sortOrder === "asc" ? "Ordenar descendente" : "Ordenar ascendente"}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={selectedType} onValueChange={setSelectedType} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="income">Ingresos</TabsTrigger>
              <TabsTrigger value="expense">Gastos</TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nueva Transacción
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Añadir Nueva Transacción</DialogTitle>
                <DialogDescription>Completa los detalles para registrar una nueva transacción.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-type" className="text-right">
                    Tipo
                  </Label>
                  <Select
                    value={newTransaction.type}
                    onValueChange={(value: "income" | "expense") =>
                      setNewTransaction({ ...newTransaction, type: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Ingreso</SelectItem>
                      <SelectItem value="expense">Gasto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Descripción
                  </Label>
                  <Input
                    id="description"
                    placeholder="Descripción de la transacción"
                    className="col-span-3"
                    value={newTransaction.description || ""}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Monto
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="col-span-3"
                    value={newTransaction.amount || ""}
                    onChange={(e) =>
                      setNewTransaction({ ...newTransaction, amount: Number.parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Categoría
                  </Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona la categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((c) => c !== "Todas")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="payment-method" className="text-right">
                    Método de Pago
                  </Label>
                  <Select
                    value={newTransaction.paymentMethod}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, paymentMethod: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecciona el método" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods
                        .filter((m) => m !== "Todos")
                        .map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddTransaction}>
                  Guardar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Lista de transacciones */}
      <Card>
        <CardHeader>
          <CardTitle>Transacciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <p className="text-muted-foreground">No se encontraron transacciones con los filtros actuales.</p>
              </div>
            ) : (
              sortedTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === "income" ? "bg-emerald-500/10" : "bg-rose-500/10"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-rose-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground space-x-2">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {format(transaction.date, "dd MMM yyyy", { locale: es })}
                        </span>
                        <span className="flex items-center">
                          <Tag className="mr-1 h-3 w-3" />
                          {transaction.category}
                        </span>
                        <span className="flex items-center">
                          <CreditCard className="mr-1 h-3 w-3" />
                          {transaction.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          transaction.type === "income" ? "text-emerald-500" : "text-rose-500"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </p>
                      <Badge
                        variant={
                          transaction.status === "completed"
                            ? "default"
                            : transaction.status === "pending"
                              ? "outline"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {transaction.status === "completed"
                          ? "Completada"
                          : transaction.status === "pending"
                            ? "Pendiente"
                            : "Fallida"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

