import React, {
  ChangeEvent, FC, useEffect, useState,
} from 'react';
import produce from 'immer';
import Card from '../../Helpers/Card';
import TextInput from '../../Helpers/TextInput';
import Checkbox from '../../Helpers/Checkbox';

export interface CheckboxItem {
  id: string,
  label: string,
  value: string,
  checked?: boolean
}

interface FiltersProps {
  title?: string
  items: CheckboxItem[],
  loading?: boolean,
  className?: string,
  updateItems?: (items: CheckboxItem[]) => void
  updateSelectedItems?: (items: CheckboxItem[]) => void
  onSearchResults?: (items: CheckboxItem[]) => void
}

const Filters: FC<FiltersProps> = ({
  title,
  className,
  onSearchResults,
  items,
  updateItems,
  updateSelectedItems,
  loading,
}) => {
  const [filteredItems, setFilteredItems] = useState<CheckboxItem[]>();
  const [selectedItems, setSelectedItems] = useState<CheckboxItem[]>(items);
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => { // invoke once on component mount
    if (onSearchResults) { // onSearchResults is used only for testing
      onSearchResults(items);
    }
  }, []);

  useEffect(() => {
    if (!filteredItems) {
      setFilteredItems(items);
    }
  }, [items]);

  useEffect(() => {
    if (selectAll) {
      setFilteredItems(filteredItems?.map((item) => ({ ...item, checked: false })));
      setSelectedItems([]);
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
    const {
      checked, label, id, value,
    } = e;
    if (checked) {
      // add the items to selectedItems
      setSelectedItems([
        ...selectedItems,
        {
          checked, label, id, value,
        },
      ]);
    } else {
      // remove the items from selectedItems
      setSelectedItems(selectedItems.filter((item) => (item.id !== id)));
    }

    // update the item in filteredItems
    const index = (arr: CheckboxItem[]) => arr.findIndex((item) => item.id === id);
    const results = (arr: CheckboxItem[], i: number) => produce(arr, (draft) => {
      // eslint-disable-next-line no-param-reassign
      draft[i].checked = checked;
    });
    if (filteredItems) setFilteredItems(results(filteredItems, index(filteredItems)));
    if (updateItems) {
      updateItems(results(items, index(items)));
    }
  };

  const SearchItemsByLabel = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let results: CheckboxItem[];
    if (value.length) {
      results = items.filter((item) => (
        item.label.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      results = items;
    }
    setFilteredItems(results);
    if (onSearchResults) { // onSearchResults is used only for testing
      onSearchResults(results);
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
          <Checkbox disabled={loading} id={`${title}-all`} label="All" checked={selectAll} onChange={onSelectAll} />
          {
                    filteredItems?.length ? (
                      filteredItems.map((item) => (
                        <Checkbox
                          key={item.id}
                          id={item.id}
                          label={(<span>{item.label}</span>)}
                          checked={item.checked}
                          disabled={loading}
                          onChange={({ target }) => {
                            handleCheckboxChange(
                              { ...item, checked: target.checked },
                            );
                          }}
                        />
                      ))
                    ) : ('Couldn\'t match any results')
                }
        </div>
      </div>
    </Card>
  );
};

export default Filters;
