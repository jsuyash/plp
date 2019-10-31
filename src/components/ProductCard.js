import React from "react";
import "../assets/styles/product-card.scss";

const ProductCard = props => {
  const { product } = props;
  const { name, shortDescription, imageUrl, actualPrice, availSizes } = product;
  return (
    <div className="product-card">
      <div className="card-body">
        <div className="img-wrapper">
          <img src={imageUrl} />
        </div>
        <div className="name">{name}</div>
        <div className="short-description">{shortDescription}</div>
      </div>
      <div className="card-footer">
        <div className="price">&#8377; {actualPrice}</div>
        {!!availSizes && availSizes.length > 0 && (
          <div className="size-wrapper">
            <React.Fragment>
              <div className="size-title">Sizes</div>
              <div className="size-list">
                {availSizes.map(size => {
                  return <span key={size}>{size}</span>;
                })}
              </div>
            </React.Fragment>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
