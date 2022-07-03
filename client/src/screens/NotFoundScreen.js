import { Button, Container, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const NotFoundScreen = () => {
  const history = useHistory();
  return (
    <Container>
      <Typography variant="h3">404: Page Not Found</Typography>
      <br />
      <Button
        onClick={() => history.push("/")}
        variant="contained"
        color="secondary"
        size="lg"
      >
        Go To Home Page
      </Button>
    </Container>
  );
};

export default NotFoundScreen;
