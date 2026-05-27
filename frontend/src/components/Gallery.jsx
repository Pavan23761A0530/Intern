import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  { src: '/class room.png', alt: 'Students in classroom', category: 'Academics' },
  { src: '/campus view.jpg', alt: 'School campus view', category: 'Campus' },
  { src: '/library.png', alt: 'School library and reading room', category: 'Academics' },
  { src: '/cultural events.jpg', alt: 'Cultural activities', category: 'Activities' },
  { src: '/sports.png', alt: 'Sports day celebration', category: 'Sports' },
  { src: '/science labs.png', alt: 'Science lab session', category: 'Academics' },
]

export default function Gallery() {
  const [ref, isInView] = useInView()
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = (i) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const prev = () => setLightbox((lightbox - 1 + images.length) % images.length)
  const next = () => setLightbox((lightbox + 1) % images.length)

  return (
    <section id="gallery" ref={ref} className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-gold-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Campus Gallery
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            A Glimpse of <span className="text-gold-500">Life at KRR</span>
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            From classrooms to playgrounds — see the vibrant spaces where your child will learn, grow, and thrive.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <span className="text-gold-400 text-xs font-semibold uppercase">{img.category}</span>
                  <p className="text-white text-sm font-medium">{img.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in" onClick={closeLightbox}>
          <button className="absolute top-4 right-4 p-2 text-white/80 hover:text-white" onClick={closeLightbox}>
            <X className="w-8 h-8" />
          </button>
          <button className="absolute left-4 p-2 text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); prev() }}>
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button className="absolute right-4 p-2 text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); next() }}>
            <ChevronRight className="w-10 h-10" />
          </button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
