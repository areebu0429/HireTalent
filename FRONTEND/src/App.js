import AppBar from "./components/AppBar";
import "./App.css";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Jobs from "./components/Jobs/Jobs";
import Resume from "./components/Resume";
import Signup from "./components/Signup";
import Portal from "./components/Portal";
import Drawer from "./components/Drawer/Drawer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import SearchJobs from "./components/SearchJobs/SearchJobs";
import EmployerSignup from "./components/EmployerSignup";
import EmployerSettings from "./components/EmployerSettings/EmployerSettings";
import ELogin from "./components/Elogin";
import Applications from "./components/Applications/Applications";
import Roadmap from "./components/Roadmap/Roadmap";
import EmployeeApplications from "./components/EmployeeApplications/EmployeeApplications";
import MyJobs from "./components/MyJobs/MyJobs";
import UpdateJob from "./components/UpdateJob/UpdateJob";
import PostJob from "./components/PostJobs/PostJob"
import AdminLogin from "./components/Admin/AdminLogin";
import AdminView from "./components/Admin/AdminView";
const apps = [
  {
    JOB_ID: 1,
    EMP_ID: 1,
    status: "Pending",
  },
  {
    JOB_ID: 2,
    EMP_ID: 2,
    status: "Pending",
  },
];
const sample_jobs = [
  {
    job_id: 9,
    job_title: "senior software engineer",
    job_desc: "Want talented engineer",
    job_skills: "html,css",
    job_no_of_positions: 2,
    job_date: new Date(), //post date,
    job_salary: 1000,
    job_years_of_experience: 2,
    job_career_level: "Experienced Professional",
    job_company: "AICompany",
  },
  {
    job_id: 10,
    job_title: "junior software engineer",
    job_desc: "Want talented engineer",
    job_skills: "html,css",
    job_no_of_positions: 2,
    job_date: new Date(), //post date,
    job_salary: 1000,
    job_years_of_experience: 2,
    job_career_level: "Entry Level",
    job_company: "AICompany",
  },
];
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme({
  // globalColor: "#14a800", //either add extra variable
  palette: {
    primary: {
      main: "#14a800", //or override
    },
  },
});
const drawerWidth = 240;

export const UserContext = createContext("");
export const ProfileContext = createContext("");
export const LoggedInContext = createContext("");
export const ApplicationsContext = createContext("");
function App() {
  const userState = useState("");
  const ApplicationsState = useState(apps);
  console.log(ApplicationsState[0]);
  const [user, setUser] = userState;

  const profileState = useState({
    // //dummy state.It should be empty, requires database for login info to be  correct here

    email: "",
    password: "",
    name: "",
    age: "",
    lastSchool: "",
    lastQualification: "",
    type: "",

    recentJobsApplied: sample_jobs,
  });
  const [profile, setProfile] = profileState;
  // const p =
  //   user === "employee"
  //     ? [employeeProfile, setEmployeeProfile]
  //     : [employerProfile, setEmployerProfile];
  // const userInfo = p[0].userInfo;
  const loggedInState = useState(true);
  const [loggedIn, setLoggedIn] = loggedInState;

  const [jobs, setJobs] = useState(sample_jobs);
  const [mobileOpen, setMobileOpen] = useState(false);
  console.log(profile);
  // console.log({ userInfo });
  return (
    <div className="App" style={{ paddingBottom: "5%" }}>
      <Router>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={userState}>
            <ProfileContext.Provider value={profileState}>
              <LoggedInContext.Provider value={loggedInState}>
                <ApplicationsContext.Provider value={ApplicationsState}>
                  <AppBar
                    setMobileOpen={setMobileOpen}
                    loggedIn={loggedIn}
                    drawerWidth={user === "admin" ? 0 : drawerWidth}
                    mobileOpen={mobileOpen}
                  />
                  <Grid container spacing={2}>
                    {loggedIn && user !== "admin" && (
                      <Grid item xs="auto">
                        <Drawer
                          profile={profile}
                          drawerWidth={drawerWidth}
                          mobileOpen={mobileOpen}
                          loggedIn={loggedIn}
                          setMobileOpen={setMobileOpen}
                        />
                      </Grid>
                    )}

                    <Grid item xs>
                      {/* <Item> */}
                      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                      <Switch>
                        <Route path="/elogin">
                          <ELogin />
                        </Route>
                        <Route path="/adminlogin">
                          <AdminLogin />
                        </Route>
                        <Route path="/AdminView">
                          <AdminView />
                        </Route>
                        <Route path="/login">
                          <Login />
                        </Route>
                        <Route path="/esignup">
                          <EmployerSignup />
                        </Route>
                        <Route path="/signup">
                          <Signup />
                        </Route>

                        <Route path="/profile">
                          <Profile />
                        </Route>
                        <Route path="/roadmap">
                          <Roadmap />
                        </Route>
                        <Route path="/jobs/submissions">
                          <Applications />
                        </Route>
                        <Route path="/jobs/:id">
                          <Resume user={user} jobs={jobs} />
                        </Route>
                        <Route path="/jobs">
                          <Jobs loggedIn={loggedIn} jobs={jobs} user={user} />
                        </Route>
                        <Route path="/myjobs">
                          <MyJobs loggedIn={loggedIn} jobs={jobs} user={user} />
                        </Route>
                        
                        <Route path="/postjob">
                          <PostJob />
                        </Route>
                        <Route path="/update/:id">
                          <UpdateJob
                            user={user}
                            loggedIn={loggedIn}
                            setJobs={setJobs}
                            jobs={jobs}
                            profile={profile}
                          />
                        </Route>
                        <Route path="/myapplications/">
                          <EmployeeApplications />
                        </Route>
                        <Route path="/settings">
                          {user === "employee" ? (
                            <Settings />
                          ) : (
                            <EmployerSettings />
                          )}
                        </Route>

                        <Route path="/portal">
                          <Portal
                            user={user}
                            loggedIn={loggedIn}
                            setJobs={setJobs}
                            jobs={jobs}
                            profile={profile}
                          />
                          {/*for employer only*/}
                        </Route>
                        <Route path="/">
                          <Jobs loggedIn={loggedIn} jobs={jobs} user={user} />
                        </Route>
                      </Switch>
                      {/* </Item> */}
                    </Grid>
                  </Grid>

                  {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
                </ApplicationsContext.Provider>
              </LoggedInContext.Provider>
            </ProfileContext.Provider>
          </UserContext.Provider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
