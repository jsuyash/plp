import React from "react";
import Filters from "./Filters";

const RenderDialogContentByType = props => {
  const { dialogType } = props;
  switch (dialogType) {
    case "FILTERS":
      return <Filters />;
  }
};

export default RenderDialogContentByType;
