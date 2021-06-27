import React, {
  ChangeEvent, FC, useEffect, useState,
} from 'react';
import Card from '../../Helpers/Card';
import TextInput from '../../Helpers/TextInput';
import Checkbox from '../../Helpers/Checkbox';

export interface CheckboxItem {
  id: string,
  label: string,
  checked?: boolean
}

export interface CheckboxItems {
  [key: string]: CheckboxItem
}

interface FiltersProps {
  title?: string
  items: CheckboxItems,
  className?: string,
  updateItems?: (items: CheckboxItems) => void
  updateSelectedItems?: (items: CheckboxItems) => void
  onSearchResults?: (items: CheckboxItems) => void
}

const Filters: FC<FiltersProps> = ({
  title, className, onSearchResults, items, updateItems, updateSelectedItems,
}) => {
  const [filteredItems, setFilteredItems] = useState<CheckboxItems>(items);
  const [selectedItems, setSelectedItems] = useState<CheckboxItems>(items);
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => { // invoke once on component mount
    if (onSearchResults) { // onSearchResults is used only for testing
      onSearchResults(items);
    }
  }, []);

  useEffect(() => {
    if (selectAll) {
      const filteredItemsObj: CheckboxItems = {};
      Object.keys(filteredItems).forEach((key: keyof CheckboxItems) => {
        Object.assign(filteredItemsObj, { [key]: { ...filteredItems[key], checked: false } });
      });
      setFilteredItems(filteredItemsObj);
      setSelectedItems({});
    }
  }, [selectAll]);

  useEffect(() => {
    if (!Object.keys(selectedItems).length) setSelectAll(true);
    else setSelectAll(false);
    if (updateSelectedItems) updateSelectedItems(selectedItems);
  }, [selectedItems]);

  const onSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
    }
  };

  const handleCheckboxChange = (e: CheckboxItem) => {
    const { checked, label, id } = e;
    if (checked) {
      setSelectedItems({
        ...selectedItems,
        [id]: { id, label, checked },
      });
    } else {
      const setSelectedItemsCopy = { ...selectedItems };
      delete setSelectedItemsCopy[id];
      setSelectedItems(setSelectedItemsCopy);
    }
    setFilteredItems({
      ...filteredItems,
      [id]: { ...filteredItems[id], checked },
    });
    if (updateItems) {
      updateItems({
        ...items,
        [id]: { ...filteredItems[id], checked },
      });
    }
  };

  const SearchItemsByLabel = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let results: CheckboxItem[];
    if (value.length) {
      results = Object.values(items).filter((item) => (
        item.label.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      results = Object.values(items);
    }
    const resultsObj: CheckboxItems = {};
    results.forEach((item) => {
      Object.assign(resultsObj, { [item.id]: item });
    });
    setFilteredItems(resultsObj);
    if (onSearchResults) { // onSearchResults is used only for testing
      onSearchResults(resultsObj);
    }
  };

  return (
    <Card title={title} className={className}>
      <div className="pb-4">
        <div className="px-2">
          <TextInput
            id={title}
            placeholder="Search Brands"
            className=""
            onChange={SearchItemsByLabel}
          />
        </div>
        <div className="max-h-34 overflow-y-auto px-2 mt-2">
          <Checkbox id={`${title}-all`} label="All" checked={selectAll} onChange={onSelectAll} />
          {
                    Object.keys(filteredItems).map((key: keyof CheckboxItems) => (
                      <Checkbox
                        key={filteredItems[key].id}
                        id={filteredItems[key].id}
                        label={(<span>{filteredItems[key].label}</span>)}
                        checked={filteredItems[key].checked}
                        onChange={({ target }) => {
                          handleCheckboxChange({
                            id: filteredItems[key].id,
                            label: filteredItems[key].label,
                            checked: target.checked,
                          });
                        }}
                      />
                    ))
                }
        </div>
      </div>
    </Card>
  );
};

export default Filters;
