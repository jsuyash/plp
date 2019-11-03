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
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  showSelectedFilterOptions(value) {
    this.setState({ selectedFilter: value });
  }

  handleOnChange(event) {
    const { name, value, checked } = event.target;
    const { appliedFiltersList } = this.state;
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
      this.props.dialogActions.handleOnChangeFilters(this.state.appliedFiltersList);
    }, 100);
  }
  render() {
    const { filters = [], appliedFilters } = this.props;
    const { selectedFilter } = this.state;
    const { options: filterOptions = [], type = "" } = getContent(selectedFilter, filters);

    return (
      <section className="filter-wrapper">
        <div className="title">Filters</div>
        <div className="filter-content-block">
          <div className="filter-left-block">
            {filters &&
              filters.length > 0 &&
              filters.map(filter => {
                let count = getFilterCount(filter["value"], appliedFilters);
                const filterRowClassName =
                  selectedFilter === filter["value"] ? "filter-row selected" : "filter-row";
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
              appliedFilters={appliedFilters}
              filterCode={selectedFilter}
              handleOnChange={this.handleOnChange}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Filters;
