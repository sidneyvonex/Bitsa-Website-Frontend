// 2. MissionVisionSection.tsx
import { Target, Lightbulb, BookOpen, Users, Award } from 'lucide-react';

const coreValues = [
  {
    icon: BookOpen,
    title: "Education",
    description: "Continuous learning and knowledge sharing among members"
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Guiding and supporting each member's growth and development"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working together to achieve common goals and build solutions"
  },
  {
    icon: Award,
    title: "Impact",
    description: "Creating meaningful change in our community and beyond"
  }
];

export const MissionVisionSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-[#f59e0b] uppercase tracking-wide mb-2">OUR PURPOSE</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e1b4b]">Mission & Vision</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-[#1e1b4b] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e1b4b]">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To empower and unite Bachelor of Information Technology students at UEAB by providing a platform for academic excellence, professional development, and community engagement. We are committed to fostering innovation, building strong networks, and preparing our members for successful careers in the ever-evolving technology landscape.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-[#f59e0b] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1e1b4b]">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be the leading student association in technology education and innovation at UEAB, recognized for producing exceptional IT professionals who drive positive change in their communities and the industry. We envision a future where BITSA members are at the forefront of technological advancement.
              </p>
            </div>
          </div>
        </div>

        {/* Image with Quote */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-96">
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80"
                alt="BITSA Leadership"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="mb-6">
              <svg className="w-12 h-12 text-[#f59e0b] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 font-medium italic leading-relaxed mb-6">
              "Our goal is to create an environment where innovation thrives and every member can turn their ideas into reality."
            </p>
            <div>
              <p className="font-bold text-[#1e1b4b]">BITSA Leadership Team</p>
              <p className="text-sm text-gray-600">2024-2025</p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e1b4b] mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These fundamental principles guide our actions and shape our community
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e1b4b] to-[#f59e0b] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1e1b4b] mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};