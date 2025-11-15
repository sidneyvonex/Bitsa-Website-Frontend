export const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-[#1e3a8a] to-[#1e40af] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/bitsa-logo.png"
                alt="BITSA Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
              <h3 className="text-white font-bold text-xl">Bachelor of Information Technology Students Association</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-200">
              The Bachelor of Information Technology Students Association (BITSA) is a vibrant tech community at the University of Eastern Africa, Baraton, fostering innovation and skill development among students across all disciplines.
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-yellow-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-yellow-400 transition-colors">
                  Contact
                </a>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <p>Email: bitsaclub@ueab.ac.ke</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-yellow-400 transition-colors" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-yellow-400 transition-colors" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-yellow-400 transition-colors" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f59e0b] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white text-sm text-center">
            Copyright © 2025, BITSA | All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
