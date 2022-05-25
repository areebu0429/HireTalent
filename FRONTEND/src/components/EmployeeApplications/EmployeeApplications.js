import React, { useContext, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Axios from "axios";
import Paper from "@mui/material/Paper";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { ApplicationsContext } from "../../App";
import { ProfileContext } from "../../App";
export default function EmployeeApplications() {
  const [profile, setprofile] = useContext(ProfileContext);
  const history = useHistory();
  const [applications, setApplications] = useContext(ApplicationsContext);
  console.log(profile);
  let id = profile.emp_id;
  const [Application1, setApplication1] = useState([]);
  useEffect(() => {
    console.log(id);
    console.log("profileID:", profile.id);
    Axios.post("http://localhost:3001/displayUserJobs", { id })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setApplication1(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log({ Application1 });
  console.log(Application1);
  return (
    <div>
      <h1>Applications</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>JOB_ID</TableCell>
              <TableCell align="right">JOB TITLE</TableCell>

              <TableCell align="right">EMP_ID</TableCell>
              <TableCell align="right">SUMMARY</TableCell>
              <TableCell align="right">Status</TableCell>

              <TableCell align="right">CV</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Application1.map((app, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {app.JOB_ID}
                </TableCell>
                <TableCell align="right">{app.job_title}</TableCell>
                <TableCell align="right">{app.EMP_ID}</TableCell>
                <TableCell align="right">{app.SUMMARY}</TableCell>
                <TableCell align="right">{app.STATUS}</TableCell>
                <TableCell align="right">
                  <Button
                    sx={{ color: "black" }}
                    onClick={() => {
                      history.push(`/cv`);
                    }}
                  >
                    CVname
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
