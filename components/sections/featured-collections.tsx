'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export function FeaturedCollections() {
  const collectionImages = [
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZlNTM3bXl4Mjdzemk5aXA1c2Zmb3Nnb3BsYXd3b3RoeG1idDJlbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jzHFPlw89eTqU/giphy.gif', // Anime
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmxoMXpvc2Q2ZW13eG1vZ2V6aGIzbmg2MnI1ODQxc3VqaW95N3NvdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ixabsauEfriKCqgtgw/giphy.gif', // Artistas
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXZqZjM2b3U2Nno3aGQ5Z2Nubzh4ZTd2Y240Ym92aGgxaGJpcWswdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LDbiy8jVbDb7dgKtZp/giphy.gif', // Deportes
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjgydmI2aW9scTZvcW1xejRsbHB6azJpemRneGg4MzhuMnRxZnJxdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vFtGDTXTNr4Z3uG4St/giphy.gif', // Series
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTg2ZmxyZGJrMjdsZWhvNW0yZm5jcnpvZnVjNG92a2tyZHk4djI5bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GkCcRey2Hq5NVH8sfM/giphy.gif', // Películas
    'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmpxOTFuN2IzcDQ1M3J2eXU4OW1pdWQwNXRlaG1udG03azV4emJjbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SFPQxFOlyN9NBQ5oh6/giphy.gif'  // Videojuegos
  ]

  const collections = [
    { name: 'Anime', slug: 'anime' },
    { name: 'Artistas', slug: 'artistas' },
    { name: 'Deportes', slug: 'deportes' },
    { name: 'Series', slug: 'series' },
    { name: 'Películas', slug: 'peliculas' },
    { name: 'Videojuegos', slug: 'videojuegos' }
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <section id="collections" className="bg-white py-12 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12 md:mb-20 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-widest text-[#888888] font-semibold mb-4">Colecciones</p>
          <h2
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
            style={{ fontFamily: 'var(--font-barlow-condensed)' }}
          >
            Explora tu estilo
          </h2>
        </motion.div>

        {/* COLLECTION GRID */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {collections.map((collection, idx) => (
            <Link key={collection.slug} href={`/colecciones/${collection.slug}`}>
              <motion.div
                variants={fadeInUp}
                className="estilo-card relative aspect-[2.4/1] md:aspect-[3/4] overflow-hidden group rounded-2xl border border-neutral-100 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 bg-black"
              >
                {/* Background Image / GIF Container */}
                <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ borderRadius: 'inherit' }}>
                  <img
                    src={collectionImages[idx]}
                    alt={collection.name}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    style={{ borderRadius: 'inherit' }}
                    loading="lazy"
                  />
                </div>

                {/* Premium Gradient Overlay to secure legibility of GIFs and backgrounds */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 group-hover:via-black/45 transition-colors duration-300" />

                {/* Card Content Layer */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6 z-10 text-left">
                  {/* Top Metadata Row */}
                  <div className="flex justify-end items-start opacity-80 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronRight className="text-white w-4 h-4 md:w-5 md:h-5 transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300" />
                  </div>

                  {/* Bottom Category Info Row */}
                  <div className="mt-auto flex flex-col gap-1">
                    <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-white/50 uppercase font-black leading-none">
                      Colección
                    </span>
                    <h3 className="text-xl md:text-3xl font-black uppercase text-white tracking-tighter leading-none group-hover:text-[#FFDE00] transition-colors duration-300">
                      {collection.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
