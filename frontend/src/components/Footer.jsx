import React from "react";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";

const Footer = () => (
  <>
    <AppBar position="static" elevation={0} component="footer" color="default">
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="caption">
          <Link href="https://jackhixon.com" underline="none" color="inherit">
            ©2022 Jack Hixon
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  </>
);

export default Footer;
