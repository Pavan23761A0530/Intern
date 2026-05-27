import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

const stats = [
  { value: 1200, suffix: '+', label: 'Students Enrolled' },
  { value: 65, suffix: '+', label: 'Expert Faculty' },
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 98, suffix: '%', label: 'Parent Satisfaction' },
]

function StatItem({ value, suffix, label, start }) {
  const count = useCountUp(value, 2000, start)
  return (
    <div className="text-center p-6">
      <div className="text-4xl sm:text-5xl font-heading font-bold text-navy-700 animate-count-up">
        {count}{suffix}
      </div>
      <div className="mt-2 text-navy-500 font-medium text-sm sm:text-base">{label}</div>
    </div>
  )
}

export default function Stats() {
  const [ref, isInView] = useInView()

  return (
    <section ref={ref} className="py-12 bg-white -mt-12 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-navy-100/50 grid grid-cols-2 md:grid-cols-4 divide-x divide-navy-100">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} start={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
