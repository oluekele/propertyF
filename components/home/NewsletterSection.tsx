// components/sections/NewsletterSection.tsx
// import { Input } from "@/components/ui/Input";
// import { Button } from "@/components/ui/Button";

export const NewsletterSection = () => {
  return (
    <footer className="bg-white py-12 px-6 text-center">
      {/* <h4 className="text-xl font-bold mb-2">Subscribe to our newsletter</h4>
      <p className="text-gray-500 mb-4">
        Stay updated on new listings, special deals, and property tips.
      </p>
      <form className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-xl mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:w-64"
          required
        />
        <Button type="submit">Subscribe</Button>
      </form> */}
      <p className="text-sm text-gray-600 mt-6">© {new Date().getFullYear()} Property Hub. All rights reserved.</p>
    </footer>
  );
};
