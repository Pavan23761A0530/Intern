import { Phone, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaYoutube } from "react-icons/fa";
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Hostel Life', href: '/hostel' },
  { label: 'Transport', href: '/transport' },
  
  
  // { label: 'Academics', href: '/#academics' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Fee Structure', href: '/fee-structure' },
  // { label: 'Hostel Facility', href: '/#hostel' },
  // { label: 'Gallery', href: '/#gallery' },
  // { label: 'Achievements', href: '/#achievements' },
  // { label: 'Admissions', href: '/#admissions' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-15 h-15 white rounded-xl flex items-center justify-center group-hover:bg-navy-600 transition-colors">
              <img
                  src="/logo.png"
                  alt="KRR BrightMinds School Logo"
                  className="w-full h-auto object-contain aspect-[4/3]"
                />
            </div>
            <div className="leading-tight">
              <span className="font-heading font-bold text-white text-lg block">KRR BrightMinds</span>
              <span className="text-[10px] text-navy-500 tracking-wider uppercase">School of Excellence</span>
            </div>
          </Link>
            <p className="text-navy-400 text-sm leading-relaxed mb-5">
              Building bright futures through quality education since 2008.
              CBSE-affiliated school offering safe, modern, and value-based
              learning in rural Andhra Pradesh.
            </p>
            <div className="flex gap-3">
              {/* <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-all text-sm font-bold">
                f
              </a> */}
              <a
  href="https://www.instagram.com/krrbrightmindsschool"
  target="_blank"
  rel="noopener noreferrer"
  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-all"
>
  <FaInstagram className="text-lg" />
</a>

<a
  href="https://youtube.com/@krrgroupofinstitutions?si=w05OEihdV6qdke-Y"
  target="_blank"
  rel="noopener noreferrer"
  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-all"
>
  <FaYoutube className="text-lg" />
</a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('/#') ? (
                    <a href={link.href} className="text-navy-400 hover:text-gold-400 text-sm transition-colors">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-navy-400 hover:text-gold-400 text-sm transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-5">Academic Programs</h4>
            <ul className="space-y-2.5">
              {['Pre-Primary (Nursery–UKG)', 'Primary (Classes I–V)', 'Middle School (VI–VIII)', 'Secondary (IX–X)', 'Hostel Facility', 'Smart Learning', 'Sports & Activities'].map((item) => (
                <li key={item}>
                  <a href="/#academics" className="text-navy-400 hover:text-gold-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-navy-400 text-sm">KRR BrightMinds Campus, Near Town Center, District — Andhra Pradesh 515001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                <span className="text-navy-400 text-sm">+91 98765 43210 / +91 87654 32109</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                <span className="text-navy-400 text-sm">admissions@krrbrightminds.com</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <h5 className="font-semibold text-sm mb-1">Admission Enquiry</h5>
              <p className="text-navy-400 text-xs">Mon–Sat: 9:00 AM – 4:00 PM</p>
              <p className="text-navy-400 text-xs">Sunday: By Appointment Only</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-500 text-sm">
            &copy; 2025 KRR BrightMinds School. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-navy-500 hover:text-gold-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-navy-500 hover:text-gold-400 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}