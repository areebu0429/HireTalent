import React from "react";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { LoggedInContext, ProfileContext, UserContext } from "../../App";
import Axios from "axios";

const AdminLogin = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [user, setUser] = useContext(UserContext);
  const [profile, setProfile] = useContext(ProfileContext);
  const history = useHistory();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState("");

  // const [profile, setProfile] = useState({
  //   //dummy state.It should be empty, requires database for login info to be  correct here
  //   email: "",
  //   password: "",
  //   name: "",
  //   age: "",
  //   lastSchool: "",
  //   lastQualification: "",
  //   type: "",
  //   recentJobsApplied: "",
  // });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputs.email === "admin" && inputs.password === "admin") {
      setUser("admin");
      setLoggedIn(true);
      history.push("/AdminView");
    } else {
      setError("Wrong email/Password");
    }
  };
  if (loggedIn) {
    return <div>Already logged in ..</div>;
  }
  return (
    <>
      <h2>Admin Login</h2>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 4, width: "50%" },
        }}
        // noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Email"
            value={inputs.email || ""}
            onChange={handleChange}
            name="email"
          />
          <br />
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={inputs.password || ""}
            onChange={handleChange}
            name="password"
          />
        </div>
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
        <p>{error}</p>
      </Box>
    </>
  );
};

export default AdminLogin;
