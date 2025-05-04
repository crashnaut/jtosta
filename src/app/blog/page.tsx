import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

// Placeholder data for blog posts
const blogPosts = [
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
];

// TODO: Implement authentication check later for comments
const isAuthenticated = false; // Placeholder

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="mb-10 text-center text-4xl font-bold text-primary md:text-5xl">
        Blog PsiTosta
      </h1>
      <p className="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
        Reflexões, insights e dicas sobre saúde mental, psicoterapia e bem-estar.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
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
              <CardDescription className="mb-4 text-sm">
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
