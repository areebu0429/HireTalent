import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
// import styles from "./style.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Axios from "axios";
import { useHistory } from "react-router-dom";
export default function CardWrapper({ job, user, showStats, setjobs, jobs }) {
  const {
    job_id,
    comp_id,
    job_title,
    job_desc,
    job_skills,
    job_career_level,
    job_date,
    job_no_of_positions,
    job_sal,
    job_years_of_experience,
    comp_name,
    comp_loc,
  } = job;
  const history = useHistory();
  // console.log({ job_id });
  console.log(job);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [prompt, setprompt] = useState("");
  const [deletePromt, setDeletePromt] = useState("");
  const [updatePrompt, setupdatePrompt] = useState("");
  const [content, setcontent] = useState({});
  useEffect(() => {
    if (user === "employee") {
      setprompt("Apply");
    } else if (user === "employer" && showStats === true) {
      setprompt("Stats");
      setDeletePromt("Delete Job");
      setupdatePrompt("Update Job");
    } else {
      setprompt("");
    }
  }, [user]);
  const deleteJobs = () => {
    Axios.post("http://localhost:3001/deletejob", {
      job_id: job_id,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setjobs(
            jobs.filter((job) => {
              console.log({ job });
              if (job.job_id !== job_id) {
                return true;
              }

              return false;
            })
          );
          //  console.log(jobs);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Wrong username /Password");
      });
  };
  const updateJobs = () => {
    history.push(`/update/${job_id}`);
  };
  return (
    <Card
      sx={{
        maxWidth: !matches ? "70%" : "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 3,
        "& .MuiCardHeader-title": { fontWeight: 900 },
      }}
    >
      <CardHeader title={job_title} subheader={`${comp_name}`} />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {job_desc}
        </Typography>
      </CardContent>

      <CardActions>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <div>EXP: {job_years_of_experience} Years</div>
          <div>Required Skills: {job_skills}</div>
          <div>Location: {comp_loc}</div>

          {/* <div>{job_date.toDateString()}</div> */}
          <div>
            <Typography variant="body2" color="text.secondary">
              Salary: ${job_sal}
            </Typography>
          </div>
          <div>Date: {job_date}</div>
          <div>Career Level: {job_career_level}</div>
        </div>
      </CardActions>
      <CardActions>
        {prompt && (
          <Button size="small" component={Link} to={`/jobs/${job_id}`}>
            {prompt}
          </Button>
        )}
        {deletePromt && (
          <Button size="small" onClick={deleteJobs}>
            {deletePromt}
          </Button>
        )}
        {updatePrompt && (
          <Button size="small" onClick={updateJobs}>
            {updatePrompt}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
