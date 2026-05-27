import { useInView } from '../hooks/useInView'
import { Trophy, Medal, Star, Award, TrendingUp } from 'lucide-react'

const achievements = [
  {
    icon: Trophy,
    title: '100% CBSE Board Results',
    desc: 'Consistently achieving 100% pass rate in Class X CBSE board examinations since 2015.',
  },
  {
    icon: Medal,
    title: 'District Level Sports Champions',
    desc: 'Our students have won 30+ medals in district-level kabaddi, athletics, and cricket competitions.',
  },
  {
    icon: Star,
    title: 'Science Olympiad Winners',
    desc: 'Multiple students qualified for state and national level Science and Math Olympiads.',
  },
  {
    icon: Award,
    title: 'Best School Award 2023',
    desc: 'Recognized by the District Education Office for excellence in holistic education and infrastructure.',
  },
  {
    icon: TrendingUp,
    title: 'Alumni in Top Institutions',
    desc: 'Our graduates have gone on to study at IITs, NITs, AIIMS, and other prestigious institutions.',
  },
]

export default function Achievements() {
  const [ref, isInView] = useInView()

  return (
    <section id="achievements" ref={ref} className="py-12 lg:py-16 bg-gradient-to-b from-gold-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-gold-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Our Achievements
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
            A Legacy of <span className="text-gold-500">Excellence</span>
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Our achievements reflect the hard work of our students, the dedication of our
            teachers, and the trust of our parents.
          </p>
        </div>

        <div className="space-y-5">
          {achievements.map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white rounded-2xl p-6 shadow-sm border border-navy-100/50 hover:shadow-md transition-all duration-300 ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="shrink-0 w-14 h-14 bg-gold-100 rounded-xl flex items-center justify-center">
                <item.icon className="w-7 h-7 text-gold-600" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-navy-800 text-lg mb-1">{item.title}</h3>
                <p className="text-navy-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
