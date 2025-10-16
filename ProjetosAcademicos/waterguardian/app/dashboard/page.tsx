"use client"

import { useState, useEffect, useRef } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Droplet, AlertTriangle, TrendingDown, DollarSign, Calendar, PlusCircle, Wifi } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/components/protected-route"

// Interface para o tipo de sensor
interface Sensor {
  id: string
  nome: string
  local: string
  tipo: string
  status: "online" | "offline" | "error"
  ultimaLeitura: number
  ultimaAtualizacao: Date
  intervaloAtualizacao: number
  ativo: boolean
}

// Interface para os dados do gráfico
interface ChartDataPoint {
  name: string
  consumo: number
  timestamp?: number
}

export default function Dashboard() {
  const router = useRouter()
  const [timeframe, setTimeframe] = useState("diario")
  const [sensores, setSensores] = useState<Sensor[]>([])
  const [sensorAtivo, setSensorAtivo] = useState<Sensor | null>(null)
  const [consumoAtual, setConsumoAtual] = useState(0)
  const [consumoTotal, setConsumoTotal] = useState(0)
  const [custoEstimado, setCustoEstimado] = useState("0.00")
  const [tempoDecorrido, setTempoDecorrido] = useState(0)

  // Estados para os dados dos gráficos
  const [dailyData, setDailyData] = useState<ChartDataPoint[]>([])
  const [weeklyData, setWeeklyData] = useState<ChartDataPoint[]>([])
  const [monthlyData, setMonthlyData] = useState<ChartDataPoint[]>([])

  // Histórico de leituras para o gráfico em tempo real
  const [leituraHistorico, setLeituraHistorico] = useState<{ valor: number; timestamp: number }[]>([])

  // Referência para armazenar o intervalo de atualização dos gráficos
  const updateInterval = useRef<NodeJS.Timeout | null>(null)

  // Inicializa os dados dos gráficos
  useEffect(() => {
    // Dados iniciais para o gráfico diário (últimas 24 horas)
    const initialDailyData: ChartDataPoint[] = []
    const now = new Date()

    for (let i = 0; i < 24; i += 4) {
      const hour = new Date(now)
      hour.setHours(now.getHours() - 24 + i)
      initialDailyData.push({
        name: `${hour.getHours().toString().padStart(2, "0")}:00`,
        consumo: Math.floor(Math.random() * 30) + 5,
        timestamp: hour.getTime(),
      })
    }

    // Adiciona o ponto atual
    initialDailyData.push({
      name: `${now.getHours().toString().padStart(2, "0")}:00`,
      consumo: 0, // Será atualizado com dados reais
      timestamp: now.getTime(),
    })

    setDailyData(initialDailyData)

    // Dados iniciais para o gráfico semanal
    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
    const today = now.getDay()
    const initialWeeklyData: ChartDataPoint[] = []

    for (let i = 0; i < 7; i++) {
      const dayIndex = (today - 6 + i + 7) % 7
      initialWeeklyData.push({
        name: weekDays[dayIndex],
        consumo: Math.floor(Math.random() * 100) + 100,
        timestamp: new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - i)).getTime(),
      })
    }

    setWeeklyData(initialWeeklyData)

    // Dados iniciais para o gráfico mensal
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    const currentMonth = now.getMonth()
    const initialMonthlyData: ChartDataPoint[] = []

    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth - 5 + i + 12) % 12
      initialMonthlyData.push({
        name: months[monthIndex],
        consumo: Math.floor(Math.random() * 1000) + 3000,
        timestamp: new Date(now.getFullYear(), currentMonth - 5 + i, 1).getTime(),
      })
    }

    setMonthlyData(initialMonthlyData)
  }, [])

  // Carrega os sensores do localStorage
  useEffect(() => {
    const sensoresSalvos = localStorage.getItem("waterguardian_sensores")
    if (sensoresSalvos) {
      try {
        // Converte as strings de data de volta para objetos Date
        const parsed = JSON.parse(sensoresSalvos).map((sensor: any) => ({
          ...sensor,
          ultimaAtualizacao: new Date(sensor.ultimaAtualizacao),
        }))
        setSensores(parsed)

        // Define o primeiro sensor online como ativo
        const sensorOnline = parsed.find((s: Sensor) => s.status === "online" && s.ativo)
        if (sensorOnline) {
          setSensorAtivo(sensorOnline)
          setConsumoAtual(sensorOnline.ultimaLeitura)
        }
      } catch (error) {
        console.error("Erro ao carregar sensores:", error)
      }
    }
  }, [])

  // Atualiza os dados quando o sensor ativo muda
  useEffect(() => {
    if (sensorAtivo) {
      setConsumoAtual(sensorAtivo.ultimaLeitura)

      // Inicializa o histórico de leituras com o valor atual
      setLeituraHistorico([
        {
          valor: sensorAtivo.ultimaLeitura,
          timestamp: new Date().getTime(),
        },
      ])
    }
  }, [sensorAtivo])

  // Simula atualizações periódicas dos sensores online e atualiza o gráfico
  useEffect(() => {
    const interval = setInterval(() => {
      setSensores((prevSensores) => {
        const sensoresAtualizados = prevSensores.map((sensor) => {
          if (sensor.status === "online" && sensor.ativo) {
            // Gera uma nova leitura aleatória próxima à anterior
            const novaLeitura = Math.max(0.1, sensor.ultimaLeitura + (Math.random() * 0.6 - 0.3)).toFixed(1)
            const leituraAtualizada = Number.parseFloat(novaLeitura)

            // Se este é o sensor ativo, atualiza o histórico de leituras
            if (sensorAtivo && sensor.id === sensorAtivo.id) {
              setLeituraHistorico((prev) => {
                // Mantém apenas as últimas 20 leituras para o gráfico em tempo real
                const novoHistorico = [
                  ...prev,
                  {
                    valor: leituraAtualizada,
                    timestamp: new Date().getTime(),
                  },
                ]

                if (novoHistorico.length > 20) {
                  return novoHistorico.slice(-20)
                }
                return novoHistorico
              })

              // Atualiza o consumo atual
              setConsumoAtual(leituraAtualizada)
            }

            return {
              ...sensor,
              ultimaLeitura: leituraAtualizada,
              ultimaAtualizacao: new Date(),
            }
          }
          return sensor
        })

        // Atualiza o localStorage
        localStorage.setItem("waterguardian_sensores", JSON.stringify(sensoresAtualizados))

        // Atualiza o sensor ativo se necessário
        if (sensorAtivo) {
          const sensorAtivoAtualizado = sensoresAtualizados.find((s) => s.id === sensorAtivo.id)
          if (sensorAtivoAtualizado) {
            setSensorAtivo(sensorAtivoAtualizado)
          }
        }

        return sensoresAtualizados
      })
    }, 5000) // Atualiza a cada 5 segundos

    return () => clearInterval(interval)
  }, [sensorAtivo])

  // Atualiza os gráficos com base no histórico de leituras
  useEffect(() => {
    if (leituraHistorico.length > 0) {
      // Atualiza o gráfico diário com os dados em tempo real
      setDailyData((prev) => {
        const newData = [...prev]
        const lastReading = leituraHistorico[leituraHistorico.length - 1]

        // Atualiza o último ponto do gráfico com a leitura mais recente
        if (newData.length > 0) {
          const lastIndex = newData.length - 1
          newData[lastIndex] = {
            ...newData[lastIndex],
            consumo: Math.round(lastReading.valor * 10), // Converte L/min para litros em 10 minutos
          }
        }

        // A cada 12 leituras (aproximadamente 1 hora), adiciona um novo ponto ao gráfico
        if (leituraHistorico.length % 12 === 0) {
          const now = new Date()
          newData.push({
            name: `${now.getHours().toString().padStart(2, "0")}:00`,
            consumo: Math.round(lastReading.valor * 10),
            timestamp: now.getTime(),
          })

          // Mantém apenas os últimos 7 pontos para não sobrecarregar o gráfico
          if (newData.length > 7) {
            return newData.slice(-7)
          }
        }

        return newData
      })

      // Atualiza o gráfico semanal menos frequentemente
      if (leituraHistorico.length % 24 === 0) {
        setWeeklyData((prev) => {
          const newData = [...prev]
          const lastIndex = newData.length - 1

          // Atualiza o consumo do dia atual com base na média das leituras
          const mediaLeituras = leituraHistorico.reduce((sum, item) => sum + item.valor, 0) / leituraHistorico.length
          newData[lastIndex] = {
            ...newData[lastIndex],
            consumo: Math.max(100, newData[lastIndex].consumo + Math.round(mediaLeituras * 5)),
          }

          return newData
        })
      }
    }
  }, [leituraHistorico])

  // Calcula o consumo total e o custo estimado
  useEffect(() => {
    // Seleciona os dados com base no período escolhido
    const chartData = timeframe === "diario" ? dailyData : timeframe === "semanal" ? weeklyData : monthlyData

    // Calcula o consumo total (soma de todos os valores)
    const total = chartData.reduce((total, item) => total + item.consumo, 0)
    setConsumoTotal(total)

    // Calcula o custo estimado (R$ 5 por m³ - valor fictício)
    setCustoEstimado(((total * 5) / 1000).toFixed(2))
  }, [timeframe, dailyData, weeklyData, monthlyData])

  // Simula o tempo decorrido desde o início da medição
  useEffect(() => {
    const timer = setInterval(() => {
      setTempoDecorrido((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Formata o tempo decorrido em horas:minutos:segundos
  const formatarTempoDecorrido = () => {
    const horas = Math.floor(tempoDecorrido / 3600)
    const minutos = Math.floor((tempoDecorrido % 3600) / 60)
    const segundos = tempoDecorrido % 60

    return `${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`
  }

  // Formata a data da última atualização
  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(data)
  }

  // Seleciona os dados com base no período escolhido
  const chartData = timeframe === "diario" ? dailyData : timeframe === "semanal" ? weeklyData : monthlyData

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <SiteHeader />

        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="flex justify-between items-center mb-6">
            <motion.h1
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Dashboard de Consumo
            </motion.h1>

            <Button onClick={() => router.push("/sensores")} className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Gerenciar Sensores
            </Button>
          </div>

          {sensores.length === 0 && (
            <Alert className="mb-8 border-none bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Nenhum sensor encontrado</AlertTitle>
              <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span>Você ainda não possui sensores cadastrados para monitoramento em tempo real.</span>
                <Button size="sm" onClick={() => router.push("/sensores")}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar sensor
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {sensores.length > 0 && !sensores.some((s) => s.status === "online" && s.ativo) && (
            <Alert className="mb-8 border-none bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Sensores offline</AlertTitle>
              <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span>Todos os seus sensores estão offline. Verifique a conexão dos dispositivos.</span>
                <Button size="sm" onClick={() => router.push("/sensores")}>
                  <Wifi className="mr-2 h-4 w-4" />
                  Gerenciar sensores
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ScrollReveal>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Consumo Atual</CardTitle>
                  <Droplet className="h-4 w-4 text-primary animate-float" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {sensorAtivo ? (
                      <span>{sensorAtivo.ultimaLeitura.toFixed(1)} L/min</span>
                    ) : (
                      <span>{consumoAtual} litros</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {sensorAtivo ? (
                      <span>Atualizado às {formatarData(sensorAtivo.ultimaAtualizacao)}</span>
                    ) : (
                      <span>
                        {timeframe === "diario" ? "na última hora" : timeframe === "semanal" ? "hoje" : "este mês"}
                      </span>
                    )}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Consumo Total</CardTitle>
                  <TrendingDown className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{consumoTotal} litros</div>
                  <p className="text-xs text-muted-foreground">
                    {timeframe === "diario" ? "hoje" : timeframe === "semanal" ? "esta semana" : "este mês"}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Custo Estimado</CardTitle>
                  <DollarSign className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ {custoEstimado}</div>
                  <p className="text-xs text-muted-foreground">
                    {timeframe === "diario" ? "hoje" : timeframe === "semanal" ? "esta semana" : "este mês"}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <Alert className="mb-8 border-none bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Atenção!</AlertTitle>
              <AlertDescription>
                Seu consumo está 15% acima da média para este período. Confira nossas dicas para economizar água.
              </AlertDescription>
            </Alert>
          </ScrollReveal>

          <div className="mb-8">
            <ScrollReveal>
              <Tabs defaultValue="diario" onValueChange={setTimeframe}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Gráfico de Consumo</h2>
                  <TabsList>
                    <TabsTrigger value="diario">Diário</TabsTrigger>
                    <TabsTrigger value="semanal">Semanal</TabsTrigger>
                    <TabsTrigger value="mensal">Mensal</TabsTrigger>
                  </TabsList>
                </div>

                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <TabsContent value="diario" className="mt-0">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dailyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`${value} litros`, "Consumo"]}
                            labelFormatter={(label) => `Hora: ${label}`}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="consumo"
                            stroke="hsl(var(--primary))"
                            name="Consumo (litros)"
                            strokeWidth={2}
                            dot={{ strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                            isAnimationActive={true}
                            animationDuration={500}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </TabsContent>

                    <TabsContent value="semanal" className="mt-0">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`${value} litros`, "Consumo"]}
                            labelFormatter={(label) => `Dia: ${label}`}
                          />
                          <Legend />
                          <Bar
                            dataKey="consumo"
                            fill="hsl(var(--primary))"
                            name="Consumo (litros)"
                            radius={[4, 4, 0, 0]}
                            isAnimationActive={true}
                            animationDuration={500}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </TabsContent>

                    <TabsContent value="mensal" className="mt-0">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`${value} litros`, "Consumo"]}
                            labelFormatter={(label) => `Mês: ${label}`}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="consumo"
                            stroke="hsl(var(--primary))"
                            name="Consumo (litros)"
                            strokeWidth={2}
                            dot={{ strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                            isAnimationActive={true}
                            animationDuration={500}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </TabsContent>
                  </CardContent>
                </Card>
              </Tabs>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal delay={1}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Consumo em Tempo Real</CardTitle>
                    {sensorAtivo && (
                      <Badge variant="outline" className="text-primary border-primary">
                        {sensorAtivo.nome}
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {sensorAtivo
                      ? `Monitoramento ao vivo do seu consumo de água via ${sensorAtivo.local}`
                      : "Conecte um sensor IoT para monitoramento em tempo real"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center p-6 space-y-4">
                    {sensorAtivo ? (
                      <>
                        <motion.div
                          className="relative w-32 h-32 flex items-center justify-center"
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
                          <Droplet className="w-32 h-32 text-primary/20" />
                          <Droplet className="w-24 h-24 text-primary/40 absolute animate-pulse" />
                          <span className="absolute text-2xl font-bold">{sensorAtivo.ultimaLeitura.toFixed(1)}</span>
                          <span className="absolute mt-10 text-sm">L/min</span>
                        </motion.div>
                        <div className="flex flex-col items-center space-y-2">
                          <Badge variant="outline" className="text-green-500 border-green-500">
                            <Calendar className="mr-1 h-3 w-3" />
                            Atualizado às {formatarData(sensorAtivo.ultimaAtualizacao)}
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            Tempo de monitoramento: {formatarTempoDecorrido()}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <Wifi className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Nenhum sensor ativo</h3>
                        <p className="text-muted-foreground mb-4">
                          Conecte um sensor IoT para visualizar seu consumo de água em tempo real.
                        </p>
                        <Button onClick={() => router.push("/sensores")}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Gerenciar sensores
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle>Dicas de Economia</CardTitle>
                  <CardDescription>Sugestões personalizadas para reduzir seu consumo</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <motion.li
                      className="flex items-start gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <TrendingDown className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Reduza o tempo no banho</p>
                        <p className="text-sm text-muted-foreground">
                          Reduzir o banho em 2 minutos pode economizar até 20 litros de água.
                        </p>
                      </div>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <TrendingDown className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Verifique vazamentos</p>
                        <p className="text-sm text-muted-foreground">
                          Um vazamento pequeno pode desperdiçar até 30 litros por dia.
                        </p>
                      </div>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-2"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <TrendingDown className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Use a máquina de lavar com carga completa</p>
                        <p className="text-sm text-muted-foreground">
                          Economize até 100 litros por lavagem utilizando a capacidade máxima.
                        </p>
                      </div>
                    </motion.li>
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>

        <EnhancedFooter />
      </div>
    </ProtectedRoute>
  )
}
