import React from "react";
import { PRODUCT_LIST, SORTING_OPTIONS } from "../constants";
import { ProductCard, Dialog } from "../components";
import "../assets/styles/clothing.scss";

class Clothing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: PRODUCT_LIST,
      hasMore: false,
      isLoading: false,
      dialogStatus: false,
      dialogType: "",
      dialogProps: {}
    };
    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.handleOnSort = this.handleOnSort.bind(this);
    this.handleOnCloseDialog = this.handleOnCloseDialog.bind(this);
    this.handleOnOpenSortingDialog = this.handleOnOpenSortingDialog.bind(this);
    this.handleOnOpenDialog = this.handleOnOpenDialog.bind(this);
    this.loadMoreContent = this.loadMoreContent.bind(this);
  }
  componentDidMount() {
    window.document.body.scrollTo({ top: 0, behavior: "smooth" });
    window.addEventListener("scroll", this.handleOnScroll);
    // this.setState({
    //   dialogStatus: true,
    //   dialogType: "FILTERS",
    //   dialogProps: {},
    //   dialogActions: {}
    // });
  }

  handleOnOpenDialog() {
    this.setState({
      dialogStatus: true,
      dialogType: "FILTERS",
      dialogProps: {},
      dialogActions: {}
    });
  }

  handleOnOpenSortingDialog() {
    this.setState({
      dialogStatus: true,
      dialogType: "SORTING",
      dialogProps: {
        shortBottom: true
      },
      dialogActions: {
        handleOnSort: this.handleOnSort
      }
    });
  }

  handleOnCloseDialog() {
    this.setState({
      dialogStatus: false,
      dialogType: "",
      dialogProp: {},
      dialogActions: {}
    });
  }

  handleOnScroll() {
    const { documentElement } = document;
    const { isLoading, hasMore } = this.state;
    // if (isLoading || !hasMore) return;
    if (isLoading) return;
    if (
      window.innerHeight + documentElement.scrollTop !==
      documentElement.offsetHeight
    )
      return;
    this.loadMoreContent();
  }

  // NOTE: load more content
  loadMoreContent() {
    this.setState({ isLoading: true });
    console.log("Fetch more list items!");
    const nextProducts = [
      {
        id: [11, new Date().getTime()].join(""),
        name: "Hancock",
        shortDescription: "Slim Fit Solid Formal Shirt",
        imageUrl:
          "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/7460073/2018/9/21/1c88b4ea-b2b3-4c75-b1f5-82bff7252d8b1537519651731-NA-1711537519651556-1.jpg",
        availSizes: [38, 39, 40, 42],
        actualPrice: "2500.00",
        discountedPrice: "1599.00"
      },
      {
        id: [12, new Date().getTime()].join(""),
        name: "Van Heusen",
        shortDescription: "Men Slim Fit Formal Shirt",
        imageUrl:
          "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/10620646/2019/10/14/64935442-87ad-42f6-9a0d-bb574b1d08ca1571044918751-Raymond-Men-Shirts-4521571044916003-1.jpg",
        availSizes: [38],
        actualPrice: "1899.00",
        discountedPrice: "1599.00"
      }
    ];
    setTimeout(() => {
      console.log("Fetched more list items!");
      this.setState({
        isLoading: false,
        products: [...this.state.products, ...nextProducts]
      });
    }, 3000);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  // NOTE: replace this with an api call later
  handleOnSort(event) {
    const { value } = event.target;
    const { products } = this.state;
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    }

    this.handleOnCloseDialog();
  }

  render() {
    const {
      products,
      dialogStatus,
      dialogType,
      dialogProps,
      dialogActions
    } = this.state;
    return (
      <section className="clothing-wrapper">
        <div className="sorting-wrapper">
          <select onChange={this.handleOnSort}>
            {SORTING_OPTIONS &&
              SORTING_OPTIONS.length > 0 &&
              SORTING_OPTIONS.map(option => {
                return (
                  <option key={option["value"]} value={option["value"]}>
                    {option["label"]}
                  </option>
                );
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
        <Dialog
          status={dialogStatus}
          onClose={this.handleOnCloseDialog}
          dialogType={dialogType}
          dialogProps={dialogProps}
          dialogActions={dialogActions}
        />
        <div className="sorting-filter-options-wrapper">
          <button onClick={this.handleOnOpenDialog}>Filters</button>
          <button onClick={this.handleOnOpenSortingDialog}>Sort</button>
        </div>
      </section>
    );
  }
}
export default Clothing;
