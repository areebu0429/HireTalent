import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useHistory } from "react-router";
import InputSlider from "../InputSlider/InputSlider";
import Axios from "axios";
export default function SearchJobs({ sample_jobs, setjobs }) {
  const [search, setSearch] = useState({
    city: "",
    title: "",
  });
  console.log({ search });
  const [minSal, setMinSal] = useState(0);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Clicked", { search, minSal });
    Axios.post("http://localhost:3001/applyfilter", { search, minSal })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setjobs(response.data);
          //  console.log(jobs);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Wrong username /Password");
      });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearch((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div style={{ marginBottom: "5%" }}>
      <Box
        sx={{
          display: "flex",
          width: "80%",
          maxWidth: "100%",
          m: "auto",
          mb: 4,
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: 300 }}>
          <TextField
            fullWidth
            label="Search Jobs by Title"
            id="search"
            name="title"
            value={search?.title}
            onChange={handleChange}
          />
        </div>
        <div style={{ width: 300 }}>
          <TextField
            fullWidth
            label="Search Jobs by City"
            id="search"
            value={search?.city}
            name="city"
            onChange={handleChange}
          />
        </div>
        <div>
          <InputSlider value={minSal} setValue={setMinSal} />
        </div>
      </Box>

      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}
