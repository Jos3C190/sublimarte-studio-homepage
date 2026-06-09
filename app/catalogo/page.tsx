import React from 'react'
import { Metadata } from 'next'
import { productsData } from '@/lib/products'
import { CatalogClient } from '@/components/catalog/catalog-client'

export const metadata: Metadata = {
  title: 'Catálogo de Ropa Streetwear Premium El Salvador — Camisetas & Hoodies | Sublimarte Studio',
  description: 'Explora nuestro catálogo de camisetas, hoodies y accesorios premium de alta densidad en El Salvador. Impresión inalterable con diseños urbanos exclusivos.',
  alternates: {
    canonical: 'https://sublimarte.sv/catalogo',
  },
  openGraph: {
    title: 'Catálogo de Ropa Streetwear Premium El Salvador — Camisetas & Hoodies | Sublimarte Studio',
    description: 'Explora nuestro catálogo de camisetas, hoodies y accesorios premium de alta densidad en El Salvador. Impresión inalterable con diseños urbanos exclusivos.',
    url: 'https://sublimarte.sv/catalogo',
    siteName: 'Sublimarte Studio',
    locale: 'es_SV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo de Ropa Streetwear Premium | Sublimarte Studio',
    description: 'Explora nuestro catálogo de camisetas, hoodies y accesorios premium de alta densidad en El Salvador.',
  },
}

export default async function CatalogPage() {
  // Construct schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://sublimarte.sv/catalogo/#webpage",
        "url": "https://sublimarte.sv/catalogo",
        "name": "Catálogo de Ropa Streetwear Premium | Sublimarte Studio",
        "description": "Explora nuestro catálogo completo de ropa urbana premium."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sublimarte.sv/catalogo/#breadcrumb",
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
            "name": "Catálogo",
            "item": "https://sublimarte.sv/catalogo"
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
      <CatalogClient initialProducts={productsData} />
    </>
  )
}
