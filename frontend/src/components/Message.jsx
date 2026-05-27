import { useInView } from '../hooks/useInView'
import { Quote } from 'lucide-react'

export default function Message() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-gold-600 font-semibold text-sm tracking-wider uppercase mb-3">
            From the Chairman
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            A Message from Our <span className="text-gold-500">Chairman</span>
          </h2>
        </div>

        <div className={`max-w-4xl mx-auto ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row gap-8 items-start bg-gradient-to-br from-navy-50 to-gold-50 rounded-2xl p-8 sm:p-10 shadow-sm border border-navy-100/50">
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="logo.png"
                  alt="Chairman"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <Quote className="w-8 h-8 text-gold-300 mb-4" />
              <p className="text-navy-700 leading-relaxed mb-4">
                When we founded KRR BrightMinds in 2008, we had one dream — to bring
                world-class education to the children of rural Andhra Pradesh. Every child
                in this region deserves the same opportunities as those in the cities, and
                that belief drives everything we do.
              </p>
              <p className="text-navy-700 leading-relaxed mb-6">
                Our school is built on the pillars of safety, discipline, academic rigor,
                and love. We do not just teach subjects; we shape character. We do not just
                prepare students for exams; we prepare them for life. I invite every parent
                to visit our campus, meet our teachers, and see for themselves the
                difference we make.
              </p>
              <div className="border-t border-navy-200 pt-4">
                <div className="font-heading font-bold text-navy-800">Sri. K. Rama Rao</div>
                <div className="text-navy-500 text-sm">Founder & Chairman, KRR BrightMinds School</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
