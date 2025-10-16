"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  ThumbsUp,
  Send,
  AlertTriangle,
  Loader2,
  MoreHorizontal,
  Trash2,
  Edit,
  Share,
  Save,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { motion } from "framer-motion"
import { ProtectedRoute } from "@/components/protected-route"
import { SiteHeader } from "@/components/site-header"

// Interface para os posts do fórum
interface ForumPost {
  id: number
  author: string
  avatar: string
  title: string
  content: string
  date: string
  timestamp: number // Para ordenação
  likes: number
  comments: number
  category: string
  isUserPost?: boolean
  likedByUser?: boolean
}

// Dados iniciais simulados para o fórum
const initialForumPosts: ForumPost[] = [
  {
    id: 1,
    author: "Maria Silva",
    avatar: "MS",
    title: "Como reduzi meu consumo de água em 30%",
    content:
      "Olá pessoal! Queria compartilhar algumas dicas que me ajudaram a reduzir meu consumo de água em 30% no último mês. Primeiro, instalei redutores de vazão em todas as torneiras da casa. Depois, comecei a reutilizar a água da máquina de lavar para limpar o quintal. Por último, consertei todos os pequenos vazamentos que tinha em casa. O resultado foi incrível!",
    date: "2 dias atrás",
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 dias atrás
    likes: 24,
    comments: 8,
    category: "dicas",
    likedByUser: false,
  },
  {
    id: 2,
    author: "João Pereira",
    avatar: "JP",
    title: "Dúvida sobre consumo no chuveiro",
    content:
      "Pessoal, estou tentando entender quanto de água gasto no banho. Meu chuveiro é um modelo mais antigo e fico no banho por cerca de 10 minutos. Alguém sabe como posso calcular esse consumo? Existe algum dispositivo que posso instalar para medir isso com precisão?",
    date: "5 dias atrás",
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 dias atrás
    likes: 12,
    comments: 15,
    category: "duvidas",
    likedByUser: false,
  },
  {
    id: 3,
    author: "Ana Costa",
    avatar: "AC",
    title: "Projeto de captação de água da chuva",
    content:
      "Acabei de implementar um sistema de captação de água da chuva em casa e queria compartilhar os resultados. Instalei calhas especiais e um reservatório de 500 litros. Com as chuvas do último mês, consegui economizar cerca de 20% na conta de água! O investimento foi de aproximadamente R$ 1.200 e estimo que se pague em 8 meses.",
    date: "1 semana atrás",
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 semana atrás
    likes: 32,
    comments: 10,
    category: "projetos",
    likedByUser: false,
  },
  {
    id: 4,
    author: "Carlos Mendes",
    avatar: "CM",
    title: "Economia de água na agricultura urbana",
    content:
      "Tenho uma pequena horta em casa e implementei um sistema de irrigação por gotejamento que reduziu muito o consumo de água. Uso mangueiras com furos estratégicos que liberam água diretamente na raiz das plantas. Além disso, faço a irrigação sempre no início da manhã ou final da tarde para evitar evaporação excessiva.",
    date: "2 semanas atrás",
    timestamp: Date.now() - 14 * 24 * 60 * 60 * 1000, // 2 semanas atrás
    likes: 18,
    comments: 6,
    category: "dicas",
    likedByUser: false,
  },
]

// Chave para armazenar os posts no localStorage
const STORAGE_KEY = "waterguardian_forum_posts"

