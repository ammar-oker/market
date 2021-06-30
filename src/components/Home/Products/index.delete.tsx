// import React, {
//   FC, useLayoutEffect, useState,
// } from 'react';
// import { CheckboxItem } from '../Filters';
// import { SortingItem } from '../Sorting';
//
//
//
// interface ProductsProps {
//     rawItems: Product[],
//     sort?: SortingItem,
//     brands?: CheckboxItem[],
//     tags?: CheckboxItem[]
//     perPage?: number
// }
//
// const Products: FC<ProductsProps> = ({
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   sort, rawItems, brands, tags, perPage = 16,
// }) => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [page, setPage] = useState(1);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [category, setCategory] = useState('mug');
//   const [filteredItems, setFilteredItems] = useState<Product[]>(
//     rawItems.filter((item) => item.itemType === category),
//   );
//
//   const sortFunction = (sortType: 'asc' | 'desc', value: 'price' | 'added') => {
//     switch (sortType) {
//       case 'asc':
//         return (a: Product, b: Product) => a[value] - b[value];
//       case 'desc':
//         return (a: Product, b: Product) => b[value] - a[value];
//       default:
//         return undefined;
//     }
//   };
//
//   const filterByBrand = () => {
//     const brandValues = brands?.map((brand) => (brand.value));
//     if (brandValues && brandValues.length) {
//       setFilteredItems(
//         rawItems
//           .filter((item) => item.itemType === category)
//           .filter((item) => brandValues?.includes(item.manufacturer))
//           .sort(sort ? sortFunction(sort.type, sort.value) : undefined),
//       );
//     } else {
//       setFilteredItems(rawItems
//         .filter((item) => item.itemType === category)
//         .sort(sort ? sortFunction(sort.type, sort.value) : undefined));
//       setPage(1);
//     }
//   };
//
//   useLayoutEffect(() => {
//     const brandValues = brands?.map((brand) => (brand.value));
//     if (category) {
//       setFilteredItems(rawItems
//         .filter((item) => item.itemType === category)
//         .filter((item) => (brandValues ? brandValues.includes(item.manufacturer) : true))
//         .sort(sort ? sortFunction(sort.type, sort.value) : undefined));
//       setPage(1);
//     }
//   }, [category]);
//
//   useLayoutEffect(() => {
//     if (sort?.type && sort.value) {
//       setFilteredItems([...filteredItems].sort(sortFunction(sort.type, sort.value)));
//     }
//   }, [sort]);
//
//   useLayoutEffect(() => {
//     filterByBrand();
//   }, [brands]);
//
//   useLayoutEffect(() => {
//     const tagValues = tags?.map((tag) => (tag.value));
//     if (tagValues && tagValues.length) {
//       setFilteredItems(filteredItems
//         .filter((item) => (
//           item.tags?.some((tag) => (tagValues?.includes(tag)))
//         )).sort(sort ? sortFunction(sort.type, sort.value) : undefined));
//     } else {
//       setFilteredItems(rawItems
//         .filter((item) => item.itemType === category)
//         .sort(sort ? sortFunction(sort.type, sort.value) : undefined));
//       setPage(1);
//     }
//   }, [tags]);
//
//   return (
//     <div />
//   );
// };
//
// export default Products;
