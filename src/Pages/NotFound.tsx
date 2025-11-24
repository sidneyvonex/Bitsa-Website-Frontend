import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md w-full">
        {/* Simple animated face */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-32 h-32">
            {/* Head */}
            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
              {/* Left Eye */}
              <div className="absolute top-12 left-8 w-6 h-6 bg-gray-400 rounded-full"></div>
              
              {/* Right Eye */}
              <div className="absolute top-12 right-8 w-6 h-6 bg-gray-400 rounded-full"></div>

              {/* Sad mouth */}
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <svg width="40" height="20" viewBox="0 0 40 20">
                  <path
                    d="M 5 5 Q 20 15 35 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    className="text-gray-600"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
        
        {/* Main text */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};
