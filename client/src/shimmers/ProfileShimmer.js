import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

import CustomCard from "../components/CustomCard";
import { makeStyles } from "@material-ui/styles";
import { Person, Mail, Phone, Home } from "@material-ui/icons";
import { ShimmerText, ShimmerButton } from "react-shimmer-effects";
import OrderItemShimmer from "./OrderItemShimmer";

const useStyles = makeStyles({
  cardheader: {
    marginBottom: 25,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardParagraph: {
    marginTop: 7,
    marginBottom: 7,
  },

  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  orderImage: {
    width: 75,
    height: 75,
    margin: 10,
  },
  orderOverflow: {
    overflowX: "auto",
  },

  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media(max-width: 500px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    width: "100%",
  },
  orderHeaderLeft: {
    display: "flex",
    flexDirection: "column",
  },
  orderDate: {
    color: "#757575",
    fontSize: 14,
    margin: "10px 0",
  },
});

const ProfileShimmer = () => {
  const classes = useStyles();
  const orders = [1, 1];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <CustomCard>
          <div className={classes.cardheader}>
            <ShimmerButton size="sm" />
            <ShimmerButton size="sm" />
          </div>

          <List>
            <ListItem>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>
                <ShimmerText line={1} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Mail />
              </ListItemIcon>
              <ListItemText>
                <ShimmerText line={1} />
              </ListItemText>
            </ListItem>
          </List>
        </CustomCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomCard>
          <div className={classes.cardheader}>
            <ShimmerButton size="sm" />
            <ShimmerButton size="sm" />
          </div>

          <List>
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText>
                <ShimmerText line={1} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>
                <ShimmerText line={1} />
              </ListItemText>
            </ListItem>
          </List>
        </CustomCard>
      </Grid>
      <Grid xs={12}>
        {orders.map(() => (
          <OrderItemShimmer />
        ))}
      </Grid>
    </Grid>
  );
};

export default ProfileShimmer;
