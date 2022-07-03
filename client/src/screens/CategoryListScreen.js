import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Button,
  Typography,
  Modal,
  Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Delete, Edit, Add } from "@material-ui/icons";
import CustomAlert from "../components/CustomAlert";
import SnackNotice from "../components/SnackNotice";
import {
  addCategory,
  deleteCategory,
  getCategories,
} from "../actions/categoryAction";
import colors from "../utils/Colors";
import styles from "../utils/Styles";
import AdminShimmer from "../shimmers/AdminShimmer";
import {
  ADD_CATEGORY_RESET,
  GET_CATEGORY_RESET,
  REMOVE_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
} from "../reducers/types/categoryType";
import FormInput from "../components/FormInput";
import { ArrowUpward } from "@material-ui/icons";
import HelmetComponent from "../components/HelmetComponent";

const useStyles = makeStyles({
  tableWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  createProductHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    width: "100%",
  },
  left: {
    color: "#757575",
    fontSize: 14,
    margin: "10px 0",
  },
  createBtn: {
    ...styles.buttonStyle,
    background: colors.main,
    margin: "10px 5px",
  },
  modal: {
    position: "absolute",
    width: 400,
    maxWidth: "90%",
    background: colors.primary,
    padding: 15,
  },
});

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}
const CategoryListScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const getCategory = useSelector((state) => state.getCategory);
  const { category: categorySuccess } = getCategory;
  const removeCategory = useSelector((state) => state.removeCategory);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = removeCategory;

  const { success: createSuccess, loading: createLoading } = useSelector(
    (state) => state.addCategory
  );
  const { success: updateSucsess } = useSelector(
    (state) => state.updateCategory
  );
  const history = useHistory();
  let [createSnack, setCreateSnack] = useState(false);
  let [deleteSnack, setDeleteSnack] = useState(false);
  let [updateSnack, setUpdateSnack] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState(null);
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push(`/login?redirect=admin/category`);
    }
    dispatch(getCategories());
    if (successDelete) {
      setDeleteSnack(true);
      dispatch({ type: REMOVE_CATEGORY_RESET });
    }
    if (createSuccess) {
      setCreateSnack(true);
      setOpen(false);
      setTitle("");
      dispatch({ type: ADD_CATEGORY_RESET });
    }

    if (updateSucsess) {
      setUpdateSnack(true);
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }
    if (categorySuccess) {
      dispatch({ type: GET_CATEGORY_RESET });
    }
  }, [
    userInfo,
    dispatch,
    successDelete,
    createSuccess,
    updateSucsess,
    categorySuccess,
    history,
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCategory(id));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setMessage("All fields are required");
      window.scroll(0, 0);
    } else {
      dispatch(addCategory(title));
    }
  };

  const createCategoryForm = (
    <div style={modalStyle} className={classes.modal}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          {createLoading && (
            <>
              <br />
              <Typography>Creating ...</Typography>
              <br />
            </>
          )}
          {error && <CustomAlert type="error" message={error} />}
          {message && <CustomAlert type="error" message={message} />}
          <Typography variant="h5">Create category</Typography>
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
                  className={classes.createBtn}
                  color="primary"
                  variant="contained"
                  size="small"
                  type="submit"
                  startIcon={<ArrowUpward />}
                >
                  Create Category
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <>
      <HelmetComponent title="Categories(Admin): Stiga outwear" />
      {loading || loadingDelete ? (
        <AdminShimmer />
      ) : error || errorDelete ? (
        <CustomAlert message={error || errorDelete} type="error" />
      ) : (
        <>
          <Modal open={open} onClose={() => setOpen(false)}>
            {createCategoryForm}
          </Modal>
          <div className={classes.createProductHeader}>
            <Typography variant="h5" className={classes.left}>
              Categories
            </Typography>
            <Button
              size="small"
              className={classes.createBtn}
              onClick={() => setOpen(true)}
              endIcon={<Add />}
            >
              Create
            </Button>
          </div>
          <br />
          <div className={classes.tableWrapper}>
            <TableContainer component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell align="center">
                      <IconButton
                        onClick={() =>
                          history.push(`/admin/category/edit/${category._id}`)
                        }
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(category._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>

                    <TableCell align="center">{category.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </div>
        </>
      )}
      {deleteSnack && (
        <SnackNotice
          message={`Product deleted`}
          handleSnackClose={() => setDeleteSnack(false)}
          align={{ vertical: "bottom", horizontal: "right" }}
        />
      )}

      {createSnack && (
        <SnackNotice
          message={`New Product added`}
          handleSnackClose={() => setCreateSnack(false)}
          align={{ vertical: "bottom", horizontal: "right" }}
        />
      )}

      {updateSnack && (
        <SnackNotice
          message={`Product editted`}
          handleSnackClose={() => setUpdateSnack(false)}
          align={{ vertical: "bottom", horizontal: "right" }}
        />
      )}
    </>
  );
};

export default CategoryListScreen;
