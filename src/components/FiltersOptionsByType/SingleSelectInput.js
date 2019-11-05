import React from "react";
import { CommonHelper } from "../../helpers";

const SingleSelectInput = props => {
  const { options, filterCode = "", handleOnChange, appliedFilters } = props;
  const selectedFil = CommonHelper.getByKeyValFromObject(appliedFilters, "type", filterCode);
  const { filters = [] } = selectedFil || {};

  return (
    <React.Fragment>
      {options &&
        options.length > 0 &&
        options.map(option => {
          const { value, label } = option;
          return (
            <div className="filter-option-row" key={value}>
              <input
                type="radio"
                selected={filters.indexOf(value) > -1 ? true : false}
                id={value}
                name={filterCode}
                value={value}
                onChange={handleOnChange}
              />
              <label htmlFor={value}>{label}</label>
            </div>
          );
        })}
    </React.Fragment>
  );
};

export default SingleSelectInput;
