import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function Home() {
  const whatsappLink = `https://wa.me/5562982653996?text=${encodeURIComponent("Olá, Jaqueline! Gostaria de saber mais sobre seus serviços.")}`;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src="https://picsum.photos/1600/900"
          alt="Paisagem calma e acolhedora"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          data-ai-hint="calm landscape nature"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-4 text-center text-primary-foreground">
          <h1 className="mb-4 text-4xl font-bold leading-tight drop-shadow-md md:text-5xl lg:text-6xl">
            Cuidar da sua mente é o primeiro passo para cuidar de você.
          </h1>
          <p className="mb-8 max-w-2xl text-lg drop-shadow-sm md:text-xl">
            Este é o espaço onde você pode ser você mesmo, sem julgamentos.
          </p>
          <Button asChild size="lg" variant="accent">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Fale comigo no WhatsApp
            </a>
          </Button>
        </div>
      </section>

      {/* Bio Section */}
      <section id="bio" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-12">
            <div className="md:col-span-1">
              <Image
                src="https://picsum.photos/400/400"
                alt="Psicoterapeuta Jaqueline Tosta"
                width={400}
                height={400}
                className="mx-auto rounded-full shadow-lg"
                data-ai-hint="professional woman portrait psychologist"
              />
            </div>
            <div className="md:col-span-2">
              <h2 className="mb-4 text-3xl font-semibold text-primary">
                Psicoterapeuta Jaqueline Tosta
              </h2>
              <p className="mb-4 text-lg font-medium text-muted-foreground">
                CRP 09/21067
              </p>
              <p className="mb-6 text-foreground">
                Olá! Sou Jaqueline Tosta, psicoterapeuta dedicada a oferecer um espaço seguro e acolhedor para o seu desenvolvimento pessoal e bem-estar emocional. Minha abordagem integra ciência e sensibilidade, buscando compreender suas necessidades individuais e auxiliá-lo(a) na jornada do autoconhecimento e transformação.
              </p>
              <h3 className="mb-2 text-xl font-semibold text-secondary-foreground">Formação:</h3>
              <ul className="mb-6 list-inside list-disc space-y-1 text-muted-foreground">
                <li>Graduada em Psicologia e Pedagogia</li>
                <li>Pós-graduada em Neuropsicopedagogia</li>
                <li>Pós-graduanda em Neuropsicologia e Gestalt-terapia no ITGT/PUC</li>
              </ul>
              <Button asChild variant="secondary">
                <Link href="/sobre">Saiba Mais Sobre Mim</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Approach Section */}
      <section id="servicos" className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-12 text-3xl font-semibold text-primary">Minha Abordagem</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="text-left shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-secondary-foreground">
                  <CheckCircle className="h-6 w-6 text-accent" />
                  Terapia Integrativa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Unindo diferentes abordagens científicas da psicologia para oferecer um tratamento personalizado e eficaz, focado nas suas necessidades únicas.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-left shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-secondary-foreground">
                   <CheckCircle className="h-6 w-6 text-accent" />
                   Acolhimento Emocional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Crio um ambiente seguro, empático e livre de julgamentos, onde você se sentirá à vontade para explorar seus sentimentos e desafios.
                </CardDescription>
              </CardContent>
            </Card>
             <Card className="text-left shadow-md hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-secondary-foreground">
                   <CheckCircle className="h-6 w-6 text-accent" />
                   Seus Sentimentos Importam
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Acredito na importância de dar atenção aos seus sentimentos. Juntos, vamos compreendê-los e encontrar caminhos para o seu bem-estar.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

       {/* CTA Section */}
      <section className="py-16 text-center md:py-24">
        <div className="container mx-auto px-4">
           <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Pronto para começar sua jornada?</h2>
          <p className="mb-8 max-w-xl mx-auto text-muted-foreground">
             Entre em contato para agendar uma conversa inicial e descobrir como posso te ajudar.
          </p>
          <Button asChild size="lg" variant="accent">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Fale comigo no WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
