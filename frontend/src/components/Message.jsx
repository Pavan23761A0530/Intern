import { useInView } from '../hooks/useInView'
import { Quote, Award, Heart, Shield } from 'lucide-react'

export default function Message() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-navy-50 rounded-full -z-10 blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-gold-50 rounded-full -z-10 blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Image & Stats Side */}
          <div className={`lg:col-span-5 relative ${isInView ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative z-10">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="logo.png"
                  alt="Chairman"
                  className="w-full h-auto bg-navy-900 aspect-[4/5] object-contain p-12"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gold-500 text-navy-900 p-6 rounded-3xl shadow-xl animate-bounce-slow">
                <Award className="w-10 h-10 mb-2" />
                <div className="font-heading font-black text-2xl leading-tight">15+</div>
                <div className="text-xs font-bold uppercase tracking-tighter">Years of Legacy</div>
              </div>
            </div>

            {/* Decorative background shapes */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-navy-900/5 rounded-3xl -rotate-12 -z-10"></div>
            <div className="absolute top-1/2 -left-4 w-24 h-24 border-4 border-gold-200 rounded-full -z-10"></div>
          </div>

          {/* Content Side */}
          <div className={`lg:col-span-7 ${isInView ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-50 text-navy-700 rounded-full mb-6">
              <div className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold uppercase tracking-wider">Leadership Message</span>
            </div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-navy-900 mb-8 leading-tight">
              A Vision for <span className="text-gold-600 italic">Rural Excellence</span>
            </h2>

            <div className="relative">
              <Quote className="absolute -top-10 -left-6 w-20 h-20 text-navy-50 -z-10" />
              
              <div className="space-y-6 text-lg text-navy-700 leading-relaxed">
                <p className="font-medium">
                  "When we founded KRR BrightMinds in 2008, we had one dream — to bring
                  world-class education to the children of rural Andhra Pradesh."
                </p>
                <p>
                  Every child in this region deserves the same opportunities as those in the cities, 
                  and that belief drives everything we do. Our school is built on the pillars of 
                  safety, discipline, academic rigor, and love.
                </p>
                <p>
                  We do not just teach subjects; we shape character. We do not just
                  prepare students for exams; we prepare them for life. I invite every parent
                  to visit our campus and see for themselves the difference we make.
                </p>
              </div>
            </div>

            {/* Signature Area */}
            <div className="mt-12 pt-8 border-t border-navy-100 flex items-center justify-between">
              <div>
                <div className="font-heading font-black text-2xl text-navy-900 mb-1">Sri. K. Rama Rao</div>
                <div className="text-navy-500 font-medium">Founder & Chairman</div>
              </div>
              <div className="flex gap-4">
                <div className="group flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-navy-50 rounded-2xl flex items-center justify-center group-hover:bg-navy-900 group-hover:text-white transition-all duration-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-navy-400 uppercase">Integrity</span>
                </div>
                <div className="group flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-navy-50 rounded-2xl flex items-center justify-center group-hover:bg-navy-900 group-hover:text-white transition-all duration-300">
                    <Heart className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-navy-400 uppercase">Care</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}