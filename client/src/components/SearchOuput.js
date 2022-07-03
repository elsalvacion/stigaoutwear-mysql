import { Container, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomAlert from "./CustomAlert";
import CustomLoader from "./CustomLoader";
import CustomCard from "./CustomCard";
import colors from "../utils/Colors";
import styles from "../utils/Styles";
import { SkipPrevious, SkipNext } from "@material-ui/icons";
import { searchProduct } from "../actions/productAction";

const useStyles = makeStyles({
  itemLink: {
    textDecoration: "none",
    color: colors.main,
    padding: 10,
    fontSize: 14,
  },
  createBtn: {
    ...styles.buttonStyle,
    background: colors.main,
    margin: "10px 5px",
  },
  pagination: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
const SearchOuput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, products, error, pagination, keyword } = useSelector(
    (state) => state.productSearch
  );
  const closeSearchOutput = () => {
    if (
      document
        .querySelector(".searchResultContainer")
        .classList.contains("show")
    )
      document.querySelector(".searchResultContainer").classList.remove("show");
  };
  return (
    <div className="searchResultContainer">
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="searchOutput">
          {error ? (
            <CustomAlert type="error" message={error} />
          ) : products.length > 0 ? (
            <Grid container spacing={2}>
              {products.map((item) => (
                <Grid item xs={12}>
                  <Link
                    className={classes.itemLink}
                    to={`/product/${item._id}`}
                    onClick={closeSearchOutput}
                  >
                    <Container>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item xs={3}>
                          <img src={item.image} width="100%" alt={item.name} />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography className={classes.itemLink}>
                            {item.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography className={classes.itemLink}>
                            GMD{" " + item.price}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Container>
                  </Link>
                </Grid>
              ))}
              <Grid xs={12}>
                <Container className={classes.pagination}>
                  {pagination && pagination.prev && (
                    <Button
                      size="small"
                      className={classes.createBtn}
                      onClick={() => {
                        dispatch(searchProduct(keyword, pagination.prev.page));
                      }}
                      startIcon={<SkipPrevious />}
                    >
                      Prev
                    </Button>
                  )}
                  {pagination && pagination.next && (
                    <Button
                      size="small"
                      className={classes.createBtn}
                      onClick={() => {
                        dispatch(searchProduct(keyword, pagination.next.page));
                      }}
                      endIcon={<SkipNext />}
                    >
                      Next
                    </Button>
                  )}
                </Container>
              </Grid>
            </Grid>
          ) : (
            <CustomCard>
              <Typography>No product found</Typography>
            </CustomCard>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchOuput;
