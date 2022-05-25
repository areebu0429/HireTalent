import React, { useContext, Fragment } from "react";
import { LoggedInContext, ProfileContext, UserContext } from "../App";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AccountMenu from "../components/AccountMenu/AccountMenu";
const CustomToolBar = styled(Toolbar)(({ theme }) => ({
  // backgroundColor: theme.globalColor, //can also customize components using theme variables
}));

export default function ButtonAppBar({ drawerWidth, setMobileOpen, name }) {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  const [user, setUser] = useContext(UserContext);
  const handleDrawerToggle = () => {
    setMobileOpen((mobileOpen) => !mobileOpen);
  };
  const drawerMargin = loggedIn ? drawerWidth : 0;

  return (
    // <Box sx={{ flexGrow: 1, width: 1, mb: 4 }}>
    <AppBar
      position="static"
      sx={{
        width: { sm: loggedIn ? `calc(100% - ${drawerWidth}px)` : "100%" },
        ml: { sm: `${drawerMargin}px` },
        mb: 6,
      }}
    >
      <CustomToolBar
        sx={{
          flexWrap: "wrap",
        }}
      >
        {loggedIn && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Job Portal
        </Typography>
        {user !== "admin" ? (
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
        ) : (
          ""
        )}
        {/* <Button
          component={Link}
          to="/login"
          color="inherit"
          sx={{ display: loggedIn ? "none" : "inline-flex" }}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/elogin"
          color="inherit"
          sx={{ display: loggedIn ? "none" : "inline-flex" }}
        >
          ELogin
        </Button> */}
        <AccountMenu text="Login" />
        {/* <Button
          component={Link}
          to="/signup"
          color="inherit"
          sx={{ display: loggedIn ? "none" : "inline-flex" }}
        >
          Signup
        </Button>
        <Button
          component={Link}
          to="/esignup"
          color="inherit"
          sx={{ display: loggedIn ? "none" : "inline-flex" }}
        >
          ESignup
        </Button> */}
        <AccountMenu text="Signup" />
        {user === "employee" && (
          <Button component={Link} to="/applications" color="inherit">
            Applications
          </Button>
        )}
        {user !== "admin" ? (
          <>
            <Button component={Link} to="/jobs" color="inherit">
              Jobs
            </Button>

            <Button
              component={Link}
              to="/profile"
              color="inherit"
              sx={{ display: !loggedIn ? "none" : "inline-flex" }}
            >
              Profile
            </Button>
            <Button
              component={Link}
              to="/settings"
              color="inherit"
              sx={{ display: !loggedIn ? "none" : "inline-flex" }}
            >
              Settings
            </Button>

            {loggedIn && (
              <Link
                to="/settings"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <IconButton>
                  <AccountCircleRoundedIcon />
                </IconButton>
                {name}
              </Link>
            )}
          </>
        ) : (
          ""
        )}
        {user === "employer" && (
          <Button
            component={Link}
            to="/portal"
            color="inherit"
            sx={{ display: !loggedIn ? "none" : "inline-flex" }}
          >
            Add Job
          </Button>
        )}
        {user === "employer" && (
          <Button component={Link} to="/myjobs" color="inherit">
            MyJobs
          </Button>
        )}
        {loggedIn && (
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{ display: !loggedIn ? "none" : "inline-flex" }}
            onClick={() => {
              setLoggedIn(false);
              setUser("");
            }}
          >
            Sign Out
          </Button>
        )}
      </CustomToolBar>
    </AppBar>
    // </Box>
  );
}
