import { useInView } from '../hooks/useInView'
import { Calendar, ArrowRight } from 'lucide-react'

const news = [
  {
    date: 'May 15, 2025',
    title: 'Admissions Open for 2025-26 Academic Year',
    desc: 'Limited seats available for Classes Nursery to IX. Early registration discount for hostel students. Apply before June 30th.',
    tag: 'Admissions',
  },
  {
    date: 'Apr 22, 2025',
    title: 'Annual Day Celebration — A Grand Success',
    desc: 'Over 500 parents attended our Annual Day. Students showcased dance, drama, and science projects. Chief Guest: District Collector.',
    tag: 'Event',
  },
  {
    date: 'Mar 10, 2025',
    title: 'Class X Board Exam Preparation Intensified',
    desc: 'Special revision classes, mock tests, and mentorship sessions underway. Our students are confident and well-prepared.',
    tag: 'Academics',
  },
  {
    date: 'Feb 05, 2025',
    title: 'District Science Fair — 3 First Prizes',
    desc: 'Our students won 3 first prizes and 2 second prizes at the District Science Fair. Projects on water conservation and solar energy impressed judges.',
    tag: 'Achievement',
  },
]

export default function News() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-navy-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="inline-block text-gold-600 font-semibold text-sm tracking-wider uppercase mb-3">
              Latest Updates
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800">
              News & <span className="text-gold-500">Events</span>
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold transition-colors group">
            View All News
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item, i) => (
            <div
              key={item.title}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-navy-100/50 hover:shadow-md transition-all duration-300 ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="bg-navy-700 p-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-400" />
                <span className="text-white/80 text-sm">{item.date}</span>
              </div>
              <div className="p-5">
                <span className="inline-block text-xs font-semibold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full mb-3">
                  {item.tag}
                </span>
                <h3 className="font-heading font-semibold text-navy-800 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-navy-500 text-sm leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
