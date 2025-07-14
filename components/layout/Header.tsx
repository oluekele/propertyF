// "use client";

// import { useState } from "react";
// import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { usePathname } from "next/navigation";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/properties", label: "Properties" },
//   { href: "/contact", label: "Contact" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const pathname = usePathname()

//   return (
//     <motion.nav
//       className="fixed top-0 left-0 w-full bg-white shadow z-50"
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         <div className="text-xl font-bold text-primary">
//           <Link href="/" className="text-[#03041d] flex items-center gap-3">
//             <Image src={'/logo.png'} width={50} height={50} alt='Company logo' />
//             <span>Efan Rice Factory</span>
//         </Link>
          
//         </div>
//         <div className="hidden md:flex items-center space-x-6">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`${
//                 pathname === link.href
//                   ? "text-[#03041d] font-semibold"
//                   : "text-gray-600 hover:text-[#03041d]"
//               } hover:text-primary transition`}
//             >
//               {link.label}
//             </Link>
//           ))}
//           <div className="flex items-center gap-5">
//             <Link
//               href="https://wa.me/2348107732724"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
//             >
//               <FaWhatsapp className="inline mr-2" />
//               Chat
//             </Link>
//             <Link
//               href="/login"
//               rel="noopener noreferrer"
//               className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
//             >
//               Login
//             </Link>
//           </div>
//         </div>
//         {/* mobile button */}
//         <div className="md:hidden text-2xl text-primary" onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </div>
//       </div>

//       {/* mobile menu */}
//       {menuOpen && (
//         <div className="bg-white shadow-md md:hidden p-4 space-y-4">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setMenuOpen(false)}
//               className={`${
//                 pathname === link.href
//                   ? "text-[#03041d] font-semibold"
//                   : "text-gray-600 hover:text-[#03041d]"
//               } block hover:text-primary transition`}
//             >
//               {link.label}
//             </Link>
//           ))}
//           <div className="flex items-center gap-5">
//             <Link
//               href="https://wa.me/2348107732724"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
//             >
//               <FaWhatsapp className="inline mr-2" />
//               Chat
//             </Link>
//             <Link
//               href="/login"
//               rel="noopener noreferrer"
//               className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
//             >
//               Login
//             </Link>
//           </div>
//         </div>
//       )}
//     </motion.nav>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };
  
  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-white shadow z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-primary">
          <Link href="/" className="text-[#03041d] flex items-center gap-3">
            <Image src={"/logo.png"} width={50} height={50} alt="Company logo" />
            <span>Efan Rice Factory</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-[#03041d] font-semibold"
                  : "text-gray-600 hover:text-[#03041d]"
              } hover:text-primary transition`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-5">
            <Link
              href="https://wa.me/2348107732724"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
            >
              <FaWhatsapp className="inline mr-2" />
              Chat
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition text-center"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                rel="noopener noreferrer"
                className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile button */}
        <div className="md:hidden text-2xl text-primary" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="bg-white shadow-md md:hidden p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`${
                pathname === link.href
                  ? "text-[#03041d] font-semibold"
                  : "text-gray-600 hover:text-[#03041d]"
              } block hover:text-primary transition`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3">
            <Link
              href="https://wa.me/2348107732724"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition text-center"
            >
              <FaWhatsapp className="inline mr-2" />
              Chat
            </Link>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition text-center"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
