import React from "react";
import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { LoggedInContext, ProfileContext } from "../../App";
import { useHistory } from "react-router";
import Axios from "axios";
export default function Settings() {
  const [loggedIn] = useContext(LoggedInContext);
  const [profile, setProfile] = useContext(ProfileContext);
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: profile.email,
    password: profile.password,
    name: profile.name,
    age: profile.age,
    lastSchool: profile.lastSchool,
    lastQualification: profile.lastQualification,
    LastSalary: profile.lastsalary,
    id: profile.emp_id,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    Axios.post("http://localhost:3001/updateEmployeeRecord", inputs).then(
      () => {
        setProfile((prev) => {
          return { ...prev, ...inputs };
        });
        history.push("/");
      }
    );
    // console.log(inputs.age);
    // console.log({ inputs });
  };

  const content = loggedIn ? (
    <div>
      <h3>Post a Job</h3>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "100%", paddingBottom: "1rem" },
          m: "auto",
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        // noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TextField
            required
            id="outlined-required"
            label="Job Title"
            value={inputs.name || ""}
            onChange={handleChange}
            name="name"
          />
        </div>

        <TextField
          required
          id="outlined-required"
          label="Description"
          value={inputs.lastSchool || ""}
          onChange={handleChange}
          name="lastSchool"
        />
        <TextField
          required
          id="outlined-required"
          label="Job Category"
          value={inputs.lastQualification || ""}
          onChange={handleChange}
          name="lastQualification"
        />
         <TextField
          required
          id="outlined-required"
          label="Salary"
          value={inputs.LastSalary || ""}
          onChange={handleChange}
          name="LastSalary"
        />


        <Button
          style={{ marginTop: "3rem" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Update
        </Button>
      </Box>
    </div>
  ) : (
    <p>Log in please</p>
  );

  return <React.Fragment>{content}</React.Fragment>;
}
