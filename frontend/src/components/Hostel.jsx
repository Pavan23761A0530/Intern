import { useInView } from '../hooks/useInView'
import { ShieldCheck, BedDouble, UtensilsCrossed, Clock, Users, Wifi, Phone, Heart } from 'lucide-react'

const features = [
  { icon: BedDouble, title: 'Comfortable Rooms', desc: 'Clean, ventilated rooms with proper bedding, storage, and personal space for each child.' },
  { icon: ShieldCheck, title: 'CCTV & Wardens', desc: '24/7 CCTV monitoring and caring wardens who treat every child like their own.' },
  { icon: UtensilsCrossed, title: 'Hygienic Meals', desc: 'Nutritious, home-style vegetarian meals prepared in a clean kitchen with balanced nutrition.' },
  { icon: Clock, title: 'Guided Study Hours', desc: 'Supervised evening study sessions with teacher support to ensure academic progress.' },
  { icon: Users, title: 'Separate Wings', desc: 'Separate hostel buildings for boys and girls with dedicated wardens and safety protocols.' },
  { icon: Wifi, title: 'Parent Updates', desc: 'Regular updates to parents via phone, WhatsApp, and parent-teacher meetings.' },
  { icon: Phone, title: 'Emergency Contact', desc: 'Immediate parent contact system for any situation — health, academics, or personal.' },
  { icon: Heart, title: 'Caring Environment', desc: 'A home away from home with celebrations, cultural events, and emotional support.' },
]

export default function Hostel() {
  const [ref, isInView] = useInView()

  return (
    <section id="hostel" ref={ref} className="py-12 lg:py-16 bg-gradient-to-b from-navy-800 to-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className={`flex-1 ${isInView ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <span className="inline-block text-gold-400 font-semibold text-sm tracking-wider uppercase mb-3">
              Hostel Facility
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              A Safe Home <span className="text-gold-400">Away From Home</span>
            </h2>
            <p className="text-navy-200 leading-relaxed mb-4">
              Our hostel is more than just a place to stay — it's a nurturing environment
              where children feel safe, cared for, and supported in every way. We understand
              the trust parents place in us, and we take that responsibility seriously.
            </p>
            <p className="text-navy-200 leading-relaxed mb-8">
              With trained wardens, hygienic meals, supervised study hours, and a
              parent-friendly communication system, we ensure that your child's well-being
              is always our top priority.
            </p>

            <div className="flex flex-wrap gap-3">
              {['CCTV Monitored', 'Separate Wings', 'Nutritious Food', 'Study Hours', 'Medical Care', '24/7 Security'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={`flex-1 max-w-lg ${isInView ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
              <img
                src="https://images.pexels.com/photos/6164048/pexels-photo-6164048.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="KRR BrightMinds hostel facility"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300 ${
                isInView ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(i + 2) * 80}ms` }}
            >
              <div className="w-10 h-10 bg-gold-500/20 rounded-lg flex items-center justify-center mb-3">
                <feature.icon className="w-5 h-5 text-gold-400" />
              </div>
              <h4 className="font-heading font-semibold text-white mb-1.5">{feature.title}</h4>
              <p className="text-navy-300 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gold-500/10 border border-gold-500/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-heading font-bold text-gold-400 text-xl mb-2">
              Worried About Your Child's Safety?
            </h3>
            <p className="text-navy-200 text-sm">
              Visit our campus and see firsthand how we care for every child like family.
              Our wardens, security, and parent communication systems are designed to give
              you complete peace of mind.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition-colors shadow-md"
          >
            Schedule a Visit
          </a>
        </div>
      </div>
    </section>
  )
}
