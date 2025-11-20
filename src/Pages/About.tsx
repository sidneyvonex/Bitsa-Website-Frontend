import { Code2, GraduationCap, Network, Shield, BarChart3, Target, Users, BookOpen, Lightbulb } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';

export const About = () => {
  const programs = [
    {
      name: 'Software Engineering',
      icon: Code2,
      description: 'Full-stack development, Agile methodologies',
    },
    {
      name: 'BBIT',
      icon: GraduationCap,
      description: 'Business technology integration, IT management',
    },
    {
      name: 'Networking',
      icon: Network,
      description: 'Network administration, Infrastructure design',
    },
    {
      name: 'Cyber Security',
      icon: Shield,
      description: 'Ethical hacking, Security protocols',
    },
    {
      name: 'Data Analytics',
      icon: BarChart3,
      description: 'Data visualization, Business intelligence',
    },
  ];

  return (
    <div>
      <Topbar />
      <main className="min-h-screen bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section – inspired by CEIL layout */}
          <section className="mb-20">
            <div className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-[#7b0202] text-white shadow-2xl">
              {/* Decorative background shapes */}
              <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-gradient-to-br from-[#ff6b3d] to-[#b91c1c] opacity-40" />
              <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gradient-to-tr from-[#fbbf24] to-[#ef4444] opacity-30" />

              <div className="relative grid gap-10 px-6 py-12 md:grid-cols-2 md:px-12 md:py-14 lg:px-16 lg:py-16 items-center">
                {/* Image stack */}
                <div className="flex justify-center gap-6">
                  <div className="relative w-40 sm:w-52 md:w-64 lg:w-72 rounded-3xl overflow-hidden shadow-xl border-[6px] border-white/10 bg-black/10">
                    <img
                      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
                      alt="BITSA summit session"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="hidden sm:block relative w-32 sm:w-40 md:w-48 lg:w-56 mt-10 rounded-3xl overflow-hidden shadow-xl border-[6px] border-white/10 bg-black/10">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80"
                      alt="Students collaborating on projects"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <p className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-300 mb-3">
                    About BITSA
                  </p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                    Building the next generation of{" "}
                    <span className="text-amber-300">tech leaders</span> at UEAB.
                  </h1>
                  <p className="text-sm md:text-base text-amber-50/90 leading-relaxed mb-5 max-w-xl">
                    The Bachelor of Information Technology Students Association (BITSA) is a vibrant community of
                    innovators, builders, and problem solvers at the University of Eastern Africa, Baraton. We connect
                    students across Software Engineering, BBIT, Networking, Cyber Security, and Data Analytics to turn
                    ideas into impact.
                  </p>
                  <p className="text-sm md:text-base text-amber-50/90 leading-relaxed mb-8 max-w-xl">
                    Through hackathons, tech talks, industry partnerships, and peer mentorship, BITSA bridges classroom
                    learning with the real-world technology ecosystem in Kenya and beyond.
                  </p>

                  {/* Stats strip */}
                  <div className="mt-4 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-5">
                    <div>
                      <p className="text-3xl md:text-4xl font-extrabold">250+</p>
                      <p className="text-xs md:text-sm text-amber-100/80">Active members</p>
                    </div>
                    <div>
                      <p className="text-3xl md:text-4xl font-extrabold">30+</p>
                      <p className="text-xs md:text-sm text-amber-100/80">Tech events &amp; meetups</p>
                    </div>
                    <div>
                      <p className="text-3xl md:text-4xl font-extrabold">15+</p>
                      <p className="text-xs md:text-sm text-amber-100/80">Student-led projects</p>
                    </div>
                    <div>
                      <p className="text-3xl md:text-4xl font-extrabold">10+</p>
                      <p className="text-xs md:text-sm text-amber-100/80">Industry partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* Who We Are Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                BITSA represents students pursuing various IT specializations, creating a vibrant community where
                knowledge, skills, and experiences are shared. We are committed to bridging the gap between academic
                learning and real-world technology applications.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our association brings together students from Software Engineering, BBIT, Networking, Cyber Security,
                and Data Analytics programs, fostering interdisciplinary collaboration and innovation.
              </p>
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

        {/* What We Do Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">What We Do</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Building</h3>
                <p className="text-gray-600">
                  We create a supportive environment where IT students can connect, share knowledge, and grow together
                  through various activities and events.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Skill Development</h3>
                <p className="text-gray-600">
                  Through workshops, hackathons, and competitions, we help members develop practical skills and stay
                  updated with the latest technology trends.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Networking Opportunities</h3>
                <p className="text-gray-600">
                  We facilitate connections between students, alumni, industry professionals, and potential employers to
                  expand career opportunities.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Academic Support</h3>
                <p className="text-gray-600">
                  We provide resources, study groups, and mentorship programs to help members excel in their academic
                  pursuits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Become part of BITSA and connect with like-minded IT students. Together, we build, learn, and innovate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Join BITSA
              </a>
              <a
                href="/communities"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all"
              >
                Explore Communities
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
      <Footer />
    </div>
  );
};

export default About;