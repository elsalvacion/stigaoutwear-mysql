import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@material-ui/core";
import React from "react";
import CustomCard from "../components/CustomCard";
import { makeStyles } from "@material-ui/styles";
import {
  ShimmerBadge,
  ShimmerButton,
  ShimmerTitle,
} from "react-shimmer-effects";

import { Person, Mail, Phone, Home, Payment } from "@material-ui/icons";
const useStyles = makeStyles({
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 14,
    padding: 5,
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media(max-width: 500px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    width: "100%",
  },
});

const PlaceOrderShimmer = () => {
  const classes = useStyles();
  const orders = [1, 1, 1, 1];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomCard>
          <ShimmerButton size="sm" />
        </CustomCard>
      </Grid>

      <Grid item xs={12} md={8}>
        <CustomCard>
          <Grid container spacing={2}>
            <Grid item className={classes.orderHeader} xs={12}>
              <ShimmerButton size="md" />
              <ShimmerButton size="md" />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {orders.map((item) => (
              <>
                <Grid item className={classes.gridItem} xs={6} sm={4}>
                  <ShimmerButton size="lg" />
                </Grid>
                <Grid item className={classes.gridItem} xs={6} sm={4}>
                  <ShimmerBadge width="100%" />
                </Grid>

                <Grid item className={classes.gridItem} xs={6} sm={2}>
                  <ShimmerBadge width="100%" />
                </Grid>
                <Grid
                  item
                  className={classes.gridItem}
                  alignItems="center"
                  justifyContent="center"
                  xs={6}
                  sm={2}
                >
                  <ShimmerBadge width="100%" />
                </Grid>
              </>
            ))}
          </Grid>
        </CustomCard>
      </Grid>
      <Grid item xs={12} md={4}>
        <CustomCard>
          <ShimmerTitle line={1} />
          <ShimmerTitle line={1} />

          <List>
            <ListItem>
              <ListItemIcon>
                <Payment />
              </ListItemIcon>
              <ListItemText>
                <ShimmerTitle line={1} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>
                <ShimmerTitle line={1} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Mail />
              </ListItemIcon>
              <ListItemText>
                <ShimmerTitle line={1} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone />
              </ListItemIcon>
              <ListItemText>
                <ShimmerTitle line={1} />
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>
                <ShimmerTitle line={1} />
              </ListItemText>
            </ListItem>
          </List>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default PlaceOrderShimmer;
