import React from "react";
import { Helmet } from "react-helmet";

const HelmetComponent = (props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
    </Helmet>
  );
};

export default HelmetComponent;
