"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Wallet,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Film,
  Wifi,
} from "lucide-react"

// Tipos de datos
type BudgetCategory = {
  id: string
  name: string
  icon: React.ReactNode
  allocated: number
  spent: number
  color: string
}

type BudgetPeriod = {
  id: string
  name: string
  startDate: Date
  endDate: Date
  totalBudget: number
  categories: BudgetCategory[]
}

// Datos de ejemplo
const sampleBudgetPeriods: BudgetPeriod[] = [
  {
    id: "current",
    name: "Mayo 2023",
    startDate: new Date(2023, 4, 1),
    endDate: new Date(2023, 4, 31),
    totalBudget: 3500,
    categories: [
      {
        id: "housing",
        name: "Vivienda",
        icon: <Home className="h-4 w-4" />,
        allocated: 1200,
        spent: 1200,
        color: "bg-blue-500",
      },
      {
        id: "food",
        name: "Alimentación",
        icon: <Utensils className="h-4 w-4" />,
        allocated: 700,
        spent: 580,
        color: "bg-green-500",
      },
      {
        id: "transport",
        name: "Transporte",
        icon: <Car className="h-4 w-4" />,
        allocated: 500,
        spent: 420,
        color: "bg-yellow-500",
      },
      {
        id: "entertainment",
        name: "Entretenimiento",
        icon: <Film className="h-4 w-4" />,
        allocated: 300,
        spent: 350,
        color: "bg-purple-500",
      },
      {
        id: "utilities",
        name: "Servicios",
        icon: <Wifi className="h-4 w-4" />,
        allocated: 350,
        spent: 290,
        color: "bg-red-500",
      },
      {
        id: "shopping",
        name: "Compras",
        icon: <ShoppingCart className="h-4 w-4" />,
        allocated: 450,
        spent: 380,
        color: "bg-pink-500",
      },
    ],
  },
  {
    id: "previous",
    name: "Abril 2023",
    startDate: new Date(2023, 3, 1),
    endDate: new Date(2023, 3, 30),
    totalBudget: 3500,
    categories: [
      {
        id: "housing",
        name: "Vivienda",
        icon: <Home className="h-4 w-4" />,
        allocated: 1200,
        spent: 1200,
        color: "bg-blue-500",
      },
      {
        id: "food",
        name: "Alimentación",
        icon: <Utensils className="h-4 w-4" />,
        allocated: 700,
        spent: 650,
        color: "bg-green-500",
      },
      {
        id: "transport",
        name: "Transporte",
        icon: <Car className="h-4 w-4" />,
        allocated: 500,
        spent: 480,
        color: "bg-yellow-500",
      },
      {
        id: "entertainment",
        name: "Entretenimiento",
        icon: <Film className="h-4 w-4" />,
        allocated: 300,
        spent: 320,
        color: "bg-purple-500",
      },
      {
        id: "utilities",
        name: "Servicios",
        icon: <Wifi className="h-4 w-4" />,
        allocated: 350,
        spent: 340,
        color: "bg-red-500",
      },
      {
        id: "shopping",
        name: "Compras",
        icon: <ShoppingCart className="h-4 w-4" />,
        allocated: 450,
        spent: 420,
        color: "bg-pink-500",
      },
    ],
  },
]

