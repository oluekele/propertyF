// components/sections/AboutSection.tsx
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export const AboutSection = () => {
  return (
    <section className="py-16 px-6 grid md:grid-cols-2 gap-8 items-center w-full lg:w-4/5 mx-auto">
      <Image
        src="/sec.jpg"
        alt="Team working on properties"
        width={400}
        height={400}
        className="rounded-lg shadow-lg"
      />
      <div>
        <h3 className="text-3xl font-bold mb-4">About Property Hub</h3>
        <p className="mb-4 text-gray-700">
          Property Hub is your trusted partner in navigating the dynamic world of
          real estate and vehicle transactions. We offer premium services with
          verified assets, outstanding customer service, and expert consultation.
        </p>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Preferential Pricing and Flexible Payment Plans</li>
          <li>Comprehensive After-Sales Support and Consultation</li>
          <li>Unique Property Appeal and Tailored Design Solutions</li>
          <li>Most Effective and Exclusive Real Estate Solutions</li>
        </ul>
        <Button className="mt-6">Learn More</Button>
      </div>
    </section>
  );
};
