import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import axios from "axios";
const Login = () => {
  const usersURL = "http://localhost:4000/users?username=";
  // useEffect(() => {
  //   axios.get(usersURL).then((response)=>{

  //   });
  // }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (username !== "" && password !== "") {
      setOpen(true);
      handleLogin();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleLogin = () => {
    axios.get(usersURL + "Amit").then((response) => {
      console.log(response.data);
    });
  };
  return (
    <div>
      <h1>Login Page</h1>
      <table className="login">
        <tbody>
          <tr>
            <td>Username</td>
            <td>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
              />
              {username}
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input
                value={username}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
              {password}
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outlined" onClick={handleClick}>
                Login
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  This is a success message!
                </Alert>
              </Snackbar>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Login;
