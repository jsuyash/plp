import React from "react";
import Filters from "./Filters";
import SortingOptions from "./SortingOptions";

const RenderDialogContentByType = props => {
  const { dialogType, dialogActions = {}, dialogProps = {}, dialogValue = {}, onClose } = props;
  const { filters = [], appliedFilters = [] } = dialogValue;
  const { handleOnChangeFilters, applyFilters } = dialogActions;
  switch (dialogType) {
    case "FILTERS":
      return (
        <Filters
          onClose={onClose}
          applyFilters={applyFilters}
          filters={filters}
          appliedFilters={appliedFilters}
          handleOnChangeFilters={handleOnChangeFilters}
        />
      );
    case "SORTING":
      return <SortingOptions dialogActions={dialogActions} />;
    default:
      return null;
  }
};

export default RenderDialogContentByType;
