export default function AnnouncementBar() {
  return (
    <div className="bg-navy-700 text-white py-2.5 px-4 text-center text-sm font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-block w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
        <span>Admissions Open for 2025-26</span>
        <span className="hidden sm:inline text-navy-300">|</span>
        <span className="hidden sm:inline text-gold-300">Limited Seats Available</span>
        <span className="hidden sm:inline text-navy-300">|</span>
        <a href="/apply" className="hidden sm:inline underline text-gold-300 hover:text-gold-200 transition-colors">
          Apply Now
        </a>
      </div>
    </div>
  )
}
