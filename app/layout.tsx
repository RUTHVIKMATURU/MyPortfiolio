import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ruthvik Maturu - Full Stack Developer & AI Enthusiast',
  description: 'Passionate software developer specializing in AI, MERN stack, and competitive programming. Expert in building scalable applications with modern technologies.',
  keywords: 'Ruthvik Maturu, Full Stack Developer, AI, Machine Learning, MERN Stack, React, Node.js, Competitive Programming, Software Engineer',
  authors: [{ name: 'Ruthvik Maturu' }],
  creator: 'Ruthvik Maturu',
  openGraph: {
    title: 'Ruthvik Maturu - Full Stack Developer & AI Enthusiast',
    description: 'Passionate software developer specializing in AI, MERN stack, and competitive programming.',
    url: 'https://ruthvik-portfolio.vercel.app',
    siteName: 'Ruthvik Maturu Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruthvik Maturu - Full Stack Developer & AI Enthusiast',
    description: 'Passionate software developer specializing in AI, MERN stack, and competitive programming.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}