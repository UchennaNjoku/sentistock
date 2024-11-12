import React from 'react';

function CategorySelector({ selectedCategories, setSelectedCategories }) {
  const categories = ['earnings', 'product', 'management', 'market', 'legal', 'partnership', 'other'];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">News Categories:</h3>
      <div className="flex flex-wrap gap-4">
        {categories.map(category => (
          <label key={category} className="inline-flex items-center">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
