import React from "react";
import { PRODUCT_LIST, SORTING_OPTIONS } from "../constants";
import { ProductCard, Dialog } from "../components";
import "../assets/styles/clothing.scss";

class Clothing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: PRODUCT_LIST,
      dialogStatus: false,
      dialogType: ""
    };
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.handleOnSort = this.handleOnSort.bind(this);
    this.handleOnCloseDialog = this.handleOnCloseDialog.bind(this);
    this.handleOnOpenDialog = this.handleOnOpenDialog.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }

  handleOnOpenDialog() {
    this.setState({ dialogStatus: true, dialogType: "FILTERS" });
  }

  handleOnCloseDialog() {
    this.setState({ dialogStatus: false, dialogType: "" });
  }

  handleOnScroll() {
    const { documentElement } = document;
    if (window.innerHeight + documentElement.scrollTop !== documentElement.offsetHeight) return;
    console.log("Fetch more list items!");
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  // NOTE: replace this with an api call later
  handleOnSort(event) {
    const { value } = event.target;
    const { products } = this.state;
    switch (value) {
      case "PRICE_ASC":
        const sortedList = products.sort((a, b) => {
          return parseFloat(a.discountedPrice) - parseFloat(b.discountedPrice);
        });
        this.setState({ products: sortedList });
        break;
      case "PRICE_DESC":
        const sortedListDesc = products.sort((a, b) => {
          return parseFloat(b.discountedPrice) - parseFloat(a.discountedPrice);
        });
        this.setState({ products: sortedListDesc });
        break;
      default:
        break;
    }
  }

  render() {
    const { products, dialogStatus, dialogType } = this.state;
    return (
      <section className="clothing-wrapper">
        <div className="sorting-wrapper">
          <select onChange={this.handleOnSort}>
            {SORTING_OPTIONS &&
              SORTING_OPTIONS.length > 0 &&
              SORTING_OPTIONS.map(option => {
                return <option value={option["value"]}>{option["label"]}</option>;
              })}
          </select>
        </div>
        <div className="listing-wrapper">
          {products &&
            products.length > 0 &&
            products.map(product => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
        <Dialog status={dialogStatus} onClose={this.handleOnCloseDialog} dialogType={dialogType} />
        <div className="sorting-filter-options-wrapper">
          <button onClick={this.handleOnOpenDialog}>Filters</button>
          <button>Sort</button>
        </div>
      </section>
    );
  }
}
export default Clothing;
