import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
const imageSrc = "https://i.imgur.com/38jtjTg.jpg";
export const ImageGallery = () => {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <>
      <Grid container>
        {/* Main Gallery Image */}
        <Box sx={{ justifyContent: "center", alignItems: "center" }}>
          <img src={imageSrc} width={300} height={300} alt="" />
        </Box>
      </Grid>
      <Box display="flex" justifyContent="space-evenly" maxWidth={300}>
        {/* On click, highlight box, change display*/}

        <Box item onClick={() => console.log("Hello")}>
          <Avatar src={imageSrc} />
        </Box>

        <Box item>
          <Avatar src={imageSrc} />
        </Box>
        <Box item>
          <Avatar src={imageSrc} />
        </Box>
      </Box>
    </>
  );
};
