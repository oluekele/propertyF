'use client'


import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <motion.section
      className="min-h-[80vh] bg-cover bg-center flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundImage: "url('/bg.jpg')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Find Your Dream Space Today
      </motion.h2>
      <p className="text-white max-w-xl mb-6">
        Connecting you with the finest properties and vehicles across the globe.
      </p>
      <div className="space-x-4">
        <Link href={'/properties'}>
          <Button variant="default" className="bg-orange-600">Explore Listings</Button>
        </Link>
        <Link href={'/contact'}>
          <Button  className="bg-blue-900 text-white">Contact Us</Button>
        </Link>
      </div>
    </motion.section>
  );
};
