import { AppBar, IconButton, Toolbar, Typography, Stack } from "@mui/material";
import ToysIcon from "@mui/icons-material/Toys";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import Searchbar from "./Searchbar";

export const NavBar = () => {
  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{
        background: "white",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton size="large" edge="start" aria-label="logo">
          <ToysIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "black", flexGrow: 1 }}
        >
          Rosville Race Products
        </Typography>
        <Searchbar />
        <IconButton
          size="large"
          edge="end"
          aria-label="logo"
          sx={{ backgroundColor: "blue" }}
        >
          <PersonOutlineOutlinedIcon />
        </IconButton>
        <IconButton size="large" edge="end" aria-label="logo">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
