import React from "react";
import "../../assets/styles/filters.scss";
import { CommonHelper } from "../../helpers";
import { FiltersOptionsByType } from "../../components";

// NOTE: hepler functions
function getFilterCount(value, appliedFilters) {
  let result = 0;
  if (appliedFilters && appliedFilters.length > 0) {
    result = CommonHelper.getByKeyValFromObject(appliedFilters, "type", value);
    if (result && Object.keys(result).length > 0) {
      result = result["filters"].length;
    } else {
      result = 0;
    }
  }
  return result;
}

function getContent(value, filters) {
  if (filters && filters.length > 0) {
    return CommonHelper.getByKeyValFromObject(filters, "value", value);
  }
  return {};
}

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: "COLORS",
      appliedFiltersList: props.appliedFilters
    };
    this.showSelectedFilterOptions = this.showSelectedFilterOptions.bind(this);
    this.handleOnChangeLocal = this.handleOnChangeLocal.bind(this);
    this.handleOnClickApplyFilter = this.handleOnClickApplyFilter.bind(this);
    this.handleOnCloseDialog = this.handleOnCloseDialog.bind(this);
  }

  showSelectedFilterOptions(value) {
    this.setState({ selectedFilter: value });
  }

  handleOnChangeLocal(event) {
    const { name, value, checked, type } = event.target;
    const { appliedFiltersList } = this.state;
    let result = [];
    // NOTE: handling value of checkbox
    if (event.target.hasOwnProperty("checked")) {
      // NOTE: push the element directly when the array is empty(Initial Value)
      if (appliedFiltersList.length === 0) {
        let filterVal = type === "checkbox" ? [value] : value;
        if (checked) {
          const obj = {
            type: name,
            filters: filterVal
          };
          result = [...appliedFiltersList, obj];
        }
      } else {
        const doesExistRes = CommonHelper.getByKeyValFromObject(appliedFiltersList, "type", name);
        const doesExist = doesExistRes ? Object.assign({}, doesExistRes) : {};
        // NOTE: check if the filter type already exist
        if (doesExist && Object.keys(doesExist).length > 0) {
          let { filters = [] } = doesExist;
          // NOTE: when filters array is not empty and value does not exist
          if (checked) {
            if (filters.constructor === Array) {
              if (filters && filters.length > 0 && filters.indexOf(value) === -1) {
                filters = [...filters, value];
              } else if (filters && filters.length === 0) {
                filters = [...filters, value];
              }
            } else if (filters.constructor === String || filters.constructor === Number) {
              filters = value;
            }
          } else if (!checked) {
            // NOTE: to remove element from filter when uncheck
            if (filters.length > 0 && filters.indexOf(value) > -1) {
              filters.splice(filters.indexOf(value), 1);
            }
          }
          doesExist.filters = filters;
          // NOTE: replace with new updated Value
          const indexOfExisting = appliedFiltersList.findIndex(af => af.type == name);
          let newValueClone = Object.assign([], appliedFiltersList);
          newValueClone[indexOfExisting] = doesExist;
          result = [...newValueClone];
        } else {
          let filterVal = type === "checkbox" ? [value] : value;
          const obj = {
            type: name,
            filters: filterVal
          };
          result = [...appliedFiltersList, obj];
        }
      }
    }

    this.setState({ appliedFiltersList: result });
  }

  handleOnClickApplyFilter() {
    const { appliedFiltersList } = this.state;
    this.props.applyFilters(appliedFiltersList);
  }

  handleOnCloseDialog() {
    this.props.onClose();
  }
  componentWillUnmount() {
    this.setState({ appliedFiltersList: [] });
  }

  render() {
    const { filters = [] } = this.props;
    const { selectedFilter, appliedFiltersList } = this.state;
    const { options: filterOptions = [], type = "" } = getContent(selectedFilter, filters);

    return (
      <React.Fragment>
        <section className="filter-wrapper">
          <div className="title">Filters</div>
          <div className="filter-content-block">
            <div className="filter-left-block">
              {filters &&
                filters.length > 0 &&
                filters.map(filter => {
                  let count = getFilterCount(filter["value"], appliedFiltersList);
                  const filterRowClassName = selectedFilter === filter["value"] ? "filter-row selected" : "filter-row";
                  return (
                    <div
                      className={filterRowClassName}
                      key={filter["value"]}
                      onClick={() => this.showSelectedFilterOptions(filter["value"])}
                    >
                      {filter["label"]}
                      {!!count && <span className="filter-count">{count}</span>}
                    </div>
                  );
                })}
            </div>
            <div className="filter-right-block">
              <FiltersOptionsByType
                type={type}
                options={filterOptions}
                appliedFilters={appliedFiltersList}
                filterCode={selectedFilter}
                handleOnChange={this.handleOnChangeLocal}
              />
            </div>
          </div>
        </section>

        <div className="dialog-footer">
          <button onClick={this.handleOnCloseDialog}>Close</button>
          <button onClick={this.handleOnClickApplyFilter}>Apply</button>
        </div>
      </React.Fragment>
    );
  }
}

export default Filters;
