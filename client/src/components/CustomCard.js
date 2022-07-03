import { Card, CardContent } from "@material-ui/core";
import React from "react";

const CustomCard = (props) => {
  return (
    <Card elevation={props.elevation}>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default CustomCard;
