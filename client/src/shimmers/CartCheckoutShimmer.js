import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import {
  ShimmerButton,
  ShimmerText,
  ShimmerTitle,
} from "react-shimmer-effects";

const CartCheckoutShimmer = () => {
  return (
    <Card>
      <CardContent>
        <ShimmerTitle line={1} />
        <List>
          <ListItem>
            <ListItemText>
              <ShimmerText line={1} />
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText>
              <ShimmerText line={1} />
            </ListItemText>
          </ListItem>
          <ShimmerButton size="md" />
        </List>
      </CardContent>
    </Card>
  );
};

export default CartCheckoutShimmer;
