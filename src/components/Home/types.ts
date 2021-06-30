import { CheckboxItem } from './Filters';
import { SortingItem } from './Sorting';

export interface ServerParams {
    _page: number,
    _limit: number,
    _sort: 'added'|'price',
    _order: 'desc'|'asc',
    itemType?: string,
    manufacturers?: string[],
    tagsArr?: string[]
}
export interface Product {
    id: string,
    tags?: string[],
    price: number,
    name: string,
    description: string,
    slug?: string,
    added: number,
    manufacturer: string,
    itemType: string,
}

export interface IHomeState {
    products: Product[],
    brands: CheckboxItem[],
    tags: CheckboxItem[],
    selectedBrands: CheckboxItem[],
    selectedTags: CheckboxItem[],
    selectedSorting: SortingItem,
    itemType: string,
    totalItemsCount: number,
    page: number,
    loading: boolean,
    leftSidebarOpen: boolean,
    rightSidebarOpen: boolean,
    serverParams: ServerParams
}
