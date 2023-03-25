import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import FormControlUnstyled from "@mui/base/FormControlUnstyled";
import Login from "./Login";

const HomePage = () => {
  return (
    <div>
      <Typography variant="h1">This is Home Page</Typography>
      <Login/>
      <FormControlUnstyled defaultValue="" required>
        <TextField
          helperText="Please enter your name"
          label="Name"
        />
      </FormControlUnstyled>
      <FormControlUnstyled defaultValue="" required>
        <TextField
          helperText="Please enter your password"
          label="Password"
          type="password"
        />
      </FormControlUnstyled>
      <span>

      <Button variant="contained">Login</Button>
      <Button variant="contained">Sign Up</Button>
      </span>
    </div>
  );
};

export default HomePage;
