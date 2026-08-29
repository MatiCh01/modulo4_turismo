import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nativa | Viajes & Experiencias",
    template: "%s | Nativa Viajes",
  },
  description: "Descubrí experiencias de viaje para el descanso, la calma y la reconexión con la naturaleza.",
  keywords: ["Turismo Argentina", "Viajes", "Reservas", "Mendoza", "Bariloche", "Nativa"],
  authors: [{ name: "Nativa Viajes" }],
  openGraph: {
    title: "Nativa | Viajes & Experiencias",
    description: "Descubrí experiencias de viaje para el descanso, la calma y la reconexión con la naturaleza.",
    url: "https://nativa-viajes.com",
    siteName: "Nativa Viajes",
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <AuthProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}