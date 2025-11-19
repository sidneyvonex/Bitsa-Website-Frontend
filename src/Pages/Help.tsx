import React, { useState } from 'react';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { AIAssistant } from '../Components/AIAssistant';
import {
  MessageCircle,
  BookOpen,
  Users,
  Calendar,
  Code,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Search,
  Bot
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'events' | 'membership' | 'technical';
}

export const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAIOpen, setIsAIOpen] = useState(false);

  const faqs: FAQItem[] = [
    {
      question: 'What is BITSA?',
      answer: 'BITSA (Bachelor of Information Technology Students Association) is a vibrant tech community at the University of Eastern Africa, Baraton. We focus on fostering innovation, skill development, and networking among IT students and tech enthusiasts across all disciplines.',
      category: 'general'
    },
    {
      question: 'How can I join BITSA?',
      answer: 'You can join BITSA by registering on our website. Click on the "Sign Up" button, fill in your details including your student ID, and choose your areas of interest. Once registered, you\'ll have access to all our events, communities, and resources.',
      category: 'membership'
    },
    {
      question: 'What events does BITSA organize?',
      answer: 'BITSA organizes various events including hackathons, coding workshops, tech talks, career fairs, project showcases, and networking sessions. Check our Events page or dashboard for upcoming activities.',
      category: 'events'
    },
    {
      question: 'Can non-IT students join BITSA?',
      answer: 'Absolutely! BITSA welcomes students from all disciplines who are interested in technology, innovation, and digital skills. We believe diverse perspectives enrich our community and projects.',
      category: 'membership'
    },
    {
      question: 'How do I register for an event?',
      answer: 'Once logged in, navigate to the Events page, select the event you\'re interested in, and click the "Register" button. You\'ll receive a confirmation email with event details.',
      category: 'events'
    },
    {
      question: 'What communities can I join?',
      answer: 'BITSA has various communities including Web Development, Mobile Development, Data Science, Cybersecurity, AI/ML, and more. You can join multiple communities based on your interests from your dashboard.',
      category: 'general'
    },
    {
      question: 'How can I showcase my project?',
      answer: 'You can submit your projects through the Projects section in your dashboard. Our team reviews submissions, and selected projects are featured on our platform and in our showcases.',
      category: 'technical'
    },
    {
      question: 'Is there a membership fee?',
      answer: 'No, BITSA membership is completely free for all UEAB students. We believe in making technology education and networking accessible to everyone.',
      category: 'membership'
    },
    {
      question: 'How can I become a community leader?',
      answer: 'Active members who demonstrate leadership, technical skills, and commitment to the community can apply to become leaders. Look out for leadership applications announced through our newsletter and events.',
      category: 'general'
    },
    {
      question: 'What programming languages should I know?',
      answer: 'There\'s no specific requirement! Whether you\'re a beginner or experienced, we have resources and communities for all skill levels. Popular languages in our community include Python, JavaScript, Java, C++, and more.',
      category: 'technical'
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the sign-in page. Enter your registered email, and you\'ll receive a password reset link. Follow the instructions in the email to set a new password.',
      category: 'technical'
    },
    {
      question: 'Can I collaborate with others on projects?',
      answer: 'Yes! BITSA encourages collaboration. You can find project collaborators through our communities, events, or by posting your project idea on the platform. Many of our best projects are team efforts!',
      category: 'technical'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'general', name: 'General', icon: MessageCircle },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'membership', name: 'Membership', icon: Users },
    { id: 'technical', name: 'Technical', icon: Code }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'bitsaclub@ueab.ac.ke',
      description: 'For general inquiries and support'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+254 XXX XXX XXX',
      description: 'Monday - Friday, 9AM - 5PM EAT'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'UEAB Campus, IT Department',
      description: 'Baraton, Kenya'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Topbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How Can We Help You?
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Find answers to common questions or chat with our AI assistant
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={() => setIsAIOpen(true)}
            className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
          >
            <Bot className="w-5 h-5" />
            Ask AI Assistant
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all ${selectedCategory === category.id
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-blue-300 text-gray-700'
                  }`}
              >
                <category.icon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
            <span className="text-blue-600 text-lg ml-2">({filteredFAQs.length})</span>
          </h2>

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No results found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {expandedFAQ === index && (
                    <div className="px-6 pb-4 text-gray-600">
                      <div className="pt-2 border-t border-gray-100">
                        {faq.answer}
                      </div>
                      <span className="inline-block mt-3 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Still Need Help?
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Can't find what you're looking for? Reach out to us directly!
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-blue-600 font-medium mb-1">{method.value}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </div>
  );
};

export default Help;
