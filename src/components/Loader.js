import React from "react";
import CIRCLE_LOADER from "../assets/images/circle-loader.gif";
import "../assets/styles/loader.scss";

const Loader = props => {
  const { status } = props;
  if (!status) {
    return false;
  }
  return (
    <section className="loader-wrapper">
      <img src={CIRCLE_LOADER} />
    </section>
  );
};

export default Loader;
