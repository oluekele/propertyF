import { categories } from "@/lib/property";

type Props = {
  selected: string;
  onChange: (category: string) => void;
};

export const CategoryFilter: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {categories.map((cat, index) => (
        <button
          key={index}
          onClick={() => onChange(cat.url)}
          className={`px-4 py-1.5 text-sm rounded-lg border transition ${
            selected === cat.url
              ? 'bg-blue-600 text-white border-primary'
              : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-300'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};
