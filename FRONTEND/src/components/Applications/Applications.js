import React, { useState, useContext, useEffect } from "react";
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
import fileDownload from "js-file-download";
export default function Applications() {
  const { id } = useParams();
  const [profile, setprofile] = useContext(ProfileContext);
  console.log({ id });
  console.log(profile);
  const comp_id = profile.comp_id;
  console.log(comp_id);
  const history = useHistory();
  const [applications, setApplications] = useContext(ApplicationsContext);
  console.log({ applications });
  let job_id = parseInt(id);
  const [Application1, setApplication1] = useState([]);
  useEffect(() => {
    console.log(job_id);
    Axios.post("http://localhost:3001/displayCompanyJobs", { job_id })
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
  console.log(Application1);
  const handleAccept = ({ JOB_ID, EMP_ID, ID }) => {
    const cloned = [...Application1];
    Axios.post("http://localhost:3001/Accept", { ID })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          // setApplication1(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    function findapp(app) {
      if (app.JOB_ID === JOB_ID && app.EMP_ID === EMP_ID) {
        return true;
      }
      return false;
    }
    const index = cloned.findIndex(findapp);
    cloned[index].STATUS = "Accepted";
    console.log(cloned[index].STATUS);
    setApplication1(cloned);
    Axios.post("http://localhost:3001/job_history", { EMP_ID, JOB_ID, comp_id })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          // setApplication1(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleReject = ({ JOB_ID, EMP_ID, ID }) => {
    const cloned = [...Application1];
    Axios.post("http://localhost:3001/Reject", { ID })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          // setApplication1(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    function findapp(app) {
      if (app.JOB_ID === JOB_ID && app.EMP_ID === EMP_ID) {
        return true;
      }
      return false;
    }
    const index = cloned.findIndex(findapp);
    cloned[index].STATUS = "Rejected";

    setApplications(cloned);
  };

  return (
    <div>
      <h1>Applications</h1>
      <TableContainer
        component={Paper}
        style={{ width: "95%", margin: "0px 0px 0px 25px" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell style={{ paddingLeft: "100px" }}>JOB_ID</TableCell> */}
              <TableCell style={{ paddingLeft: "100px" }}>Applicant ID</TableCell>
              <TableCell >Applicant Name</TableCell>
              <TableCell>Job Application</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ paddingLeft: "120px" }}>1</TableCell>
              <TableCell style={{ paddingLeft: "50px" }}>Areeb</TableCell>
              <TableCell style={{ paddingLeft: "50px" }}>hi</TableCell>
              <TableCell>
                <Button style={{ marginLeft: "-35px" }}>Accept</Button>
                <Button>Reject</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingLeft: "120px" }}>1</TableCell>
              <TableCell style={{ paddingLeft: "50px" }}>Areeb</TableCell>
              <TableCell style={{ paddingLeft: "50px" }}>hi</TableCell>
              <TableCell>
                <Button style={{ marginLeft: "-35px" }}>Accept</Button>
                <Button>Reject</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingLeft: "120px" }}>1</TableCell>
              <TableCell style={{ paddingLeft: "50px" }}>Areeb</TableCell>
              <TableCell style={{ paddingLeft: "50px" }}>hi</TableCell>
              <TableCell>
                <Button style={{ marginLeft: "-35px" }}>Accept</Button>
                <Button>Reject</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingLeft: "120px" }}>1</TableCell>
              <TableCell style={{ paddingLeft: "50px" }}>Areeb</TableCell>
              <TableCell style={{ paddingLeft: "50px" }}>hi</TableCell>
              <TableCell>
                <Button style={{ marginLeft: "-35px" }}>Accept</Button>
                <Button>Reject</Button>
              </TableCell>
            </TableRow>

            {/* {Application1.map((app, i) => (
              <>
                {app.STATUS === "Pending" ? (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {app.JOB_ID}
                    </TableCell>
                    <TableCell align="right">{app.EMP_ID}</TableCell>
                    <TableCell align="right">{app.Name}</TableCell>
                    <TableCell align="right">{app.SUMMARY}</TableCell>
                    <TableCell align="right">{app.STATUS}</TableCell>
                    <TableCell align="right">
                      <Button
                        sx={{ color: "black" }}
                        onClick={() => {
                          Axios.post("http://localhost:3001/DownloadResume", {
                            CV: app.CV,
                          })
                            .then((response) => {
                              if (response.status === 200) {
                                console.log(response);
                                // setApplication1(response.data);
                                const type = response.headers["content-type"];
                                const blob = new Blob([response.data], {
                                  type: type,
                                  encoding: "UTF-8",
                                });
                                const link = document.createElement("a");
                                link.href = window.URL.createObjectURL(blob);
                                link.download = "file.pdf";
                                link.click();
                                // fileDownload(response.data, "file.pdf");
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        CVname
                      </Button>
                      {/* <a href={`http://localhost:3001/DownloadResume/${app.CV}`}>
                    CV DOWNLOAD
                  </a> 
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          handleAccept({
                            JOB_ID: app.JOB_ID,
                            EMP_ID: app.EMP_ID,
                            ID: app.ID,
                          });
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => {
                          handleReject({
                            JOB_ID: app.JOB_ID,
                            EMP_ID: app.EMP_ID,
                            ID: app.ID,
                          });
                        }}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  " "
                )}
              </>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
