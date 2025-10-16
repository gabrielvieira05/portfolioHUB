import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplet, Home, Utensils, Flower2, ShowerHeadIcon as Shower, Waves } from "lucide-react"

export default function Dicas() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dicas de Economia de Água</h1>

      <Tabs defaultValue="casa">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="casa" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Casa</span>
          </TabsTrigger>
          <TabsTrigger value="cozinha" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Cozinha</span>
          </TabsTrigger>
          <TabsTrigger value="banheiro" className="flex items-center gap-2">
            <Shower className="h-4 w-4" />
            <span className="hidden sm:inline">Banheiro</span>
          </TabsTrigger>
          <TabsTrigger value="jardim" className="flex items-center gap-2">
            <Flower2 className="h-4 w-4" />
            <span className="hidden sm:inline">Jardim</span>
          </TabsTrigger>
          <TabsTrigger value="avancadas" className="flex items-center gap-2">
            <Waves className="h-4 w-4" />
            <span className="hidden sm:inline">Avançadas</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="casa" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Verifique vazamentos regularmente</CardTitle>
                  <CardDescription>Economia potencial: 30-50 litros/dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Vazamentos pequenos podem passar despercebidos e desperdiçar muita água. Verifique regularmente
                    torneiras, válvulas de descarga e conexões de encanamento. Um teste simples é colocar corante
                    alimentício no reservatório do vaso sanitário e verificar se a cor aparece na água da bacia após
                    alguns minutos sem dar descarga.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Instale redutores de vazão</CardTitle>
                  <CardDescription>Economia potencial: 15-40 litros/dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Redutores de vazão são dispositivos simples e baratos que podem ser instalados em torneiras e
                    chuveiros. Eles diminuem a quantidade de água que sai sem comprometer o conforto, podendo reduzir o
                    consumo em até 50%.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reutilize água cinza</CardTitle>
                  <CardDescription>Economia potencial: 100-200 litros/dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Água cinza é a água usada em pias, chuveiros e máquinas de lavar. Ela pode ser reutilizada para
                    limpar pisos, regar plantas e dar descarga. Um sistema simples de coleta pode ser instalado para
                    aproveitar esta água que normalmente seria desperdiçada.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monitore seu consumo</CardTitle>
                  <CardDescription>Economia potencial: 10-20% do consumo total</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Acompanhar seu consumo diário ajuda a identificar padrões e possíveis vazamentos. Use o
                    WaterGuardian Solution para monitorar seu consumo em tempo real e receber alertas quando houver
                    consumo anormal.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cozinha" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Lave louça de forma eficiente</CardTitle>
                  <CardDescription>Economia potencial: 20-40 litros/dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Ao lavar louça manualmente, não deixe a torneira aberta continuamente. Encha uma bacia com água e
                    sabão para ensaboar e outra com água limpa para enxaguar. Se usar máquina de lavar louça, utilize-a
                    apenas quando estiver completamente cheia.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Descongele alimentos naturalmente</CardTitle>
                  <CardDescription>Economia potencial: 5-10 litros/dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Evite descongelar alimentos sob água corrente. Planeje com antecedência e descongele na geladeira ou
                    em temperatura ambiente. Isso não só economiza água, mas também preserva melhor os nutrientes dos
                    alimentos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reutilize água de cozimento</CardTitle>
                  <CardDescription>Economia potencial: 3-5 litros/dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    A água usada para cozinhar legumes e ovos pode ser reaproveitada para regar plantas após esfriar,
                    pois contém nutrientes. Apenas certifique-se de que a água não contenha sal ou óleo.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Use filtros de água</CardTitle>
                  <CardDescription>Economia potencial: variável</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Em vez de comprar água engarrafada, use filtros de água em casa. Isso reduz o desperdício de
                    plástico e economiza a água utilizada na produção de garrafas plásticas, que é muito maior do que o
                    volume de água que elas contêm.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="banheiro" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Reduza o tempo no banho</CardTitle>
                  <CardDescription>Economia potencial: 20-100 litros/dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Um banho de 15 minutos pode consumir até 135 litros de água. Reduzir o tempo para 5 minutos pode
                    economizar cerca de 90 litros por banho. Use um temporizador para ajudar a controlar o tempo.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Instale vasos sanitários eficientes</CardTitle>
                  <CardDescription>Economia potencial: 30-60 litros/dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Vasos sanitários antigos podem usar até 15 litros por descarga. Modelos mais eficientes usam apenas
                    6 litros ou menos. Considere instalar um vaso com sistema dual flush, que oferece opções de descarga
                    completa ou parcial.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feche a torneira ao escovar os dentes</CardTitle>
                  <CardDescription>Economia potencial: 10-30 litros/dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Uma torneira aberta pode gastar até 15 litros de água por minuto. Ao escovar os dentes, use um copo
                    com água para enxaguar a boca e só abra a torneira quando necessário.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Repare vazamentos no vaso sanitário</CardTitle>
                  <CardDescription>Economia potencial: 400+ litros/dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Um vaso sanitário com vazamento pode desperdiçar mais de 400 litros de água por dia. Para verificar
                    se há vazamentos, adicione corante alimentício ao reservatório e observe se a cor aparece na bacia
                    sem dar descarga.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jardim" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Regue plantas no momento certo</CardTitle>
                  <CardDescription>Economia potencial: 30-50% do uso em jardim</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Regue as plantas no início da manhã ou no final da tarde, quando a evaporação é menor. Evite regar
                    durante o dia quente ou em dias ventosos, pois grande parte da água será perdida por evaporação.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Use irrigação por gotejamento</CardTitle>
                  <CardDescription>Economia potencial: 30-70% do uso em jardim</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Sistemas de irrigação por gotejamento fornecem água diretamente às raízes das plantas, reduzindo o
                    desperdício por evaporação e escoamento. São relativamente baratos e fáceis de instalar.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Escolha plantas nativas</CardTitle>
                  <CardDescription>Economia potencial: 20-60% do uso em jardim</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Plantas nativas da sua região são adaptadas ao clima local e geralmente requerem menos água do que
                    espécies exóticas. Considere criar um jardim com plantas resistentes à seca.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Colete água da chuva</CardTitle>
                  <CardDescription>Economia potencial: 100-1000 litros/mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Instale um sistema de coleta de água da chuva com calhas e um barril ou cisterna. Esta água pode ser
                    usada para regar plantas, lavar calçadas e outras tarefas que não exigem água potável.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="avancadas" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Instale um sistema de reúso de água cinza</CardTitle>
                  <CardDescription>Economia potencial: 30-50% do consumo total</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Sistemas profissionais de reúso de água cinza podem coletar, filtrar e tratar a água de chuveiros,
                    pias e máquinas de lavar para reutilização em vasos sanitários, irrigação e limpeza externa.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Automatize seu sistema de irrigação</CardTitle>
                  <CardDescription>Economia potencial: 15-30% do uso em jardim</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Controladores de irrigação inteligentes podem ajustar automaticamente a rega com base nas condições
                    climáticas, umidade do solo e previsão do tempo, evitando o desperdício de água.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Implemente um telhado verde</CardTitle>
                  <CardDescription>Economia potencial: variável</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Telhados verdes ajudam a absorver a água da chuva, reduzindo o escoamento e a sobrecarga dos
                    sistemas de drenagem. Eles também proporcionam isolamento térmico, reduzindo o uso de energia para
                    refrigeração.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Considere um sistema de captação de neblina</CardTitle>
                  <CardDescription>Economia potencial: variável</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Em áreas costeiras ou montanhosas com neblina frequente, redes especiais podem captar a umidade do
                    ar e convertê-la em água utilizável. Esta tecnologia inovadora é especialmente útil em regiões com
                    escassez de água.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <div className="mt-12 bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Sabia que...</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <Droplet className="h-6 w-6 text-primary mt-1" />
            <p>Um vazamento de uma gota por segundo desperdiça mais de 10.000 litros de água por ano.</p>
          </div>
          <div className="flex items-start gap-3">
            <Droplet className="h-6 w-6 text-primary mt-1" />
            <p>Cerca de 22% do consumo doméstico de água ocorre no vaso sanitário.</p>
          </div>
          <div className="flex items-start gap-3">
            <Droplet className="h-6 w-6 text-primary mt-1" />
            <p>Um banho de 15 minutos consome em média 135 litros de água.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
