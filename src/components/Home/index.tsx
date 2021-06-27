import React, { FC, useState } from 'react';
import Products from './Products';
import Sorting from './Sorting';
import Filters, { CheckboxItems } from './Filters';
import Cart from './Cart';

const Home : FC = () => {
  const [brands, setBrands] = useState<CheckboxItems>({
    brand1: { id: 'brand1', label: 'Brand item 1', checked: false },
    brand2: { id: 'brand2', label: 'Brand item 2', checked: false },
    brand3: { id: 'brand3', label: 'Brand item 3', checked: false },
    brand4: { id: 'brand4', label: 'Brand item 5', checked: false },
    brand5: { id: 'brand5', label: 'Brand item 6', checked: false },
    brand6: { id: 'brand6', label: 'Brand item 7', checked: false },
  });
  const [tags, setTags] = useState<CheckboxItems>({
    tag1: { id: 'tag1', label: 'Tag item 1', checked: false },
    tag2: { id: 'tag2', label: 'Tag item 2', checked: false },
    tag3: { id: 'tag3', label: 'Tag item 3', checked: false },
    tag4: { id: 'tag4', label: 'Tag item 5', checked: false },
    tag5: { id: 'tag5', label: 'Tag item 6', checked: false },
    tag6: { id: 'tag6', label: 'Tag item 7', checked: false },
  });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedBrands, setSelectedBrands] = useState<CheckboxItems>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTags, setSelectedTags] = useState<CheckboxItems>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedSorting, setSelectedSorting] = useState<string|number>('price');

  return (

    <div className="px-5 md:px-12 lg:px-26 grid grid-cols-4">
      <div>
        <Sorting onChange={setSelectedSorting} />
        <Filters
          key="brands-filter"
          title="Brands"
          items={brands}
          className="mt-7"
          updateSelectedItems={setSelectedBrands}
          updateItems={setBrands}
        />
        <Filters
          key="tags-filter"
          title="Tags"
          items={tags}
          className="mt-7"
          updateSelectedItems={setSelectedTags}
          updateItems={setTags}
        />
      </div>
      <div className="col-span-2">
        <Products />
      </div>
      <div>
        <Cart />
      </div>
    </div>
  );
};

export default Home;
