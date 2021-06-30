import React, { FC, useState } from 'react';
import RadioGroup from '../../Helpers/RadioGroup';
import Card from '../../Helpers/Card';

export interface SortingItem {
  id: string,
  value: 'price'|'added',
  label: string,
  type: 'asc'|'desc',
}

interface SortingProps {
  onChange: (value: SortingItem) => void,
  loading?: boolean
}

const Sorting: FC<SortingProps> = ({ onChange, loading }) => {
  const [radios] = useState<SortingItem[]>([
    {
      id: 'price', value: 'price', type: 'asc', label: 'Price low to high',
    },
    {
      id: '-price', value: 'price', type: 'desc', label: 'Price high to low',
    },
    {
      id: 'added', value: 'added', type: 'asc', label: 'New to old',
    },
    {
      id: '-added', value: 'added', type: 'desc', label: 'Old to new',
    },
  ]);

  const handleChange = (e: string|number) => {
    const radioItem = radios.find((radio) => (radio.id === e));
    if (radioItem) onChange(radioItem);
  };

  return (
    <>
      <Card title="Sorting" className="w-full">
        <div className="px-2">
          <RadioGroup loading={loading} initialSelect="price" items={radios} onChange={handleChange} />
        </div>
      </Card>
    </>
  );
};
export default Sorting;
