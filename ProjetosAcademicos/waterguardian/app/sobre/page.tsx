"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Shield, Users, Globe, Mail, Phone, MapPin } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { BackButton } from "@/components/back-button"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { motion } from "framer-motion"

export default function Sobre() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <BackButton />

        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 relative h-40 w-40">
                <Droplet className="h-24 w-24 text-primary animate-float" />
              </div>
              <motion.h1
                className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Sobre o WaterGuardian Solution
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Monitorando e protegendo o recurso mais precioso do nosso planeta
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal>
              <section>
                <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
                <p className="text-lg">
                  O WaterGuardian Solution nasceu da necessidade de criar consciência sobre o consumo de água e fornecer
                  ferramentas que ajudem as pessoas a monitorar e reduzir seu uso diário. Acreditamos que pequenas
                  mudanças nos hábitos de consumo podem ter um grande impacto quando adotadas coletivamente.
                </p>
              </section>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScrollReveal delay={1}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <Shield className="h-10 w-10 text-primary mx-auto mb-2" />
                    <CardTitle>Proteção</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Protegemos o futuro dos recursos hídricos através da conscientização e monitoramento inteligente.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <Users className="h-10 w-10 text-primary mx-auto mb-2" />
                    <CardTitle>Comunidade</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Construímos uma comunidade engajada em compartilhar conhecimento e soluções para economia de água.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={3}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <Globe className="h-10 w-10 text-primary mx-auto mb-2" />
                    <CardTitle>Sustentabilidade</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p>
                      Promovemos práticas sustentáveis que beneficiam tanto o meio ambiente quanto a economia doméstica.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <section>
                <h2 className="text-2xl font-bold mb-4">Nossa História</h2>
                <p className="text-lg mb-4">
                  O WaterGuardian Solution foi desenvolvido por um grupo de estudantes universitários preocupados com a
                  crescente escassez de água em diversas regiões do Brasil. O projeto começou como um trabalho acadêmico
                  e evoluiu para uma plataforma completa de monitoramento e conscientização.
                </p>
                <p className="text-lg">
                  Desde o início, nosso foco tem sido criar uma solução acessível e fácil de usar, que possa ser adotada
                  por qualquer pessoa interessada em reduzir seu consumo de água. Acreditamos que a tecnologia pode ser
                  uma poderosa aliada na preservação dos recursos naturais.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-2xl font-bold mb-4">Como Funciona</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Monitoramento em Tempo Real</h3>
                    <p>
                      Nosso sistema se conecta ao seu medidor de água e fornece dados em tempo real sobre seu consumo.
                      Você pode visualizar essas informações através de gráficos intuitivos em nosso dashboard.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Análise de Padrões</h3>
                    <p>
                      Utilizamos algoritmos avançados para analisar seus padrões de consumo e identificar oportunidades
                      de economia. Nosso sistema pode detectar vazamentos e consumos anormais.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Dicas Personalizadas</h3>
                    <p>
                      Com base no seu perfil de consumo, oferecemos dicas personalizadas para ajudá-lo a economizar água
                      em diferentes áreas da sua casa.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Comunidade Engajada</h3>
                    <p>
                      Nossa plataforma de fórum permite que você se conecte com outros usuários, compartilhe
                      experiências e aprenda novas formas de economizar água.
                    </p>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section>
                <h2 className="text-2xl font-bold mb-4">Nossa Equipe</h2>
                <p className="text-lg mb-6">
                  Somos um grupo diversificado de estudantes de engenharia, ciência da computação e gestão ambiental,
                  unidos pelo objetivo comum de promover o uso consciente da água.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">BO</span>
                        </div>
                        <CardTitle className="text-center">Brenno Oliveira</CardTitle>
                        <CardDescription className="text-center">Fundador & Desenvolvedor</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">JF</span>
                        </div>
                        <CardTitle className="text-center">Juan Ferreira</CardTitle>
                        <CardDescription className="text-center">Engenheiro de Dados</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">CD</span>
                        </div>
                        <CardTitle className="text-center">Caio Diniz</CardTitle>
                        <CardDescription className="text-center">Engenheiro de dados</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="md:col-start-2"
                  >
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">GV</span>
                        </div>
                        <CardTitle className="text-center">Gabriel Vieira</CardTitle>
                        <CardDescription className="text-center">UX/UI Designer</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">LF</span>
                        </div>
                        <CardTitle className="text-center">Lucas Freitas</CardTitle>
                        <CardDescription className="text-center">Analista de Sistemas</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Entre em Contato</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p>BrennoOliveirq@outlook.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-medium">Telefone</h3>
                      <p>(61) 99859-0309</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-medium">Endereço</h3>
                      <p>Braslia, BSB - Brasil</p>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <EnhancedFooter />
    </div>
  )
}
