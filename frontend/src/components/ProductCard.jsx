import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    // Add to cart, slide in remove item button, display quantity in cart icon & between icon
    // Display toast notif of add to cart
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 382 }}>
        <CardMedia
          component="img"
          height="382"
          src="https://images.unsplash.com/photo-1669724436791-8ddf7a9d2282?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="Product Image"
        />

        <CardContent>
          <Box>
            <Typography variant="subtitle1" component="h2" color="text.priamry">
              Example Product
            </Typography>
          </Box>
          {/* Maybe we fake this? */}
          <Box>
            <Rating name="read-only" value={3} readOnly />
          </Box>
          {/* Price */}

          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography variant="h10" color="rgb(210,63,87)">
                $4.99
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <CardActions>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="add to cart"
                >
                  <AddBoxOutlinedIcon
                    sx={{
                      fontSize: 32,
                      color: "rgb(210,63,87)",
                    }}
                  />
                </ExpandMore>
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
