"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Bot, User, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  attachments?: Attachment[]
}

type Attachment = {
  id: string
  type: "image" | "document"
  name: string
  url: string
  size?: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! Soy tu asistente financiero personal. ¿En qué puedo ayudarte hoy?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]) //Corrected dependency

  const handleSendMessage = () => {
    if (!input.trim() && attachments.length === 0) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setAttachments([])
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const assistantResponses = [
        "Basado en tu historial de gastos, te recomiendo reducir los gastos en entretenimiento en un 15% para alcanzar tu meta de ahorro.",
        "He analizado tus finanzas y veo que podrías ahorrar aproximadamente $320 al mes si optimizas tus gastos en servicios.",
        "Tus ingresos han aumentado un 8% respecto al mes anterior. ¡Buen trabajo! Te sugiero destinar este incremento a tu fondo de emergencia.",
        "He detectado un gasto recurrente en suscripciones que no estás utilizando. Podrías ahorrar $45 mensuales cancelando estos servicios.",
      ]

      const randomResponse = assistantResponses[Math.floor(Math.random() * assistantResponses.length)]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newAttachments: Attachment[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const isImage = file.type.startsWith("image/")

      newAttachments.push({
        id: Date.now() + i.toString(),
        type: isImage ? "image" : "document",
        name: file.name,
        url: URL.createObjectURL(file),
        size: formatFileSize(file.size),
      })
    }

    setAttachments((prev) => [...prev, ...newAttachments])

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <Card className="border rounded-lg overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
              <div
                className={`flex gap-3 max-w-[80%] ${message.role === "assistant" ? "flex-row" : "flex-row-reverse"}`}
              >
                <Avatar className={`h-8 w-8 ${message.role === "assistant" ? "bg-primary" : "bg-secondary"}`}>
                  {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </Avatar>
                <div>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === "assistant"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>

                  {/* Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map((attachment) => (
                        <div key={attachment.id} className="rounded-lg overflow-hidden border">
                          {attachment.type === "image" ? (
                            <div className="relative">
                              <img
                                src={attachment.url || "/placeholder.svg"}
                                alt={attachment.name}
                                className="max-h-48 w-auto object-contain"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-xs text-white">
                                {attachment.name}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 p-2 bg-muted">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{attachment.name}</p>
                                <p className="text-xs text-muted-foreground">{attachment.size}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8 bg-primary">
                  <Bot className="h-4 w-4" />
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-secondary text-secondary-foreground">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-75" />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t bg-muted/30">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="relative group">
                <div className="border rounded-md overflow-hidden bg-background p-1">
                  {attachment.type === "image" ? (
                    <div className="relative h-16 w-16">
                      <img
                        src={attachment.url || "/placeholder.svg"}
                        alt={attachment.name}
                        className="h-full w-full object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-16 w-16 p-1">
                      <FileText className="h-6 w-6 text-muted-foreground" />
                      <p className="text-xs truncate max-w-full">{attachment.name.substring(0, 10)}</p>
                    </div>
                  )}
                </div>
                <button
                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeAttachment(attachment.id)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="shrink-0" onClick={() => fileInputRef.current?.click()}>
            <Paperclip className="h-4 w-4" />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              multiple
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv"
            />
          </Button>
          <Textarea
            placeholder="Escribe un mensaje..."
            className="min-h-10 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            className="shrink-0"
            size="icon"
            onClick={handleSendMessage}
            disabled={!input.trim() && attachments.length === 0}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Puedes adjuntar imágenes de recibos, facturas o documentos financieros para análisis.
        </p>
      </div>
    </Card>
  )
}

