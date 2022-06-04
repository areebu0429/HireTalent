import { Image } from "@mui/icons-material";
import { React, useState, useEffect } from "react";
import dsa from "../../../src/assets/dsa.jpg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   faCheckCircle,
//   faCheck,
//   faAngleDoubleRight,
// } from "@fortawesome/free-solid-svg-icons";
import "./Roadmap.css";
import { Button } from "@mui/material";
// import { Button } from "antd";
const Roadmap = (props) => {
  return (
    <>
      <div className="roadmapItemLayout">
        <div className="serialNumber">1</div>

        <div className="playlistImage">
          <img src={dsa} alt="Data Structures" />
        </div>
        <div className="information">
          <div className="title">123</div>
          <div className="description">Lorem Ipsum</div>
        </div>

        <Button variant="contained" className="viewBtn">
          View
        </Button>
      </div>
      <div className="roadmapItemLayout">
        <div className="serialNumber">1</div>

        <div className="playlistImage">
          <img src={dsa} alt="Data Structures" />
        </div>
        <div className="information">
          <div className="title">123</div>
          <div className="description">Lorem Ipsum</div>
        </div>

        <Button variant="contained" className="viewBtn">
          View
        </Button>
      </div>
      <div className="roadmapItemLayout">
        <div className="serialNumber">1</div>

        <div className="playlistImage">
          <img src={dsa} alt="Data Structures" />
        </div>
        <div className="information">
          <div className="title">123</div>
          <div className="description">Lorem Ipsum</div>
        </div>

        <Button variant="contained" className="viewBtn">
          View
        </Button>
      </div>
      <div className="roadmapItemLayout">
        <div className="serialNumber">1</div>   

        <div className="playlistImage">
          <img src={dsa} alt="Data Structures" />
        </div>
        <div className="information">
          <div className="title">123</div>
          <div className="description">Lorem Ipsum</div>
        </div>

        <Button variant="contained" className="viewBtn">
          View
        </Button>
      </div>
    </>
  );
};
export default Roadmap;
