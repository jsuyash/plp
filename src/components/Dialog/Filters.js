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
    const { appliedFiltersList } = this.state;
    const result = CommonHelper.getSelectedFilters(event, appliedFiltersList);

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
