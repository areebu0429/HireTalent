import React, { useState, useEffect, useContext } from "react";
import { ProfileContext } from "../App";
import Axios from "axios";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import { ApplicationsContext } from "../App";

const Input = styled("input")({
  display: "none",
});

export default function Resume({ jobs, user }) {
  const history = useHistory();

  const [applications, setApplications] = useContext(ApplicationsContext);

  let id = useParams();

  // id = parseInt(id);
  const [submitted, setSubmitted] = useState(false);
  const [profile, setprofile] = useContext(ProfileContext);
  console.log(profile);
  // console.log(jobs[i]d? - 1);
  // console.log(id - 1);
  // if (!jobs) return null;
  // if (!id) return null;

  // const {
  //   job_title,
  //   job_desc,
  //   job_company,
  //   job_date,
  //   job_salary,
  //   job_skills,
  //   job_no_of_positions,
  //   job_career_level,
  // } = jobs[0];
  const [resume, setresume] = useState({});
  const [inputs, setInputs] = useState({
    Summary: "",
    Job_ID: parseInt(id.id),
    Emp_ID: profile.emp_id,
  });
  console.log(inputs);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleChangeResume = (event) => {
    const name = event.target.name;
    // let value = event.target.value;
    const value = event.target.files[0].name;
    // console.log(value[0]);
    // value = value.split("fakepath\\");
    // value = value[0] + value[1];
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleAppSubmit = (e) => {
    //process

    // setApplications((prev) => {
    //   return [
    //     ...prev,
    //     {
    //       EMP_ID: 3,
    //       JOB_ID: parseInt(id),
    //       status: "Pending",
    //     },
    //   ];
    // });
    // setSubmitted(true);

    setSubmitted(true);
  };
  console.log(resume);
  useEffect(() => {
    console.log(id);
    Axios.post("http://localhost:3001/Resume", id)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setresume(response.data[0]);
          //  setjobs(response.data);
          console.log(resume);
          console.log(jobs);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Wrong username /Password");
      });
  }, []);
  // console.log({ jobs });

  let content = "";
  useEffect(() => {
    if (inputs.CV && submitted) {
      console.log("This is FInal Inputs", inputs);
      Axios.post("http://localhost:3001/submitResume", inputs)
        .then(() => {
          console.log("success");

          console.log(inputs);
          setSubmitted(false);
          setInputs({
            Summary: "",
            Job_ID: parseInt(id.id),
            Emp_ID: profile.emp_id,
          });
        })
        .catch((err) => {
          console.log("This is error", err);
        });
    }
  }, [inputs, submitted]);

  const handleAppResumeSubmit = () => {
    var formData = new FormData();
    var CV = document.querySelector("#file1");
    console.log("Hello", CV.files[0]);
    formData.append("CV", CV.files[0]);
    console.log("formdata", formData);
    Axios.post("http://localhost:3001/profile-upload-single1", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res.data.url);
        // var CV = document.querySelector("#file1");
        setInputs({ ...inputs, CV: CV.files[0].name });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  if (user === "employee" && !submitted) {
    content = (
      <React.Fragment>
        <h2>Your Application:</h2>
        <div>
          <TextField
            required
            label="Summary"
            value={inputs.Summary || ""}
            onChange={handleChange}
            name="Summary"
          />
        </div>
        <div>
          {/* <label htmlFor="contained-button-file">
            <Input
              id="contained-button-file"
              multiple
              type="file"
              value={inputs.cv || ""}
              onChange={handleChangeResume}
              name="CV"
            />
            <Button variant="outlined" component="span">
              Upload Resume/CV
            </Button>
            <a
              href="C:\Users\HP\Desktop\pic1.jpg"
              download="proposed_file_name"
            >
              Download
            </a>
          </label> */}
          <div>
            <label>Upload CV</label>
            <input
              id="file1"
              type="file"
              name="CV"
              required
              onChange={handleAppResumeSubmit}
            />
            {/* <Button variant="contained" onClick={handleAppResumeSubmit}>
              SubmitCV
            </Button> */}
          </div>
          <br />
          <Button variant="contained" onClick={handleAppSubmit}>
            Submit
          </Button>
        </div>
      </React.Fragment>
    );
  } else if (user === "employee") {
    content = <h2>Submitted..</h2>;
  } else if (user === "employer") {
    console.log(id);
    content = (
      <div>
        <Button
          variant="contained"
          onClick={() => {
            history.push(`/applications/${id.id}`);
          }}
        >
          Applications
        </Button>
      </div>
    );
  } else {
    content = <h2>Please log in..</h2>;
  }

  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "10rem",
        marginLeft: 40,
      }}
    >
      {/* <h1>{job_company}</h1> */}
      <h2>{resume?.job_title}</h2>
      <h3>{resume?.job_date}</h3>
      <h3>Description:</h3>
      <p>{resume?.job_desc}</p>
      <h3>Salary: ${resume?.job_sal}</h3>
      <h3>Skills: </h3>
      <p>{resume?.job_skills}</p>
      <h3>No of Positions: {resume?.job_no_position}</h3>
      <h3>Career Level: {resume?.job_career_level}</h3>
      {content}
    </div>
  );
}
