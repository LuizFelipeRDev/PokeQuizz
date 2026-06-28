import "./globals.css";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: "PokeQuiz",
  description: "Teste seus conhecimentos do mundo Pokémon!",
  keywords: ["pokemon", "quiz", "react", "next.js"],
  authors: [{ name: "Luiz Felipe" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
