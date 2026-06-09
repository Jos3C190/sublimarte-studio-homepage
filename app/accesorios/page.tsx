import React from 'react'
import { Metadata } from 'next'
import { productsData } from '@/lib/products'
import { ProductListTemplate } from '@/components/catalog/product-list-template'

export const metadata: Metadata = {
  title: 'Accesorios Streetwear Premium El Salvador | Sublimarte Studio',
  description: 'Completa tu estilo con gorras, tote bags y stickers exclusivos diseñados para combinar con tus prendas urbanas favoritas.',
  alternates: {
    canonical: 'https://sublimarte.sv/accesorios',
  },
  openGraph: {
    title: 'Accesorios Streetwear Premium El Salvador | Sublimarte Studio',
    description: 'Completa tu estilo con gorras, tote bags y stickers exclusivos diseñados para combinar con tus prendas urbanas favoritas.',
    url: 'https://sublimarte.sv/accesorios',
    siteName: 'Sublimarte Studio',
    locale: 'es_SV',
    type: 'website',
  },
}

export default async function AccesoriosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://sublimarte.sv/accesorios/#webpage",
        "url": "https://sublimarte.sv/accesorios",
        "name": "Accesorios Streetwear Premium El Salvador | Sublimarte Studio",
        "description": "Completa tu estilo con gorras, tote bags y stickers exclusivos diseñados para combinar con tus prendas urbanas favoritas."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sublimarte.sv/accesorios/#breadcrumb",
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
        title="Accesorios Streetwear"
        description="Completa tu estilo con gorras, tote bags y stickers exclusivos diseñados para combinar con tus prendas favoritas."
        preselectedFilters={{ garmentType: 'accesorios' }}
        backLink={{ label: '← Catálogo General', href: '/catalogo' }}
      />
    </>
  )
}
