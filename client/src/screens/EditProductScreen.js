import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import colors from "../utils/Colors";
import Styles from "../utils/Styles";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/CustomLoader";
import CustomAlert from "../components/CustomAlert";
import { ArrowUpward } from "@material-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import CustomCard from "../components/CustomCard";
import { fetchProductDetails, updateProduct } from "../actions/productAction";
import { getCategories } from "../actions/categoryAction";
import HelmetComponent from "../components/HelmetComponent";
import Select from "react-select";
import { MultiSelect } from "react-multi-select-component";

const useStyles = makeStyles({
  submitBtn: {
    background: colors.main,
    ...Styles.buttonStyle,
  },
  inputContainer: {
    marginTop: 7,
    marginBottom: 7,
  },
  label: {
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
    border: `1px solid ${colors.main}`,
    width: "100%",
    borderRadius: 7,

    "&:focus": {
      boxShadow: `2px 2px 5px rgba(0,0,0,0.1)`,
    },
  },
});

const EditProductScreen = () => {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();

  const shoeSizes = [];
  for (let i = 5; i <= 50; i++)
    shoeSizes.push({
      label: i,
      value: i,
    });

  const options = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  const [values, setValues] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    countInStock: "",
    price: "",
    image: "",
    discount: "",
    sizes: [],
    sizesType: "footwear",
  });

  const [message, setMessage] = useState(null);
  const [clothingRange, setClothingRange] = useState(false);
  const [numberRange, setNumberRange] = useState(true);
  const {
    categories,
    loading: loadingCategory,
    error: errorCategory,
  } = useSelector((state) => state.categoryList);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, success } = useSelector(
    (state) => state.productUpdate
  );
  const {
    product: details,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.productDetails);

  useEffect(() => {
    if (!userInfo && !userInfo.admin) {
      history.push(`/login?redirect=admin/product/edit/${id}`);
    } else {
      dispatch(getCategories());
      if (!details) {
        dispatch(fetchProductDetails(id));
      } else {
        setValues({
          ...details,
          sizes: [],
          sizesType: "footwear",
        });
      }
    }
    if (success) {
      history.push("/admin/products");
    }
  }, [userInfo, history, success, id, details, dispatch]);
  const handleChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.name === "" ||
      values.brand === "" ||
      values.category === "" ||
      values.description === "" ||
      values.image === "" ||
      Number(values.price) === 0 ||
      Number(values.countInStock) === 0
    ) {
      setMessage("All fields are required");
      window.scroll(0, 0);
    } else {
      setValues({
        ...values,
        price: Number(values.number).toFixed(2),
        countInStock: Number(values.countInStock).toFixed(2),
        discount: Number(values.discount).toFixed(2),
      });
      dispatch(updateProduct(values));
    }
  };

  const handleFootwearSize = (e) => {
    if (e.target.checked) {
      setNumberRange(true);
      setClothingRange(false);
      setValues({
        ...values,
        sizes: [],
        sizesType: "footwear",
      });
    } else {
      setNumberRange(false);
      setClothingRange(true);
      setValues({
        ...values,
        sizes: [],
        sizesType: "bodywear",
      });
    }
  };

  const handleBodywearSize = (e) => {
    if (e.target.checked) {
      setNumberRange(false);
      setClothingRange(true);
    } else {
      setNumberRange(true);
      setClothingRange(false);
    }
  };

  return (
    <>
      <HelmetComponent title="Edit Product: Stiga outwear" />
      {loading || productLoading ? (
        <Loader />
      ) : error || productError ? (
        <CustomAlert message={error || productError} type="error" />
      ) : (
        <Container>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={12} sm={10} lg={8} xl={6}>
              <Typography variant="h5">Update Product</Typography>
              <br />
              <CustomCard>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    {error && <CustomAlert type="error" message={error} />}
                    {message && <CustomAlert type="error" message={message} />}
                    <form
                      onSubmit={handleSubmit}
                      autoSave="off"
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormInput
                            type="text"
                            label="Image"
                            required={true}
                            disabled={true}
                            value={values.image}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <FormInput
                            name="name"
                            type="text"
                            placeholder="Enter Name"
                            label="Name"
                            required={true}
                            handleChange={handleChange}
                            value={values.name}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <input
                            type="radio"
                            name="size"
                            id="size1"
                            onChange={handleFootwearSize}
                            checked={numberRange}
                          />{" "}
                          <label variant="label" htmlFor="size1">
                            Footwear sizing
                          </label>
                          <br />
                          <input
                            type="radio"
                            name="size"
                            id="size2"
                            onChange={handleBodywearSize}
                            checked={clothingRange}
                          />{" "}
                          <label variant="label" htmlFor="size2">
                            Bodywear sizing
                          </label>
                          <br />
                          {numberRange && (
                            <>
                              <br />
                              <Typography>Choose size range</Typography>
                              <br />

                              <MultiSelect
                                options={shoeSizes}
                                value={values.sizes}
                                onChange={(newValue) => {
                                  setValues({
                                    ...values,
                                    sizes: newValue,
                                    sizesType: "footwear",
                                  });
                                }}
                                labelledBy="Select"
                              />
                            </>
                          )}
                          <br />
                          {clothingRange && (
                            <>
                              <Typography>Choose sizes</Typography>
                              <br />

                              <Select
                                options={options}
                                value={values.sizes}
                                styles={classes.input}
                                onChange={(value) =>
                                  setValues({
                                    ...values,
                                    sizes: value,
                                    sizesType: "bodywear",
                                  })
                                }
                                isMulti
                              />
                            </>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <div className={classes.inputContainer}>
                            <label className={classes.label}>Category</label>
                            {loadingCategory ? (
                              <>
                                <br />
                                <Typography>Loading</Typography>
                                <br />
                              </>
                            ) : errorCategory ? (
                              <>
                                <br />
                                <Typography>
                                  Cannot load categories. <br />
                                  Try reloading your browser?
                                </Typography>
                                <br />
                              </>
                            ) : (
                              <select
                                name="category"
                                onChange={handleChange}
                                value={values.category}
                                className={classes.input}
                              >
                                {categories.map((category) => (
                                  <option
                                    className={classes.label}
                                    value={category.title}
                                  >
                                    {category.title}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          <FormInput
                            name="brand"
                            type="text"
                            placeholder="Enter brand"
                            label="Brand"
                            required={true}
                            handleChange={handleChange}
                            value={values.brand}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <FormInput
                            name="description"
                            type="text"
                            placeholder="Enter description"
                            label="Description"
                            required={true}
                            handleChange={handleChange}
                            value={values.description}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormInput
                            name="price"
                            type="text"
                            placeholder="Enter price"
                            label="Price"
                            required={true}
                            handleChange={handleChange}
                            value={values.price}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormInput
                            name="discount"
                            type="text"
                            placeholder="Enter discount"
                            label="Discount"
                            required={true}
                            handleChange={handleChange}
                            value={values.discount}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormInput
                            name="countInStock"
                            type="text"
                            placeholder="Enter count in stock"
                            label="Count in Stock"
                            required={true}
                            handleChange={handleChange}
                            value={values.countInStock}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            className={classes.submitBtn}
                            color="primary"
                            variant="contained"
                            size="small"
                            type="submit"
                            startIcon={<ArrowUpward />}
                          >
                            Update Product
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </CustomCard>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default EditProductScreen;
