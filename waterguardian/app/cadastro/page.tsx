"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Droplet, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"

export default function Cadastro() {
  const router = useRouter()
  const { register, isAuthenticated } = useAuth()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [aceitaTermos, setAceitaTermos] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [cadastroSucesso, setCadastroSucesso] = useState(false)

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validação básica
    if (!nome || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.")
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    if (!aceitaTermos) {
      setError("Você precisa aceitar os termos de uso.")
      return
    }

    setIsLoading(true)

    try {
      const result = await register(nome, email, password)

      if (result.success) {
        setCadastroSucesso(true)

        // Redirecionar após 2 segundos
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer o cadastro. Tente novamente.")
      console.error("Erro ao fazer cadastro:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Droplet className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">WaterGuardian Solution</h1>
          <p className="text-muted-foreground">Monitore seu consumo de água</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Criar conta</CardTitle>
            <CardDescription>Cadastre-se para começar a monitorar seu consumo de água</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {cadastroSucesso ? (
              <div className="text-center py-6">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Cadastro realizado com sucesso!</h3>
                <p className="text-muted-foreground mb-4">
                  Você será redirecionado para a página de login em instantes...
                </p>
                <Button asChild className="mt-2">
                  <Link href="/login">Ir para o login</Link>
                </Button>
              </div>
            ) : (
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

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">A senha deve ter pelo menos 6 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={aceitaTermos}
                    onCheckedChange={(checked) => setAceitaTermos(checked as boolean)}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Aceito os{" "}
                    <Link href="#" className="text-primary hover:underline">
                      termos de uso
                    </Link>{" "}
                    e{" "}
                    <Link href="#" className="text-primary hover:underline">
                      política de privacidade
                    </Link>
                  </label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </form>
            )}
          </CardContent>
          {!cadastroSucesso && (
            <CardFooter className="flex flex-col space-y-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">ou</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Faça login
                  </Link>
                </p>
              </div>
            </CardFooter>
          )}
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:underline inline-flex items-center">
            <ArrowRight className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
