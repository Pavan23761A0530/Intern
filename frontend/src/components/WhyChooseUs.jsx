import { useInView } from '../hooks/useInView'
import { ShieldCheck, UserCheck, GraduationCap, Heart, BookOpen, Bus, Palette, Lightbulb } from 'lucide-react'

const reasons = [
  {
    icon: GraduationCap,
    title: 'Experienced Faculty',
    desc: '65+ qualified teachers with proven track record of academic excellence and personal mentoring.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Secure Campus',
    desc: 'CCTV-monitored campus with trained security staff ensuring complete safety for every child.',
  },
  {
    icon: UserCheck,
    title: 'Individual Attention',
    desc: 'Small class sizes with a 1:25 teacher-student ratio ensuring every child gets noticed.',
  },
  {
    icon: Heart,
    title: 'Affordable Quality',
    desc: 'World-class education at fees designed for rural families — because every child deserves the best.',
  },
  {
    icon: BookOpen,
    title: 'Smart Classrooms',
    desc: 'Digital learning with smart boards, projectors, and audio-visual aids for engaging lessons.',
  },
  {
    icon: Bus,
    title: 'GPS-Enabled Transport',
    desc: 'Safe bus fleet with GPS tracking so parents always know their child is secure on the way.',
  },
  {
    icon: Palette,
    title: 'Sports & Cultural Activities',
    desc: 'Cricket, kabaddi, dance, music, art — holistic development beyond the classroom.',
  },
  {
    icon: Lightbulb,
    title: 'Value Education',
    desc: 'Moral and ethical education building responsible, compassionate citizens of tomorrow.',
  },
]

export default function WhyChooseUs() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-navy-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-gold-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Why Parents Choose Us
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            What Makes Us the <span className="text-gold-500">Right Choice</span>
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Every feature of our school is designed around what parents care about most
            — safety, learning quality, and the well-being of their children.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-navy-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center mb-4">
                <reason.icon className="w-6 h-6 text-navy-600" />
              </div>
              <h3 className="font-heading font-semibold text-navy-800 text-lg mb-2">{reason.title}</h3>
              <p className="text-navy-500 text-sm leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
