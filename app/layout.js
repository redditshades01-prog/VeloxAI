import './globals.css';

export const metadata = {
  title: 'Veloxai — AI-Powered Business Systems. Built Fast. Owned Forever.',
  description:
    'Custom AI websites, chatbots & automation systems for businesses globally. One-time payment. No retainers. No lock-in. Built by an AI Web Developer based in India.',
  keywords:
    'AI web development, chatbot development India, business automation, Next.js agency, AI website builder',
  openGraph: {
    title: 'Veloxai — AI-Powered Business Systems',
    description: 'Custom AI websites, chatbots & automations — delivered in days, owned by you forever.',
    url: 'https://veloxai.tech',
    siteName: 'Veloxai',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veloxai — AI-Powered Business Systems',
    description: 'Custom AI websites, chatbots & automations — delivered in days, owned by you forever.',
  },
  metadataBase: new URL('https://veloxai.tech'),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0F',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
