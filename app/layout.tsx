import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nissan GT-R | The Godzilla - Cinematic Showcase",
  description: "Experience the legend of the Nissan GT-R R35. The ultimate everyday supercar, evolved into a technological masterpiece. Transforming car showcase made with Next.js and Three.js.",
  keywords: ["Nissan GT-R", "R35", "Godzilla", "Supercar", "JDM", "Three.js", "Next.js Showcase", "Interactive 3D"],
  authors: [{ name: "Showcase Developer" }],
  openGraph: {
    title: "Nissan GT-R | The Godzilla",
    description: "The Legend of Godzilla. Cinematic 3D Showcase.",
    url: "https://nissan-gtr-showcase.vercel.app", // Conceptual URL
    siteName: "Nissan GT-R Showcase",
    images: [
      {
        url: "/images/hero_og.jpg", // We should ideally create this or map it to an existing image
        width: 1200,
        height: 630,
        alt: "Nissan GT-R R35 Cinematic Shot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nissan GT-R | The Godzilla",
    description: "Experience the legend in 3D using Next.js and Three.js.",
    images: ["/images/hero_og.jpg"], // Same as OG
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className="bg-base-dark text-white antialiased overflow-x-hidden selection:bg-accent-metal selection:text-white">
        {children}
      </body>
    </html>
  );
}
