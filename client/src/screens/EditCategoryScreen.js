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
import { updateCategory } from "../actions/categoryAction";
import { getCategory } from "../actions/categoryAction";
import HelmetComponent from "../components/HelmetComponent";
const useStyles = makeStyles({
  submitBtn: {
    background: colors.main,
    ...Styles.buttonStyle,
  },
});

const EditCategoryScreen = () => {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, success } = useSelector(
    (state) => state.updateCategory
  );
  const {
    category,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.getCategory);

  useEffect(() => {
    if (!userInfo && !userInfo.admin) {
      history.push(`/login?redirect=admin/category/edit/${id}`);
    } else {
      if (!category) {
        dispatch(getCategory(id));
      } else {
        setTitle(category.title);
      }
    }
    if (success) {
      history.push("/admin/categories");
    }
  }, [userInfo, history, success, id, category, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setMessage("All fields are required");
      window.scroll(0, 0);
    } else {
      dispatch(updateCategory(id, title));
    }
  };

  return (
    <>
      <HelmetComponent title="Edit Category: Stiga outwear" />
      {loading || categoryLoading ? (
        <Loader />
      ) : error || categoryError ? (
        <CustomAlert message={error || categoryError} type="error" />
      ) : (
        <Container>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={12} sm={10} lg={8} xl={6}>
              <Typography variant="h5">Update Category</Typography>
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
                            placeholder="Enter Title"
                            label="Title"
                            required={true}
                            handleChange={(e) => setTitle(e.target.value)}
                            value={title}
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
                            Update Category
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

export default EditCategoryScreen;
