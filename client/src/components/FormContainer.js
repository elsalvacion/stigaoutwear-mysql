import React from "react";
import { Grid, Container } from "@material-ui/core";
import CustomCard from "./CustomCard";
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={8}>
          <CustomCard>{children}</CustomCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormContainer;
