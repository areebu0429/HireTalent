import React, { Fragment, useEffect, useState, useContext } from "react";
import CardWrapper from "../Card/Card";
import "./style.css";
import { withRouter } from "react-router";
import Axios from "axios";
import { ProfileContext } from "../../App";
import InputSlider from "../InputSlider/InputSlider";
import { Button } from "@mui/material";
import SearchJobs from "../SearchJobs/SearchJobs";

function MyJobs({ loggedIn, user, location }) {
  // if (!loggedIn) {
  //   return <div>Please log in..</div>;
  // }
  const [profile, setprofile] = useContext(ProfileContext);

  // const [jobs, setjobs] = useState(sample_jobs);
  const [jobs, setjobs] = useState([]);
  console.log({ jobs });
  console.log(profile);
  useEffect(() => {
    Axios.post("http://localhost:3001/viewMyJobs", { comp_id: profile.comp_id })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setjobs(response.data);
          console.log(jobs);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Wrong username /Password");
      });
  }, []);

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/viewJobs")
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log(response);
  //         let title = params.get("title"); // bar
  //         let city = params.get("city");
  //         if (title === null) {
  //           title = "";
  //         }
  //         if (city === null) {
  //           city = "";
  //         }
  //         let jobs = response.data;
  //         jobs = jobs.filter((job) => {
  //           if (
  //             job.job_title.includes(title) &&
  //             job.job_location.includes(city)
  //           ) {
  //             return true;
  //           }
  //         });
  //         setjobs(response.data);
  //         console.log(jobs);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log("Wrong username /Password");
  //     });
  // }, [location]);
  console.log(profile);
  // >>>>>>> 6b405961559f32f413eaca362ec50bd3be401b5e
  // console.log({ title });
  return (
    <div>
      <SearchJobs
        //  sample_jobs={sample_jobs}
        setjobs={setjobs}
      />

      <div className="jobs-main">
        {jobs?.map((job, i) => {
          // console.log(job.jobId);
          return (
            <Fragment key={i}>
              <CardWrapper
                job={job}
                user={user}
                showStats={true}
                setjobs={setjobs}
                jobs={jobs}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
export default withRouter(MyJobs);
