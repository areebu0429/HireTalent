import React from "react";
import { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ListItem } from "@mui/material";
import List from "@mui/material/List";
import { ProfileContext, LoggedInContext } from "../../App";
import { useHistory } from "react-router";
import Axios from "axios";
export default function EmployerSettings() {
  const loggedIn = useContext(LoggedInContext);
  const [profile, setProfile] = useContext(ProfileContext);
  const history = useHistory();
  const [inputs, setInputs] = useState({
    comp_email: profile.comp_email,
    comp_password: profile.comp_password,
    comp_name: profile.comp_name,
    comp_sector: profile.comp_sector,
    comp_location: profile.comp_location,
    comp_id: profile.comp_id,
  });
  // console.log(inputs);
  // console.log(profile);
  const [location, setLocation] = useState("");
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    Axios.post("http://localhost:3001/updateCompanyRecord", inputs).then(() => {
      setProfile((prev) => {
        return { ...prev, ...inputs };
      });
      history.push("/");
    });
    // console.log(inputs.age);
    // console.log({ inputs });
  };

  const content = loggedIn ? (
    <div>
      <h3>Settings</h3>
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
            label="Email"
            value={inputs.comp_email || ""}
            onChange={handleChange}
            name="comp_email"
          />
          <br />

          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={inputs.comp_password || ""}
            onChange={handleChange}
            name="comp_password"
          />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Name"
            value={inputs.comp_name || ""}
            onChange={handleChange}
            name="comp_name"
          />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Sector"
            value={inputs.comp_sector || ""}
            onChange={handleChange}
            name="comp_sector"
          />
          <br />
          <TextField
            required
            id="outlined-required"
            label="Location"
            value={inputs.comp_location || ""}
            onChange={handleChange}
            name="comp_location"
          />
        </div>
        {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={inputs.type}
          label="User Type"
          name="type"
          onChange={handleChange}
        >
          <MenuItem value={"employer"}>Employer</MenuItem>
          <MenuItem value={"employee"}>Employee</MenuItem>
        </Select>
      </FormControl> */}
        <br />

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
