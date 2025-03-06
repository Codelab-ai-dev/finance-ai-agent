"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, CreditCard, DollarSign, Globe, HelpCircle, Key, LogOut, Mail, Moon, Sun, UserPlus } from "lucide-react"
import { useTheme } from "next-themes"

// Tipo de datos para el usuario
type UserProfile = {
  name: string
  email: string
  avatar?: string
  plan: "free" | "premium" | "business"
  currency: string
  language: string
  notifications: {
    email: boolean
    push: boolean
    monthlyReport: boolean
    newFeatures: boolean
    tips: boolean
  }
  security: {
    twoFactorAuth: boolean
    sessionTimeout: number
    loginNotifications: boolean
  }
  appearance: {
    theme: "light" | "dark" | "system"
    compactMode: boolean
    animationsEnabled: boolean
  }
}

// Datos de ejemplo
const sampleUser: UserProfile = {
  name: "Carlos Rodríguez",
  email: "carlos@ejemplo.com",
  avatar: "/placeholder.svg?height=100&width=100",
  plan: "premium",
  currency: "EUR",
  language: "es",
  notifications: {
    email: true,
    push: true,
    monthlyReport: true,
    newFeatures: true,
    tips: false,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginNotifications: true,
  },
  appearance: {
    theme: "dark",
    compactMode: false,
    animationsEnabled: true,
  },
}

// Opciones para selects
const currencies = [
  { value: "USD", label: "Dólar estadounidense (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "Libra esterlina (GBP)" },
  { value: "JPY", label: "Yen japonés (JPY)" },
  { value: "MXN", label: "Peso mexicano (MXN)" },
  { value: "ARS", label: "Peso argentino (ARS)" },
  { value: "COP", label: "Peso colombiano (COP)" },
  { value: "CLP", label: "Peso chileno (CLP)" },
]

const languages = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "pt", label: "Português" },
]

const sessionTimeouts = [
  { value: 15, label: "15 minutos" },
  { value: 30, label: "30 minutos" },
  { value: 60, label: "1 hora" },
  { value: 120, label: "2 horas" },
  { value: 0, label: "Nunca" },
]

