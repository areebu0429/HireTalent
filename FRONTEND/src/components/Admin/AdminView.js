import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
const AdminView = () => {
  const [employee, setemployee] = useState([]);
  const [company, setcompany] = useState([]);
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/viewEmployeeDetails")
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("employee", response.data);
  //         setemployee(response.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log("Wrong username /Password");
  //     });
  // }, []);
  // useEffect(() => {
  //   Axios.get("http://localhost:3001/ViewCompanyDetails")
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("Company", response.data);
  //         setcompany(response.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log("Wrong username /Password");
  //     });
  // }, []);
  // const handleDeleteEmployee = ({ ID }) => {
  //   Axios.post("http://localhost:3001/deleteEmployee", { ID })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setemployee(
  //           employee.filter((emp) => {
  //             if (emp.ID !== ID) {
  //               return true;
  //             }

  //             return false;
  //           })
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log("Wrong username /Password");
  //     });
  // };
  // const handleDeleteCompany = ({ ID }) => {
  //   Axios.post("http://localhost:3001/deleteCompany", { ID })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setcompany(
  //           company.filter((comp) => {
  //             if (comp.comp_id !== ID) {
  //               return true;
  //             }

  //             return false;
  //           })
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log("Wrong username /Password");
  //     });
  // };
  return (
    <>
      <h1>THIS IS APPLICANT RECORD</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Applicant ID</TableCell>
              <TableCell align="left">Applicant Name</TableCell>
              <TableCell align="right">Delete Button</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {employee?.map((app, i) => ( */}
            <TableRow
              key={1}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>

              <TableCell align="left">hi</TableCell>

              <TableCell align="right">
                <Button
                // onClick={() => {
                //   handleDeleteEmployee({
                //     ID: app.ID,
                //   });
                // }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            <TableRow
              key={1}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>

              <TableCell align="left">hi</TableCell>

              <TableCell align="right">
                <Button
                // onClick={() => {
                //   handleDeleteEmployee({
                //     ID: app.ID,
                //   });
                // }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            <TableRow
              key={1}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>

              <TableCell align="left">hi</TableCell>

              <TableCell align="right">
                <Button
                // onClick={() => {
                //   handleDeleteEmployee({
                //     ID: app.ID,
                //   });
                // }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <br />
      <h1>THIS IS COMPANY RECORD</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company ID</TableCell>
              <TableCell align="left"> Company Name</TableCell>
              <TableCell align="right"> Delete Button</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {company?.map((app, i) => ( */}
            <TableRow
              key={1}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>

              <TableCell align="left">abc</TableCell>
              <TableCell align="right">
                <Button
                // onClick={() => {
                //   handleDeleteCompany({
                //     ID: app.comp_id,
                //   });
                // }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            <TableRow
              key={1}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>

              <TableCell align="left">abc</TableCell>
              <TableCell align="right">
                <Button
                // onClick={() => {
                //   handleDeleteCompany({
                //     ID: app.comp_id,
                //   });
                // }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            <TableRow
              key={1}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                1
              </TableCell>

              <TableCell align="left">abc</TableCell>
              <TableCell align="right">
                <Button
                // onClick={() => {
                //   handleDeleteCompany({
                //     ID: app.comp_id,
                //   });
                // }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminView;
