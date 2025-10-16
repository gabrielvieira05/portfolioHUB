"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SiteHeader } from "@/components/site-header"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { User, Mail, AlertCircle, CheckCircle2 } from "lucide-react"

export default function Perfil() {
  const { user } = useAuth()
  const [nome, setNome] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validação básica
    if (!nome || !email) {
      setError("Nome e email são obrigatórios.")
      return
    }

    if (senha && senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    if (senha && senha !== confirmarSenha) {
      setError("As senhas não coincidem.")
      return
    }

    setIsLoading(true)

    // Simulação de atualização de perfil
    setTimeout(() => {
      setIsLoading(false)
      setSuccess("Perfil atualizado com sucesso!")

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccess("")
      }, 3000)
    }, 1500)
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <SiteHeader />

        <div className="container mx-auto px-4 py-8 flex-1">
          <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Meu Perfil
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Atualize suas informações de perfil</CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Sucesso</AlertTitle>
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="nome"
                          type="text"
                          placeholder="Seu nome completo"
                          className="pl-10"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-4">Alterar Senha</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="senha">Nova senha</Label>
                          <Input
                            id="senha"
                            type="password"
                            placeholder="Deixe em branco para manter a senha atual"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmar-senha">Confirmar nova senha</Label>
                          <Input
                            id="confirmar-senha"
                            type="password"
                            placeholder="Confirme sua nova senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Salvando..." : "Salvar alterações"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Resumo da Conta</CardTitle>
                  <CardDescription>Informações sobre sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">
                        {user?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{user?.name}</h3>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Membro desde</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Último login</span>
                      <span>{new Date(user?.lastLogin || "").toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground">Status</span>
                      <span className="text-green-500 font-medium">Ativo</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Excluir minha conta
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        <EnhancedFooter />
      </div>
    </ProtectedRoute>
  )
}
