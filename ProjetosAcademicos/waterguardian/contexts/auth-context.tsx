"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { AuthService, type UserSession } from "@/lib/auth-service"

interface AuthContextType {
  user: UserSession | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Verificar se o usuário está logado ao carregar a página
  useEffect(() => {
    const initAuth = async () => {
      // Inicializar dados de demonstração
      await AuthService.initDemoData()

      // Verificar se há uma sessão ativa
      if (AuthService.isAuthenticated()) {
        const currentUser = AuthService.getCurrentUser()
        setUser(currentUser)
      }

      setIsLoading(false)
    }

    initAuth()
  }, [])

  // Função de login
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    const result = await AuthService.login(email, password)

    if (result.success && result.user) {
      setUser(result.user)
    }

    setIsLoading(false)
    return result
  }

  // Função de registro
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    const result = await AuthService.register(name, email, password)
    setIsLoading(false)
    return result
  }

  // Função de logout
  const logout = () => {
    AuthService.logout()
    setUser(null)
    router.push("/login")
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
