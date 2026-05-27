import { useInView } from '../hooks/useInView'
import { CircleCheck as CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const highlights = [
  'CBSE-affiliated school with modern teaching methods',
  'Dedicated and experienced faculty with personal attention',
  'Safe, secure campus with CCTV monitoring',
  'Holistic development — academics, sports, and values',
  'Affordable quality education for rural families',
  'NEP 2020-aligned learning approach',
]

export default function About() {
  const [ref, isInView] = useInView()

  return (
    <section id="about" ref={ref} className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className={`flex-1 ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-navy-100 to-gold-100 rounded-3xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-navy-900">
                <video
                  src="/video2.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/hero2.jpg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-navy-700 text-white rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-heading font-bold">15+</div>
                <div className="text-sm text-navy-200">Years Shaping Futures</div>
              </div>
            </div>
          </div>

          <div className={`flex-1 ${isInView ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <span className="inline-block text-gold-600 font-semibold text-sm tracking-wider uppercase mb-3">
              About Our School
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-6 leading-tight">
              Nurturing Young Minds in a{' '}
              <span className="text-gold-500">Caring Environment</span>
            </h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              Established in 2008, KRR BrightMinds School has been a beacon of quality
              education in rural Andhra Pradesh. We believe every child deserves access
              to world-class learning opportunities, regardless of their background.
            </p>
            <p className="text-navy-600 leading-relaxed mb-8">
              Our school combines the rigor of the CBSE curriculum with innovative
              teaching practices, ensuring that students are prepared not just for
              exams, but for life. With a safe campus, dedicated hostel facilities,
              and a focus on values, we provide the complete environment a child
              needs to thrive.
            </p>

            <div className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-navy-700 text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold transition-colors group"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
