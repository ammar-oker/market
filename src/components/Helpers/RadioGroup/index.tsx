import React, { ChangeEvent, FC, useState } from 'react';
import RadioButton from '../RadioButton';

interface RadioItem {id: string, label: string }
interface EnrichedRadioItems {
  [key: string]: {id: string, label: string, checked: boolean }
}

interface RadioGroupProps {
  items: RadioItem[],
  loading?: boolean,
  initialSelect?: keyof EnrichedRadioItems,
  onChange: (event: keyof EnrichedRadioItems) => void
}

const RadioGroup: FC<RadioGroupProps> = ({
  items, onChange, initialSelect = '0', loading,
}: RadioGroupProps) => {
  const selfRadios: EnrichedRadioItems = {};
  items.forEach((item) => {
    selfRadios[item.id] = { ...item, checked: item.id === initialSelect };
  });
  const [radios, setRadios] = useState(selfRadios);
  const [selectedRadio, setSelectedRadio] = useState<keyof EnrichedRadioItems>(initialSelect);

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setRadios({
      ...radios,
      [selectedRadio]: { ...radios[selectedRadio], checked: false }, // uncheck current radio
      [id]: { ...radios[id], checked: true }, // check the selected radio
    });
    setSelectedRadio(id);
    onChange(id);
  };
  return (
    <div>
      {
                Object.keys(radios).map((key: keyof EnrichedRadioItems) => (
                  <RadioButton
                    key={radios[key].id}
                    id={radios[key].id}
                    label={radios[key].label}
                    disabled={loading}
                    checked={radios[key].checked}
                    onChange={onRadioChange}
                  />
                ))
            }
    </div>
  );
};

export default RadioGroup;
