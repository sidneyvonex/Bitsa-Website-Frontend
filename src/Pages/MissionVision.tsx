import { Target, Eye, Heart, ArrowRight } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';

export const MissionVision = () => {
  const values = [
    {
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, from academic performance to community engagement.',
      icon: Target,
      color: 'blue',
    },
    {
      title: 'Innovation',
      description: 'We embrace new technologies and creative solutions to address challenges and drive progress.',
      icon: Eye,
      color: 'purple',
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of working together, sharing knowledge, and supporting one another.',
      icon: Heart,
      color: 'green',
    },
    {
      title: 'Integrity',
      description: 'We conduct ourselves with honesty, transparency, and ethical principles in all our endeavors.',
      icon: Target,
      color: 'orange',
    },
  ];

  return (
    <div>
      <Topbar />
      <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <section className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Our Foundation</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Mission & Vision</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Our mission and vision guide everything we do at BITSA, shaping our goals and inspiring our community.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 md:p-12 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            </div>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg md:text-xl leading-relaxed mb-4">
                To empower and unite Bachelor of Information Technology students at UEAB by providing a platform for
                academic excellence, professional development, and community engagement.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                We are committed to fostering innovation, building strong networks, and preparing our members for
                successful careers in the ever-evolving technology landscape.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-lg p-8 md:p-12 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Our Vision</h2>
            </div>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg md:text-xl leading-relaxed mb-4">
                To be the leading student association in technology education and innovation, recognized for producing
                exceptional IT professionals who drive positive change in their communities and the industry.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                We envision a future where BITSA members are at the forefront of technological advancement, equipped
                with the skills, knowledge, and values needed to excel in a digital world.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide our actions and decisions, ensuring we remain true to our mission and
              vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600',
                purple: 'bg-purple-100 text-purple-600',
                green: 'bg-green-100 text-green-600',
                orange: 'bg-orange-100 text-orange-600',
              };

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-14 h-14 ${colorClasses[value.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Goals Section */}
        <section>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Strategic Goals</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Academic Excellence</h3>
                  <p className="text-gray-600">
                    Support members in achieving outstanding academic performance through study groups, tutoring, and
                    resource sharing.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Development</h3>
                  <p className="text-gray-600">
                    Organize workshops, seminars, and networking events to enhance members&apos; professional skills
                    and career readiness.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Engagement</h3>
                  <p className="text-gray-600">
                    Foster a strong sense of community through social events, mentorship programs, and collaborative
                    projects.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation & Research</h3>
                  <p className="text-gray-600">
                    Encourage innovation through hackathons, competitions, and research initiatives that push the
                    boundaries of technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Us in Our Mission</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Become part of BITSA and contribute to our mission of empowering IT students and shaping the future of
              technology.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Join BITSA
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </div>
    </main>
      <Footer />
    </div>
  );
};

export default MissionVision;