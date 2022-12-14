import React from "react";
import { AppBar, Toolbar, Typography, Link, Container } from "@mui/material";

const Footer = () => (
  <Container sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
    <AppBar position="static" elevation={0} component="footer" color="default">
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="caption">
          <Link href="https://jackhixon.com" underline="none" color="inherit">
            © 2022 Jack Hixon
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  </Container>
);

export default Footer;
