import {
  Button,
  colors,
  Container,
  Divider,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router";
import { makeStyles } from "@material-ui/styles";
import Rating from "../components/Rating";
import Colors from "../utils/Colors";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  fetchProductDetails,
} from "../actions/productAction";
import {
  AddShoppingCart,
  ZoomIn,
  ZoomOut,
  ZoomOutMap,
  ArrowBack,
  StarBorder,
  StarHalf,
  Star,
  PostAdd,
} from "@material-ui/icons";
import { addToCart } from "../actions/cartAction";
import SnackNotice from "../components/SnackNotice";
import styles from "../utils/Styles";
import Quantity from "../components/Quantity";
import CustomAlert from "../components/CustomAlert";
import CustomLoader from "../components/CustomLoader";
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_SEARCH_RESET,
} from "../reducers/types/productsTypes";
import Moment from "react-moment";
import ReactStars from "react-rating-stars-component";
import { ADD_CART_RESET } from "../reducers/types/cartTypes";
import ProductScreenShimmer from "../shimmers/ProductScreenShimmer";
import HelmetComponent from "../components/HelmetComponent";
const useStyles = makeStyles({
  card: {
    height: "100%",
  },
  productImage: {
    width: "100%",
    minHeight: "50vh",
  },
  productTitle: {
    margin: "10px 0",
    color: colors.grey[900],
  },
  itemText: {
    fontSize: 14,
  },

  label: {
    color: colors.grey[500],
    marginRight: 5,
  },
  price: {
    color: Colors.main,
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
  },
  quantity: {
    flex: 1,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
  },
  quantityInput: {
    padding: "5px 15px",
    fontSize: 14,
    width: 50,
    border: `1px solid ${Colors.main}`,
    outline: 0,
    textAlign: "center",
    margin: "0 10px",
  },
  zoomBtn: {
    "& .MuiTouchRipple-root span": {
      backgroundColor: `${Colors.main} !important`,
      opacity: 0.3,
    },
  },
  actionCard: {
    padding: 5,
  },
  quantityBtn: {
    ...styles.buttonStyle,
  },
  actionBtn: {
    display: "flex",
    // justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  buy: {
    background: colors.grey[700],
    color: colors.grey[100],
    "&:hover": {
      color: colors.grey[700],
    },
    margin: 5,
  },
  chart: {
    background: Colors.main,
    color: Colors.primary,
    "&:hover": {
      color: colors.grey[700],
    },
    margin: 5,

    ...styles.buttonStyle,
  },
  btn: {
    background: Colors.main,
    color: Colors.primary,
    "&:hover": {
      color: colors.grey[700],
    },
    marginBottom: 15,

    ...styles.buttonStyle,
  },
  ratingLabel: {
    display: "block",
    marginTop: "5px 0",
    fontSize: 16,
  },
  input: {
    display: "block",
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    outline: 0,
    border: `1px solid ${Colors.main}`,
    width: "100%",
    borderRadius: 7,
    minHeight: 150,
    minWidth: "100%",
    maxWidth: "100%",
    "&:focus": {
      boxShadow: `2px 2px 5px rgba(0,0,0,0.1)`,
    },
  },

  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  productPrice: {
    margin: 10,
    color: "black",
    textDecoration: "line-through",
  },
  discountPrice: {
    margin: 10,
    color: Colors.main,
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    fontSize: 14,
  },
  size: {
    flex: 1,
    border: `1px solid ${Colors.main}`,
    background: "transparent",
    outline: 0,
    "& option": {
      background: "transparent",
    },
  },
});

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProductScreen = () => {
  const classes = useStyles();
  const { id } = useParams();
  let query = useQuery();
  const redirect = query.get("redirect") ? `/${query.get("redirect")}` : "/";
  const history = useHistory();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading: addCartLoading,
    error: addCartError,
    success: addCartSuccess,
  } = useSelector((state) => state.addCart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [size, setSize] = useState("available sizes");
  let quantity = 1;
  useEffect(() => {
    dispatch({ type: PRODUCT_SEARCH_RESET });
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    if (successProductReview) {
      setRating(0);
      setComment("");
      setMessage(null);
    }
    dispatch(fetchProductDetails(id));

    if (addCartSuccess) {
      setShowSnack(true);
      dispatch({ type: ADD_CART_RESET });
    }
  }, [id, dispatch, addCartSuccess, successProductReview]);
  let [showSnack, setShowSnack] = useState(false);

  let [reviewSnack, setReviewSnack] = useState(false);
  let [message, setMessage] = useState(null);

  const handleQuantity = () => {
    if (!userInfo) history.push(`/login?redirect=product/${id}`);
    else {
      if (size !== "available sizes") {
        dispatch(addToCart(product._id, quantity, size));
      }
    }
  };

  const handleNewQuantity = (qty) => {
    quantity = qty;
  };

  const handleReview = () => {
    if (comment.trim() !== "") {
      dispatch(createProductReview(id, { rating, comment }));
    } else {
      setMessage("Comment is required");
    }
  };

  return (
    <div>
      {loading ? (
        <ProductScreenShimmer />
      ) : error ? (
        <CustomAlert type="error" message={error} />
      ) : (
        product && (
          <>
            <HelmetComponent title={product.name} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  className={classes.btn}
                  variant="contained"
                  startIcon={<ArrowBack fontSize="small" />}
                  onClick={() => history.push(redirect)}
                  size="small"
                >
                  BACK
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TransformWrapper>
                  {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                      <div className="tools">
                        <IconButton
                          className={classes.zoomBtn}
                          onClick={() => zoomIn()}
                          size="small"
                        >
                          <ZoomIn fontSize="small" />
                        </IconButton>
                        <IconButton
                          className={classes.zoomBtn}
                          onClick={() => zoomOut()}
                          size="small"
                        >
                          <ZoomOut fontSize="small" />
                        </IconButton>
                        <IconButton
                          className={classes.zoomBtn}
                          onClick={() => resetTransform()}
                        >
                          <ZoomOutMap fontSize="small" />
                        </IconButton>
                      </div>
                      <TransformComponent>
                        <img
                          src={product.image}
                          alt={product.name}
                          className={classes.productImage}
                        />
                      </TransformComponent>
                      <Hidden mdUp>
                        <List>
                          {product.countInStock > 0 ? (
                            <>
                              {addCartLoading ? (
                                <CustomLoader />
                              ) : addCartError ? (
                                <CustomAlert
                                  message={addCartError}
                                  type="error"
                                />
                              ) : (
                                <>
                                  <ListItem>
                                    <Quantity
                                      handleNewQuantity={handleNewQuantity}
                                      quantity={1}
                                      product={product}
                                      label={true}
                                    />
                                  </ListItem>
                                  <Divider />
                                  <ListItem>
                                    <div className={classes.actionBtn}>
                                      <Button
                                        className={classes.chart}
                                        variant="contained"
                                        endIcon={
                                          <AddShoppingCart fontSize="small" />
                                        }
                                        onClick={handleQuantity}
                                        size="small"
                                      >
                                        CHART
                                      </Button>
                                    </div>
                                  </ListItem>
                                </>
                              )}
                            </>
                          ) : (
                            <ListItem>
                              <Typography color="error">
                                Out of Stock
                              </Typography>
                            </ListItem>
                          )}
                        </List>
                      </Hidden>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <List>
                  <ListItem>
                    <Typography variant="h6">{product.name}</Typography>
                  </ListItem>
                  <ListItem>
                    <Rating
                      label={`${product.numReviews} Reviews`}
                      rating={product.rating}
                    />
                  </ListItem>
                  <ListItem>
                    <Typography className={classes.itemText}>
                      <Typography className={classes.label} variant="span">
                        Size:{" "}
                      </Typography>
                      {
                        <>
                          <select
                            onChange={(e) => setSize(e.target.value)}
                            className={classes.size}
                          >
                            <option value="available sizes">
                              available sizes
                            </option>
                            {product.sizes
                              .sort(function (a, b) {
                                return Number(a.size) - Number(b.size);
                              })
                              .map((itemSize) => (
                                <option value={itemSize.size}>
                                  {itemSize.size}
                                </option>
                              ))}
                          </select>
                        </>
                      }
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <div className={classes.priceContainer}>
                      {product.discount ? (
                        <>
                          <p className={classes.productPrice}>
                            GMD{" " + product.price.toFixed(2)}
                          </p>
                          <p className={classes.discountPrice}>
                            GMD
                            {" " +
                              Number(
                                (100 - product.discount) * 0.01 * product.price
                              ).toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <p className={classes.discountPrice}>
                          GMD{" " + product.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </ListItem>
                  <ListItem>
                    <Typography className={classes.itemText}>
                      <Typography className={classes.label} variant="span">
                        Brand:
                      </Typography>
                      {product.brand}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography className={classes.itemText}>
                      <Typography className={classes.label} variant="span">
                        Category:
                      </Typography>
                      {product.category}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Typography className={classes.itemText}>
                      <Typography className={classes.label} variant="span">
                        Description:
                      </Typography>
                      {product.description}
                    </Typography>
                  </ListItem>
                </List>
              </Grid>
              <Hidden smDown>
                <Grid item xs={12} sm={5} md={3}>
                  <List>
                    {product.countInStock > 0 ? (
                      <>
                        {addCartLoading ? (
                          <CustomLoader />
                        ) : addCartError ? (
                          <CustomAlert message={addCartError} type="error" />
                        ) : (
                          <>
                            <ListItem>
                              <Quantity
                                handleNewQuantity={handleNewQuantity}
                                quantity={1}
                                product={product}
                                label={true}
                              />
                            </ListItem>
                            <Divider />
                            <ListItem>
                              <div className={classes.actionBtn}>
                                <Button
                                  className={classes.chart}
                                  variant="contained"
                                  endIcon={<AddShoppingCart fontSize="small" />}
                                  onClick={handleQuantity}
                                  size="small"
                                >
                                  CHART
                                </Button>

                                {/* <Button
                                className={classes.buy}
                                variant="contained"
                                endIcon={<Shop fontSize="small" />}
                                size="small"
                              >
                                BUY
                              </Button> */}
                              </div>
                            </ListItem>
                          </>
                        )}
                      </>
                    ) : (
                      <ListItem>
                        <Typography color="error">Out of Stock</Typography>
                      </ListItem>
                    )}
                  </List>
                </Grid>
              </Hidden>

              {product && product.reviews.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h5">Reviews</Typography>
                  <br />
                  <Grid container spacing={2}>
                    {product.reviews.map((review) => (
                      <Grid item xs={12}>
                        <div className={classes.reviewHeader}>
                          <div className={classes.reviewHeaderLeft}>
                            <Rating label="" rating={review.rating} />
                            <Typography className={classes.label}>
                              by {review.name}
                            </Typography>
                          </div>
                          <div className={classes.reviewHeadeRight}>
                            <Moment
                              date={Number(review.createdAt)}
                              format="DD-MM-YYYY"
                            />
                          </div>
                        </div>
                        <Divider />
                        <Container>
                          <br />
                          <Typography>{review.comment}</Typography>
                        </Container>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}

              {userInfo && (
                <Grid item xs={12} alignItems="center">
                  {loadingProductReview ? (
                    <CustomLoader />
                  ) : errorProductReview ? (
                    <CustomAlert type="error" message={errorProductReview} />
                  ) : (
                    <>
                      <Typography variant="h5" align="center">
                        Review this product
                      </Typography>
                      {message && (
                        <>
                          <br />
                          <CustomAlert type="error" message={message} />
                          <br />
                        </>
                      )}
                      <label className={classes.ratingLabel}>
                        Rating: {rating}
                      </label>
                      <ReactStars
                        count={5}
                        onChange={(newRating) => setRating(newRating)}
                        size={40}
                        activeColor="#ffd700"
                        value={rating}
                        isHalf={true}
                        emptyIcon={<StarBorder fontSize="large" />}
                        halfIcon={<StarHalf fontSize="large" />}
                        fullIcon={<Star fontSize="large" />}
                      />
                      <br />
                      <label className={classes.ratingLabel}>Comment</label>
                      <textarea
                        className={classes.input}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>

                      <Button
                        className={classes.btn}
                        variant="contained"
                        endIcon={<PostAdd fontSize="small" />}
                        onClick={handleReview}
                        size="small"
                      >
                        POST
                      </Button>
                    </>
                  )}
                </Grid>
              )}
            </Grid>
          </>
        )
      )}

      {showSnack && (
        <SnackNotice
          message={`Item added to cart`}
          handleSnackClose={() => setShowSnack(false)}
          align={{ vertical: "bottom", horizontal: "right" }}
        />
      )}

      {reviewSnack && (
        <SnackNotice
          message={`Review created`}
          handleSnackClose={() => setReviewSnack(false)}
          align={{ vertical: "bottom", horizontal: "right" }}
        />
      )}
    </div>
  );
};

export default ProductScreen;