export default function Forum() {
  const [activeTab, setActiveTab] = useState("todos")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("dicas")
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [userName, setUserName] = useState("Usuário")
  const [userAvatar, setUserAvatar] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingPost, setEditingPost] = useState<ForumPost | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  // Carrega os posts do localStorage ao iniciar
  useEffect(() => {
    setIsLoading(true)
    try {
      const savedPosts = localStorage.getItem(STORAGE_KEY)
      const savedUserName = localStorage.getItem("waterguardian_user_name")
      const savedUserAvatar = localStorage.getItem("waterguardian_user_avatar")

      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts)
        // Verifica se os dados são válidos
        if (Array.isArray(parsedPosts) && parsedPosts.length > 0) {
          setForumPosts(parsedPosts)
          console.log("Posts carregados com sucesso:", parsedPosts.length)
        } else {
          // Se os dados não forem válidos, usa os iniciais
          console.log("Dados salvos inválidos, usando posts iniciais")
          setForumPosts(initialForumPosts)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialForumPosts))
        }
      } else {
        // Se não houver posts salvos, usa os iniciais
        console.log("Nenhum post salvo, usando posts iniciais")
        setForumPosts(initialForumPosts)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialForumPosts))
      }

      if (savedUserName) {
        setUserName(savedUserName)
      }

      if (savedUserAvatar) {
        setUserAvatar(savedUserAvatar)
      } else {
        // Gera iniciais do nome do usuário para o avatar
        const initials = savedUserName
          ? savedUserName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .substring(0, 2)
          : "US"
        setUserAvatar(initials)
        localStorage.setItem("waterguardian_user_avatar", initials)
      }
    } catch (err) {
      console.error("Erro ao carregar posts:", err)
      setError("Ocorreu um erro ao carregar as discussões. Por favor, recarregue a página.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Salva os posts no localStorage quando houver alterações
  useEffect(() => {
    if (forumPosts.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(forumPosts))
        console.log("Posts salvos com sucesso:", forumPosts.length)
      } catch (err) {
        console.error("Erro ao salvar posts:", err)
        setError("Ocorreu um erro ao salvar as discussões. Algumas alterações podem não ser persistidas.")
      }
    }
  }, [forumPosts])

  // Filtra os posts com base na categoria selecionada
  const filteredPosts = activeTab === "todos" ? forumPosts : forumPosts.filter((post) => post.category === activeTab)

  // Função para formatar a data relativa (ex: "2 dias atrás")
  const formatRelativeDate = (timestamp: number) => {
    const now = Date.now()
    const diffInSeconds = Math.floor((now - timestamp) / 1000)

    if (diffInSeconds < 60) {
      return "agora mesmo"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minuto" : "minutos"} atrás`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hora" : "horas"} atrás`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? "dia" : "dias"} atrás`
    }

    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) {
      return `${diffInWeeks} ${diffInWeeks === 1 ? "semana" : "semanas"} atrás`
    }

    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths} ${diffInMonths === 1 ? "mês" : "meses"} atrás`
  }

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validação básica
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      setError("Por favor, preencha o título e o conteúdo da discussão.")
      return
    }

    setIsSubmitting(true)

    try {
      // Se estiver editando um post existente
      if (editingPost) {
        const updatedPosts = forumPosts.map((post) =>
          post.id === editingPost.id
            ? {
                ...post,
                title: newPostTitle,
                content: newPostContent,
                category: newPostCategory,
                date: "editado " + formatRelativeDate(Date.now()),
              }
            : post,
        )

        setForumPosts(updatedPosts)
        setSuccess("Post atualizado com sucesso!")
        setEditingPost(null)
      } else {
        // Criando um novo post
        const newPost: ForumPost = {
          id: Date.now(), // Usa timestamp como ID único
          author: userName,
          avatar: userAvatar,
          title: newPostTitle,
          content: newPostContent,
          date: "agora mesmo",
          timestamp: Date.now(),
          likes: 0,
          comments: 0,
          category: newPostCategory,
          isUserPost: true,
          likedByUser: false,
        }

        // Adiciona o novo post no início da lista
        setForumPosts([newPost, ...forumPosts])
        setSuccess("Post publicado com sucesso!")
      }

      // Limpa o formulário
      setNewPostTitle("")
      setNewPostContent("")
      setNewPostCategory("dicas")

      // Limpa a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } catch (err) {
      console.error("Erro ao publicar post:", err)
      setError("Ocorreu um erro ao publicar sua discussão. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikePost = (postId: number) => {
    setForumPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          // Se já curtiu, descurte; se não, curte
          const newLikedState = !post.likedByUser
          return {
            ...post,
            likes: newLikedState ? post.likes + 1 : post.likes - 1,
            likedByUser: newLikedState,
          }
        }
        return post
      }),
    )
  }

  const handleDeletePost = (postId: number) => {
    // Se já está confirmando para este post, exclui
    if (confirmDelete === postId) {
      setForumPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
      setSuccess("Post excluído com sucesso!")
      setConfirmDelete(null)

      // Limpa a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
    } else {
      // Caso contrário, pede confirmação
      setConfirmDelete(postId)

      // Limpa a confirmação após 5 segundos se o usuário não agir
      setTimeout(() => {
        setConfirmDelete((current) => (current === postId ? null : current))
      }, 5000)
    }
  }

  const handleEditPost = (post: ForumPost) => {
    setEditingPost(post)
    setNewPostTitle(post.title)
    setNewPostContent(post.content)
    setNewPostCategory(post.category)

    // Rola até o formulário
    document.getElementById("post-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const cancelEditing = () => {
    setEditingPost(null)
    setNewPostTitle("")
    setNewPostContent("")
    setNewPostCategory("dicas")
  }

  const cancelDeleteConfirmation = () => {
    setConfirmDelete(null)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="container mx-auto px-4 py-8 flex-1">
          <BackButton />

          <motion.h1
            className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Fórum WaterGuardian Solution
          </motion.h1>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
              <AlertTitle>Sucesso</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Discussões</h2>
                  <TabsList>
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="dicas">Dicas</TabsTrigger>
                    <TabsTrigger value="duvidas">Dúvidas</TabsTrigger>
                    <TabsTrigger value="projetos">Projetos</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value={activeTab} className="mt-0 space-y-6">
                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="ml-2">Carregando discussões...</span>
                    </div>
                  ) : filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <ScrollReveal key={post.id}>
                        <Card
                          className={`border-none shadow-lg hover:shadow-xl transition-all duration-300 ${post.isUserPost ? "bg-primary/5" : ""}`}
                        >
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={post.author} />
                                  <AvatarFallback>{post.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <CardTitle className="text-lg">{post.title}</CardTitle>
                                    {post.isUserPost && (
                                      <Badge variant="outline" className="text-primary border-primary">
                                        Seu post
                                      </Badge>
                                    )}
                                  </div>
                                  <CardDescription>
                                    Por {post.author} • {post.date}
                                  </CardDescription>
                                </div>
                              </div>

                              {post.isUserPost && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Ações</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEditPost(post)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeletePost(post.id)}>
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Excluir
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Share className="mr-2 h-4 w-4" />
                                      Compartilhar
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="whitespace-pre-line">{post.content}</p>
                            <div className="mt-4">
                              <Badge variant="outline" className="text-xs">
                                {post.category === "dicas"
                                  ? "Dicas"
                                  : post.category === "duvidas"
                                    ? "Dúvidas"
                                    : "Projetos"}
                              </Badge>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <div className="flex items-center gap-6">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`gap-1 ${post.likedByUser ? "text-primary" : ""}`}
                                onClick={() => handleLikePost(post.id)}
                              >
                                <ThumbsUp className={`h-4 w-4 ${post.likedByUser ? "fill-primary" : ""}`} />
                                <span>{post.likes}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{post.comments} comentários</span>
                              </Button>
                            </div>

                            {/* Botões de confirmação de exclusão */}
                            {confirmDelete === post.id && post.isUserPost ? (
                              <div className="flex gap-2">
                                <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                                  Confirmar exclusão
                                </Button>
                                <Button variant="outline" size="sm" onClick={cancelDeleteConfirmation}>
                                  Cancelar
                                </Button>
                              </div>
                            ) : (
                              <Button variant="outline" size="sm">
                                Ver discussão
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      </ScrollReveal>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">Nenhuma discussão encontrada</h3>
                      <p className="text-muted-foreground">Seja o primeiro a iniciar uma discussão nesta categoria.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card id="post-form" className="border-none shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle>{editingPost ? "Editar discussão" : "Iniciar nova discussão"}</CardTitle>
                  <CardDescription>
                    Compartilhe suas dúvidas, dicas ou projetos relacionados à economia de água.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitPost} className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Título da discussão"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Compartilhe sua mensagem aqui..."
                        className="min-h-[150px]"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex justify-between">
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value)}
                      >
                        <option value="dicas">Dicas</option>
                        <option value="duvidas">Dúvidas</option>
                        <option value="projetos">Projetos</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      {editingPost && (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={cancelEditing}
                          disabled={isSubmitting}
                        >
                          Cancelar
                        </Button>
                      )}
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {editingPost ? "Salvando..." : "Publicando..."}
                          </>
                        ) : (
                          <>
                            {editingPost ? (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Salvar alterações
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Publicar discussão
                              </>
                            )}
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="mt-6 border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Regras do fórum</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Seja respeitoso com todos os membros</li>
                    <li>• Mantenha as discussões relacionadas à economia de água</li>
                    <li>• Não compartilhe informações pessoais</li>
                    <li>• Evite spam e publicidade não autorizada</li>
                    <li>• Verifique se sua dúvida já foi respondida antes de postar</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <EnhancedFooter />
      </div>
    </ProtectedRoute>
  )
}
