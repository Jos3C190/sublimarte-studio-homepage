import React from 'react'
import { Metadata } from 'next'
import { productsData } from '@/lib/products'
import { ProductListTemplate } from '@/components/catalog/product-list-template'

interface Params {
  theme: string
}

interface PageProps {
  params: Promise<Params>
}

// Generate static routes for the dynamic segments
export async function generateStaticParams() {
  const themes = ['anime', 'peliculas', 'videojuegos', 'deportes', 'artistas', 'series']
  return themes.map((theme) => ({
    theme,
  }))
}

function getThemeLabel(theme: string) {
  const mapping: Record<string, string> = {
    anime: 'Anime',
    peliculas: 'Películas',
    videojuegos: 'Videojuegos',
    deportes: 'Deportes',
    artistas: 'Música & Artistas',
    series: 'Series'
  }
  return mapping[theme.toLowerCase()] || theme
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const themeLabel = getThemeLabel(resolvedParams.theme)
  return {
    title: `Accesorios de ${themeLabel} | Streetwear El Salvador | Sublimarte Studio`,
    description: `Explora nuestra colección de accesorios premium inspirados en ${themeLabel} en El Salvador. Gorras, tote bags y stickers exclusivos.`,
    alternates: {
      canonical: `https://sublimarte.sv/accesorios/${resolvedParams.theme}`,
    },
  }
}

export default async function AccesoriosThemePage({ params }: PageProps) {
  const resolvedParams = await params
  const themeLabel = getThemeLabel(resolvedParams.theme)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://sublimarte.sv/accesorios/${resolvedParams.theme}/#webpage`,
        "url": `https://sublimarte.sv/accesorios/${resolvedParams.theme}`,
        "name": `Accesorios de ${themeLabel} | Streetwear El Salvador | Sublimarte Studio`,
        "description": `Explora nuestra colección de accesorios premium de alta calidad inspirados en ${themeLabel}.`
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://sublimarte.sv/accesorios/${resolvedParams.theme}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://sublimarte.sv"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Accesorios",
            "item": "https://sublimarte.sv/accesorios"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": themeLabel,
            "item": `https://sublimarte.sv/accesorios/${resolvedParams.theme}`
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductListTemplate
        initialProducts={productsData}
        title={`Accesorios de ${themeLabel}`}
        description={`Complementa tu outfit urbano con gorras, tote bags y stickers premium inspirados en ${themeLabel}.`}
        preselectedFilters={{ garmentType: 'accesorios', theme: resolvedParams.theme }}
        backLink={{ label: '← Catálogo General', href: '/catalogo' }}
      />
    </>
  )
}
