import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Monitor, 
  Library, 
  Dumbbell, 
  Bus, 
  Home, 
  Laptop, 
  Stethoscope, 
  ShieldCheck, 
  UserCheck, 
  HeartPulse, 
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Coffee,
  Shield,
  Clock,
  FlaskConical
} from 'lucide-react'

const FacilitiesPage = () => {
  return (
    <div className="min-h-screen bg-white font-body text-navy-800">

      {/* Hero / Banner Section */}
      <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/hero1.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-navy-900/75 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* <nav className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
            <Link to="/" className="text-navy-200 hover:text-gold-400 transition-colors text-sm flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-navy-400" />
            <span className="text-gold-400 text-sm font-medium">Facilities</span>
          </nav> */}

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up leading-tight">
            World-Class Facilities for <br />
            <span className="text-gold-400">Better Learning</span>
          </h1>
          <p className="max-w-3xl mx-auto text-navy-100 text-lg md:text-xl leading-relaxed animate-fade-in-up animation-delay-200">
            Providing students with a safe, modern, comfortable, and technology-enabled learning environment.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 animate-slide-in-left">
              <div className="relative group">
                <div className="absolute -inset-4 bg-navy-50 rounded-[2.5rem] group-hover:bg-gold-50 transition-colors duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/hero2.jpg" 
                    alt="KRR BrightMinds Campus Facilities" 
                    className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {/* Decorative badge */}
                <div className="absolute -bottom-6 -right-6 bg-gold-500 text-navy-900 px-6 py-4 rounded-2xl shadow-xl animate-bounce-slow">
                  <Sparkles className="w-6 h-6 mb-1" />
                  <span className="font-bold text-sm block">Modern Infrastructure</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 animate-slide-in-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-50 text-navy-700 rounded-full mb-6">
                <ShieldCheck className="w-5 h-5 text-gold-600" />
                <span className="text-sm font-bold uppercase tracking-wider">Premium Learning Environment</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-6 leading-tight">
                Empowering Students through <br />
                <span className="text-gold-600">Advanced Infrastructure</span>
              </h2>
              <p className="text-navy-600 leading-relaxed text-lg mb-8">
                At KRR BrightMinds School, we believe that a great learning environment plays a major role in a child’s development. Our campus is designed to provide students with modern facilities, safety, comfort, and opportunities for holistic growth.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Tech-Enabled Learning",
                  "Safe & Secure Campus",
                  "Comfortable Amenities",
                  "Holistic Growth Focus"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-gold-600" />
                    </div>
                    <span className="font-medium text-navy-800 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Showcase Section */}
      <section className="py-12 lg:py-16 bg-navy-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gold-400/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-4">Our Facilities</h2>
            <div className="w-20 h-1.5 bg-gold-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-navy-600 max-w-2xl mx-auto">
              We provide the best-in-class infrastructure to ensure every child gets the attention and resources they need to excel.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Classrooms",
                icon: Monitor,
                image: "/class room.png",
                desc: "Technology-enabled smart classrooms with interactive teaching methods that make learning engaging, visual, and effective for students."
              },
              {
                title: "Modern Library",
                icon: Library,
                image: "/library.png",
                desc: "A well-stocked library with academic books, storybooks, reference materials, and digital learning resources to encourage reading habits."
              },
              {
                title: "Sports Ground",
                icon: Dumbbell,
                image: "/sports.png",
                desc: "Spacious playgrounds and sports facilities that support physical fitness, teamwork, discipline, and overall student well-being."
              },
              {
                title: "GPS Transport",
                icon: Bus,
                image: "/hero2.jpg",
                desc: "Safe and reliable GPS-enabled transportation facility with experienced drivers and proper student safety measures."
              },
              {
                title: "Computer Lab",
                icon: Laptop,
                image: "/science labs.png",
                desc: "Modern computer laboratories equipped with updated systems and internet facilities to help students develop digital skills."
              },
              {
                title: "Science Labs",
                icon: FlaskConical,
                image: "/work together.png",
                desc: "A well-equipped science laboratory with state-of-the-art equipment and tools to support students in their scientific investigations and experiments."
              }
            ].map((facility, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl shadow-navy-100/50 hover:shadow-2xl transition-all duration-500 border border-navy-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-navy-900/0 transition-colors"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-gold-500 transition-colors">
                    <facility.icon className="w-6 h-6 text-navy-800 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-heading font-bold text-navy-900 mb-4">{facility.title}</h3>
                  <p className="text-navy-600 leading-relaxed mb-6">
                    {facility.desc}
                  </p>
                  <div className="w-12 h-1 bg-gold-500 rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hostel Facility Highlight Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 h-[400px] lg:h-auto relative">
                <img 
                  src="/hero1.jpg" 
                  alt="Hostel Facility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy-900/20"></div>
              </div>
              
              <div className="w-full lg:w-1/2 p-10 lg:p-20 relative z-10">
                <div className="inline-flex items-center gap-2 text-gold-400 mb-6">
                  <Home className="w-6 h-6" />
                  <span className="font-bold uppercase tracking-widest text-sm">Premium Residence</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-8">
                  Home Away From <span className="text-gold-400">Home</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { label: "Separate Boys & Girls", icon: UserCheck },
                    { label: "Nutritious Food", icon: Coffee },
                    { label: "24/7 Security", icon: Shield },
                    { label: "Study Hour Guidance", icon: Clock },
                    { label: "Hygienic Rooms", icon: Sparkles },
                    { label: "Caring Wardens", icon: HeartPulse }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-navy-100">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                        <feature.icon className="w-4 h-4 text-gold-400" />
                      </div>
                      <span className="text-sm font-medium">{feature.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10">
                  <p className="text-navy-300 italic mb-8">
                    "Safe and comfortable hostel facilities with hygienic food, study support, and a student-friendly environment."
                  </p>
                  <Link 
                    to="/hostel" 
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-xl transition-all"
                  >
                    Explore Hostel Life
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Security Section */}
      <section className="py-12 lg:py-16 bg-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-4">Safety & Security</h2>
            <div className="w-20 h-1.5 bg-gold-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-navy-600 max-w-2xl mx-auto">
              Your child's safety is our highest priority. We have implemented comprehensive security measures across the campus.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: ShieldCheck, label: "CCTV Monitoring" },
              { icon: Bus, label: "GPS Bus Tracking" },
              { icon: UserCheck, label: "Trained Staff" },
              { icon: Shield, label: "Secure Hostel" },
              { icon: Stethoscope, label: "Medical Support" },
              { icon: Sparkles, label: "Clean Campus" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-navy-100 text-center group hover:border-gold-400 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-navy-900 transition-colors">
                  <item.icon className="w-6 h-6 text-navy-700 group-hover:text-gold-400 transition-colors" />
                </div>
                <span className="font-heading font-bold text-navy-800 text-xs sm:text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Facilities Matter Section */}
      <section className="py-12 lg:py-16 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-8 leading-tight">
                How Our Facilities <br />
                <span className="text-gold-600">Empower Students</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Better Learning Experience", text: "Interactive tools and digital resources make complex concepts easier to understand." },
                  { title: "Physical Development", text: "Our sports facilities encourage fitness, teamwork, and a healthy lifestyle." },
                  { title: "Student Safety", text: "A secure environment allows students to focus entirely on their growth and learning." },
                  { title: "Holistic Development", text: "Beyond academics, our facilities support arts, sports, and technical skills." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-gold-400 font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900 text-lg mb-1">{item.title}</h4>
                      <p className="text-navy-600 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img src="/cultural events.jpg" className="rounded-2xl shadow-lg mt-8" alt="Students" />
                <img src="/class room.png" className="rounded-2xl shadow-lg" alt="Classroom" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 lg:py-16 bg-navy-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-navy-900 rounded-[3rem] p-10 lg:p-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            <div className="relative z-10">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Give Your Child a Comfortable and <br />
                <span className="text-gold-400">Modern Learning Environment</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/apply" className="w-full sm:w-auto px-10 py-5 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-2xl shadow-lg shadow-gold-500/20 text-center transition-all hover:-translate-y-1">
                  Apply for Admission
                </Link>
                <a href="/#contact" className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-sm text-center transition-all hover:-translate-y-1">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FacilitiesPage