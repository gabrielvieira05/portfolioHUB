"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Droplet, Calculator, TrendingDown, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BackButton } from "@/components/back-button"
import { EnhancedFooter } from "@/components/enhanced-footer"

// Estrutura de tarifas da CAESB (valores fictícios para exemplo)
const tarifasAgua = {
  residencial: [
    { faixa: "0-10", valor: 3.14 }, // R$/m³ para consumo de 0 a 10m³
    { faixa: "11-15", valor: 5.69 }, // R$/m³ para consumo de 11 a 15m³
    { faixa: "16-25", valor: 7.29 }, // R$/m³ para consumo de 16 a 25m³
    { faixa: "26-35", valor: 12.48 }, // R$/m³ para consumo de 26 a 35m³
    { faixa: "36-50", valor: 13.77 }, // R$/m³ para consumo de 36 a 50m³
    { faixa: ">50", valor: 15.05 }, // R$/m³ para consumo acima de 50m³
  ],
  comercial: [
    { faixa: "0-10", valor: 7.29 },
    { faixa: ">10", valor: 13.77 },
  ],
}

// Valores fixos por categoria
const tarifasFixas = {
  residencial: 18.5, // R$ por unidade
  comercial: 28.7, // R$ por unidade
}

export default function Economia() {
  // Estados para os valores do calculador
  const [consumoAtual, setConsumoAtual] = useState(10)
  const [pessoas, setPessoas] = useState(3)
  const [unidades, setUnidades] = useState(1)
  const [categoria, setCategoria] = useState("residencial")
  const [tipoEsgoto, setTipoEsgoto] = useState("normal") // normal (100%) ou condominial (60%)
  const [incluirEsgoto, setIncluirEsgoto] = useState(true)
  const [reducaoDesejada, setReducaoDesejada] = useState(20)

  // Estados para os resultados calculados
  const [consumoMensal, setConsumoMensal] = useState(0)
  const [valorAgua, setValorAgua] = useState(0)
  const [valorEsgoto, setValorEsgoto] = useState(0)
  const [valorFixo, setValorFixo] = useState(0)
  const [custoMensal, setCustoMensal] = useState(0)
  const [economiaAgua, setEconomiaAgua] = useState(0)
  const [economiaDinheiro, setEconomiaDinheiro] = useState(0)
  const [detalhesCalculo, setDetalhesCalculo] = useState([])

  // Recalcula os resultados quando os inputs mudam
  useEffect(() => {
    // Consumo mensal em m³
    const consumoMensalCalculado = (consumoAtual * pessoas * 30) / 1000
    setConsumoMensal(consumoMensalCalculado)

    // Cálculo do valor da água por faixas
    let valorAguaCalculado = 0
    const detalhes = []

    // Seleciona a tabela de tarifas com base na categoria
    const tarifas = tarifasAgua[categoria]

    // Distribui o consumo nas faixas
    let consumoRestante = consumoMensalCalculado

    if (categoria === "residencial") {
      // Faixa 1: 0-10m³
      const consumoFaixa1 = Math.min(10, consumoRestante)
      valorAguaCalculado += consumoFaixa1 * tarifas[0].valor
      detalhes.push({
        faixa: "0-10m³",
        consumo: consumoFaixa1.toFixed(2),
        tarifa: tarifas[0].valor.toFixed(2),
        valor: (consumoFaixa1 * tarifas[0].valor).toFixed(2),
      })
      consumoRestante -= consumoFaixa1

      if (consumoRestante > 0) {
        // Faixa 2: 11-15m³
        const consumoFaixa2 = Math.min(5, consumoRestante)
        valorAguaCalculado += consumoFaixa2 * tarifas[1].valor
        detalhes.push({
          faixa: "11-15m³",
          consumo: consumoFaixa2.toFixed(2),
          tarifa: tarifas[1].valor.toFixed(2),
          valor: (consumoFaixa2 * tarifas[1].valor).toFixed(2),
        })
        consumoRestante -= consumoFaixa2

        if (consumoRestante > 0) {
          // Faixa 3: 16-25m³
          const consumoFaixa3 = Math.min(10, consumoRestante)
          valorAguaCalculado += consumoFaixa3 * tarifas[2].valor
          detalhes.push({
            faixa: "16-25m³",
            consumo: consumoFaixa3.toFixed(2),
            tarifa: tarifas[2].valor.toFixed(2),
            valor: (consumoFaixa3 * tarifas[2].valor).toFixed(2),
          })
          consumoRestante -= consumoFaixa3

          if (consumoRestante > 0) {
            // Faixa 4: 26-35m³
            const consumoFaixa4 = Math.min(10, consumoRestante)
            valorAguaCalculado += consumoFaixa4 * tarifas[3].valor
            detalhes.push({
              faixa: "26-35m³",
              consumo: consumoFaixa4.toFixed(2),
              tarifa: tarifas[3].valor.toFixed(2),
              valor: (consumoFaixa4 * tarifas[3].valor).toFixed(2),
            })
            consumoRestante -= consumoFaixa4

            if (consumoRestante > 0) {
              // Faixa 5: 36-50m³
              const consumoFaixa5 = Math.min(15, consumoRestante)
              valorAguaCalculado += consumoFaixa5 * tarifas[4].valor
              detalhes.push({
                faixa: "36-50m³",
                consumo: consumoFaixa5.toFixed(2),
                tarifa: tarifas[4].valor.toFixed(2),
                valor: (consumoFaixa5 * tarifas[4].valor).toFixed(2),
              })
              consumoRestante -= consumoFaixa5

              if (consumoRestante > 0) {
                // Faixa 6: >50m³
                valorAguaCalculado += consumoRestante * tarifas[5].valor
                detalhes.push({
                  faixa: ">50m³",
                  consumo: consumoRestante.toFixed(2),
                  tarifa: tarifas[5].valor.toFixed(2),
                  valor: (consumoRestante * tarifas[5].valor).toFixed(2),
                })
              }
            }
          }
        }
      }
    } else if (categoria === "comercial") {
      // Faixa 1: 0-10m³
      const consumoFaixa1 = Math.min(10, consumoRestante)
      valorAguaCalculado += consumoFaixa1 * tarifas[0].valor
      detalhes.push({
        faixa: "0-10m³",
        consumo: consumoFaixa1.toFixed(2),
        tarifa: tarifas[0].valor.toFixed(2),
        valor: (consumoFaixa1 * tarifas[0].valor).toFixed(2),
      })
      consumoRestante -= consumoFaixa1

      if (consumoRestante > 0) {
        // Faixa 2: >10m³
        valorAguaCalculado += consumoRestante * tarifas[1].valor
        detalhes.push({
          faixa: ">10m³",
          consumo: consumoRestante.toFixed(2),
          tarifa: tarifas[1].valor.toFixed(2),
          valor: (consumoRestante * tarifas[1].valor).toFixed(2),
        })
      }
    }

    // Multiplica pelo número de unidades
    valorAguaCalculado *= unidades

    // Valor fixo por unidade
    const valorFixoCalculado = tarifasFixas[categoria] * unidades

    // Cálculo do esgoto
    const percentualEsgoto = tipoEsgoto === "normal" ? 1.0 : 0.6
    const valorEsgotoCalculado = incluirEsgoto ? valorAguaCalculado * percentualEsgoto : 0

    // Custo mensal total
    const custoMensalCalculado = valorAguaCalculado + valorFixoCalculado + valorEsgotoCalculado

    // Economia de água em m³
    const economiaAguaCalculada = consumoMensalCalculado * (reducaoDesejada / 100)

    // Economia em dinheiro
    // Para simplificar, estamos considerando que a economia será proporcional ao valor total
    const economiaDinheiroCalculada = custoMensalCalculado * (reducaoDesejada / 100)

    // Atualiza os estados
    setValorAgua(valorAguaCalculado)
    setValorFixo(valorFixoCalculado)
    setValorEsgoto(valorEsgotoCalculado)
    setCustoMensal(custoMensalCalculado)
    setEconomiaAgua(economiaAguaCalculada)
    setEconomiaDinheiro(economiaDinheiroCalculada)
    setDetalhesCalculo(detalhes)
  }, [consumoAtual, pessoas, unidades, categoria, tipoEsgoto, incluirEsgoto, reducaoDesejada])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <BackButton />

        <h1 className="text-3xl font-bold mb-6">Economia Financeira</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calculadora de Economia
                </CardTitle>
                <CardDescription>
                  Calcule quanto você pode economizar reduzindo seu consumo de água usando o modelo de cálculo da CAESB
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basico">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basico">Cálculo Básico</TabsTrigger>
                    <TabsTrigger value="avancado">Cálculo Avançado</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basico" className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="consumo-atual">Consumo diário por pessoa (litros)</Label>
                          <div className="flex items-center gap-4">
                            <Slider
                              id="consumo-atual"
                              min={50}
                              max={300}
                              step={10}
                              value={[consumoAtual]}
                              onValueChange={(value) => setConsumoAtual(value[0])}
                            />
                            <span className="w-12 text-right font-medium">{consumoAtual}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            A média brasileira é de aproximadamente 150 litros por pessoa/dia
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pessoas">Número de pessoas na residência</Label>
                          <div className="flex items-center gap-4">
                            <Slider
                              id="pessoas"
                              min={1}
                              max={10}
                              step={1}
                              value={[pessoas]}
                              onValueChange={(value) => setPessoas(value[0])}
                            />
                            <span className="w-12 text-right font-medium">{pessoas}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="categoria">Categoria</Label>
                          <Select value={categoria} onValueChange={setCategoria}>
                            <SelectTrigger id="categoria">
                              <SelectValue placeholder="Selecione a categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="residencial">Residencial</SelectItem>
                              <SelectItem value="comercial">Comercial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="unidades">Número de unidades</Label>
                          <div className="flex items-center gap-4">
                            <Slider
                              id="unidades"
                              min={1}
                              max={5}
                              step={1}
                              value={[unidades]}
                              onValueChange={(value) => setUnidades(value[0])}
                            />
                            <span className="w-12 text-right font-medium">{unidades}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Número de unidades de consumo (apartamentos, casas, etc.)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="incluir-esgoto" className="flex items-center gap-2">
                            Incluir taxa de esgoto
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>A taxa de esgoto é calculada com base no valor da tarifa de água</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </Label>
                          <Switch id="incluir-esgoto" checked={incluirEsgoto} onCheckedChange={setIncluirEsgoto} />
                        </div>
                      </div>

                      {incluirEsgoto && (
                        <div className="space-y-2">
                          <Label htmlFor="tipo-esgoto">Tipo de coleta de esgoto</Label>
                          <Select value={tipoEsgoto} onValueChange={setTipoEsgoto}>
                            <SelectTrigger id="tipo-esgoto">
                              <SelectValue placeholder="Selecione o tipo de coleta" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="normal">Normal (100% do valor da água)</SelectItem>
                              <SelectItem value="condominial">Condominial (60% do valor da água)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reducao">Redução desejada no consumo (%)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="reducao"
                          min={5}
                          max={50}
                          step={5}
                          value={[reducaoDesejada]}
                          onValueChange={(value) => setReducaoDesejada(value[0])}
                        />
                        <span className="w-12 text-right font-medium">{reducaoDesejada}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Com pequenas mudanças de hábito, é possível reduzir o consumo em até 30%
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="avancado" className="pt-4">
                    <div className="space-y-6">
                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Detalhes do cálculo por faixas de consumo</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Faixa</th>
                                <th className="text-right py-2">Consumo (m³)</th>
                                <th className="text-right py-2">Tarifa (R$/m³)</th>
                                <th className="text-right py-2">Valor (R$)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {detalhesCalculo.map((detalhe, index) => (
                                <tr key={index} className="border-b border-muted-foreground/20">
                                  <td className="py-2">{detalhe.faixa}</td>
                                  <td className="text-right py-2">{detalhe.consumo}</td>
                                  <td className="text-right py-2">{detalhe.tarifa}</td>
                                  <td className="text-right py-2">{detalhe.valor}</td>
                                </tr>
                              ))}
                              <tr className="font-medium">
                                <td colSpan={3} className="py-2 text-right">
                                  Subtotal Água:
                                </td>
                                <td className="text-right py-2">R$ {valorAgua.toFixed(2)}</td>
                              </tr>
                              <tr className="font-medium">
                                <td colSpan={3} className="py-2 text-right">
                                  Taxa Fixa ({unidades} unidade{unidades > 1 ? "s" : ""}):
                                </td>
                                <td className="text-right py-2">R$ {valorFixo.toFixed(2)}</td>
                              </tr>
                              {incluirEsgoto && (
                                <tr className="font-medium">
                                  <td colSpan={3} className="py-2 text-right">
                                    Taxa de Esgoto ({tipoEsgoto === "normal" ? "100" : "60"}%):
                                  </td>
                                  <td className="text-right py-2">R$ {valorEsgoto.toFixed(2)}</td>
                                </tr>
                              )}
                              <tr className="font-bold">
                                <td colSpan={3} className="py-2 text-right">
                                  Total:
                                </td>
                                <td className="text-right py-2">R$ {custoMensal.toFixed(2)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="bg-primary/5 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Informações sobre o cálculo da CAESB</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">1.</span>
                            <span>O consumo é distribuído em faixas, com tarifas progressivas.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">2.</span>
                            <span>Existe uma taxa fixa por unidade de consumo, independente do volume utilizado.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">3.</span>
                            <span>
                              A tarifa de esgoto é calculada como percentual do valor da água (100% para coleta normal,
                              60% para coleta condominial).
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">4.</span>
                            <span>
                              Os valores das tarifas são estabelecidos pela ADASA e podem ser atualizados
                              periodicamente.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Card>
                    <CardHeader className="py-4">
                      <CardDescription>Consumo mensal estimado</CardDescription>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Droplet className="h-5 w-5 text-primary" />
                        {consumoMensal.toFixed(2)} m³
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="py-4">
                      <CardDescription>Custo mensal estimado</CardDescription>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        R$ {custoMensal.toFixed(2)}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="py-4">
                      <CardDescription>Economia de água potencial</CardDescription>
                      <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                        <Droplet className="h-5 w-5" />
                        {economiaAgua.toFixed(2)} m³/mês
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="py-4">
                      <CardDescription>Economia financeira potencial</CardDescription>
                      <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                        <DollarSign className="h-5 w-5" />
                        R$ {economiaDinheiro.toFixed(2)}/mês
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  Dicas de Economia
                </CardTitle>
                <CardDescription>Sugestões para reduzir seu consumo e economizar dinheiro</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Banho consciente</h3>
                  <p className="text-sm text-muted-foreground">
                    Reduzir o tempo de banho de 15 para 5 minutos pode economizar até 90 litros por banho.
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[80%]"></div>
                  </div>
                  <p className="text-xs text-right">Economia potencial: 80%</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Torneiras eficientes</h3>
                  <p className="text-sm text-muted-foreground">
                    Instalar aeradores em torneiras pode reduzir o consumo em até 50% sem perda de conforto.
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[50%]"></div>
                  </div>
                  <p className="text-xs text-right">Economia potencial: 50%</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Descarga inteligente</h3>
                  <p className="text-sm text-muted-foreground">
                    Vasos sanitários com descarga dual podem economizar até 60% de água por descarga.
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[60%]"></div>
                  </div>
                  <p className="text-xs text-right">Economia potencial: 60%</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Reúso de água cinza</h3>
                  <p className="text-sm text-muted-foreground">
                    Reutilizar água de máquinas de lavar e chuveiros pode reduzir o consumo total em até 30%.
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[30%]"></div>
                  </div>
                  <p className="text-xs text-right">Economia potencial: 30%</p>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Combinando todas essas dicas, você pode reduzir seu consumo em até 40% e economizar significativamente
                  na conta de água.
                </p>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Economia Anual</CardTitle>
                <CardDescription>Projeção de economia nos próximos 12 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Economia de água:</span>
                    <span className="font-medium">{(economiaAgua * 12).toFixed(2)} m³</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Economia financeira:</span>
                    <span className="font-medium">R$ {(economiaDinheiro * 12).toFixed(2)}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">Com essa economia, você poderia:</p>
                    <ul className="text-sm mt-2 space-y-1">
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        Investir em melhorias para sua casa
                      </li>
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        Fazer uma pequena viagem
                      </li>
                      <li className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        Comprar equipamentos para economizar ainda mais água
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <EnhancedFooter />
    </div>
  )
}
