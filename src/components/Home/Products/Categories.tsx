import React, { FC, useState } from 'react';

interface CategoriesProps {
    value: string,
    loading?: boolean,
    onChange: (e: string) => void
}

const Categories: FC<CategoriesProps> = ({ value, onChange, loading }) => {
  const [categories] = useState([
    { slug: 'mug', name: 'Mug' },
    { slug: 'shirt', name: 'Shirt' },
  ]);
  return (
    <div className="pt-6">
      {
                categories.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    disabled={loading}
                    data-testid={`category-button-${category.slug}`}
                    className={`px-4 py-2.5 text-xs-1 font-semibold rounded-sm mr-2
                      ${value === category.slug ? 'bg-primary text-secondary' : 'bg-secondary text-primary'}
                    `}
                    onClick={() => {
                      onChange(category.slug);
                    }}
                  >
                    {category.name}
                  </button>
                ))
            }
    </div>
  );
};

export default Categories;
