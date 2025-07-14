// components/sections/ServicesSection.tsx
import { Card, CardContent } from "@/components/ui/Card";
import { services } from "@/lib/service";




export const ServicesSection = () => {
  return (
    <section className="py-16 px-6 text-center w-full lg:w-4/5 mx-auto">
      <h3 className="text-3xl font-bold mb-4">Our Comprehensive Services</h3>
      <p className="text-gray-600 mb-8">
        From residential to commercial, and even premium vehicles, we cover all your asset needs.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="p-4 text-center shadow-md">
            <CardContent>
              <span className="w-full flex items-center justify-center text-3xl mb-2">{service.img}</span>
              <h4 className="text-lg font-semibold mb-2">{service.name}</h4>
              <p className="text-sm text-gray-500">
                High-quality, trusted options tailored for every need and budget.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
