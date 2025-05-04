import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

// Placeholder data for blog posts - Increased to 9
const allBlogPosts = [
  {
    id: 1,
    title: "A Importância do Autoconhecimento na Jornada Terapêutica",
    excerpt: "Entender a si mesmo é o primeiro passo para a mudança. Neste artigo, exploramos como o autoconhecimento pode transformar sua vida...",
    author: "Jaqueline Tosta",
    date: "15 de Julho, 2024",
    imageUrl: "https://picsum.photos/600/400?random=1",
    imageHint: "person thinking reflection",
    commentsCount: 5,
  },
  {
    id: 2,
    title: "Gestalt-terapia: Vivendo o Aqui e Agora",
    excerpt: "Descubra os princípios da Gestalt-terapia e como focar no presente pode aliviar a ansiedade e promover o bem-estar...",
    author: "Jaqueline Tosta",
    date: "08 de Julho, 2024",
    imageUrl: "https://picsum.photos/600/400?random=2",
    imageHint: "present moment mindfulness",
    commentsCount: 8,
  },
   {
    id: 3,
    title: "Lidando com a Ansiedade no Dia a Dia",
    excerpt: "Estratégias práticas e insights terapêuticos para gerenciar a ansiedade e cultivar a calma em meio à rotina agitada...",
    author: "Jaqueline Tosta",
    date: "01 de Julho, 2024",
    imageUrl: "https://picsum.photos/600/400?random=3",
    imageHint: "calm serene relaxation",
    commentsCount: 12,
  },
  {
    id: 4,
    title: "Construindo Relacionamentos Saudáveis",
    excerpt: "Comunicação, limites e empatia são chaves para relações duradouras. Veja como cultivá-los...",
    author: "Jaqueline Tosta",
    date: "25 de Junho, 2024",
    imageUrl: "https://picsum.photos/600/400?random=4",
    imageHint: "couple holding hands supportive",
    commentsCount: 7,
  },
  {
    id: 5,
    title: "O Papel da Resiliência na Saúde Mental",
    excerpt: "Entenda o que é resiliência e como desenvolvê-la para enfrentar as adversidades da vida com mais força...",
    author: "Jaqueline Tosta",
    date: "18 de Junho, 2024",
    imageUrl: "https://picsum.photos/600/400?random=5",
    imageHint: "plant growing through concrete strength",
    commentsCount: 9,
  },
  {
    id: 6,
    title: "Neuropsicologia: Cérebro, Comportamento e Emoções",
    excerpt: "Uma introdução à neuropsicologia e como ela nos ajuda a entender a ligação entre nossa mente e nosso cérebro...",
    author: "Jaqueline Tosta",
    date: "11 de Junho, 2024",
    imageUrl: "https://picsum.photos/600/400?random=6",
    imageHint: "brain illustration connection network",
    commentsCount: 4,
  },
   {
    id: 7,
    title: "Mindfulness para Iniciantes: Encontrando Calma no Caos",
    excerpt: "Aprenda técnicas simples de mindfulness para reduzir o estresse e aumentar sua presença no momento atual...",
    author: "Jaqueline Tosta",
    date: "04 de Junho, 2024",
    imageUrl: "https://picsum.photos/600/400?random=7",
    imageHint: "meditation serene nature",
    commentsCount: 15,
  },
  {
    id: 8,
    title: "Superando a Procrastinação: Dicas Práticas",
    excerpt: "Entenda por que procrastinamos e descubra estratégias eficazes para vencer esse hábito e aumentar sua produtividade...",
    author: "Jaqueline Tosta",
    date: "28 de Maio, 2024",
    imageUrl: "https://picsum.photos/600/400?random=8",
    imageHint: "person working focused productivity",
    commentsCount: 6,
  },
  {
    id: 9,
    title: "Acolhimento Psicológico: Por Que é Tão Importante?",
    excerpt: "Saiba mais sobre a importância de um ambiente terapêutico acolhedor e sem julgamentos para o processo de cura...",
    author: "Jaqueline Tosta",
    date: "21 de Maio, 2024",
    imageUrl: "https://picsum.photos/600/400?random=9",
    imageHint: "support hands helping comfort",
    commentsCount: 11,
  },
];

const POSTS_PER_PAGE = 6;

// TODO: Implement authentication check later for comments
const isAuthenticated = false; // Placeholder

export default function BlogPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Math.ceil(allBlogPosts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allBlogPosts.slice(startIndex, endIndex);

  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="mb-10 text-center text-4xl font-bold text-primary md:text-5xl">
        Blog J. Tosta
      </h1>
      <p className="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
        Reflexões, insights e dicas sobre saúde mental, psicoterapia e bem-estar.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
               <img
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="aspect-[3/2] w-full object-cover"
                  data-ai-hint={post.imageHint}
                />
            </CardHeader>
            <CardContent className="flex-1 p-6">
              <CardTitle className="mb-2 text-xl leading-tight">
                <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="mb-4 text-sm line-clamp-3"> {/* Added line-clamp */}
                {post.excerpt}
              </CardDescription>
              <div className="flex items-center text-xs text-muted-foreground">
                 <Avatar className="h-6 w-6 mr-2">
                    {/* Placeholder for author image */}
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                 </Avatar>
                 <span>{post.author} &middot; {post.date}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-6 pt-0">
               <Button variant="link" asChild className="p-0 h-auto text-sm">
                  <Link href={`/blog/${post.id}`}>Ler mais</Link>
               </Button>
               <div className="flex items-center text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.commentsCount}
               </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center space-x-4">
          <Button variant="outline" size="icon" disabled={!hasPrevPage} asChild={hasPrevPage}>
             <Link href={`/blog?page=${currentPage - 1}`}>
               <ChevronLeft className="h-4 w-4" />
               <span className="sr-only">Página Anterior</span>
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
           <Button variant="outline" size="icon" disabled={!hasNextPage} asChild={hasNextPage}>
            <Link href={`/blog?page=${currentPage + 1}`}>
              <ChevronRight className="h-4 w-4" />
               <span className="sr-only">Próxima Página</span>
            </Link>
          </Button>
        </div>
      )}

       {/* Comment Section Notice (Placeholder) */}
       {!isAuthenticated && (
        <div className="mt-16 text-center text-muted-foreground">
          <p>Faça login para deixar comentários nos artigos.</p>
          {/* TODO: Add Login Button Here */}
        </div>
       )}
    </div>
  );
}
