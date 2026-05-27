import { useInView } from '../hooks/useInView'
import { Monitor, Home, Library, Dumbbell, Bus, Laptop, Stethoscope, Music, FlaskConical } from 'lucide-react'

const facilities = [
  { icon: Monitor, title: 'Smart Classrooms', desc: 'Interactive boards and digital content making learning engaging and effective.' },
  { icon: FlaskConical, title: 'Science Labs', desc: 'Well-equipped physics, chemistry, and biology labs for hands-on experimentation.' },
  { icon: Home, title: 'Hostel Facility', desc: 'Well-structured hostel facility with safe and secure living for students.' },
  { icon: Library, title: 'Library & Reading Room', desc: '2000+ books, periodicals, and a quiet reading space nurturing the habit of reading.' },
  { icon: Dumbbell, title: 'Sports Ground', desc: 'Cricket, kabaddi, volleyball, athletics — a spacious playground for physical fitness.' },
  { icon: Bus, title: 'GPS Transport', desc: 'Safe school buses with GPS tracking covering 25+ villages in the surrounding area.' },
  { icon: Laptop, title: 'Computer Lab', desc: 'Modern computers with internet access ensuring digital literacy for every student.' },
  // { icon: Stethoscope, title: 'Medical Care', desc: 'First-aid facility, regular health check-ups, and tie-up with nearby hospital.' },
  { icon: Music, title: 'Arts & Music Room', desc: 'Dedicated space for dance, music, painting, and cultural expression.' },
]

export default function Facilities() {
  const [ref, isInView] = useInView()

  return (
    <section id="facilities" ref={ref} className="py-12 lg:py-16 bg-navy-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-gold-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Our Facilities
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            Modern Infrastructure for{' '}
            <span className="text-gold-500">Modern Learning</span>
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Every facility at KRR BrightMinds is designed to support academic growth,
            physical fitness, creativity, and the overall well-being of our students.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, i) => (
            <div
              key={facility.title}
              className={`group bg-white rounded-2xl p-6 shadow-sm border border-navy-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 bg-navy-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold-500 transition-colors duration-300">
                <facility.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-navy-800 text-lg mb-2">{facility.title}</h3>
              <p className="text-navy-500 text-sm leading-relaxed">{facility.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
