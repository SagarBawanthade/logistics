import Link from 'next/link';
import Image from 'next/image';
import logo from "../../../public/images/navlogo.png";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between flex-wrap">
          <div className="flex items-center space-x-3">
            {/* Logo and Brand Name */}
            <Image
              src={logo}
              alt="Brand Logo"
              width={40}
              height={40}
              className="rounded-full"

              
            />
            <h1 className="text-2xl font-bold ml-2">Royal Express Admin Panel</h1>
          </div>
          <nav className="mt-2">
            <ul className="flex flex-wrap space-x-4 md:space-x-8">
              <li>
                <Link
                  href="/pages/admin/dashboard"
                  className="transition-colors duration-300 hover:text-gray-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/admin/parcel"
                  className="transition-colors duration-300 hover:text-gray-300"
                >
                  Parcels
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/admin/addparcel"
                  className="transition-colors duration-300 hover:text-gray-300"
                >
                  Add Parcel
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/admin/contacts"
                  className="transition-colors duration-300 hover:text-gray-300"
                >
                  Contacts
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 p-6 bg-white shadow-md rounded-md mx-4 my-6 lg:mx-8 lg:my-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 mt-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} Royal Express. All rights reserved.</p>
      </footer>
    </div>
  );
}
