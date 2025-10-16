"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

interface BackButtonProps {
  href?: string
}

export function BackButton({ href }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <div className="flex gap-2 mb-6">
      <Button variant="outline" size="sm" onClick={handleBack} className="flex items-center gap-1 hover:bg-primary/10">
        <ArrowLeft className="h-4 w-4" />
        <span>Voltar</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push("/")}
        className="flex items-center gap-1 hover:bg-primary/10"
      >
        <Home className="h-4 w-4" />
        <span>Início</span>
      </Button>
    </div>
  )
}
