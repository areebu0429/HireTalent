import React from "react";
import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { LoggedInContext, ProfileContext } from "../../App";
import { useHistory } from "react-router";
import Axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
export default function ApplyJob() {
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
    // Axios.post("http://localhost:3001/updateEmployeeRecord", inputs).then(
    //   () => {
    //     setProfile((prev) => {
    //       return { ...prev, ...inputs };
    //     });
    //     history.push("/");
    //   }
    // );
    // console.log(inputs.age);
    // console.log({ inputs });
  };

  const content = loggedIn ? (
    <div>
      <h3>Apply Job</h3>
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
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="Select Job">Select Job</InputLabel>
            <Select
              required
              labelId="SelectJob"
              id="Select Job"
              label="SelectJob"
              onChange={handleChange}
              name="SelectJob"
            >
              <MenuItem value={"Job1"}>Job1</MenuItem>
              <MenuItem value={"Job2"}>Job2</MenuItem>
              <MenuItem value={"Job3"}>Job3</MenuItem>
              <MenuItem value={"Job4"}>Job4</MenuItem>
              <MenuItem value={"Job5"}>Job5</MenuItem>
            </Select>
          </FormControl>
          <br />
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <TextField
              required
              id="outlined-required"
              label="Proposal"
              value={inputs.lastSchool || ""}
              onChange={handleChange}
              name="lastSchool"
            />
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <TextField
              required
              id="outlined-required"
              label="Skills"
              value={inputs.lastQualification || ""}
              onChange={handleChange}
              name="lastQualification"
            />
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <TextField
              required
              id="outlined-required"
              label="Why are you suitable for this position"
              value={inputs.lastQualification || ""}
              onChange={handleChange}
              name="lastQualification"
            />
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <TextField
              required
              id="outlined-required"
              label="Expected Salary"
              value={inputs.LastSalary || ""}
              onChange={handleChange}
              name="LastSalary"
            />
          </FormControl>
        </div>
        <Button
          style={{ marginTop: "3rem" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  ) : (
    <p>Log in please</p>
  );

  return <React.Fragment>{content}</React.Fragment>;
}
