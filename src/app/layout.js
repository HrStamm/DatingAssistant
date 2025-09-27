import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './shared/context/ThemeContext';
import { LanguageProvider } from './shared/context/LanguageContext';
import ClientAppLayout from './shared/components/ClientAppLayout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#6d28d9" },
    { media: "(prefers-color-scheme: dark)", color: "#a855f7" }
  ],
}

export const metadata = {
  title: "Dating Assistant | Find det perfekte svar",
  description: "Få inspiration til smarte, flirtende svar på dine dating chats",
  keywords: ["dating", "chat", "AI", "flirt", "tekstforslag", "dating app", "tinder", "bumble"],
  authors: [{ name: "Dating Assistant Team" }],
  creator: "Dating Assistant",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title: "Dating Assistant",
    description: "Få det perfekte svar til dine dating chats",
    siteName: "Dating Assistant",
    images: [{
      url: "/og-image.png", 
      width: 1200,
      height: 630
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dating Assistant",
    description: "Få det perfekte svar til dine dating chats",
    images: ["/twitter-image.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="da" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen transition-colors duration-300`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <ClientAppLayout>
              {children}
            </ClientAppLayout>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}