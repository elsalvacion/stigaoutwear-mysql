import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import HelmetComponent from "../components/HelmetComponent";
import colors from "../utils/Colors";
import Styles from "../utils/Styles";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/CustomLoader";
import CustomAlert from "../components/CustomAlert";
import { Add } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import CustomCard from "../components/CustomCard";
import { DropzoneDialog } from "material-ui-dropzone";
import { createProduct } from "../actions/productAction";
import axios from "axios";
import { getCategories } from "../actions/categoryAction";
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

const CreateProduct = () => {
  const classes = useStyles();
  const history = useHistory();

  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, product } = useSelector(
    (state) => state.productCreate
  );
  const {
    categories,
    loading: loadingCategory,
    error: errorCategory,
  } = useSelector((state) => state.categoryList);

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

  const [clothingRange, setClothingRange] = useState(false);
  const [numberRange, setNumberRange] = useState(true);
  useEffect(() => {
    if (!userInfo && !userInfo.admin) {
      history.push("/login?redirect=admin/product/create");
    } else {
      dispatch(getCategories());
    }
    if (product) {
      history.push("/admin/products");
    }

    // eslint-disable-next-line
  }, [userInfo, history, product, dispatch]);
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
      // values.image === "" ||
      !Number(values.price) ||
      !Number(values.countInStock) ||
      !Number(values.discount)
    ) {
      setMessage("All fields are required");
      window.scroll(0, 0);
    } else {
      setValues({
        ...values,
        price: Number(values.price).toFixed(2) || 99.99,
        countInStock: Number(values.countInStock).toFixed(2) || 1,
        discount: Number(values.discount).toFixed(2) || 0,
      });
      dispatch(createProduct(values));
    }
  };

  const uploadFileHandler = async (files) => {
    if (files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);
      setUploading(true);

      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const { data } = await axios.post("/upload", formData, config);

        setValues({
          ...values,
          image: data,
        });
        setUploaded(true);
        setUploading(false);
      } catch (error) {
        console.error(error);
        setUploading(false);
      }
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
      <HelmetComponent title="Create Product: Stiga outwear" />
      {loading ? (
        <Loader />
      ) : error ? (
        <CustomAlert message={error} type="error" />
      ) : (
        <Container>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={12} sm={10} lg={8} xl={6}>
              <Typography variant="h5">Create Product</Typography>
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
                          {uploading ? (
                            <>
                              <br />
                              <Typography align="center" variant="h5">
                                Uploading...
                              </Typography>
                              <br />
                            </>
                          ) : uploaded ? (
                            <FormInput
                              type="text"
                              label="Image"
                              required={true}
                              disabled={true}
                              value={values.image}
                            />
                          ) : (
                            <>
                              <Button
                                variant="contained"
                                className={classes.submitBtn}
                                onClick={() => setOpen(true)}
                              >
                                Add Image
                              </Button>

                              <DropzoneDialog
                                acceptedFiles={["image/*"]}
                                cancelButtonText={"cancel"}
                                submitButtonText={"Upload"}
                                open={open}
                                onClose={() => setOpen(false)}
                                onSave={(files) => {
                                  uploadFileHandler(files);
                                  setOpen(false);
                                }}
                                showPreviews={true}
                                showFileNamesInPreview={true}
                              />
                            </>
                          )}
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
                              <>
                                <select
                                  name="category"
                                  onChange={handleChange}
                                  value={values.category}
                                  className={classes.input}
                                >
                                  <option className={classes.label} value="">
                                    Choose category
                                  </option>
                                  {categories.map((category) => (
                                    <option
                                      className={classes.label}
                                      value={category.title}
                                    >
                                      {category.title}
                                    </option>
                                  ))}
                                </select>
                              </>
                            )}
                          </div>
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
                            startIcon={<Add />}
                          >
                            Add Product
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

export default CreateProduct;
