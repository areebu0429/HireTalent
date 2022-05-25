import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { LoggedInContext, ProfileContext, UserContext } from "../App";
import Axios from "axios";

const employee = {
  email: "employee", //not email but here
  password: "pass",
};

const employer = {
  email: "employer",
  password: "pass",
};

export default function Login() {
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
    Axios.post("http://localhost:3001/login", inputs)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          const p = response.data[0];
          const obj = {
            name: p.Name,
            age: p.Age,
            email: p.Email,
            lastQualification: p.Last_Qualification,
            lastSchool: p.Last_School,
            emp_id: p.ID,
            Image: p.Image,
          };
          console.log(p);
          setProfile(obj);
          setLoggedIn(true);
          setError("");
          setUser("employee");
          history.push("/jobs");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Wrong username /Password");
        setError("Incorrect email or password");
      });
    // if (inputs.email === "employee" && inputs.password === "pass") {
    //   setLoggedIn(true);
    //   setError("");
    //   setUser("employee");
    //   history.push("/jobs");
    // } else {
    //   setError("Incorrect email or password");
    // }
  };

  if (loggedIn) {
    return <div>Already logged in ..</div>;
  }
  return (
    <>
      <h2>Employee Login</h2>
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
}
