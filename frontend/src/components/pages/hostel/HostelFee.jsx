import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Info, 
  HelpCircle, 
  CreditCard, 
  IndianRupee, 
  ArrowRight, 
  ShieldCheck, 
  UtensilsCrossed, 
  Coffee,
  Waves, 
  Stethoscope, 
  BedDouble, 
  BookOpen,
  ChevronDown,
  ChevronUp,
  Award,
  Users,
  Wallet,
} from 'lucide-react';

const HostelFeePage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const feeStructure = [
    { component: 'Admission Fee (One-time)', ac: '₹5,000', nonAc: '₹5,000' },
    { component: 'Annual Hostel Fee', ac: '₹75,000', nonAc: '₹55,000' },
    { component: 'Mess Fee (Nutritious Meals)', ac: 'Included', nonAc: 'Included' },
    { component: 'Laundry & Housekeeping', ac: 'Included', nonAc: 'Included' },
    { component: 'Security Deposit (Refundable)', ac: '₹10,000', nonAc: '₹10,000' },
  ];

  const whatIsIncluded = [
    { icon: BedDouble, title: 'Accommodation', desc: 'Spacious 4-sharing rooms with individual beds and storage.' },
    { icon: UtensilsCrossed, title: 'Nutritious Food', desc: 'Freshly prepared breakfast, lunch, snacks, and dinner.' },
    { icon: BookOpen, title: 'Study Hall', desc: 'Dedicated supervised study hours with teacher assistance.' },
    { icon: Waves, title: 'RO Drinking Water', desc: 'Centralized pure drinking water facility available 24/7 for all students.' },
    { icon: Waves, title: 'Laundry', desc: 'Professional laundry services and daily room cleaning.' },
    { icon: Stethoscope, title: 'Medical Support', desc: '24/7 on-call medical assistance and first-aid.' },
    { icon: ShieldCheck, title: 'Security', desc: 'CCTV surveillance and round-the-clock security personnel.' },
  ];

  const paymentOptions = [
    { 
      icon: Wallet, 
      title: 'Installment Plans', 
      desc: 'Pay in two easy installments at the beginning of each semester.' 
    },
    { 
      icon: CreditCard, 
      title: 'Online Payment', 
      desc: 'Securely pay via UPI, Credit/Debit Cards, or Net Banking.' 
    },
    { 
      icon: IndianRupee, 
      title: 'Transparent Billing', 
      desc: 'No hidden costs. Detailed receipts provided for every transaction.' 
    },
  ];

  const scholarships = [
    { 
      icon: Users, 
      title: 'Sibling Discount', 
      desc: '5% concession on the annual fee for the second child enrolled.' 
    },
    { 
      icon: Award, 
      title: 'Merit Support', 
      desc: 'Special discounts for students excelling in academics or state-level sports.' 
    },
    { 
      icon: CheckCircle2, 
      title: 'Special Concession', 
      desc: 'Financial support available for families with special economic needs.' 
    },
  ];

  const faqs = [
    {
      q: 'Is food included in the hostel fee?',
      a: 'Yes, the annual hostel fee is all-inclusive and covers breakfast, lunch, evening snacks, and dinner.'
    },
    {
      q: 'Is laundry included in the fee?',
      a: 'Yes, professional laundry and housekeeping services are included in the annual fee at no extra cost.'
    },
    {
      q: 'Is the AC option mandatory?',
      a: 'No, students can choose between AC and Non-AC rooms based on their preference and availability.'
    },
    {
      q: 'Is the security deposit refundable?',
      a: 'Yes, the security deposit is fully refundable at the time of final checkout from the hostel, subject to any damages.'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-body text-navy-800">
      
      {/* 1. Hero Section */}
      <section className="relative h-[350px] lg:h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/Hostel.jpg" 
            alt="Fee Structure Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Hostel <span className="text-gold-400">Fee Structure</span>
          </h1>
          <p className="max-w-2xl mx-auto text-navy-100 text-lg md:text-xl leading-relaxed animate-fade-in-up animation-delay-200">
            Transparent and affordable hostel fee plans for a safe and comfortable student living experience.
          </p>
        </div>
      </section>

      {/* 2. Fee Structure Table Section */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-4">Annual Fee Details</h2>
            <p className="text-navy-600">Session 2026-27 | All figures in Indian Rupees (₹)</p>
          </div>
          
          <div className="overflow-hidden rounded-3xl border border-navy-100 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="px-6 py-6 font-bold uppercase tracking-wider text-sm">Fee Component</th>
                  <th className="px-6 py-6 font-bold uppercase tracking-wider text-sm text-center">AC Hostel</th>
                  <th className="px-6 py-6 font-bold uppercase tracking-wider text-sm text-center">Non-AC Hostel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {feeStructure.map((row, i) => (
                  <tr key={i} className="hover:bg-navy-50/50 transition-colors">
                    <td className="px-6 py-5 text-navy-700 font-medium">{row.component}</td>
                    <td className="px-6 py-5 text-center font-bold text-navy-900">{row.ac}</td>
                    <td className="px-6 py-5 text-center font-bold text-navy-900">{row.nonAc}</td>
                  </tr>
                ))}
                <tr className="bg-gold-50">
                  <td className="px-6 py-6 text-navy-900 font-bold">Total (Excl. Deposit)</td>
                  <td className="px-6 py-6 text-center font-extrabold text-navy-900 text-xl">₹80,000 / Year</td>
                  <td className="px-6 py-6 text-center font-extrabold text-navy-900 text-xl">₹60,000 / Year</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 flex items-start gap-3 p-4 bg-navy-50 rounded-2xl border border-navy-100">
            <Info className="w-5 h-5 text-navy-600 shrink-0 mt-0.5" />
            <p className="text-sm text-navy-600 leading-relaxed">
              * The security deposit is a one-time refundable amount payable at the time of admission. 
              The annual fee covers 10 months of the academic session. Personal expenses and uniforms are not included.
            </p>
          </div>
        </div>
      </section>

      {/* 3. What's Included Section */}
      <section className="py-20 lg:py-24 bg-navy-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-4">What's Included?</h2>
            <p className="text-navy-600 max-w-2xl mx-auto">We provide a comprehensive package to ensure students can focus entirely on their studies and personal growth.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatIsIncluded.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-navy-100 group">
                <div className="w-12 h-12 bg-navy-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors">
                  <item.icon className="w-6 h-6 text-navy-700 group-hover:text-white" />
                </div>
                <h3 className="font-heading font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. & 5. Payment Options & Scholarships */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Payment Options */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy-900 mb-8 flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-gold-600" />
                Payment Options
              </h2>
              <div className="space-y-6">
                {paymentOptions.map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-navy-50 rounded-2xl border border-navy-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                      <item.icon className="w-6 h-6 text-navy-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-navy-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scholarships */}
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy-900 mb-8 flex items-center gap-3">
                <Award className="w-8 h-8 text-gold-600" />
                Scholarships & Concessions
              </h2>
              <div className="space-y-6">
                {scholarships.map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-gold-50/50 rounded-2xl border border-gold-100">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                      <item.icon className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-navy-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-20 lg:py-24 bg-navy-50/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-navy-600">Common queries about hostel fees and facilities.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-navy-100 overflow-hidden shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-navy-50"
                >
                  <span className="font-bold text-navy-900 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-gold-500" />
                    {faq.q}
                  </span>
                  {activeFaq === i ? <ChevronUp className="w-5 h-5 text-navy-400" /> : <ChevronDown className="w-5 h-5 text-navy-400" />}
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-navy-600 text-sm leading-relaxed pl-8">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="py-20 lg:py-24 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 20.5V18H0v-2h20v-2l2 3-2 3z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl font-bold mb-8">Ready to Join KRR Hostel?</h2>
          <p className="text-navy-200 text-lg mb-10 max-w-2xl mx-auto">
            Give your child a safe, disciplined, and supportive environment for their academic journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/hostel-apply" 
              className="w-full sm:w-auto px-10 py-5 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-2xl shadow-xl hover:shadow-gold-500/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Apply for Hostel <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all duration-300"
            >
              Contact Hostel Office
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HostelFeePage;
