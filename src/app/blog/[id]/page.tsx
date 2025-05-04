import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

// Placeholder data for all blog posts
const allBlogPostsData = {
  '1': {
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
  },
  '2': {
    id: 2,
    title: "Gestalt-terapia: Vivendo o Aqui e Agora",
    content: `
      <p>A Gestalt-terapia, uma abordagem humanista e experiencial, nos convida a focar no presente, no "aqui e agora". Em vez de nos perdermos em ruminações sobre o passado ou ansiedades sobre o futuro, aprendemos a prestar atenção plena às nossas sensações, emoções e pensamentos no momento presente.</p>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Princípios Chave</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Consciência (Awareness):</strong> Estar ciente do que está acontecendo internamente e externamente, sem julgamento.</li>
        <li><strong>Contato:</strong> A forma como interagimos com o ambiente e com os outros. O objetivo é promover um contato mais autêntico e satisfatório.</li>
        <li><strong>Responsabilidade:</strong> Assumir a responsabilidade por nossas escolhas, ações e sentimentos.</li>
        <li><strong>Holismo:</strong> Ver o indivíduo como um todo integrado – mente, corpo e emoções.</li>
      </ul>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Benefícios de Viver no Presente</h2>
      <p>Ao praticar a atenção ao presente, podemos reduzir a ansiedade, aumentar a clareza sobre nossas necessidades, melhorar nossa capacidade de tomar decisões e viver de forma mais autêntica e vibrante. A terapia Gestáltica oferece ferramentas e experimentos para facilitar essa consciência e integração.</p>
      <br/>
      <p><em>Permita-se experimentar a riqueza do momento presente.</em></p>
    `,
    author: "Jaqueline Tosta",
    date: "08 de Julho, 2024",
    imageUrl: "https://picsum.photos/1200/600?random=2",
    imageHint: "present moment mindfulness clock",
    comments: [
       { id: 3, author: "Pedro Costa", date: "09 de Julho, 2024", text: "Focar no agora é desafiador, mas libertador. Ótima explicação!", avatarFallback: "PC" },
    ],
  },
  '3': {
    id: 3,
    title: "Lidando com a Ansiedade no Dia a Dia",
    content: `
      <p>A ansiedade é uma resposta natural ao estresse, mas quando se torna excessiva e persistente, pode impactar significativamente nossa qualidade de vida. Felizmente, existem estratégias eficazes para gerenciá-la.</p>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Estratégias Práticas</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Respiração Consciente:</strong> Técnicas de respiração profunda podem acalmar o sistema nervoso rapidamente. Inspire lentamente pelo nariz, segure por alguns segundos e expire lentamente pela boca.</li>
        <li><strong>Mindfulness e Atenção Plena:</strong> Praticar a observação dos pensamentos e sensações sem julgamento ajuda a reduzir a intensidade da ansiedade.</li>
        <li><strong>Atividade Física Regular:</strong> Exercícios liberam endorfinas, que têm efeito calmante e melhoram o humor.</li>
        <li><strong>Rotina de Sono Saudável:</strong> Dormir bem é crucial para regular o humor e reduzir a vulnerabilidade à ansiedade.</li>
        <li><strong>Limitar Cafeína e Álcool:</strong> Essas substâncias podem intensificar os sintomas de ansiedade em algumas pessoas.</li>
        <li><strong>Busca por Apoio:</strong> Conversar com amigos, familiares ou um profissional de saúde mental pode fazer uma grande diferença.</li>
      </ul>
      <br/>
      <p>Na terapia, exploramos as raízes da ansiedade e desenvolvemos estratégias personalizadas para lidar com ela, promovendo maior bem-estar e controle sobre suas emoções.</p>
      <br/>
      <p><em>Pequenos passos consistentes podem levar a grandes mudanças no manejo da ansiedade.</em></p>
    `,
    author: "Jaqueline Tosta",
    date: "01 de Julho, 2024",
    imageUrl: "https://picsum.photos/1200/600?random=3",
    imageHint: "calm serene person meditating",
    comments: [
      { id: 4, author: "Ana Beatriz", date: "02 de Julho, 2024", text: "Dicas muito úteis! A respiração consciente tem me ajudado bastante.", avatarFallback: "AB" },
      { id: 5, author: "Ricardo Lima", date: "03 de Julho, 2024", text: "É um desafio constante, mas essas estratégias ajudam.", avatarFallback: "RL" },
    ],
  },
    '4': {
    id: 4,
    title: "Construindo Relacionamentos Saudáveis",
    content: `
      <p>Relacionamentos interpessoais são fundamentais para nosso bem-estar, mas construir e manter conexões saudáveis exige esforço e consciência. Seja em amizades, relações familiares ou amorosas, alguns pilares são essenciais.</p>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Pilares Essenciais</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Comunicação Aberta e Honesta:</strong> Expressar necessidades, sentimentos e limites de forma clara e respeitosa, e ouvir ativamente o outro.</li>
        <li><strong>Empatia:</strong> Tentar compreender a perspectiva e os sentimentos do outro, mesmo que não concorde.</li>
        <li><strong>Respeito Mútuo:</strong> Valorizar a individualidade, as opiniões e os limites de cada um.</li>
        <li><strong>Confiança:</strong> Construída através da consistência, honestidade e cumprimento de promessas.</li>
        <li><strong>Apoio Recíproco:</strong> Estar presente nos momentos bons e ruins, oferecendo suporte e encorajamento.</li>
        <li><strong>Limites Saudáveis:</strong> Saber dizer não e definir o que é aceitável ou não na relação para proteger seu bem-estar.</li>
        <li><strong>Resolução de Conflitos Construtiva:</strong> Abordar desacordos com o objetivo de encontrar soluções, em vez de culpar ou atacar.</li>
      </ul>
      <br/>
      <p>Relacionamentos saudáveis não são perfeitos, mas envolvem um compromisso contínuo com o crescimento, a compreensão e o cuidado mútuo. A terapia pode ajudar a identificar padrões relacionais disfuncionais e a desenvolver habilidades para construir conexões mais gratificantes.</p>
      <br/>
      <p><em>Invista em seus relacionamentos, eles são fonte de alegria e apoio.</em></p>
    `,
    author: "Jaqueline Tosta",
    date: "25 de Junho, 2024",
    imageUrl: "https://picsum.photos/1200/600?random=4",
    imageHint: "couple hands support connection",
    comments: [], // No comments yet
  },
  '5': {
    id: 5,
    title: "O Papel da Resiliência na Saúde Mental",
    content: `
      <p>A vida é repleta de desafios, perdas e momentos difíceis. A resiliência é a capacidade de se adaptar, se recuperar e até mesmo crescer diante dessas adversidades. Não significa ausência de dor ou sofrimento, mas sim a habilidade de navegar por eles sem se deixar abater permanentemente.</p>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Como Desenvolver Resiliência?</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Cultivar Relações de Apoio:</strong> Ter pessoas com quem contar nos momentos difíceis é fundamental.</li>
        <li><strong>Manter uma Perspectiva Realista:</strong> Aceitar que dificuldades fazem parte da vida e focar no que pode ser controlado.</li>
        <li><strong>Desenvolver a Autoconfiança:</strong> Reconhecer suas forças e capacidades para superar desafios.</li>
        <li><strong>Cuidar de Si Mesmo:</strong> Priorizar o bem-estar físico e emocional (sono, alimentação, exercícios, lazer).</li>
        <li><strong>Aprender com as Experiências:</strong> Ver os desafios como oportunidades de aprendizado e crescimento.</li>
        <li><strong>Estabelecer Metas Realistas:</strong> Ter objetivos dá um senso de propósito e direção.</li>
        <li><strong>Buscar Ajuda Profissional:</strong> Um terapeuta pode auxiliar no desenvolvimento de estratégias de enfrentamento e resiliência.</li>
      </ul>
      <br/>
      <p>A resiliência não é um traço fixo, mas uma habilidade que pode ser aprendida e fortalecida ao longo da vida. É um componente chave para a manutenção da saúde mental e para viver uma vida mais plena, mesmo diante das inevitáveis tempestades.</p>
      <br/>
      <p><em>Fortaleça sua resiliência, fortaleça sua capacidade de florescer.</em></p>
    `,
    author: "Jaqueline Tosta",
    date: "18 de Junho, 2024",
    imageUrl: "https://picsum.photos/1200/600?random=5",
    imageHint: "plant concrete strength resilience",
    comments: [
      { id: 6, author: "Fernanda Dias", date: "19 de Junho, 2024", text: "Resiliência é tudo! Ótimo artigo.", avatarFallback: "FD" },
    ],
  },
  '6': {
    id: 6,
    title: "Neuropsicologia: Cérebro, Comportamento e Emoções",
    content: `
      <p>A neuropsicologia é uma fascinante área da psicologia que estuda as relações entre o cérebro e o comportamento humano. Ela busca compreender como diferentes áreas e funções cerebrais influenciam nossos pensamentos, emoções, habilidades cognitivas (como memória, atenção, linguagem) e ações.</p>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">O Que Faz um Neuropsicólogo?</h2>
      <p>O neuropsicólogo realiza avaliações detalhadas para identificar possíveis alterações cognitivas e comportamentais decorrentes de lesões cerebrais (como AVCs, traumatismos), doenças neurodegenerativas (como Alzheimer, Parkinson), transtornos do neurodesenvolvimento (como TDAH, autismo) ou outras condições neurológicas e psiquiátricas.</p>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Aplicações da Neuropsicologia</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Avaliação Diagnóstica:</strong> Auxilia no diagnóstico diferencial de diversas condições.</li>
        <li><strong>Reabilitação Cognitiva:</strong> Desenvolve programas de intervenção para melhorar ou compensar déficits cognitivos.</li>
        <li><strong>Acompanhamento:</strong> Monitora a evolução de quadros neurológicos e o impacto de tratamentos.</li>
        <li><strong>Orientação:</strong> Fornece informações e estratégias para pacientes, familiares e cuidadores lidarem com as dificuldades.</li>
        <li><strong>Pesquisa:</strong> Contribui para o avanço do conhecimento sobre o funcionamento cerebral.</li>
      </ul>
      <br/>
      <p>Compreender a base neural do comportamento e das emoções nos permite abordagens terapêuticas mais direcionadas e eficazes, integrando o conhecimento do cérebro ao cuidado com a mente.</p>
      <br/>
      <p><em>A neuropsicologia nos ajuda a desvendar os mistérios da mente através do cérebro.</em></p>
    `,
    author: "Jaqueline Tosta",
    date: "11 de Junho, 2024",
    imageUrl: "https://picsum.photos/1200/600?random=6",
    imageHint: "brain connection network learning",
    comments: [],
  },
  '7': {
    id: 7,
    title: "Mindfulness para Iniciantes: Encontrando Calma no Caos",
    content: `
      <p>Em meio à agitação do dia a dia, o mindfulness, ou atenção plena, surge como uma ferramenta poderosa para cultivar a calma e a clareza mental. Trata-se da prática de prestar atenção intencional ao momento presente, sem julgamentos.</p>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Como Começar a Praticar?</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Respiração Consciente:</strong> Reserve alguns minutos do seu dia para focar apenas na sua respiração. Observe o ar entrando e saindo, sem tentar controlá-lo. Quando a mente divagar, gentilmente traga o foco de volta à respiração.</li>
        <li><strong>Observação Sensorial:</strong> Escolha um sentido (visão, audição, tato, olfato, paladar) e explore-o com curiosidade. O que você vê, ouve ou sente neste exato momento?</li>
        <li><strong>Atenção nas Atividades Rotineiras:</strong> Pratique a atenção plena ao realizar tarefas simples, como escovar os dentes, tomar banho ou lavar a louça. Perceba as sensações, os movimentos, os sons.</li>
        <li><strong>Meditação Guiada Curta:</strong> Existem muitos aplicativos e vídeos com meditações guiadas curtas, ideais para iniciantes.</li>
      </ul>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Benefícios do Mindfulness</h2>
      <p>A prática regular do mindfulness pode ajudar a reduzir o estresse e a ansiedade, melhorar a concentração, aumentar a autoconsciência, promover a regulação emocional e cultivar uma maior apreciação pela vida.</p>
      <br/>
      <p><em>Comece com pequenos momentos de atenção plena e sinta a diferença.</em></p>
    `,
    author: "Jaqueline Tosta",
    date: "04 de Junho, 2024",
    imageUrl: "https://picsum.photos/1200/600?random=7",
    imageHint: "meditation calm nature peace",
    comments: [
       { id: 7, author: "Lucas Mendes", date: "05 de Junho, 2024", text: "Vou tentar incorporar isso na minha rotina!", avatarFallback: "LM" },
    ],
  },
   '8': {
    id: 8,
    title: "Superando a Procrastinação: Dicas Práticas",
    content: `
      <p>Adiar tarefas importantes é um comportamento comum, conhecido como procrastinação. Embora possa parecer inofensivo, pode levar ao estresse, à culpa e à queda na produtividade. Entender por que procrastinamos é o primeiro passo para superar esse hábito.</p>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Por Que Procrastinamos?</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Medo do Fracasso ou da Crítica:</strong> Adiar para evitar um possível resultado negativo.</li>
        <li><strong>Perfeccionismo:</strong> Esperar as condições ideais ou ter medo de não atingir um padrão elevado.</li>
        <li><strong>Tarefa Desagradável ou Entediante:</strong> Falta de motivação intrínseca.</li>
        <li><strong>Dificuldade em Iniciar:</strong> Sentir-se sobrecarregado ou não saber por onde começar.</li>
        <li><strong>Má Gestão do Tempo:</strong> Subestimar o tempo necessário ou ter prioridades desorganizadas.</li>
      </ul>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Estratégias para Vencer a Procrastinação</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Divida Tarefas Grandes:</strong> Quebre projetos complexos em passos menores e mais gerenciáveis.</li>
        <li><strong>Regra dos 5 Minutos:</strong> Comprometa-se a trabalhar na tarefa por apenas 5 minutos. Muitas vezes, o mais difícil é começar.</li>
        <li><strong>Defina Prazos Realistas:</strong> Estabeleça deadlines claros para cada etapa.</li>
        <li><strong>Elimine Distrações:</strong> Desligue notificações, feche abas desnecessárias e crie um ambiente de trabalho focado.</li>
        <li><strong>Recompense-se:</strong> Celebre as pequenas vitórias ao concluir etapas da tarefa.</li>
        <li><strong>Entenda a Emoção Subjacente:</strong> Pergunte-se qual sentimento está por trás da procrastinação (ansiedade, tédio, medo?) e tente lidar com ele.</li>
      </ul>
      <br/>
      <p>Superar a procrastinação é um processo. Seja paciente consigo mesmo(a) e experimente diferentes estratégias para encontrar o que funciona melhor para você.</p>
      <br/>
      <p><em>Comece pequeno, mas comece agora.</em></p>
    `,
    author: "Jaqueline Tosta",
    date: "28 de Maio, 2024",
    imageUrl: "https://picsum.photos/1200/600?random=8",
    imageHint: "desk focus planning productivity",
    comments: [],
  },
   '9': {
    id: 9,
    title: "Acolhimento Psicológico: Por Que é Tão Importante?",
    content: `
      <p>O acolhimento é a base de um processo terapêutico bem-sucedido. Sentir-se acolhido significa encontrar um espaço onde você pode ser autêntico, expressar suas vulnerabilidades, medos e dores sem receio de julgamento, crítica ou invalidação.</p>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">Componentes do Acolhimento</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Empatia:</strong> A capacidade do terapeuta de compreender e se conectar com a experiência emocional do paciente.</li>
        <li><strong>Escuta Atenta e Ativa:</strong> Ouvir não apenas as palavras, mas também os sentimentos e significados subjacentes, demonstrando interesse genuíno.</li>
        <li><strong>Ausência de Julgamento:</strong> Aceitar o paciente incondicionalmente, com suas qualidades e dificuldades.</li>
        <li><strong>Confidencialidade e Segurança:</strong> Garantir que as informações compartilhadas serão mantidas em sigilo, criando um ambiente seguro.</li>
        <li><strong>Validação Emocional:</strong> Reconhecer e validar os sentimentos do paciente como legítimos, mesmo que a situação pareça trivial para outros.</li>
        <li><strong>Presença Terapêutica:</strong> Estar genuinamente presente e engajado na relação terapêutica.</li>
      </ul>
      <br/>
      <h2 class="text-2xl font-semibold mb-3 mt-4 text-secondary-foreground">O Impacto do Acolhimento</h2>
      <p>Quando nos sentimos verdadeiramente acolhidos, a confiança no terapeuta aumenta, facilitando a exploração de questões profundas e dolorosas. O acolhimento promove a autoaceitação, fortalece a autoestima e encoraja a pessoa a buscar mudanças positivas em sua vida. É o solo fértil onde a cura e o crescimento podem florescer.</p>
      <br/>
      <p><em>Buscar um espaço terapêutico acolhedor é um ato de autocuidado fundamental.</em></p>
    `,
    author: "Jaqueline Tosta",
    date: "21 de Maio, 2024",
    imageUrl: "https://picsum.photos/1200/600?random=9",
    imageHint: "support hands comfort empathy",
    comments: [
       { id: 8, author: "Sofia Oliveira", date: "22 de Maio, 2024", text: "Acolhimento faz toda a diferença no processo. Muito bem colocado.", avatarFallback: "SO" },
    ],
  },
};


// TODO: Implement authentication check later
const isAuthenticated = false; // Placeholder

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Find the post data based on params.id
  const post = allBlogPostsData[params.id as keyof typeof allBlogPostsData];

  // Handle post not found
  if (!post) {
    // TODO: Create a proper 404 page or redirect
    return <div>Post não encontrado</div>;
  }

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
           {post.comments.length === 0 && ( // Show even if not authenticated if there are no comments
            <p className="text-sm text-muted-foreground italic">Ainda não há comentários.</p>
           )}
        </div>
      </section>
    </div>
  );
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const postIds = Object.keys(allBlogPostsData); // ['1', '2', '3', ..., '9']
  return postIds.map((id) => ({
    id: id,
  }));
}
