import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  productsDetailData,
  getProductBySlug,
  FIT_PRICES,
  AVAILABLE_COLORS,
} from '@/lib/products'
import { ProductDetailClient } from './components/product-detail-client'
import { ProductReviews } from './components/product-reviews'
import { RelatedProducts } from './components/related-products'

interface Props {
  params: Promise<{ slug: string }>
}

/** Pre-render all product pages at build time for optimal LCP/INP */
export async function generateStaticParams() {
  return productsDetailData.map((product) => ({
    slug: product.slug,
  }))
}

/** Dynamic SEO metadata per product — title, description, OG, Twitter */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {}
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: [
      product.name.toLowerCase(),
      `camiseta ${product.category.toLowerCase()}`,
      'streetwear el salvador',
      'sublimacion premium',
      'sublimarte studio',
    ],
    alternates: {
      canonical: `https://sublimarte.sv/producto/${product.slug}`,
    },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: `https://sublimarte.sv/producto/${product.slug}`,
      siteName: 'Sublimarte Studio',
      locale: 'es_SV',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seoTitle,
      description: product.seoDescription,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Build JSON-LD structured data
  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : undefined

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://sublimarte.sv/producto/${product.slug}/#product`,
        "name": product.name,
        "description": product.description,
        "image": `https://sublimarte.sv/Featured/${product.slug}.webp`,
        "brand": {
          "@type": "Brand",
          "name": "Sublimarte Studio"
        },
        "category": product.category,
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": FIT_PRICES.Slim.toFixed(2),
          "highPrice": FIT_PRICES.Oversize.toFixed(2),
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Sublimarte Studio"
          },
          "offerCount": AVAILABLE_COLORS.length * 5 * 3, // colors × sizes × fits
        },
        ...(avgRating !== undefined && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": avgRating.toFixed(1),
            "reviewCount": product.reviews.length,
            "bestRating": "5",
            "worstRating": "1"
          }
        }),
        ...(product.reviews.length > 0 && {
          "review": product.reviews.map(r => ({
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": r.author,
            },
            "datePublished": r.date,
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": r.rating.toString(),
              "bestRating": "5",
              "worstRating": "1",
            },
            "reviewBody": r.comment,
          }))
        }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://sublimarte.sv/producto/${product.slug}/#breadcrumb`,
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
            "name": product.category,
            "item": `https://sublimarte.sv/colecciones/${product.category.toLowerCase()}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.name,
            "item": `https://sublimarte.sv/producto/${product.slug}`
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

      {/* Main PDP — client-side variant management */}
      <ProductDetailClient product={product} />

      {/* Reviews section — server-rendered for SEO */}
      <ProductReviews
        reviews={product.reviews}
        productName={product.name}
      />

      {/* Related products — server-rendered for SEO */}
      <RelatedProducts
        productIds={product.relatedProductIds}
        currentProductId={product.id}
      />

    </>
  )
}
