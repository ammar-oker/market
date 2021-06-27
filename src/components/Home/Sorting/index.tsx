import React, { FC, useEffect, useState } from 'react';
import RadioGroup from '../../Helpers/RadioGroup';
import Card from '../../Helpers/Card';

interface SortingProps {
  onChange?: (value: string|number) => void
}

const Sorting: FC<SortingProps> = ({ onChange }) => {
  const [radios] = useState([
    { id: 'price', label: 'Price low to high' },
    { id: '-price', label: 'Price high to low' },
    { id: 'new', label: 'New to old' },
    { id: '-new', label: 'Old to new' },
  ]);

  // select the first radio initially
  const [selectedRadio, setSelectedRadio] = useState<string|number>('price');

  useEffect(() => {
    if (onChange) onChange(selectedRadio);
  }, [selectedRadio]);

  return (
    <>
      <Card title="Sorting" className="w-full">
        <div className="px-2">
          <RadioGroup initialSelect="price" items={radios} onChange={(event) => { setSelectedRadio(event); }} />
        </div>
      </Card>
    </>
  );
};
export default Sorting;
