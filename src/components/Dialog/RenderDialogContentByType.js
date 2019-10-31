import React from "react";
import Filters from "./Filters";
import SortingOptions from "./SortingOptions";

const RenderDialogContentByType = props => {
  const { dialogType, dialogActions = {} } = props;
  switch (dialogType) {
    case "FILTERS":
      return <Filters />;
    case "SORTING":
      return <SortingOptions dialogActions={dialogActions} />;
    default:
      return null;
  }
};

export default RenderDialogContentByType;
