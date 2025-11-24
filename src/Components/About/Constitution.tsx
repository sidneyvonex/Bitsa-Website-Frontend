import { FileText } from 'lucide-react';



export const Constitution = () => {

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Minimal wavy SVG pattern background */}
      <svg
        className="absolute top-0 left-0 w-full h-64 z-0"
        viewBox="0 0 1440 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.18 }}
      >
        <path
          d="M0 80 Q 360 160 720 80 T 1440 80"
          stroke="#cbd5e1"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 120 Q 360 200 720 120 T 1440 120"
          stroke="#cbd5e1"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 160 Q 360 240 720 160 T 1440 160"
          stroke="#cbd5e1"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <main className="relative z-10 py-24 flex items-center justify-center min-h-screen">
        <section className="text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-full shadow-md">
              <FileText className="w-14 h-14 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">BITSA Constitution</h1>
            <p className="text-gray-700 text-lg max-w-xl mx-auto">
              Download the official BITSA Constitution document below. For the latest version, check back regularly.
            </p>
            <a
              href="/assets/bitsa-constitution.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all mt-2"
            >
              <FileText className="w-5 h-5" />
              Download Constitution
            </a>
            <span className="text-xs text-gray-600 mt-1">This document may be updated periodically.</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Constitution;