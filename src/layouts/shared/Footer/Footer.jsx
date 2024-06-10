
const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 text-white">
      <div className="container px-4 lg:px-0">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="mb-8 w-full sm:w-1/2 md:w-1/4">
            <h2 className="text-lg font-bold">AssetAura</h2>
            <p className="mt-2 max-w-[280px] text-gray-400">
              Efficient and effective asset management.
            </p>
          </div>
          {/* Quick Links */}
          <div className="mb-8 w-full sm:w-1/2 md:w-1/4">
            <h2 className="text-lg font-bold">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/#" className="hover:underline">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/#" className="hover:underline">
                  Profile
                </a>
              </li>
              <li>
                <a href="/#" className="hover:underline">
                  Reports
                </a>
              </li>
              <li>
                <a href="/#" className="hover:underline">
                  Settings
                </a>
              </li>
            </ul>
          </div>
          {/* Resources */}
          <div className="mb-8 w-full sm:w-1/2 md:w-1/4">
            <h2 className="text-lg font-bold">Resources</h2>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="/#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="/#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="mb-8 w-full sm:w-1/2 md:w-1/4">
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p className="mt-2 text-gray-400">Email: support@assetaura.com</p>
            <p className="mt-1 text-gray-400">Phone: (123) 456-7890</p>
            <div className="mt-4 space-x-4">
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-blue-300 hover:text-blue-500">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <i className="fab falinkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; 2024 AssetAura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
