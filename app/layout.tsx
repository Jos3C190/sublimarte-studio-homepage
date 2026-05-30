import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk, Barlow_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/components/providers/cart-provider'
import { AnnouncementBar } from '@/components/layout/announcement-bar'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp'
import { CartDrawer } from '@/components/ui/cart-drawer'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const _barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ["400", "600", "700", "900"], variable: "--font-barlow-condensed" });

export const metadata: Metadata = {
  title: 'Sublimarte Studio | Premium Streetwear Salvadoreño',
  description: 'Camisetas sublimadas personalizadas inspiradas en anime, música, deportes, películas y videojuegos. Diseños únicos de calidad premium.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-white">
      <body className={`${_spaceGrotesk.variable} ${_barlowCondensed.variable} font-sans antialiased bg-white text-black`}>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
          <CartDrawer />
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
