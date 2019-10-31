import React from "react";
import { SORTING_OPTIONS } from "../../constants";
import "../../assets/styles/sorting-options.scss";

const SortingOptions = props => {
  const { dialogActions } = props;
  const { handleOnSort } = dialogActions;
  return (
    <section className="sorting-options-wrapper">
      {SORTING_OPTIONS &&
        SORTING_OPTIONS.length > 0 &&
        SORTING_OPTIONS.map((options, index) => {
          return (
            <div className="list-row" key={index}>
              <input
                name="radio-sorting-options"
                id={options["value"]}
                type="radio"
                value={options["value"]}
                onChange={handleOnSort}
              />
              <label htmlFor={options["value"]}>{options["label"]}</label>
            </div>
          );
        })}
    </section>
  );
};

export default SortingOptions;
