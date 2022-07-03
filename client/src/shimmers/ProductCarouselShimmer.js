import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductShimmer from "./ProductShimmer";
import { ShimmerText } from "react-shimmer-effects";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};
const products = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const ProductCarouselShimmer = () => {
  return (
    <>
      <br />
      <ShimmerText line={1} />
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      >
        {products.map(() => (
          <ProductShimmer key={Math.random() * 1000 + 2} rating={true} />
        ))}
      </Carousel>
      <br />
    </>
  );
};

export default ProductCarouselShimmer;
