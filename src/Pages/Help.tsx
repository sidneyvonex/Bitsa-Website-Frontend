import React, { useState } from 'react';
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
  Bot,
  Lightbulb,
  Zap,
  HelpCircle
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#5773da] via-[#4861c9] to-[#3d4fb8] text-white py-16 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8" />
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-100">Help & Support</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How Can We Help You?
          </h1>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Find answers to your questions, explore our resources, or chat with our AI assistant for instant support
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur group-focus-within:blur-lg transition-all pointer-events-none"></div>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-5 h-5 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full pl-12 pr-6 py-4 rounded-xl bg-white/15 backdrop-blur-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/25 transition-all shadow-2xl border border-white/20 hover:border-white/40"
            />
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={() => setIsAIOpen(true)}
            className="mt-6 bg-white text-[#5773da] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
          >
            <Bot className="w-5 h-5" />
            Ask AI Assistant
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 w-full">
        {/* Quick Help Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-md border-l-4 border-[#5773da] p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-[#5773da]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Quick Start</h3>
                <p className="text-sm text-gray-600">Get started with BITSA in just a few minutes. Sign up and explore communities.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border-l-4 border-[#5773da] p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6 text-[#5773da]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Learn & Grow</h3>
                <p className="text-sm text-gray-600">Access tutorials, resources, and join learning communities tailored to you.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md border-l-4 border-[#5773da] p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-[#5773da]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Connect</h3>
                <p className="text-sm text-gray-600">Network with peers, attend events, and build meaningful relationships.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${selectedCategory === category.id
                    ? 'border-[#5773da] bg-indigo-50 text-[#5773da] shadow-md'
                    : 'border-gray-200 hover:border-[#5773da] text-gray-700 bg-white'
                  }`}
              >
                <category.icon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium block">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <span className="text-sm bg-indigo-100 text-[#5773da] font-semibold px-4 py-1 rounded-full">
              {filteredFAQs.length} results
            </span>
          </div>

          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-gray-200">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No results found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-indigo-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4 text-lg">{faq.question}</span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-[#5773da] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {expandedFAQ === index && (
                    <div className="px-6 pb-5 bg-indigo-50 text-gray-700">
                      <div className="pt-3 border-t border-indigo-200">
                        <p className="leading-relaxed">{faq.answer}</p>
                      </div>
                      <span className="inline-block mt-4 text-xs bg-white text-[#5773da] font-semibold px-4 py-2 rounded-full border border-[#5773da]">
                        {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl border-2 border-gray-200 p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Still Need Help?
          </h2>
          <p className="text-gray-600 text-center mb-10 text-lg">
            Can't find what you're looking for? Reach out to our support team directly!
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-white border-2 border-gray-200 hover:border-[#5773da] hover:shadow-lg transition-all transform hover:scale-105">
                <div className="w-14 h-14 bg-gradient-to-br from-[#5773da] to-[#4861c9] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{method.title}</h3>
                <p className="text-[#5773da] font-semibold mb-2 text-lg">{method.value}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AIAssistant isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </div>
  );
};

export default Help;
