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
    title: `Camisetas de ${themeLabel} | Streetwear El Salvador | Sublimarte Studio`,
    description: `Explora nuestra colección de camisetas premium inspiradas en ${themeLabel} en El Salvador. Impresión ultra premium 100% algodón.`,
    alternates: {
      canonical: `https://sublimarte.sv/camisetas/${resolvedParams.theme}`,
    },
  }
}

export default async function CamisetasThemePage({ params }: PageProps) {
  const resolvedParams = await params
  const themeLabel = getThemeLabel(resolvedParams.theme)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://sublimarte.sv/camisetas/${resolvedParams.theme}/#webpage`,
        "url": `https://sublimarte.sv/camisetas/${resolvedParams.theme}`,
        "name": `Camisetas de ${themeLabel} | Streetwear El Salvador | Sublimarte Studio`,
        "description": `Explora nuestra colección de camisetas premium de alta calidad inspiradas en ${themeLabel}.`
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://sublimarte.sv/camisetas/${resolvedParams.theme}/#breadcrumb`,
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
            "name": "Camisetas",
            "item": "https://sublimarte.sv/camisetas"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": themeLabel,
            "item": `https://sublimarte.sv/camisetas/${resolvedParams.theme}`
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
        title={`Camisetas de ${themeLabel}`}
        description={`Diseños urbanos exclusivos de la cultura pop y streetwear sobre ${themeLabel}. Confeccionadas con algodón premium.`}
        preselectedFilters={{ garmentType: 'camisetas', theme: resolvedParams.theme }}
        backLink={{ label: '← Catálogo General', href: '/catalogo' }}
      />
    </>
  )
}
