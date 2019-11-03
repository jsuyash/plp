import React from "react";
import MultiSelectInput from "./MultiSelectInput";
import SingleSelectInput from "./SingleSelectInput";

const FiltersOptionsByType = props => {
  const { type, options, filterCode, handleOnChange, appliedFilters } = props;
  switch (type) {
    case "MULTI_SELECT":
      return (
        <MultiSelectInput
          options={options}
          appliedFilters={appliedFilters}
          filterCode={filterCode}
          handleOnChange={handleOnChange}
        />
      );
    case "SINGLE_SELECTS":
      return <SingleSelectInput />;

    default:
      return null;
  }
};

export default FiltersOptionsByType;
