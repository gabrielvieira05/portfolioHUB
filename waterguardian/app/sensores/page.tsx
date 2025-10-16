"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Wifi,
  PlusCircle,
  Trash2,
  Edit,
  Save,
  X,
  AlertTriangle,
  CheckCircle2,
  Droplet,
  RefreshCw,
  Settings,
  BarChart2,
} from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SiteHeader } from "@/components/site-header"
import { ProtectedRoute } from "@/components/protected-route"

// Tipos para os sensores
interface Sensor {
  id: string
  nome: string
  local: string
  tipo: string
  status: "online" | "offline" | "error"
  ultimaLeitura: number
  ultimaAtualizacao: Date
  intervaloAtualizacao: number // em segundos
  ativo: boolean
}

export default function Sensores() {
  const router = useRouter()
  const [sensores, setSensores] = useState<Sensor[]>([])
  const [novoSensor, setNovoSensor] = useState<Omit<Sensor, "id" | "ultimaLeitura" | "ultimaAtualizacao" | "status">>({
    nome: "",
    local: "",
    tipo: "fluxo",
    intervaloAtualizacao: 60,
    ativo: true,
  })
  const [editandoSensor, setEditandoSensor] = useState<string | null>(null)
  const [sensorEditado, setSensorEditado] = useState<Sensor | null>(null)
  const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null)
  const [testando, setTestando] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("sensores")
  const [sensorSelecionado, setSensorSelecionado] = useState<string | null>(null)

  // Carrega os sensores salvos no localStorage ao iniciar
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
      } catch (error) {
        console.error("Erro ao carregar sensores:", error)
      }
    } else {
      // Cria um sensor de exemplo se não houver nenhum
      const sensorExemplo: Sensor = {
        id: "sensor-" + Date.now(),
        nome: "Sensor Principal",
        local: "Entrada de água",
        tipo: "fluxo",
        status: "online",
        ultimaLeitura: 3.2,
        ultimaAtualizacao: new Date(),
        intervaloAtualizacao: 60,
        ativo: true,
      }
      setSensores([sensorExemplo])
      localStorage.setItem("waterguardian_sensores", JSON.stringify([sensorExemplo]))
    }
  }, [])

  // Salva os sensores no localStorage quando houver alterações
  useEffect(() => {
    if (sensores.length > 0) {
      localStorage.setItem("waterguardian_sensores", JSON.stringify(sensores))
    }
  }, [sensores])

  // Simula atualizações periódicas dos sensores online
  useEffect(() => {
    const interval = setInterval(() => {
      setSensores((prevSensores) =>
        prevSensores.map((sensor) => {
          if (sensor.status === "online" && sensor.ativo) {
            // Gera uma nova leitura aleatória próxima à anterior
            const novaLeitura = Math.max(0.1, sensor.ultimaLeitura + (Math.random() * 0.6 - 0.3)).toFixed(1)

            return {
              ...sensor,
              ultimaLeitura: Number.parseFloat(novaLeitura),
              ultimaAtualizacao: new Date(),
            }
          }
          return sensor
        }),
      )
    }, 5000) // Atualiza a cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  const adicionarSensor = () => {
    if (!novoSensor.nome || !novoSensor.local) {
      setMensagem({
        tipo: "erro",
        texto: "Por favor, preencha todos os campos obrigatórios.",
      })
      return
    }

    const novoId = "sensor-" + Date.now()
    const sensor: Sensor = {
      ...novoSensor,
      id: novoId,
      status: "offline", // Começa offline até ser conectado
      ultimaLeitura: 0,
      ultimaAtualizacao: new Date(),
    }

    setSensores([...sensores, sensor])
    setNovoSensor({
      nome: "",
      local: "",
      tipo: "fluxo",
      intervaloAtualizacao: 60,
      ativo: true,
    })

    setMensagem({
      tipo: "sucesso",
      texto: "Sensor adicionado com sucesso! Conecte-o para começar a receber dados.",
    })

    // Limpa a mensagem após 5 segundos
    setTimeout(() => setMensagem(null), 5000)

    // Muda para a aba do novo sensor
    setSensorSelecionado(novoId)
    setActiveTab(novoId)
  }

  const removerSensor = (id: string) => {
    // Verifica se o sensor a ser removido é o selecionado
    if (sensorSelecionado === id) {
      setSensorSelecionado(null)
      setActiveTab("sensores")
    }

    setSensores(sensores.filter((sensor) => sensor.id !== id))
    setMensagem({
      tipo: "sucesso",
      texto: "Sensor removido com sucesso.",
    })
    setTimeout(() => setMensagem(null), 5000)
  }

  const iniciarEdicao = (id: string) => {
    const sensor = sensores.find((s) => s.id === id)
    if (sensor) {
      setEditandoSensor(id)
      setSensorEditado({ ...sensor })
    }
  }

  const cancelarEdicao = () => {
    setEditandoSensor(null)
    setSensorEditado(null)
  }

  const salvarEdicao = () => {
    if (sensorEditado) {
      setSensores(sensores.map((sensor) => (sensor.id === sensorEditado.id ? { ...sensorEditado } : sensor)))
      setEditandoSensor(null)
      setSensorEditado(null)
      setMensagem({
        tipo: "sucesso",
        texto: "Sensor atualizado com sucesso.",
      })
      setTimeout(() => setMensagem(null), 5000)
    }
  }

  const alternarStatus = (id: string) => {
    setSensores(
      sensores.map((sensor) => {
        if (sensor.id === id) {
          const novoStatus = sensor.status === "online" ? "offline" : "online"
          return {
            ...sensor,
            status: novoStatus,
            ultimaAtualizacao: novoStatus === "online" ? new Date() : sensor.ultimaAtualizacao,
          }
        }
        return sensor
      }),
    )
  }

  const testarConexao = (id: string) => {
    setTestando(id)

    // Simula um teste de conexão
    setTimeout(() => {
      setSensores(
        sensores.map((sensor) => {
          if (sensor.id === id) {
            // 80% de chance de sucesso no teste
            const sucesso = Math.random() > 0.2
            return {
              ...sensor,
              status: sucesso ? "online" : "error",
              ultimaAtualizacao: sucesso ? new Date() : sensor.ultimaAtualizacao,
              ultimaLeitura: sucesso ? Math.random() * 5 + 1 : sensor.ultimaLeitura,
            }
          }
          return sensor
        }),
      )
      setTestando(null)

      const sensorAtualizado = sensores.find((s) => s.id === id)
      const statusAtualizado = sensorAtualizado?.status === "online" ? "online" : "error"

      setMensagem({
        tipo: statusAtualizado === "online" ? "sucesso" : "erro",
        texto:
          statusAtualizado === "online"
            ? "Conexão estabelecida com sucesso!"
            : "Falha ao conectar com o sensor. Verifique se ele está ligado e na mesma rede.",
      })
      setTimeout(() => setMensagem(null), 5000)
    }, 2000)
  }

  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(data)
  }

  // Função para selecionar um sensor e abrir sua aba
  const selecionarSensor = (id: string) => {
    setSensorSelecionado(id)
    setActiveTab(id)
  }

  // Encontra o sensor selecionado
  const sensorAtual = sensores.find((s) => s.id === sensorSelecionado)

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
              Gerenciamento de Sensores IoT
            </motion.h1>

            <Button onClick={() => router.push("/dashboard")} className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Ver Dashboard
            </Button>
          </div>

          {mensagem && (
            <Alert
              variant={mensagem.tipo === "sucesso" ? "default" : "destructive"}
              className={`mb-6 ${mensagem.tipo === "sucesso" ? "bg-green-50 text-green-800 border-green-200" : ""}`}
            >
              {mensagem.tipo === "sucesso" ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertTitle>{mensagem.tipo === "sucesso" ? "Sucesso" : "Erro"}</AlertTitle>
              <AlertDescription>{mensagem.texto}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <ScrollReveal>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total de Sensores</CardTitle>
                  <Wifi className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{sensores.length}</div>
                  <p className="text-xs text-muted-foreground">Sensores cadastrados</p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={1}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Sensores Online</CardTitle>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {sensores.filter((s) => s.status === "online" && s.ativo).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Transmitindo dados</p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Sensores Offline</CardTitle>
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {sensores.filter((s) => s.status === "offline" && s.ativo).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Aguardando conexão</p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Sensores com Erro</CardTitle>
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {sensores.filter((s) => s.status === "error" && s.ativo).length}
                  </div>
                  <p className="text-xs text-muted-foreground">Necessitam atenção</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          <Tabs defaultValue="sensores" value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-x-auto pb-2">
              <TabsList className="mb-6 flex w-auto">
                <TabsTrigger value="sensores">Meus Sensores</TabsTrigger>

                {/* Abas dinâmicas para cada sensor */}
                {sensores.map((sensor) => (
                  <TabsTrigger key={sensor.id} value={sensor.id} onClick={() => setSensorSelecionado(sensor.id)}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          sensor.status === "online"
                            ? "bg-green-500"
                            : sensor.status === "offline"
                              ? "bg-gray-400"
                              : "bg-red-500"
                        }`}
                      ></div>
                      {sensor.nome}
                    </div>
                  </TabsTrigger>
                ))}

                <TabsTrigger value="adicionar" className="bg-primary/10">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Adicionar Sensor
                </TabsTrigger>
                <TabsTrigger value="ajuda">Ajuda</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="sensores">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sensores.length > 0 ? (
                  sensores.map((sensor) => (
                    <ScrollReveal key={sensor.id}>
                      <Card
                        className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => selecionarSensor(sensor.id)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <Badge
                              variant={
                                sensor.status === "online"
                                  ? "default"
                                  : sensor.status === "offline"
                                    ? "outline"
                                    : "destructive"
                              }
                              className={
                                sensor.status === "online"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : sensor.status === "offline"
                                    ? "text-gray-500"
                                    : ""
                              }
                            >
                              <div className="flex items-center gap-1">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    sensor.status === "online"
                                      ? "bg-green-500"
                                      : sensor.status === "offline"
                                        ? "bg-gray-400"
                                        : "bg-red-500"
                                  }`}
                                ></div>
                                {sensor.status === "online"
                                  ? "Online"
                                  : sensor.status === "offline"
                                    ? "Offline"
                                    : "Erro"}
                              </div>
                            </Badge>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                selecionarSensor(sensor.id)
                              }}
                              className="h-8 w-8"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardTitle className="text-lg">{sensor.nome}</CardTitle>
                          <CardDescription>{sensor.local}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Última leitura:</span>
                            <span className="font-medium flex items-center">
                              <Droplet className="h-4 w-4 mr-1 text-primary" />
                              {sensor.status === "online" ? (
                                <span>{sensor.ultimaLeitura.toFixed(1)} L/min</span>
                              ) : (
                                <span className="text-muted-foreground">Indisponível</span>
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Última atualização:</span>
                            <span className="text-sm">{formatarData(sensor.ultimaAtualizacao)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <Badge variant={sensor.ativo ? "default" : "outline"}>
                              {sensor.ativo ? "Ativo" : "Inativo"}
                            </Badge>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              alternarStatus(sensor.id)
                            }}
                            disabled={!sensor.ativo}
                          >
                            {sensor.status === "online" ? "Desconectar" : "Conectar"}
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              testarConexao(sensor.id)
                            }}
                            disabled={testando === sensor.id || !sensor.ativo}
                            className="flex items-center gap-1"
                          >
                            {testando === sensor.id ? (
                              <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                Testando...
                              </>
                            ) : (
                              <>
                                <Wifi className="h-4 w-4" />
                                Testar conexão
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    </ScrollReveal>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Wifi className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Nenhum sensor cadastrado</h3>
                    <p className="text-muted-foreground mb-4">
                      Adicione seu primeiro sensor para começar a monitorar seu consumo de água em tempo real.
                    </p>
                    <Button onClick={() => setActiveTab("adicionar")}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar sensor
                    </Button>
                  </div>
                )}
              </div>

              {sensores.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Button onClick={() => setActiveTab("adicionar")} className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Adicionar outro sensor
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Conteúdo dinâmico para cada sensor */}
            {sensores.map((sensor) => (
              <TabsContent key={sensor.id} value={sensor.id}>
                <ScrollReveal>
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          <Badge
                            variant={
                              sensor.status === "online"
                                ? "default"
                                : sensor.status === "offline"
                                  ? "outline"
                                  : "destructive"
                            }
                            className={
                              sensor.status === "online"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : sensor.status === "offline"
                                  ? "text-gray-500"
                                  : ""
                            }
                          >
                            <div className="flex items-center gap-1">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  sensor.status === "online"
                                    ? "bg-green-500"
                                    : sensor.status === "offline"
                                      ? "bg-gray-400"
                                      : "bg-red-500"
                                }`}
                              ></div>
                              {sensor.status === "online" ? "Online" : sensor.status === "offline" ? "Offline" : "Erro"}
                            </div>
                          </Badge>
                          {sensor.nome}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => iniciarEdicao(sensor.id)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removerSensor(sensor.id)}
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>{sensor.local}</CardDescription>
                    </CardHeader>

                    {editandoSensor === sensor.id ? (
                      // Modo de edição
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor={`nome-${sensor.id}`}>Nome do sensor</Label>
                          <Input
                            id={`nome-${sensor.id}`}
                            value={sensorEditado?.nome || ""}
                            onChange={(e) =>
                              setSensorEditado(sensorEditado ? { ...sensorEditado, nome: e.target.value } : null)
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`local-${sensor.id}`}>Local</Label>
                          <Input
                            id={`local-${sensor.id}`}
                            value={sensorEditado?.local || ""}
                            onChange={(e) =>
                              setSensorEditado(sensorEditado ? { ...sensorEditado, local: e.target.value } : null)
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`tipo-${sensor.id}`}>Tipo de sensor</Label>
                          <Select
                            value={sensorEditado?.tipo || "fluxo"}
                            onValueChange={(value) =>
                              setSensorEditado(sensorEditado ? { ...sensorEditado, tipo: value } : null)
                            }
                          >
                            <SelectTrigger id={`tipo-${sensor.id}`} className="mt-1">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fluxo">Sensor de fluxo</SelectItem>
                              <SelectItem value="pressao">Sensor de pressão</SelectItem>
                              <SelectItem value="nivel">Sensor de nível</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor={`intervalo-${sensor.id}`}>Intervalo de atualização (segundos)</Label>
                          <Input
                            id={`intervalo-${sensor.id}`}
                            type="number"
                            min="5"
                            max="3600"
                            value={sensorEditado?.intervaloAtualizacao || 60}
                            onChange={(e) =>
                              setSensorEditado(
                                sensorEditado
                                  ? {
                                      ...sensorEditado,
                                      intervaloAtualizacao: Number.parseInt(e.target.value) || 60,
                                    }
                                  : null,
                              )
                            }
                            className="mt-1"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`ativo-${sensor.id}`}>Ativo</Label>
                          <Switch
                            id={`ativo-${sensor.id}`}
                            checked={sensorEditado?.ativo || false}
                            onCheckedChange={(checked) =>
                              setSensorEditado(sensorEditado ? { ...sensorEditado, ativo: checked } : null)
                            }
                          />
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button variant="outline" onClick={cancelarEdicao} className="flex-1">
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                          </Button>
                          <Button variant="default" onClick={salvarEdicao} className="flex-1">
                            <Save className="mr-2 h-4 w-4" />
                            Salvar alterações
                          </Button>
                        </div>
                      </CardContent>
                    ) : (
                      // Modo de visualização
                      <>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Tipo:</span>
                                <span className="font-medium">
                                  {sensor.tipo === "fluxo"
                                    ? "Sensor de fluxo"
                                    : sensor.tipo === "pressao"
                                      ? "Sensor de pressão"
                                      : "Sensor de nível"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Última leitura:</span>
                                <span className="font-medium flex items-center">
                                  <Droplet className="h-4 w-4 mr-1 text-primary" />
                                  {sensor.status === "online" ? (
                                    <span>{sensor.ultimaLeitura.toFixed(1)} L/min</span>
                                  ) : (
                                    <span className="text-muted-foreground">Indisponível</span>
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Última atualização:</span>
                                <span className="text-sm">{formatarData(sensor.ultimaAtualizacao)}</span>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Intervalo:</span>
                                <span>{sensor.intervaloAtualizacao} segundos</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Status:</span>
                                <Badge variant={sensor.ativo ? "default" : "outline"}>
                                  {sensor.ativo ? "Ativo" : "Inativo"}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">ID do sensor:</span>
                                <span className="text-xs font-mono bg-muted p-1 rounded">{sensor.id}</span>
                              </div>
                            </div>
                          </div>

                          {/* Gráfico simulado */}
                          <div className="mt-4 bg-muted/30 rounded-lg p-4 h-48 flex items-center justify-center">
                            <p className="text-muted-foreground text-center">
                              Gráfico de leituras em tempo real
                              <br />
                              <span className="text-sm">(Dados dos últimos 30 minutos)</span>
                            </p>
                          </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4">
                          <div className="flex justify-between w-full">
                            <Button
                              variant="outline"
                              onClick={() => alternarStatus(sensor.id)}
                              disabled={!sensor.ativo}
                            >
                              {sensor.status === "online" ? "Desconectar" : "Conectar"}
                            </Button>
                            <Button
                              variant="default"
                              onClick={() => testarConexao(sensor.id)}
                              disabled={testando === sensor.id || !sensor.ativo}
                              className="flex items-center gap-1"
                            >
                              {testando === sensor.id ? (
                                <>
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                  Testando...
                                </>
                              ) : (
                                <>
                                  <Wifi className="h-4 w-4" />
                                  Testar conexão
                                </>
                              )}
                            </Button>
                          </div>

                          <Alert className="bg-primary/5 border-primary/20">
                            <Droplet className="h-4 w-4" />
                            <AlertTitle>Dica</AlertTitle>
                            <AlertDescription>
                              Para obter leituras mais precisas, posicione o sensor em um trecho reto da tubulação,
                              longe de curvas ou conexões.
                            </AlertDescription>
                          </Alert>
                        </CardFooter>
                      </>
                    )}
                  </Card>
                </ScrollReveal>

                <div className="mt-8 flex justify-center gap-4">
                  <Button variant="outline" onClick={() => setActiveTab("sensores")}>
                    Voltar para todos os sensores
                  </Button>
                  <Button onClick={() => setActiveTab("adicionar")} className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Adicionar outro sensor
                  </Button>
                </div>
              </TabsContent>
            ))}

            <TabsContent value="adicionar">
              <ScrollReveal>
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Adicionar novo sensor</CardTitle>
                    <CardDescription>
                      Cadastre um novo sensor IoT para monitorar seu consumo de água em tempo real
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nome-sensor">Nome do sensor *</Label>
                        <Input
                          id="nome-sensor"
                          placeholder="Ex: Sensor principal"
                          value={novoSensor.nome}
                          onChange={(e) => setNovoSensor({ ...novoSensor, nome: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="local-sensor">Local de instalação *</Label>
                        <Input
                          id="local-sensor"
                          placeholder="Ex: Entrada de água"
                          value={novoSensor.local}
                          onChange={(e) => setNovoSensor({ ...novoSensor, local: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="tipo-sensor">Tipo de sensor</Label>
                        <Select
                          value={novoSensor.tipo}
                          onValueChange={(value) => setNovoSensor({ ...novoSensor, tipo: value })}
                        >
                          <SelectTrigger id="tipo-sensor">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fluxo">Sensor de fluxo</SelectItem>
                            <SelectItem value="pressao">Sensor de pressão</SelectItem>
                            <SelectItem value="nivel">Sensor de nível</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="intervalo-sensor">Intervalo de atualização (segundos)</Label>
                        <Input
                          id="intervalo-sensor"
                          type="number"
                          min="5"
                          max="3600"
                          value={novoSensor.intervaloAtualizacao}
                          onChange={(e) =>
                            setNovoSensor({
                              ...novoSensor,
                              intervaloAtualizacao: Number.parseInt(e.target.value) || 60,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="ativo-sensor"
                        checked={novoSensor.ativo}
                        onCheckedChange={(checked) => setNovoSensor({ ...novoSensor, ativo: checked })}
                      />
                      <Label htmlFor="ativo-sensor">Ativar sensor imediatamente após cadastro</Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Button onClick={adicionarSensor} className="flex-1">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar sensor
                    </Button>
                    <Button variant="outline" onClick={() => setActiveTab("sensores")} className="flex-1">
                      Voltar para sensores
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="ajuda">
              <ScrollReveal>
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Como configurar seu sensor IoT</CardTitle>
                    <CardDescription>
                      Siga estas instruções para conectar seu sensor de água ao WaterGuardian Solution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">1. Instalação física do sensor</h3>
                      <p className="text-muted-foreground">
                        Instale o sensor de fluxo na tubulação principal de entrada de água da sua residência.
                        Certifique-se de que a instalação esteja de acordo com as especificações do fabricante.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">2. Configuração do dispositivo</h3>
                      <p className="text-muted-foreground">
                        Conecte o sensor ao módulo WiFi seguindo o manual do fabricante. Geralmente, isso envolve
                        conectar os fios do sensor aos pinos corretos do módulo ESP8266 ou ESP32.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">3. Configuração da rede</h3>
                      <p className="text-muted-foreground">
                        Conecte o módulo WiFi à sua rede doméstica. Na primeira inicialização, o dispositivo criará uma
                        rede WiFi própria (geralmente com nome "WaterGuardian-Setup"). Conecte-se a essa rede e acesse
                        192.168.4.1 no seu navegador para configurar a conexão com sua rede WiFi doméstica.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">4. Cadastro na plataforma</h3>
                      <p className="text-muted-foreground">
                        Adicione o sensor na plataforma WaterGuardian Solution usando a aba "Adicionar Sensor". Você
                        precisará do ID único do dispositivo, que pode ser encontrado na etiqueta do produto ou na tela
                        de configuração do dispositivo.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">5. Verificação da conexão</h3>
                      <p className="text-muted-foreground">
                        Após cadastrar o sensor, clique em "Testar conexão" para verificar se o dispositivo está
                        comunicando corretamente com a plataforma. Se tudo estiver funcionando, o status mudará para
                        "Online" e você começará a receber dados em tempo real.
                      </p>
                    </div>

                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Importante</AlertTitle>
                      <AlertDescription>
                        Para garantir a precisão das medições, recomendamos calibrar o sensor após a instalação. Abra
                        uma torneira com vazão conhecida e compare com a leitura do sensor. Ajustes podem ser
                        necessários no firmware do dispositivo.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("sensores")}>
                      Voltar para sensores
                    </Button>
                    <Button onClick={() => router.push("/dashboard")}>Ir para o Dashboard</Button>
                  </CardFooter>
                </Card>
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>

        <EnhancedFooter />
      </div>
    </ProtectedRoute>
  )
}
