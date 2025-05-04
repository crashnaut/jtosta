import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/whatsapp-button";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "PsiTosta - Psicologia Integrativa",
  description: "Psicoterapeuta Jaqueline Tosta CRP 09/21067. Cuidar da sua mente é o primeiro passo para cuidar de você.",
  keywords: "psicologia, psicoterapia, gestalt-terapia, neuropsicologia, Jaqueline Tosta, Goiânia, terapia integrativa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppButton phoneNumber="62982653996" />
        <Toaster />
      </body>
    </html>
  );
}
