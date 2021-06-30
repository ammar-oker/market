import React, { Component, ReactNode } from 'react';
import { isEqual } from 'lodash';
import { FilterIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Sorting, { SortingItem } from './Sorting';
import Filters, { CheckboxItem } from './Filters';
import Cart from './Cart';
import Categories from './Products/Categories';
import ProductList from './Products/ProductList';
import Pagination from './Products/Pagination';
import { IHomeState, ServerParams } from './types';
import './styles.css';

class Home extends Component<any, IHomeState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      products: [],
      brands: [],
      tags: [],
      selectedBrands: [],
      selectedTags: [],
      selectedSorting: {
        id: 'price', value: 'price', type: 'asc', label: 'Price low to high',
      },
      itemType: 'mug',
      totalItemsCount: 0,
      page: 1,
      loading: false,
      leftSidebarOpen: false,
      rightSidebarOpen: false,
      serverParams: {
        _page: 1,
        _limit: 16,
        _sort: 'price',
        _order: 'asc',
        itemType: 'mug',
      },
    };
  }

  async componentDidMount(): Promise<void> {
    await this.fetchManufacturers();
    await this.fetchTags();
    await this.fetchProducts();
  }

  async componentDidUpdate(
    prevProps: Readonly<any>, prevState: Readonly<IHomeState>,
  ): Promise<void> {
    const {
      serverParams, itemType, page, selectedSorting, selectedBrands, selectedTags,
    } = this.state;

    // update serverParams on itemType change
    if (prevState.itemType !== itemType) {
      this.setServerParams({
        ...serverParams,
        itemType,
      });
    }

    // update serverParams on page change
    if (prevState.page !== page) {
      this.setServerParams({ ...serverParams, _page: page });
    }

    // // update serverParams on selectedSorting change
    if (!isEqual(prevState.selectedSorting, selectedSorting)) {
      this.setServerParams({
        ...serverParams,
        _order: selectedSorting.type,
        _sort: selectedSorting.value,
      });
    }

    // update serverParams on selectedBrands change
    if (!isEqual(prevState.selectedBrands, selectedBrands)) {
      this.setServerParams({
        ...serverParams,
        manufacturers: selectedBrands.map((item) => (item.value)),
      });
    }

    // // update serverParams on selectedTags change
    if (!isEqual(prevState.selectedTags, selectedTags)) {
      this.setServerParams({
        ...serverParams,
        tagsArr: selectedTags.map((item) => (item.value)),
      });
    }

    if (!isEqual(prevState.serverParams, serverParams)) {
      await this.fetchProducts();
    }
  }

  fetchProducts = async (): Promise<void> => {
    const { serverParams } = this.state;
    try {
      this.setState({ loading: true });
      const response = await axios.get('https://market-api2021.herokuapp.com/products/', {
        params: {
          _page: serverParams._page,
          _limit: serverParams._limit,
          _sort: serverParams._sort,
          _order: serverParams._order,
          itemType: serverParams.itemType,
          tags_like: serverParams.tagsArr?.join(','),
          manufacturer_like: serverParams.manufacturers?.join(','),
        },
      });

      this.setState({ products: response.data, totalItemsCount: parseInt(response.headers['x-total-count'], 10) });
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({ loading: false });
    }
  }

  fetchManufacturers = async (): Promise<void> => {
    try {
      const response = await axios.get('https://market-api2021.herokuapp.com/manufacturers/');
      this.setBrands(response.data.map((item: any) => ({
        id: item.id, label: item.name, value: item.slug, checked: false,
      })));
    } catch (e) {
      console.error(e);
    }
  }

  fetchTags = async (): Promise<void> => {
    try {
      const response = await axios.get('https://market-api2021.herokuapp.com/products/');
      const tags: string[] = [];
      // NOTE: nested loops, huge performance issue
      response.data.forEach((item: any) => {
        item.tags.forEach((tag: string) => {
          tags.push(tag);
        });
      });
      this.setTags([...new Set(tags)].map((tag) => ({
        id: tag,
        value: tag,
        label: tag,
        checked: false,
      })));
    } catch (e) {
      console.error(e);
    }
  }

    setSelectedSorting = (selectedSorting: SortingItem): void => {
      this.setState({ selectedSorting });
    }

    setSelectedBrands = (selectedBrands: CheckboxItem[]): void => {
      this.setState({ selectedBrands });
    }

    setBrands = (brands: CheckboxItem[]): void => {
      this.setState({ brands });
    }

    setSelectedTags = (selectedTags: CheckboxItem[]): void => {
      this.setState({ selectedTags });
    }

    setTags = (tags: CheckboxItem[]): void => {
      this.setState({ tags });
    }

    setItemType = (itemType: string): void => {
      this.setState({ itemType });
    }

    setPage = (page: number): void => {
      this.setState({ page });
    }

    setServerParams = (serverParams: ServerParams): void => {
      this.setState({ serverParams });
    }

    render(): ReactNode {
      const {
        brands, tags, itemType, products, page, totalItemsCount,
        loading, leftSidebarOpen, rightSidebarOpen,
      } = this.state;
      return (
        <div className="container mx-auto grid grid-cols-4">
          <div className={`px-2 left sidebar overflow-y-auto ${leftSidebarOpen ? 'open' : ''}`}>
            <Sorting loading={loading} onChange={this.setSelectedSorting} />
            <Filters
              key="brands-filter"
              title="Brands"
              items={brands}
              loading={loading}
              className="mt-7"
              updateSelectedItems={this.setSelectedBrands}
              updateItems={this.setBrands}
            />
            <Filters
              key="tags-filter"
              title="Tags"
              items={tags}
              loading={loading}
              className="mt-7"
              updateSelectedItems={this.setSelectedTags}
              updateItems={this.setTags}
            />
          </div>
          <div className="col-span-4 lg:col-span-2 px-2">
            <h1 className="text-lg text-main-title">Products</h1>
            <Categories loading={loading} value={itemType} onChange={this.setItemType} />
            <ProductList products={products} loading={loading} />
            <Pagination
              page={page}
              length={Math.ceil(totalItemsCount / 16)}
              onChange={this.setPage}
            />
          </div>
          <div className={`px-2 right sidebar ${rightSidebarOpen ? 'open' : ''}`}>
            <Cart />
          </div>
          <section id="bottom-navigation" className="lg:hidden block h-14 fixed inset-x-0 bottom-0 z-10 bg-white shadow">
            <div id="tabs" className="flex justify-between">
              <button
                type="button"
                className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
                onClick={() => { this.setState({ leftSidebarOpen: !leftSidebarOpen }); }}
              >
                <FilterIcon className="h-5 w-5 inline-block mb-1" />
                <span className="tab tab-account block text-xs">Filters</span>
              </button>
              <button
                type="button"
                className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
                onClick={() => { this.setState({ rightSidebarOpen: !rightSidebarOpen }); }}
              >
                <ShoppingCartIcon className="h-5 w-5 inline-block mb-1" />
                <span className="tab tab-account block text-xs">Cart</span>
              </button>
            </div>
          </section>
        </div>
      );
    }
}

export default Home;