export function BudgetComponent() {
  const [budgetPeriods, setBudgetPeriods] = useState<BudgetPeriod[]>(sampleBudgetPeriods)
  const [activePeriod, setActivePeriod] = useState<string>("current")
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState<Partial<BudgetCategory>>({})
  const [editingCategory, setEditingCategory] = useState<string | null>(null)

  // Obtener el período activo
  const currentPeriod = budgetPeriods.find((period) => period.id === activePeriod) || budgetPeriods[0]

  // Calcular totales
  const totalAllocated = currentPeriod.categories.reduce((sum, category) => sum + category.allocated, 0)
  const totalSpent = currentPeriod.categories.reduce((sum, category) => sum + category.spent, 0)
  const remainingBudget = totalAllocated - totalSpent
  const budgetProgress = (totalSpent / totalAllocated) * 100

  // Manejar la adición de una nueva categoría
  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.allocated) return

    const category: BudgetCategory = {
      id: `cat-${Date.now()}`,
      name: newCategory.name,
      icon: <ShoppingCart className="h-4 w-4" />, // Icono por defecto
      allocated: newCategory.allocated,
      spent: 0,
      color: `bg-${["blue", "green", "yellow", "purple", "red", "pink"][Math.floor(Math.random() * 6)]}-500`,
    }

    const updatedPeriods = budgetPeriods.map((period) => {
      if (period.id === activePeriod) {
        return {
          ...period,
          categories: [...period.categories, category],
        }
      }
      return period
    })

    setBudgetPeriods(updatedPeriods)
    setIsAddCategoryDialogOpen(false)
    setNewCategory({})
  }

  // Manejar la edición de una categoría
  const handleEditCategory = (categoryId: string) => {
    setEditingCategory(categoryId)
    const category = currentPeriod.categories.find((cat) => cat.id === categoryId)
    if (category) {
      setNewCategory({
        name: category.name,
        allocated: category.allocated,
      })
      setIsAddCategoryDialogOpen(true)
    }
  }

  // Guardar la edición de una categoría
  const handleSaveEdit = () => {
    if (!editingCategory || !newCategory.name || !newCategory.allocated) return

    const updatedPeriods = budgetPeriods.map((period) => {
      if (period.id === activePeriod) {
        return {
          ...period,
          categories: period.categories.map((cat) => {
            if (cat.id === editingCategory) {
              return {
                ...cat,
                name: newCategory.name || cat.name,
                allocated: newCategory.allocated || cat.allocated,
              }
            }
            return cat
          }),
        }
      }
      return period
    })

    setBudgetPeriods(updatedPeriods)
    setIsAddCategoryDialogOpen(false)
    setNewCategory({})
    setEditingCategory(null)
  }

  // Eliminar una categoría
  const handleDeleteCategory = (categoryId: string) => {
    const updatedPeriods = budgetPeriods.map((period) => {
      if (period.id === activePeriod) {
        return {
          ...period,
          categories: period.categories.filter((cat) => cat.id !== categoryId),
        }
      }
      return period
    })

    setBudgetPeriods(updatedPeriods)
  }

  return (
    <div className="space-y-6">
      {/* Resumen del presupuesto */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Resumen del Presupuesto</CardTitle>
            <Select value={activePeriod} onValueChange={setActivePeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar período" />
              </SelectTrigger>
              <SelectContent>
                {budgetPeriods.map((period) => (
                  <SelectItem key={period.id} value={period.id}>
                    {period.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CardDescription>
            Período: {currentPeriod.startDate.toLocaleDateString()} - {currentPeriod.endDate.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Presupuesto Total</span>
                <span className="font-bold">${totalAllocated.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Gastado</span>
                <span className="font-bold">${totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Restante</span>
                <span className={`font-bold ${remainingBudget >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                  ${remainingBudget.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Progreso del Presupuesto</span>
                <span className="font-medium">{budgetProgress.toFixed(0)}%</span>
              </div>
              <Progress
                value={budgetProgress}
                className="h-2"
                indicatorClassName={budgetProgress > 100 ? "bg-rose-500" : undefined}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categorías del presupuesto */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Categorías del Presupuesto</CardTitle>
            <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir Categoría
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingCategory ? "Editar Categoría" : "Añadir Nueva Categoría"}</DialogTitle>
                  <DialogDescription>
                    {editingCategory
                      ? "Modifica los detalles de esta categoría de presupuesto."
                      : "Completa los detalles para crear una nueva categoría de presupuesto."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category-name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="category-name"
                      placeholder="Ej: Alimentación"
                      className="col-span-3"
                      value={newCategory.name || ""}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category-amount" className="text-right">
                      Monto
                    </Label>
                    <Input
                      id="category-amount"
                      type="number"
                      placeholder="0.00"
                      className="col-span-3"
                      value={newCategory.allocated || ""}
                      onChange={(e) => setNewCategory({ ...newCategory, allocated: Number.parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddCategoryDialogOpen(false)
                      setNewCategory({})
                      setEditingCategory(null)
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" onClick={editingCategory ? handleSaveEdit : handleAddCategory}>
                    {editingCategory ? "Guardar Cambios" : "Añadir Categoría"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>Distribución de tu presupuesto por categorías</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentPeriod.categories.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No hay categorías de presupuesto definidas.</p>
                <p className="text-muted-foreground text-sm">
                  Haz clic en "Añadir Categoría" para comenzar a planificar tu presupuesto.
                </p>
              </div>
            ) : (
              currentPeriod.categories.map((category) => {
                const percentage = (category.spent / category.allocated) * 100
                const isOverBudget = percentage > 100

                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`p-1.5 rounded-full ${category.color.replace("bg-", "bg-opacity-20 text-")}`}>
                          {category.icon}
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category.id)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          {isOverBudget ? (
                            <AlertCircle className="h-4 w-4 text-rose-500" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          )}
                          <span className={isOverBudget ? "text-rose-500" : "text-emerald-500"}>
                            {isOverBudget ? "Excedido" : "Dentro del presupuesto"}
                          </span>
                        </div>
                        <span className={isOverBudget ? "text-rose-500" : ""}>
                          ${category.spent.toFixed(2)} / ${category.allocated.toFixed(2)}
                        </span>
                      </div>
                      <Progress
                        value={percentage > 100 ? 100 : percentage}
                        className={`h-2 ${isOverBudget ? "bg-rose-500/20" : ""}`}
                        indicatorClassName={isOverBudget ? "bg-rose-500" : category.color}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{percentage.toFixed(0)}% usado</span>
                        <span>{isOverBudget ? `${(percentage - 100).toFixed(0)}% excedido` : ""}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Consejos de presupuesto */}
      <Card>
        <CardHeader>
          <CardTitle>Consejos para tu Presupuesto</CardTitle>
          <CardDescription>Recomendaciones para optimizar tu presupuesto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                Categoría de Entretenimiento
              </h4>
              <p className="text-sm text-muted-foreground">
                Has excedido tu presupuesto de entretenimiento en un 17%. Considera reducir estos gastos el próximo mes
                para mantener tus finanzas equilibradas.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500" />
                Ahorro en Alimentación
              </h4>
              <p className="text-sm text-muted-foreground">
                ¡Buen trabajo! Has gastado menos de lo presupuestado en alimentación. Considera transferir el excedente
                a tu fondo de emergencia o a otra categoría que lo necesite.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Wallet className="h-4 w-4 mr-2 text-primary" />
                Regla 50/30/20
              </h4>
              <p className="text-sm text-muted-foreground">
                Considera seguir la regla 50/30/20: 50% para necesidades, 30% para deseos y 20% para ahorro e inversión.
                Actualmente estás destinando aproximadamente 60% a necesidades, 25% a deseos y 15% a ahorro.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

