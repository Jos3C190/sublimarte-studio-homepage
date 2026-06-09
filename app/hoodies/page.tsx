import React from 'react'
import { Metadata } from 'next'
import { productsData } from '@/lib/products'
import { ProductListTemplate } from '@/components/catalog/product-list-template'

export const metadata: Metadata = {
  title: 'Hoodies & Sudaderas Streetwear El Salvador | Sublimarte Studio',
  description: 'Confeccionados con felpa de algodón de alto gramaje para darte abrigo sin sacrificar tu estilo streetwear urbano en El Salvador.',
  alternates: {
    canonical: 'https://sublimarte.sv/hoodies',
  },
  openGraph: {
    title: 'Hoodies & Sudaderas Streetwear El Salvador | Sublimarte Studio',
    description: 'Confeccionados con felpa de algodón de alto gramaje para darte abrigo sin sacrificar tu estilo streetwear urbano en El Salvador.',
    url: 'https://sublimarte.sv/hoodies',
    siteName: 'Sublimarte Studio',
    locale: 'es_SV',
    type: 'website',
  },
}

export default async function HoodiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://sublimarte.sv/hoodies/#webpage",
        "url": "https://sublimarte.sv/hoodies",
        "name": "Hoodies & Sudaderas Streetwear El Salvador | Sublimarte Studio",
        "description": "Confeccionados con felpa de algodón de alto gramaje para darte abrigo sin sacrificar tu estilo streetwear urbano en El Salvador."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sublimarte.sv/hoodies/#breadcrumb",
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
            "name": "Hoodies",
            "item": "https://sublimarte.sv/hoodies"
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
        title="Hoodies & Sudaderas"
        description="Confeccionados con felpa de algodón de alto gramaje para darte abrigo sin sacrificar tu estilo streetwear."
        preselectedFilters={{ garmentType: 'hoodies' }}
        backLink={{ label: '← Catálogo General', href: '/catalogo' }}
      />
    </>
  )
}
