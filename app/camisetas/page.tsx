import React from 'react'
import { Metadata } from 'next'
import { productsData } from '@/lib/products'
import { ProductListTemplate } from '@/components/catalog/product-list-template'

export const metadata: Metadata = {
  title: 'Camisetas Premium Streetwear El Salvador | Sublimarte Studio',
  description: 'Explora nuestra colección de camisetas de algodón 100% de alta densidad con estampados de definición urbana ultra duraderos.',
  alternates: {
    canonical: 'https://sublimarte.sv/camisetas',
  },
  openGraph: {
    title: 'Camisetas Premium Streetwear El Salvador | Sublimarte Studio',
    description: 'Explora nuestra colección de camisetas de algodón 100% de alta densidad con estampados de definición urbana ultra duraderos.',
    url: 'https://sublimarte.sv/camisetas',
    siteName: 'Sublimarte Studio',
    locale: 'es_SV',
    type: 'website',
  },
}

export default async function CamisetasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://sublimarte.sv/camisetas/#webpage",
        "url": "https://sublimarte.sv/camisetas",
        "name": "Camisetas Premium Streetwear El Salvador | Sublimarte Studio",
        "description": "Explora nuestra colección de camisetas de algodón 100% de alta densidad con estampados de definición urbana ultra duraderos."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sublimarte.sv/camisetas/#breadcrumb",
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
        title="Camisetas Premium"
        description="Explora nuestra colección de camisetas de algodón 100% de alta densidad con estampados de definición urbana ultra duraderos."
        preselectedFilters={{ garmentType: 'camisetas' }}
        backLink={{ label: '← Catálogo General', href: '/catalogo' }}
      />
    </>
  )
}
