"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle, DollarSign, BarChart2, Droplet, Wifi } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { ImageCarousel } from "@/components/image-carousel"

// Images for the carousel
const carouselImages = [
  {
    src: "/sensor.png",
    alt: "Conservação de água em casa",
  },
  {
    src: "/instalacao.png",
    alt: "Tecnologia para monitoramento de água",
  },
  {
    src: "/monitoramento.png",
    alt: "Economia de água no dia a dia",
  },
  {
    src: "/captacao.png",
    alt: "Sustentabilidade hídrica",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-6 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex items-center gap-2 mb-4 md:mb-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Droplet className="h-6 w-6 text-primary-foreground animate-float" />
              <h1 className="text-2xl font-bold water-guardian-logo-light">WaterGuardian Solution</h1>
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
                  className="font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground"
                >
                  Início
                </Link>
                <Link
                  href="/dashboard"
                  className="font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  href="/sensores"
                  className="font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground"
                >
                  Sensores
                </Link>
                <Link
                  href="/forum"
                  className="font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground"
                >
                  Fórum
                </Link>
                <Link
                  href="/dicas"
                  className="font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground"
                >
                  Dicas
                </Link>
                <Link
                  href="/sobre"
                  className="font-medium nav-link text-primary-foreground/90 hover:text-primary-foreground"
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
                <Button
                  variant="outline"
                  asChild
                  size="sm"
                  className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild size="sm" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  <Link href="/cadastro">Cadastrar</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <ScrollReveal>
                <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                  Monitore seu consumo de água em tempo real
                </h2>
                <p className="text-lg mb-6">
                  O WaterGuardian Solution ajuda você a acompanhar seu consumo de água, economizar dinheiro e contribuir
                  para um futuro mais sustentável.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" className="group">
                    <Link href="/cadastro" className="flex items-center">
                      Começar agora
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              </ScrollReveal>
              <ScrollReveal delay={3}>
                <motion.div
                  className="bg-primary/10 p-8 rounded-lg"
                  animate={{
                    boxShadow: [
                      "0px 0px 0px rgba(0,102,204,0.2)",
                      "0px 0px 20px rgba(0,102,204,0.5)",
                      "0px 0px 0px rgba(0,102,204,0.2)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <div className="aspect-video relative flex items-center justify-center rounded-lg overflow-hidden">
                    <ImageCarousel images={carouselImages} />
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <ScrollReveal delay={1}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <BarChart2 className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Monitoramento em tempo real</CardTitle>
                    <CardDescription>
                      Acompanhe seu consumo de água em tempo real com gráficos detalhados.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Visualize padrões de consumo, identifique picos e receba alertas quando o consumo estiver acima do
                      normal.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full group">
                      <Link href="/dashboard" className="flex items-center justify-center">
                        Ver dashboard
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <Wifi className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Sensores inteligentes</CardTitle>
                    <CardDescription>Gerencie seus sensores IoT para monitoramento preciso do consumo.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Adicione, configure e monitore sensores em diferentes pontos da sua casa para um controle
                      detalhado do consumo de água.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full group">
                      <Link href="/sensores" className="flex items-center justify-center">
                        Gerenciar sensores
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={3}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <MessageCircle className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Fórum de discussão</CardTitle>
                    <CardDescription>
                      Conecte-se com outros usuários para compartilhar dicas de economia de água.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Participe de discussões, compartilhe suas experiências e aprenda com a comunidade sobre como
                      economizar água.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full group">
                      <Link href="/forum" className="flex items-center justify-center">
                        Acessar fórum
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={4}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Economia financeira</CardTitle>
                    <CardDescription>
                      Calcule quanto você está gastando e quanto pode economizar com uso consciente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Acompanhe seus gastos financeiros relacionados ao consumo de água e receba sugestões
                      personalizadas para economizar.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full group">
                      <Link href="/economia" className="flex items-center justify-center">
                        Ver economia
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <EnhancedFooter />
    </div>
  )
}
