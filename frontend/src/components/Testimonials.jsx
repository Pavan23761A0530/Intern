import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Smt. Lakshmi Devi',
    role: 'Parent of Ravi (Class VIII)',
    text: 'My son has grown so much since joining KRR BrightMinds. The teachers truly care about each child. The hostel facilities gave me complete peace of mind — he is safe, well-fed, and studying well. I could not ask for more.',
  },
  {
    name: 'Sri. Ramakrishna Rao',
    role: 'Parent of Priya (Class X)',
    text: 'The discipline and values my daughter has learned here are remarkable. The school maintains excellent communication with parents. The guided study hours in the hostel have made a huge difference in her board exam preparation.',
  },
  {
    name: 'Smt. Padmavathi',
    role: 'Parent of Arjun (Class V)',
    text: 'As a mother from a nearby village, I was worried about sending my child to a school with hostel. But KRR BrightMinds proved me wrong. The wardens treat the children like their own. My son loves going to school every day.',
  },
  {
    name: 'Sri. Venkateshwara Reddy',
    role: 'Parent of Meena (Class IX)',
    text: 'The smart classrooms and experienced teachers have transformed how my daughter learns. She is confident, curious, and excelling in science. The affordable fees make quality education accessible for families like ours.',
  },
]

export default function Testimonials() {
  const [ref, isInView] = useInView()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((current + 1) % testimonials.length)

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-navy-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-gold-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Parent Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            Trusted by <span className="text-gold-500">Hundreds of Parents</span>
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Hear from the parents who have trusted us with their children's future.
          </p>
        </div>

        <div className={`max-w-3xl mx-auto ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-navy-100/50 relative">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-gold-200" />

            <div className="relative z-10">
              <p className="text-navy-700 text-lg sm:text-xl leading-relaxed mb-8 italic min-h-[120px]">
                "{testimonials[current].text}"
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-heading font-bold text-navy-800 text-lg">
                    {testimonials[current].name}
                  </div>
                  <div className="text-navy-500 text-sm">{testimonials[current].role}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="p-2 rounded-lg hover:bg-navy-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-navy-600" />
                  </button>
                  <button
                    onClick={next}
                    className="p-2 rounded-lg hover:bg-navy-50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-navy-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-gold-500 w-8' : 'bg-navy-200 hover:bg-navy-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
