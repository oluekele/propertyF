// components/sections/TestimonialsSection.tsx
import { Card, CardContent } from "@/components/ui/Card";
import { testimonials } from "@/lib/property";



export const TestimonialsSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="w-full lg:w-4/5 mx-auto">
        <h3 className="text-3xl font-bold text-center mb-6">What Our Clients Say</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card key={i} className="shadow-md p-4">
              <CardContent>
                <blockquote className="text-sm text-gray-600 italic">
                  “{t.message}”
                </blockquote>
                <p className="mt-2 font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
