import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { collectionsData, productsData } from '@/lib/products'
import { ProductListTemplate } from '@/components/catalog/product-list-template'

interface Props {
  params: Promise<{ slug: string; collection: string }>
}

export async function generateStaticParams() {
  return collectionsData.map((c) => ({
    slug: c.theme,
    collection: c.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, collection } = await params
  const collectionInfo = collectionsData.find(
    (c) => c.theme.toLowerCase() === slug.toLowerCase() && c.slug.toLowerCase() === collection.toLowerCase()
  )

  if (!collectionInfo) {
    return {}
  }

  const title = `Camisetas Premium de ${collectionInfo.name} — Colección Oficial | Sublimarte`
  const description = `Compra ropa streetwear y camisetas premium de ${collectionInfo.name} en El Salvador. Estampados de definición absoluta y algodón 100%.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://sublimarte.sv/colecciones/${slug}/${collection}`,
    },
    openGraph: {
      title,
      description,
      url: `https://sublimarte.sv/colecciones/${slug}/${collection}`,
      siteName: 'Sublimarte Studio',
      locale: 'es_SV',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function CollectionProductsPage({ params }: Props) {
  const { slug, collection } = await params

  const collectionInfo = collectionsData.find(
    (c) => c.theme.toLowerCase() === slug.toLowerCase() && c.slug.toLowerCase() === collection.toLowerCase()
  )

  if (!collectionInfo) {
    notFound()
  }

  // Filter products belonging to this theme & collection
  const filteredProducts = productsData.filter(
    (p) => p.theme.toLowerCase() === slug.toLowerCase() && p.collection.toLowerCase() === collection.toLowerCase()
  )

  // Construct schemas
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://sublimarte.sv/colecciones/${slug}/${collection}/#webpage`,
        "url": `https://sublimarte.sv/colecciones/${slug}/${collection}`,
        "name": collectionInfo.name,
        "description": collectionInfo.description
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://sublimarte.sv/colecciones/${slug}/${collection}/#breadcrumb`,
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
            "name": "Colecciones",
            "item": `https://sublimarte.sv/#collections`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": slug.charAt(0).toUpperCase() + slug.slice(1),
            "item": `https://sublimarte.sv/colecciones/${slug}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": collectionInfo.name,
            "item": `https://sublimarte.sv/colecciones/${slug}/${collection}`
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
        initialProducts={filteredProducts}
        title={`Colección ${collectionInfo.name}`}
        description={collectionInfo.description}
        hideThemeFilter={true}
        hideCollectionFilter={true}
        backLink={{ label: '← Catálogo General', href: '/catalogo' }}
        videoUrl={collectionInfo.videoUrl}
        videoRotate={collectionInfo.videoRotate}
      />
    </>
  )
}
