"use client"

import Link from "next/link"
import { Droplet, LogOut, User } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-6 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="flex items-center gap-2 mb-4 md:mb-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Droplet className="h-6 w-6 text-primary-foreground animate-float" />
              <h1 className="text-2xl font-bold water-guardian-logo-light">WaterGuardian Solution</h1>
            </Link>
          </motion.div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <motion.nav
              className="flex gap-8 mb-4 md:mb-0 justify-center md:mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href="/"
                className={`font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground ${
                  isActive("/") ? "text-primary-foreground font-bold" : ""
                }`}
              >
                Início
              </Link>
              <Link
                href="/dashboard"
                className={`font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground ${
                  isActive("/dashboard") ? "text-primary-foreground font-bold" : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/sensores"
                className={`font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground ${
                  isActive("/sensores") ? "text-primary-foreground font-bold" : ""
                }`}
              >
                Sensores
              </Link>
              <Link
                href="/forum"
                className={`font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground ${
                  isActive("/forum") ? "text-primary-foreground font-bold" : ""
                }`}
              >
                Fórum
              </Link>
              <Link
                href="/dicas"
                className={`font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground ${
                  isActive("/dicas") ? "text-primary-foreground font-bold" : ""
                }`}
              >
                Dicas
              </Link>
              <Link
                href="/sobre"
                className={`font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground ${
                  isActive("/sobre") ? "text-primary-foreground font-bold" : ""
                }`}
              >
                Sobre
              </Link>
            </motion.nav>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user?.name.split(" ")[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/perfil" className="flex w-full">
                        Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/configuracoes" className="flex w-full">
                        Configurações
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="outline"
                    asChild
                    size="sm"
                    className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <Link href="/login">Entrar</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    <Link href="/cadastro">Cadastrar</Link>
                  </Button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  )
}
