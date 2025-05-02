import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Users } from "lucide-react";

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="mb-10 text-center text-4xl font-bold text-primary md:text-5xl">
        Sobre Mim
      </h1>

      <div className="mb-16 grid grid-cols-1 items-center gap-12 md:grid-cols-3">
        <div className="md:col-span-1">
          <Image
            src="https://picsum.photos/500/500"
            alt="Psicoterapeuta Jaqueline Tosta"
            width={500}
            height={500}
            className="mx-auto rounded-lg shadow-xl"
            data-ai-hint="professional woman smiling friendly"
          />
        </div>
        <div className="md:col-span-2">
          <h2 className="mb-4 text-3xl font-semibold text-secondary-foreground">
            Jaqueline Tosta
          </h2>
          <p className="mb-2 text-lg font-medium text-muted-foreground">
            Psicoterapeuta CRP 09/21067
          </p>
          <p className="mb-4 text-lg leading-relaxed text-foreground">
            Sou apaixonada por auxiliar pessoas em suas jornadas de autoconhecimento e transformação. Acredito que cada indivíduo possui um potencial imenso para o crescimento e a superação de desafios, e meu papel como psicoterapeuta é facilitar esse processo, oferecendo um espaço seguro, acolhedor e baseado na ciência.
          </p>
          <p className="text-lg leading-relaxed text-foreground">
            Minha trajetória acadêmica e profissional me proporcionou uma visão ampla sobre o desenvolvimento humano, desde a infância até a vida adulta, integrando conhecimentos da psicologia, pedagogia e neurociências.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-semibold text-primary">
          Formação Acadêmica
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-secondary-foreground">Graduação em Psicologia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Base sólida para a compreensão do comportamento humano e das teorias psicológicas.</p>
            </CardContent>
          </Card>
          <Card className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-secondary-foreground">Graduação em Pedagogia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Entendimento aprofundado sobre processos de aprendizagem e desenvolvimento infantil.</p>
            </CardContent>
          </Card>
          <Card className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-secondary-foreground">Pós-graduação em Neuropsicopedagogia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Foco na relação entre cérebro, cognição e aprendizagem.</p>
            </CardContent>
          </Card>
          <Card className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-secondary-foreground">Pós-graduanda em Neuropsicologia</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Especialização na avaliação e reabilitação das funções cognitivas.</p>
            </CardContent>
          </Card>
           <Card className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-secondary-foreground">Pós-graduanda em Gestalt-terapia (ITGT/PUC)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Abordagem humanista focada no aqui-e-agora e na consciência.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="mb-8 text-center text-3xl font-semibold text-primary">
          Minha Abordagem Terapêutica
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
              <Brain className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-secondary-foreground">Terapia Integrativa</h3>
            <p className="text-muted-foreground">
              Combino técnicas e conhecimentos de diferentes abordagens, como a Gestalt-terapia e a Neuropsicologia, para adaptar o tratamento às suas necessidades específicas, promovendo um cuidado completo e eficaz.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-secondary-foreground">Acolhimento Emocional</h3>
            <p className="text-muted-foreground">
              Priorizo a criação de um vínculo terapêutico forte, baseado na empatia, respeito e ausência de julgamentos. Aqui, você encontrará um espaço seguro para expressar seus sentimentos e vulnerabilidades.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-secondary-foreground">Foco no Indivíduo</h3>
            <p className="text-muted-foreground">
              Cada pessoa é única. Trabalho de forma colaborativa com você, respeitando seu ritmo e sua história, para construirmos juntos caminhos mais saudáveis e conscientes para sua vida.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
