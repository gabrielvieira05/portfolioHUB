import { hash, compare } from "./crypto"

// Tipos para o usuário
export interface User {
  id: string
  name: string
  email: string
  password: string // Senha criptografada
  createdAt: string
  lastLogin?: string
}

export interface UserSession {
  id: string
  name: string
  email: string
  isLoggedIn: boolean
  lastLogin: string
}

// Chaves para o localStorage
const USERS_STORAGE_KEY = "waterguardian_users"
const SESSION_STORAGE_KEY = "waterguardian_session"

// Funções auxiliares para o localStorage
const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY)
  return usersJson ? JSON.parse(usersJson) : []
}

const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

const getCurrentSession = (): UserSession | null => {
  const sessionJson = localStorage.getItem(SESSION_STORAGE_KEY)
  return sessionJson ? JSON.parse(sessionJson) : null
}

const saveSession = (session: UserSession | null): void => {
  if (session) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY)
  }
}

// Serviço de autenticação
export const AuthService = {
  // Registrar um novo usuário
  register: async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const users = getUsers()

      // Verificar se o email já está em uso
      if (users.some((user) => user.email === email)) {
        return { success: false, message: "Este email já está em uso." }
      }

      // Criar novo usuário com senha criptografada
      const hashedPassword = await hash(password)
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      }

      // Salvar o novo usuário
      users.push(newUser)
      saveUsers(users)

      return { success: true, message: "Cadastro realizado com sucesso!" }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error)
      return { success: false, message: "Ocorreu um erro ao processar o cadastro. Tente novamente." }
    }
  },

  // Login de usuário
  login: async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string; user?: UserSession }> => {
    try {
      const users = getUsers()
      const user = users.find((u) => u.email === email)

      // Verificar se o usuário existe
      if (!user) {
        return { success: false, message: "Email ou senha incorretos." }
      }

      // Verificar se a senha está correta
      const isPasswordValid = await compare(password, user.password)
      if (!isPasswordValid) {
        return { success: false, message: "Email ou senha incorretos." }
      }

      // Atualizar último login
      const lastLogin = new Date().toISOString()
      const updatedUsers = users.map((u) => (u.id === user.id ? { ...u, lastLogin } : u))
      saveUsers(updatedUsers)

      // Criar e salvar sessão
      const session: UserSession = {
        id: user.id,
        name: user.name,
        email: user.email,
        isLoggedIn: true,
        lastLogin,
      }
      saveSession(session)

      return {
        success: true,
        message: "Login realizado com sucesso!",
        user: session,
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      return { success: false, message: "Ocorreu um erro ao processar o login. Tente novamente." }
    }
  },

  // Verificar se o usuário está logado
  isAuthenticated: (): boolean => {
    const session = getCurrentSession()
    return !!session?.isLoggedIn
  },

  // Obter dados do usuário atual
  getCurrentUser: (): UserSession | null => {
    return getCurrentSession()
  },

  // Logout
  logout: (): void => {
    saveSession(null)
  },

  // Inicializar dados de exemplo (para demonstração)
  initDemoData: async (): Promise<void> => {
    // Verificar se já existem usuários
    const users = getUsers()
    if (users.length === 0) {
      // Criar usuário de demonstração
      const demoPassword = await hash("senha123")
      const demoUser: User = {
        id: "user_demo",
        name: "Usuário Demo",
        email: "demo@waterguardian.com",
        password: demoPassword,
        createdAt: new Date().toISOString(),
      }
      saveUsers([demoUser])
      console.log("Dados de demonstração inicializados")
    }
  },
}
