import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function AdmissionsCTA() {
  return (
    <section id="admissions" className="py-12 lg:py-16 bg-gradient-to-b from-navy-800 via-navy-700 to-navy-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 20.5V18H0v-2h20v-2l2 3-2 3z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
      }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-gold-400 font-semibold text-sm tracking-wider uppercase mb-3">
          Admissions 2025-26
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold mb-6 leading-tight">
          Give Your Child the{' '}
          <span className="text-gold-400">Bright Future</span>{' '}
          They Deserve
        </h2>
        <p className="text-navy-200 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Admissions are now open for the 2025-26 academic year. Secure your child's seat
          at a school that combines academic excellence with values, safety, and love.
          Limited seats available — apply today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-gold-500/20 text-lg"
          >
            Apply for Admission
          </Link>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all hover:scale-105 text-lg">
            Contact Admission Office
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
            <Phone className="w-5 h-5 text-gold-400 shrink-0" />
            <div className="text-left">
              <div className="text-xs text-navy-300">Call Us</div>
              <div className="text-sm font-medium">+91 98765 43210</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
            <Mail className="w-5 h-5 text-gold-400 shrink-0" />
            <div className="text-left">
              <div className="text-xs text-navy-300">Email</div>
              <div className="text-sm font-medium">admissions@krrbrightminds.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
            <MapPin className="w-5 h-5 text-gold-400 shrink-0" />
            <div className="text-left">
              <div className="text-xs text-navy-300">Visit</div>
              <div className="text-sm font-medium">KRR Campus, Andhra Pradesh</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
            <Clock className="w-5 h-5 text-gold-400 shrink-0" />
            <div className="text-left">
              <div className="text-xs text-navy-300">Office Hours</div>
              <div className="text-sm font-medium">Mon–Sat: 9 AM – 4 PM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
