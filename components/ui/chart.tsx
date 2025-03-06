"use client"

import type * as React from "react"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
} from "chart.js"
import { Bar, Line, Pie } from "react-chartjs-2"

// Registrar todos los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Title)

interface ChartContainerProps {
  children: React.ReactNode
}

const ChartContainer = ({ children }: ChartContainerProps) => <div className="relative h-full w-full">{children}</div>

interface ChartTooltipProps {
  children?: React.ReactNode
}

const ChartTooltip = ({ children }: ChartTooltipProps) => (
  <div className="absolute top-0 left-0 w-full h-full">{children}</div>
)

interface ChartLegendProps {
  children?: React.ReactNode
}

const ChartLegend = ({ children }: ChartLegendProps) => (
  <div className="absolute bottom-0 left-0 w-full h-full">{children}</div>
)

interface BarChartProps {
  data: { name: string; value: number }[]
  children?: React.ReactNode
}

const BarChart = ({ data, children }: BarChartProps) => (
  <Bar
    data={{
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: "Valor",
          data: data.map((item) => item.value),
          backgroundColor: "hsl(var(--chart-1))",
        },
      ],
    }}
    options={{
      responsive: true,
      scales: {
        x: {
          type: "category",
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            borderDash: [3, 3],
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
        },
      },
    }}
  >
    {children}
  </Bar>
)

interface PieChartProps {
  data: { name: string; value: number; color: string }[]
  children?: React.ReactNode
}

const PieChart = ({ data, children }: PieChartProps) => (
  <Pie
    data={{
      labels: data.map((item) => item.name),
      datasets: [
        {
          data: data.map((item) => item.value),
          backgroundColor: data.map((item) => item.color),
          borderWidth: 1,
          borderColor: "hsl(var(--background))",
        },
      ],
    }}
    options={{
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "right" as const,
        },
      },
    }}
  >
    {children}
  </Pie>
)

interface LineChartProps {
  data: { name: string; income: number; expenses: number; savings: number }[]
  children?: React.ReactNode
}

const LineChart = ({ data, children }: LineChartProps) => (
  <Line
    data={{
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: "Ingresos",
          data: data.map((item) => item.income),
          borderColor: "hsl(var(--chart-2))",
          backgroundColor: "hsla(var(--chart-2), 0.1)",
          tension: 0.3,
        },
        {
          label: "Gastos",
          data: data.map((item) => item.expenses),
          borderColor: "hsl(var(--chart-1))",
          backgroundColor: "hsla(var(--chart-1), 0.1)",
          tension: 0.3,
        },
        {
          label: "Ahorros",
          data: data.map((item) => item.savings),
          borderColor: "hsl(var(--chart-3))",
          backgroundColor: "hsla(var(--chart-3), 0.1)",
          tension: 0.3,
        },
      ],
    }}
    options={{
      responsive: true,
      scales: {
        x: {
          type: "category",
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            borderDash: [3, 3],
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
        },
      },
    }}
  >
    {children}
  </Line>
)

export { BarChart, PieChart, LineChart, ChartContainer, ChartTooltip, ChartLegend }