export function SettingsComponent() {
  const [user, setUser] = useState<UserProfile>(sampleUser)
  const [isSaving, setIsSaving] = useState(false)
  const { setTheme } = useTheme()

  // Manejar cambios en el perfil
  const handleProfileChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value })
  }

  // Manejar cambios en las notificaciones
  const handleNotificationChange = (field: keyof UserProfile["notifications"], value: boolean) => {
    setUser({
      ...user,
      notifications: {
        ...user.notifications,
        [field]: value,
      },
    })
  }

  // Manejar cambios en la seguridad
  const handleSecurityChange = (field: keyof UserProfile["security"], value: boolean | number) => {
    setUser({
      ...user,
      security: {
        ...user.security,
        [field]: value,
      },
    })
  }

  // Manejar cambios en la apariencia
  const handleAppearanceChange = (field: keyof UserProfile["appearance"], value: any) => {
    if (field === "theme") {
      setTheme(value)
    }

    setUser({
      ...user,
      appearance: {
        ...user.appearance,
        [field]: value,
      },
    })
  }

  // Simular guardado
  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
        <TabsTrigger value="profile">Perfil</TabsTrigger>
        <TabsTrigger value="preferences">Preferencias</TabsTrigger>
        <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        <TabsTrigger value="security">Seguridad</TabsTrigger>
        <TabsTrigger value="billing">Facturación</TabsTrigger>
      </TabsList>

      {/* Pestaña de Perfil */}
      <TabsContent value="profile" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información de Perfil</CardTitle>
            <CardDescription>Actualiza tu información personal y de contacto.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Cambiar foto
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" value={user.name} onChange={(e) => handleProfileChange("name", e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Plan actual</h4>
                  <p className="text-sm text-muted-foreground">
                    {user.plan === "free"
                      ? "Plan Gratuito"
                      : user.plan === "premium"
                        ? "Plan Premium"
                        : "Plan Empresarial"}
                  </p>
                </div>
                <Badge variant={user.plan === "free" ? "outline" : "default"}>
                  {user.plan === "free" ? "Gratuito" : user.plan === "premium" ? "Premium" : "Empresarial"}
                </Badge>
              </div>
              {user.plan !== "business" && (
                <Button variant="outline" className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Actualizar plan
                </Button>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancelar</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Pestaña de Preferencias */}
      <TabsContent value="preferences" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preferencias Generales</CardTitle>
            <CardDescription>Configura tus preferencias de idioma, moneda y apariencia.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="language">Idioma</Label>
                <Select value={user.language} onValueChange={(value) => handleProfileChange("language", value)}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Selecciona un idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language.value} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="currency">Moneda</Label>
                <Select value={user.currency} onValueChange={(value) => handleProfileChange("currency", value)}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Selecciona una moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Apariencia</h4>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Label htmlFor="theme">Tema</Label>
                  </div>
                  <Select
                    value={user.appearance.theme}
                    onValueChange={(value: "light" | "dark" | "system") => handleAppearanceChange("theme", value)}
                  >
                    <SelectTrigger id="theme" className="w-[140px]">
                      <SelectValue placeholder="Selecciona un tema" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Moon className="h-4 w-4" />
                    <Label htmlFor="compact-mode">Modo compacto</Label>
                  </div>
                  <Switch
                    id="compact-mode"
                    checked={user.appearance.compactMode}
                    onCheckedChange={(checked) => handleAppearanceChange("compactMode", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <Label htmlFor="animations">Animaciones</Label>
                  </div>
                  <Switch
                    id="animations"
                    checked={user.appearance.animationsEnabled}
                    onCheckedChange={(checked) => handleAppearanceChange("animationsEnabled", checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancelar</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Pestaña de Notificaciones */}
      <TabsContent value="notifications" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preferencias de Notificaciones</CardTitle>
            <CardDescription>Configura cómo y cuándo quieres recibir notificaciones.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Canales de notificación</h4>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <Label htmlFor="email-notifications">Notificaciones por correo</Label>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={user.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="push-notifications">Notificaciones push</Label>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={user.notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Tipos de notificaciones</h4>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="monthly-report" className="block">
                      Informe mensual
                    </Label>
                    <p className="text-sm text-muted-foreground">Recibe un resumen mensual de tus finanzas</p>
                  </div>
                  <Switch
                    id="monthly-report"
                    checked={user.notifications.monthlyReport}
                    onCheckedChange={(checked) => handleNotificationChange("monthlyReport", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-features" className="block">
                      Nuevas funcionalidades
                    </Label>
                    <p className="text-sm text-muted-foreground">Mantente informado sobre nuevas características</p>
                  </div>
                  <Switch
                    id="new-features"
                    checked={user.notifications.newFeatures}
                    onCheckedChange={(checked) => handleNotificationChange("newFeatures", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="tips" className="block">
                      Consejos financieros
                    </Label>
                    <p className="text-sm text-muted-foreground">Recibe consejos para mejorar tus finanzas</p>
                  </div>
                  <Switch
                    id="tips"
                    checked={user.notifications.tips}
                    onCheckedChange={(checked) => handleNotificationChange("tips", checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancelar</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Pestaña de Seguridad */}
      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Seguridad de la Cuenta</CardTitle>
            <CardDescription>Gestiona la seguridad de tu cuenta y configura la autenticación.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Contraseña actual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">Nueva contraseña</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="w-full">
                <Key className="mr-2 h-4 w-4" />
                Cambiar contraseña
              </Button>
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Autenticación y seguridad</h4>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="two-factor" className="block">
                      Autenticación de dos factores
                    </Label>
                    <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad a tu cuenta</p>
                  </div>
                  <Switch
                    id="two-factor"
                    checked={user.security.twoFactorAuth}
                    onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="login-notifications" className="block">
                      Notificaciones de inicio de sesión
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe alertas cuando alguien inicie sesión en tu cuenta
                    </p>
                  </div>
                  <Switch
                    id="login-notifications"
                    checked={user.security.loginNotifications}
                    onCheckedChange={(checked) => handleSecurityChange("loginNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="session-timeout" className="block">
                      Tiempo de inactividad
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Cierra sesión automáticamente después de un período de inactividad
                    </p>
                  </div>
                  <Select
                    value={user.security.sessionTimeout.toString()}
                    onValueChange={(value) => handleSecurityChange("sessionTimeout", Number.parseInt(value))}
                  >
                    <SelectTrigger id="session-timeout" className="w-[140px]">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTimeouts.map((timeout) => (
                        <SelectItem key={timeout.value} value={timeout.value.toString()}>
                          {timeout.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Sesiones activas</h4>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Este dispositivo</p>
                    <p className="text-xs text-muted-foreground">Última actividad: Hace 2 minutos</p>
                  </div>
                  <Badge>Actual</Badge>
                </div>
              </div>
              <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar todas las sesiones
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancelar</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Pestaña de Facturación */}
      <TabsContent value="billing" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Facturación y Suscripción</CardTitle>
            <CardDescription>Gestiona tu plan, métodos de pago y facturas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Plan actual</h4>
                  <p className="text-sm text-muted-foreground">
                    {user.plan === "free"
                      ? "Plan Gratuito"
                      : user.plan === "premium"
                        ? "Plan Premium"
                        : "Plan Empresarial"}
                  </p>
                </div>
                <Badge variant={user.plan === "free" ? "outline" : "default"}>
                  {user.plan === "free" ? "Gratuito" : user.plan === "premium" ? "Premium" : "Empresarial"}
                </Badge>
              </div>
              {user.plan !== "free" && (
                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Próxima facturación</p>
                      <p className="text-sm text-muted-foreground">15 de mayo, 2023</p>
                    </div>
                    <p className="text-sm font-medium">{user.plan === "premium" ? "9,99€" : "29,99€"} / mes</p>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-2">
                {user.plan === "free" ? (
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Actualizar a Premium
                  </Button>
                ) : (
                  <>
                    <Button variant="outline">Cambiar plan</Button>
                    <Button variant="destructive">Cancelar suscripción</Button>
                  </>
                )}
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Métodos de pago</h4>
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-6 w-6" />
                    <div>
                      <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expira: 12/2025</p>
                    </div>
                  </div>
                  <Badge>Predeterminado</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Añadir método de pago
              </Button>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Historial de facturas</h4>
                <Button variant="outline" size="sm">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Ver todas
                </Button>
              </div>
              <div className="rounded-md border divide-y">
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">Factura #INV-001</p>
                    <p className="text-xs text-muted-foreground">15 de abril, 2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Pagada</Badge>
                    <Button variant="ghost" size="sm">
                      Descargar
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">Factura #INV-002</p>
                    <p className="text-xs text-muted-foreground">15 de marzo, 2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Pagada</Badge>
                    <Button variant="ghost" size="sm">
                      Descargar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <HelpCircle className="h-4 w-4" />
              <p>
                ¿Necesitas ayuda con la facturación?{" "}
                <a href="#" className="underline">
                  Contacta con soporte
                </a>
              </p>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

