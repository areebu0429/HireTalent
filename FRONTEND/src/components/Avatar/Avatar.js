import React from "react";

import Avatar from "@mui/material/Avatar";
export default function AvatarComponent({ Image }) {
  return (
    <Avatar
      alt="Remy Sharp"
      src={Image}
      sx={{ width: 200, height: 200, m: "auto" }}
    />
  );
}
