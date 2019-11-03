import React from "react";
import { ProductCard, Dialog, Loader, FiltersOptionsByType } from "../components";
import { PRODUCT_LIST, SORTING_OPTIONS, FILTER_OPTIONS, LIST_LIMIT, FILTER_KEY_MAPPER } from "../constants";
import { CommonHelper } from "../helpers";
import "../assets/styles/clothing.scss";

class Clothing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      appliedFilters: [],
      sortBy: "PRICE_ASC",
      hasMore: true,
      isLoading: false,
      dialogStatus: false,
      dialogValue: {},
      dialogType: "",
      dialogProps: {}
    };

    // NOTE: on scroll
    this.handleOnScroll = this.handleOnScroll.bind(this);
    // NOTE:
    this.loadMoreContent = this.loadMoreContent.bind(this);

    this.handleOnSort = this.handleOnSort.bind(this);

    // NOTE: Dialog Related function
    this.handleOnOpenDialog = this.handleOnOpenDialog.bind(this);
    this.handleOnOpenSortingDialog = this.handleOnOpenSortingDialog.bind(this);
    this.handleOnCloseDialog = this.handleOnCloseDialog.bind(this);

    // NOTE: get initial product list
    this.getProductsOnLoad = this.getProductsOnLoad.bind(this);
    this.getFilterProductList = this.getFilterProductList.bind(this);
    this.getSortedList = this.getSortedList.bind(this);

    // NOTE: action on click
    this.applyFilters = this.applyFilters.bind(this);
    this.handleClearFilters = this.handleClearFilters.bind(this);

    // NOTE: helper function to filter product list
    this.filterProductList = this.filterProductList.bind(this);

    // NOTE: function to apply filter
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnChangeFilters = this.handleOnChangeFilters.bind(this);
  }

  componentDidMount() {
    window.document.body.scrollTo({ top: 0, behavior: "smooth" });
    window.addEventListener("scroll", this.handleOnScroll);
    this.getProductsOnLoad();
  }

  // NOTE: clear the filters and get the initial product list again.
  handleClearFilters() {
    this.setState({ appliedFilters: [] }, this.getProductsOnLoad);
  }

  // NOTE: set the filters selected by user
  handleOnChange(event) {
    const { name, value, checked } = event.target;
    const { appliedFilters: appliedFiltersList } = this.state;

    // NOTE: handling value of checkbox
    if (event.target.hasOwnProperty("checked")) {
      // NOTE: push the element directly when the array is empty(Initial Value)
      if (appliedFiltersList.length === 0) {
        if (checked) {
          const obj = {
            type: name,
            filters: [value]
          };
          this.setState({ appliedFiltersList: [...appliedFiltersList, obj] });
        }
      } else {
        const doesExist = CommonHelper.getByKeyValFromObject(appliedFiltersList, "type", name);
        // NOTE: check if the filter type already exist
        if (doesExist) {
          let { filters = [] } = doesExist;
          // NOTE: when filters array is not empty and value does not exist
          if (checked) {
            if (filters && filters.length > 0 && filters.indexOf(value) === -1) {
              filters = [...filters, value];
            } else if (filters && filters.length === 0) {
              filters = [...filters, value];
            }
          } else if (!checked) {
            // NOTE: to remove element from filter when uncheck
            if (filters.length > 0 && filters.indexOf(value) > -1) {
              filters.splice(filters.indexOf(value), 1);
            }
          }
          doesExist.filters = filters;
          this.setState({ appliedFiltersList: [...appliedFiltersList] });
        } else {
          const obj = {
            type: name,
            filters: [value]
          };
          this.setState({ appliedFiltersList: [...appliedFiltersList, obj] });
        }
      }
    }

    setTimeout(() => {
      this.handleOnChangeFilters(this.state.appliedFiltersList);
    }, 100);
  }

  // NOTE: make an api call with this filters & update products array
  applyFilters() {
    this.handleOnCloseDialog();
    this.filterProductList();
  }

  getProductsOnLoad() {
    const { sortBy } = this.state;
    const sortedList = this.getSortedList(PRODUCT_LIST, sortBy);
    const sortedLimitedList = CommonHelper.getListWithLimit(sortedList, 0, LIST_LIMIT);
    this.setState({
      products: sortedLimitedList
    });
  }

  // NOTE: pure function to act like api which returns filtered result
  getFilterProductList(appliedFilters, sortBy = "", customOptions = {}) {
    let result = PRODUCT_LIST;

    if (appliedFilters.length > 0) {
      // NOTE: getting the key to search for
      const appliedFiltersKeys = appliedFilters.map(af => af["type"]);
      appliedFiltersKeys.forEach(fk => {
        const searchKey = FILTER_KEY_MAPPER[fk];
        const searchInValue = CommonHelper.getByKeyValFromObject(appliedFilters, "type", fk)["filters"];

        if (searchInValue && searchInValue.constructor === Array) {
          if (searchInValue.length > 0) {
            result = result.filter(pl => {
              const val = pl[searchKey];
              if ((val && val.constructor === String) || val.constructor === Number) {
                return searchInValue.includes(pl[searchKey]);
              } else if (val && val.constructor === Array) {
                return val.some(ele => searchInValue.includes(ele));
              }
            });
          } else {
            const sortedList = this.getSortedList(PRODUCT_LIST, sortBy);
            const sortedLimitedList = CommonHelper.getListWithLimit(sortedList, 0, LIST_LIMIT);
            result = sortedLimitedList;
          }
        } else if (searchInValue && (searchInValue.constructor === String || searchInValue.constructor === Number)) {
          result = result.filter(pl => pl[searchKey] === searchInValue);
        }
      });
    }

    result = this.getSortedList(result, sortBy);
    // NOTE: check this for pagination
    if (customOptions && Object.keys(customOptions).length > 0) {
      const { id = "" } = customOptions;
      const indexOfCurrentListLastElement = result.findIndex(p => p["id"] === id) + 1;
      const endIndex = indexOfCurrentListLastElement + LIST_LIMIT;
      if (indexOfCurrentListLastElement >= 0) {
        result = CommonHelper.getListWithLimit(result, indexOfCurrentListLastElement, endIndex);
      }
    } else {
      result = CommonHelper.getListWithLimit(result, 0, LIST_LIMIT);
    }

    return result;
  }

  getSortedList(list, value) {
    let result = [];
    switch (value) {
      case "PRICE_ASC":
        result = CommonHelper.sortList(list, "discountedPrice");
        break;
      case "PRICE_DESC":
        result = CommonHelper.sortList(list, "discountedPrice", "DESC");
        break;
    }

    return result;
  }

  filterProductList() {
    const { appliedFilters, sortBy } = this.state;
    let result = this.getFilterProductList(appliedFilters, sortBy);
    this.setState({ products: result, hasMore: true });
  }

  handleOnChangeFilters(appliedFilters) {
    this.setState(
      {
        appliedFilters,
        dialogValue: {
          filters: FILTER_OPTIONS,
          appliedFilters: appliedFilters
        }
      },
      this.filterProductList
    );
  }

  // NOTE: open dialog with filter content
  handleOnOpenDialog() {
    const { appliedFilters } = this.state;
    this.setState({
      dialogStatus: true,
      dialogType: "FILTERS",
      dialogValue: {
        filters: FILTER_OPTIONS,
        appliedFilters: appliedFilters
      },
      dialogProps: {
        fullScreen: true,
        hideCloseIcon: true
      },
      dialogActions: {
        applyFilters: this.applyFilters,
        handleOnChangeFilters: this.handleOnChangeFilters
      }
    });
  }

  handleOnOpenSortingDialog() {
    this.setState({
      dialogStatus: true,
      dialogType: "SORTING",
      dialogProps: {
        shortBottom: true
      },
      dialogActions: {
        handleOnSort: this.handleOnSort
      }
    });
  }

  handleOnCloseDialog() {
    this.setState({
      dialogStatus: false,
      dialogType: "",
      dialogProp: {},
      dialogActions: {}
    });
  }

  handleOnScroll() {
    const { documentElement } = document;
    const { isLoading, hasMore } = this.state;

    if (isLoading || !hasMore) return;
    if (window.innerHeight + documentElement.scrollTop !== documentElement.offsetHeight) return;
    this.loadMoreContent();
  }

  // NOTE: load more content
  // main keys
  loadMoreContent() {
    const { products, appliedFilters, sortBy } = this.state;
    this.setState({ isLoading: true });

    let nextProducts = [];
    if (products && products.length > 0) {
      this.setState({ hasMore: true });
      const lastElement = products[products.length - 1];
      const { id } = lastElement;
      const customOptions = { id };
      nextProducts = this.getFilterProductList(appliedFilters, sortBy, customOptions);

      setTimeout(() => {
        this.setState({
          isLoading: false,
          products: [...this.state.products, ...nextProducts]
        });
      }, 3000);
    }
    if (nextProducts.length === 0) {
      this.setState({ hasMore: false });
    }
  }

  // NOTE: replace this with an api call later
  handleOnSort(event) {
    const { appliedFilters } = this.state;
    const { value } = event.target;
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.setState({ sortBy: value, hasMore: true });
    const filteredSortedList = this.getFilterProductList(appliedFilters, value);
    this.setState({ products: filteredSortedList });
    this.handleOnCloseDialog();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  render() {
    const { isLoading, products, dialogStatus, dialogType, dialogValue, dialogProps, dialogActions, appliedFilters } = this.state;
    const leftBlockStyle = document.documentElement.scrollTop > 60 ? { position: "fixed", top: "50px" } : { position: "sticky", top: 0 };

    return (
      <section className="clothing-wrapper">
        <div className="left-block" style={leftBlockStyle}>
          <section className="left-fitler-wrapper">
            <div className="filter-head">
              <h4>Filters</h4>
              <div onClick={this.handleClearFilters}>Clear Filter</div>
            </div>
            <div className="filters-base">
              {FILTER_OPTIONS &&
                FILTER_OPTIONS.length > 0 &&
                FILTER_OPTIONS.map(filterOption => {
                  const { label: filterTitle, options, value, type } = filterOption;
                  return (
                    <div className="filter-row" key={value}>
                      <div className="filter-label">{filterTitle}</div>
                      <div className="filter-list-option">
                        <FiltersOptionsByType
                          type={type}
                          options={options}
                          appliedFilters={appliedFilters}
                          filterCode={value}
                          handleOnChange={this.handleOnChange}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        </div>
        <div className="right-block">
          <div className="sorting-wrapper">
            <div style={{ display: "flex", alignItems: "center" }}>Search Result Count:  <span style={{fontWeight: "600", marginLeft: "5px"}}>{products.length}</span></div>
            <select onChange={this.handleOnSort}>
              {SORTING_OPTIONS &&
                SORTING_OPTIONS.length > 0 &&
                SORTING_OPTIONS.map(option => {
                  const { label, value } = option;
                  return (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="listing-wrapper">
            {(products &&
              products.length > 0 &&
              products.map(product => {
                return <ProductCard key={product.id} product={product} />;
              })) || <div>Nothing Found</div>}
          </div>
          <div className="sorting-filter-options-wrapper">
            <button onClick={this.handleOnOpenDialog}>Filters</button>
            <button onClick={this.handleOnOpenSortingDialog}>Sort</button>
          </div>
        </div>
        <Dialog
          status={dialogStatus}
          onClose={this.handleOnCloseDialog}
          dialogType={dialogType}
          dialogProps={dialogProps}
          dialogActions={dialogActions}
          dialogValue={dialogValue}
        />
        <Loader status={isLoading} />
      </section>
    );
  }
}
export default Clothing;
