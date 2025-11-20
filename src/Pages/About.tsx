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
      <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About BITSA</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            The Bachelor of Information Technology Students Association (BITSA) is a dynamic student organization
            dedicated to fostering excellence, innovation, and collaboration among IT students at the University of
            Eastern Africa, Baraton (UEAB).
          </p>
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