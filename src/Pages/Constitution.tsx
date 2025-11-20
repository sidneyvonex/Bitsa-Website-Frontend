import { FileText, BookOpen, Scale, Users, Gavel } from 'lucide-react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';

export const Constitution = () => {
  const sections = [
    {
      title: 'Article I: Name and Purpose',
      content: [
        'The organization shall be known as the Bachelor of Information Technology Students Association (BITSA).',
        'BITSA is established to represent and serve all students pursuing Bachelor of Information Technology programs at the University of Eastern Africa, Baraton (UEAB).',
        'The association aims to promote academic excellence, professional development, and community engagement among its members.',
      ],
    },
    {
      title: 'Article II: Membership',
      content: [
        'All students enrolled in BIT programs at UEAB are automatically eligible for membership.',
        'Members have the right to participate in all association activities, vote in elections, and hold office.',
        'Members are expected to uphold the values and principles of BITSA and contribute positively to the association.',
      ],
    },
    {
      title: 'Article III: Leadership Structure',
      content: [
        'The association shall be governed by an Executive Committee elected by the general membership.',
        'The Executive Committee shall consist of: President, Vice President, Secretary, Treasurer, and other positions as determined by the membership.',
        'Elections shall be held annually, and all members in good standing are eligible to run for office.',
      ],
    },
    {
      title: 'Article IV: Meetings and Activities',
      content: [
        'Regular general meetings shall be held at least once per semester.',
        'The Executive Committee shall meet monthly to plan and coordinate association activities.',
        'Special meetings may be called by the Executive Committee or upon request of at least 20% of the membership.',
      ],
    },
    {
      title: 'Article V: Finances',
      content: [
        'The association may collect membership dues as approved by the general membership.',
        'All financial transactions shall be transparent and subject to audit.',
        'The Treasurer shall maintain accurate financial records and present regular reports to the membership.',
      ],
    },
    {
      title: 'Article VI: Amendments',
      content: [
        'This constitution may be amended by a two-thirds majority vote of the general membership.',
        'Proposed amendments must be submitted in writing and distributed to all members at least two weeks before voting.',
        'Amendments shall take effect immediately upon approval unless otherwise specified.',
      ],
    },
  ];

  return (
    <div>
      <Topbar />
      <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <section className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <FileText className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Legal Document</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">BITSA Constitution</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The official constitution and governing document of the Bachelor of Information Technology Students
            Association.
          </p>
        </section>

        {/* Preamble */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Preamble</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                We, the students of the Bachelor of Information Technology programs at the University of Eastern
                Africa, Baraton, recognizing the need for a unified organization to represent our interests, promote
                our academic and professional development, and foster a sense of community, do hereby establish this
                constitution for the Bachelor of Information Technology Students Association (BITSA).
              </p>
            </div>
          </div>
        </section>

        {/* Constitution Articles */}
        <section className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                  <Gavel className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex gap-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Additional Information */}
        <section className="mt-16">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Constitutional Rights</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Member Rights</h3>
                  <p className="text-sm text-gray-600">
                    All members have the right to participate, vote, and express their opinions in association matters.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Document Access</h3>
                  <p className="text-sm text-gray-600">
                    This constitution is available to all members and may be reviewed at any time upon request.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions About the Constitution?</h3>
            <p className="text-gray-600 mb-6">
              For questions, clarifications, or to propose amendments, please contact the Executive Committee.
            </p>
            <a
              href="/leadership"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all"
            >
              Contact Leadership
            </a>
          </div>
        </section>
      </div>
    </main>
      <Footer />
    </div>
  );
};

export default Constitution;