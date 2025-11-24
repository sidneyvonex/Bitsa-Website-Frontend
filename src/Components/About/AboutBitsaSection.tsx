import { Code2, GraduationCap, Network, Shield, BarChart3, Target, Users, Rocket, Award, Lightbulb } from 'lucide-react';

const programs = [
  {
    name: "Software Engineering",
    icon: Code2,
    description: "Full-stack development, Agile methodologies",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "BBIT",
    icon: GraduationCap,
    description: "Business technology integration, IT management",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Networking",
    icon: Network,
    description: "Network administration, Infrastructure design",
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Cyber Security",
    icon: Shield,
    description: "Ethical hacking, Security protocols",
    color: "from-red-500 to-orange-500"
  },
  {
    name: "Data Analytics",
    icon: BarChart3,
    description: "Data visualization, Business intelligence",
    color: "from-yellow-500 to-amber-500"
  }
];


const About = () => {
  return (
    <main  id="about-section" className="min-h-screen bg-gray-50">
      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e3a8a] text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#f59e0b] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 animate-fade-in-down">
              <span className="px-4 py-2 bg-[#f59e0b]/20 backdrop-blur-sm border border-[#f59e0b]/30 rounded-full text-sm font-semibold text-[#f59e0b]">
                Welcome to BITSA
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 animate-fade-in">
              About BITSA
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-8 animate-fade-in-up">
              A vibrant student club at the University of Eastern Africa, Baraton, uniting future tech leaders across Software Engineering, BBIT, Networking, Cyber Security, and Data Analytics.
            </p>
          </div>
        </div>

        {/* Curved Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>


      {/* Who Are We Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-block mb-4">
                <span className="px-3 py-1 bg-[#f59e0b]/10 text-[#f59e0b] rounded-full text-sm font-semibold">
                  Who We Are
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1e1b4b] mb-6 leading-tight">
                Empowering Tomorrow's Tech Leaders
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                BITSA is a student-led association at UEAB, bringing together IT enthusiasts from diverse backgrounds. Our club is a hub for <span className="font-semibold text-[#f59e0b]">creativity</span>, <span className="font-semibold text-[#f59e0b]">networking</span>, and <span className="font-semibold text-[#f59e0b]">personal growth</span> in the tech space.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We organize events, workshops, and collaborative projects to help members gain practical experience, build lasting connections, and prepare for successful careers in technology.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e1b4b] mb-1">Community First</h3>
                    <p className="text-sm text-gray-600">Building strong connections among members</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e1b4b] mb-1">Innovation Driven</h3>
                    <p className="text-sm text-gray-600">Pushing boundaries of technology</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e1b4b] mb-1">Learning Focus</h3>
                    <p className="text-sm text-gray-600">Continuous skill development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1e1b4b] mb-1">Excellence</h3>
                    <p className="text-sm text-gray-600">Striving for quality in everything</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image Grid */}
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg h-48 group">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                      alt="BITSA teamwork"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 group">
                    <img
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
                      alt="BITSA collaboration"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 group">
                    <img
                      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80"
                      alt="BITSA innovation"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg h-48 group">
                    <img
                      src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80"
                      alt="BITSA coding"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Programs Section */}
<section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Programs & Specializations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              BITSA encompasses students from various IT disciplines, each contributing unique perspectives and expertise
              to our community.
            </p>
          </div>

          <div className="relative">
            {/* Root - BITSA Club */}
            <div className="flex justify-center mb-12">
              <div className="relative group">
                <div className="bg-white border-2 border-blue-600 px-12 py-8 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 p-4 rounded-full shadow-md">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600 mb-2 mt-2">BITSA CLUB</h3>
                  <p className="text-sm text-gray-600 font-medium">Bachelor of IT Students Association</p>
                </div>
                {/* Vertical Line Down */}
                <div className="absolute left-1/2 -bottom-12 w-0.5 h-12 bg-gradient-to-b from-blue-600 to-orange-500 transform -translate-x-1/2"></div>
              </div>
            </div>

            {/* Connector Node */}
            <div className="flex justify-center mb-12">
              <div className="w-4 h-4 bg-[#f59e0b] rounded-full"></div>
            </div>

            {/* Programs/Specializations */}
            <div className="relative">
              {/* Horizontal Line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent"></div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-8">
                {programs.map((program, index) => {
                  const Icon = program.icon;
                  return (
                    <div key={index} className="relative">
                      {/* Vertical Line Up */}
                      <div className="absolute left-1/2 -top-8 w-0.5 h-8 bg-[#f59e0b] transform -translate-x-1/2"></div>

                      {/* Program Card */}
                      <div className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 p-4 text-center group transition-all duration-300 h-full relative overflow-hidden">
                        {/* Accent Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                        <div className="relative z-10">
                          <div className="bg-blue-50 group-hover:bg-blue-600 transition-colors duration-300 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                          </div>
                          <h4 className="font-bold text-gray-900 mb-1 text-sm">{program.name}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{program.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e3a8a] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join BITSA?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Become part of a thriving community of tech enthusiasts and shape your future in technology
          </p>
          <button className="bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Get Involved Today
          </button>
        </div>
      </section>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in 1s ease-out 0.2s backwards;
        }
        .animate-fade-in-down {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}

export default About;