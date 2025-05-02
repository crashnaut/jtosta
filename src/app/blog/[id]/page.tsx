import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

// Placeholder data for a single blog post and comments
const post = {
  id: 1,
  title: "A Importância do Autoconhecimento na Jornada Terapêutica",
  content: `
    <p>Entender a si mesmo é o primeiro passo fundamental para qualquer processo de mudança e crescimento pessoal. Na jornada terapêutica, o autoconhecimento não é apenas um objetivo, mas uma ferramenta poderosa que nos permite navegar pelas complexidades da vida com mais clareza e resiliência.</p>
    <br/>
    <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">O Que é Autoconhecimento?</h2>
    <p>Autoconhecimento é a capacidade de olhar para dentro, reconhecer e compreender nossos próprios pensamentos, sentimentos, motivações, crenças, valores e padrões de comportamento. É um processo contínuo de exploração interna que nos ajuda a entender quem somos, por que agimos de determinada maneira e o que realmente desejamos.</p>
    <br/>
    <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Por Que é Importante na Terapia?</h2>
    <ul class="list-disc list-inside space-y-2 mb-4">
      <li><strong>Identificação de Padrões:</strong> Ajuda a reconhecer padrões disfuncionais de pensamento ou comportamento que podem estar causando sofrimento.</li>
      <li><strong>Compreensão Emocional:</strong> Permite nomear e entender as emoções, aprendendo a lidar com elas de forma mais saudável.</li>
      <li><strong>Tomada de Decisão Consciente:</strong> Com maior clareza sobre seus valores e desejos, você pode tomar decisões mais alinhadas com quem você realmente é.</li>
      <li><strong>Melhora nos Relacionamentos:</strong> Entender suas próprias necessidades e limites facilita a comunicação e a construção de relacionamentos mais saudáveis.</li>
      <li><strong>Fortalecimento da Autoestima:</strong> Reconhecer suas qualidades e aceitar suas vulnerabilidades contribui para uma autoestima mais sólida.</li>
    </ul>
    <br/>
    <p>A terapia oferece um espaço seguro e acolhedor para essa exploração. Com o apoio de um profissional, você pode desvendar camadas, questionar crenças limitantes e construir uma relação mais autêntica e compassiva consigo mesmo(a).</p>
    <br/>
    <p><em>Investir em autoconhecimento é investir no seu bem-estar e na qualidade da sua vida.</em></p>
  `,
  author: "Jaqueline Tosta",
  date: "15 de Julho, 2024",
  imageUrl: "https://picsum.photos/1200/600?random=1",
  imageHint: "person thinking reflection deep",
  comments: [
    { id: 1, author: "Carlos Silva", date: "16 de Julho, 2024", text: "Excelente artigo! O autoconhecimento realmente mudou minha perspectiva.", avatarFallback: "CS" },
    { id: 2, author: "Mariana Alves", date: "17 de Julho, 2024", text: "Muito importante essa reflexão. A terapia tem me ajudado muito nisso.", avatarFallback: "MA" },
  ],
};

// TODO: Implement authentication check later
const isAuthenticated = false; // Placeholder

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch post data based on params.id
  // For now, we use the placeholder 'post' data

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
       <Button variant="outline" size="sm" asChild className="mb-8">
         <Link href="/blog">
           <ArrowLeft className="mr-2 h-4 w-4" />
           Voltar para o Blog
         </Link>
       </Button>

      <article>
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Avatar className="h-8 w-8 mr-2">
              {/* <AvatarImage src="/path-to-author-avatar.jpg" alt={post.author} /> */}
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>Por {post.author} &middot; {post.date}</span>
          </div>
        </header>

        <img
          src={post.imageUrl}
          alt={post.title}
          width={1200}
          height={600}
          className="mb-8 w-full rounded-lg object-cover shadow-md aspect-[2/1]"
          data-ai-hint={post.imageHint}
        />

        <div
          className="prose prose-lg max-w-none dark:prose-invert text-foreground prose-headings:text-secondary-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Separator className="my-12" />

      {/* Comments Section */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold flex items-center">
           <MessageCircle className="mr-2 h-6 w-6 text-primary" /> Comentários ({post.comments.length})
        </h2>

        {isAuthenticated ? (
          <div className="mb-8">
            <Textarea placeholder="Escreva seu comentário aqui..." className="mb-2"/>
            <Button>Enviar Comentário</Button>
          </div>
        ) : (
          <div className="mb-8 rounded-md border border-dashed p-4 text-center text-muted-foreground">
            <p>Faça login para deixar um comentário.</p>
            {/* TODO: Add Login Button */}
            {/* <Button variant="outline" size="sm" className="mt-2">Fazer Login</Button> */}
          </div>
        )}

        <div className="space-y-6">
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <Avatar>
                {/* <AvatarImage src="/path-to-commenter-avatar.jpg" alt={comment.author} /> */}
                <AvatarFallback>{comment.avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                   <p className="font-semibold text-foreground">{comment.author}</p>
                   <p className="text-xs text-muted-foreground">{comment.date}</p>
                </div>
                <p className="mt-1 text-sm text-foreground">{comment.text}</p>
              </div>
            </div>
          ))}
           {post.comments.length === 0 && !isAuthenticated && (
            <p className="text-sm text-muted-foreground italic">Ainda não há comentários.</p>
           )}
        </div>
      </section>
    </div>
  );
}

// Basic styling for prose content generated from HTML
export async function generateStaticParams() {
  // In a real app, fetch all blog post IDs
  const posts = [{ id: '1' }, { id: '2' }, { id: '3' }]; // Placeholder IDs
  return posts.map((post) => ({
    id: post.id,
  }));
}
