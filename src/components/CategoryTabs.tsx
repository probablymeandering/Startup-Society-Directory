
import React from 'react';
import { categories } from '@/lib/data';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-3 px-6 bg-white/30 backdrop-blur-sm border-b border-border/50 slide-up">
      <div className="max-w-7xl mx-auto flex gap-1">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-tab whitespace-nowrap ${
              category === activeCategory ? 'active' : ''
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
