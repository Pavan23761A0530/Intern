import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Maximize2,
  Play,
  ArrowRight,
  Filter,
  Camera,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const HostelGallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    "All",
    "Rooms",
    "Dining Hall",
    "Study Hall",
    "Sports",
    "Activities",
    "Hostel Life",
  ];

  const galleryItems = [
    { id: 1, category: "Rooms", url: "/AC.jpg", title: "Premium AC Room" },
    {
      id: 2,
      category: "Dining Hall",
      url: "/Mess.jpg",
      title: "Modern Dining Facility",
    },
    {
      id: 3,
      category: "Study Hall",
      url: "/library.png",
      title: "Dedicated Study Zone",
    },
    {
      id: 4,
      category: "Sports",
      url: "/sports.png",
      title: "Outdoor Sports Ground",
    },
    {
      id: 5,
      category: "Activities",
      url: "/working together.jpg",
      title: "Collaborative Learning",
    },
    {
      id: 6,
      category: "Hostel Life",
      url: "/hero2.jpg",
      title: "Student Interaction",
    },
    {
      id: 7,
      category: "Rooms",
      url: "/Non-AC.jpg",
      title: "Comfortable Non-AC Room",
    },
    {
      id: 8,
      category: "Dining Hall",
      url: "/Kitchen.png",
      title: "Hygienic Kitchen",
    },
    {
      id: 9,
      category: "Activities",
      url: "/cultural.jpg",
      title: "Festival Celebrations",
    },
    {
      id: 10,
      category: "Hostel Life",
      url: "/hero1.jpg",
      title: "Hostel Campus View",
    },
    {
      id: 11,
      category: "Study Hall",
      url: "/class room.png",
      title: "Group Study Session",
    },
  ];

  const filteredItems =
    activeFilter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="min-h-screen bg-white font-body text-navy-800">
      {/* 1. Hero Section */}
      <section className="relative h-[300px] lg:h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero1.jpg"
            alt="Hostel Gallery Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Hostel <span className="text-gold-400">Gallery</span>
          </h1>
          <p className="max-w-2xl mx-auto text-navy-100 text-lg md:text-xl leading-relaxed animate-fade-in-up animation-delay-200">
            Explore our safe, comfortable, and student-friendly hostel
            environment.
          </p>
        </div>
      </section>

      {/* 2. Gallery Categories & Filter */}
      <section className="py-12 bg-white sticky top-16 z-30 shadow-sm border-b border-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-2 lg:hidden overflow-x-auto pb-4 no-scrollbar">
            <Filter className="w-5 h-5 text-navy-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeFilter === cat
                    ? "bg-gold-500 text-white"
                    : "bg-navy-50 text-navy-600 hover:bg-navy-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center justify-center gap-4">
            <Filter className="w-5 h-5 text-navy-400 mr-4" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeFilter === cat
                    ? "bg-navy-900 text-white shadow-lg"
                    : "bg-white text-navy-600 border border-navy-100 hover:border-gold-500 hover:text-gold-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Masonry Gallery Layout */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="relative group rounded-3xl overflow-hidden cursor-pointer break-inside-avoid shadow-md hover:shadow-2xl transition-all duration-500"
                onClick={() => openLightbox(item)}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span className="inline-block px-3 py-1 bg-gold-500 text-navy-900 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
                      {item.category}
                    </span>
                    <h3 className="text-white font-heading font-bold text-xl mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gold-400 text-sm font-bold">
                      <Maximize2 className="w-4 h-4" />
                      View Fullscreen
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-navy-100 mx-auto mb-4" />
              <p className="text-navy-400 text-lg">
                No images found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Virtual Tour Section */}
      <section className="py-20 lg:py-24 bg-navy-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -mr-32 -mt-32"></div>

            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2 p-10 lg:p-16 text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 text-gold-400">
                  <Video className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Virtual Experience
                  </span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  Take a 360° Virtual Walkthrough
                </h2>
                <p className="text-navy-300 text-lg mb-10 leading-relaxed">
                  Experience the life at KRR Hostel from the comfort of your
                  home. Explore our modern rooms, high-tech study halls, and
                  hygienic dining spaces.
                </p>
              </div>

              <div className="w-full lg:w-1/2 p-6 lg:p-10">
  <div className="relative overflow-hidden rounded-3xl aspect-video w-full">
    <video
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover rounded-3xl"
    >
      <source src="/video2.mp4" type="video/mp4" />
    </video>
  </div>
</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final CTA Section */}
      <section className="py-24 lg:py-32 bg-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-navy-50 rounded-full -z-10 blur-3xl opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-8 leading-tight">
            Ready to Join Our{" "}
            <span className="text-gold-600">Hostel Community?</span>
          </h2>
          <p className="text-navy-600 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Secure your child's spot in a home away from home where discipline,
            care, and safety come first.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/hostel-apply"
              className="w-full sm:w-auto px-10 py-5 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-gold-500/30 transition-all duration-300 text-lg"
            >
              Apply for Hostel Now
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-2xl transition-all duration-300 text-lg"
            >
              Contact Hostel Office
            </Link>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Placeholder */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-navy-950/95 flex flex-col items-center justify-center p-4 animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full h-full flex flex-col justify-center items-center">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl animate-fade-in-up"
            />
            <div className="mt-8 text-center">
              <span className="px-4 py-1.5 bg-gold-500 text-navy-900 text-xs font-bold uppercase tracking-wider rounded-full mb-4 inline-block">
                {selectedImage.category}
              </span>
              <h3 className="text-white font-heading text-2xl font-bold">
                {selectedImage.title}
              </h3>
            </div>

            <div className="absolute top-1/2 left-0 -translate-y-1/2 hidden md:block">
              <button className="w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden md:block">
              <button className="w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelGallery;