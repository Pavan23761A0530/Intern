import { useInView } from '../hooks/useInView'
import { Baby, BookOpen, Beaker, Brain } from 'lucide-react'

const programs = [
  {
    icon: Baby,
    title: 'Pre-Primary (Nursery–UKG)',
    desc: 'Play-based, joyful learning with trained early childhood educators. Activity rooms, storytelling, and creative play that build a strong foundation.',
    color: 'bg-pink-50 text-pink-600',
    iconBg: 'bg-pink-100',
  },
  {
    icon: BookOpen,
    title: 'Primary (Classes I–V)',
    desc: 'Activity-based learning with CBSE curriculum. Focus on reading, writing, numeracy, and discovery. Smart classroom support for every lesson.',
    color: 'bg-blue-50 text-blue-600',
    iconBg: 'bg-blue-100',
  },
  {
    icon: Beaker,
    title: 'Middle School (Classes VI–VIII)',
    desc: 'Concept-driven learning with hands-on science labs, projects, and field visits. Building critical thinking and academic confidence.',
    color: 'bg-emerald-50 text-emerald-600',
    iconBg: 'bg-emerald-100',
  },
  {
    icon: Brain,
    title: 'Secondary (Classes IX–X)',
    desc: 'Board exam preparation with structured study plans, remedial classes, and mentorship. Proven track record of excellent CBSE results.',
    color: 'bg-amber-50 text-amber-600',
    iconBg: 'bg-amber-100',
  },
]

export default function Academics() {
  const [ref, isInView] = useInView()

  return (
    <section id="academics" ref={ref} className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-gold-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Academic Programs
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            Comprehensive <span className="text-gold-500">CBSE Curriculum</span>
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            From nursery to Class X, our programs are designed to develop confident,
            knowledgeable, and value-driven students ready for the future.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, i) => (
            <div
              key={program.title}
              className={`group rounded-2xl overflow-hidden shadow-sm border border-navy-100/50 hover:shadow-lg transition-all duration-300 ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`${program.color} p-6`}>
                <div className={`w-14 h-14 ${program.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <program.icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{program.title}</h3>
              </div>
              <div className="bg-white p-6">
                <p className="text-navy-600 text-sm leading-relaxed">{program.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-navy-50 to-gold-50 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="font-heading font-bold text-navy-800 text-xl mb-2">
              Aligned with NEP 2020
            </h3>
            <p className="text-navy-600 text-sm leading-relaxed">
              Our academic approach follows the National Education Policy 2020 framework,
              emphasizing experiential learning, critical thinking, and multidisciplinary
              education to prepare students for 21st-century challenges.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="tel:08823-258055"
              className="inline-flex items-center px-6 py-3 bg-navy-700 hover:bg-navy-800 text-white font-semibold rounded-xl transition-colors shadow-md"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
