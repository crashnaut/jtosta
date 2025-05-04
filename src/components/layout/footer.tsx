import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappLink = `https://wa.me/5562982653996?text=${encodeURIComponent("Olá, Jaqueline! Gostaria de saber mais sobre seus serviços.")}`;

  return (
    <footer className="bg-muted/50 py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="mb-4 flex justify-center space-x-6">
           <Link href="/" className="text-sm hover:text-primary">Início</Link>
           <Link href="/sobre" className="text-sm hover:text-primary">Sobre</Link>
           <Link href="/blog" className="text-sm hover:text-primary">Blog</Link>
           <Link href="/contato" className="text-sm hover:text-primary">Contato</Link>
        </div>
        <div className="mb-4">
          <p className="text-sm">Psicoterapeuta Jaqueline Tosta - CRP 09/21067</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-primary"
          >
            WhatsApp: (62) 98265-3996
          </a>
        </div>
        <p className="text-xs">
          &copy; {currentYear} PsiTosta. Todos os direitos reservados.
        </p>
         <p className="text-xs mt-1">
          Desenvolvido com ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
