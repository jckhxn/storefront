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
import { useSnackbar } from "notistack";

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

export default function ProductCard({ image, name, price }) {
  const [expanded, setExpanded] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const handleClick = () => {
    // Add to cart, display remove item button based on state
    // display quantity in cart icon & between icon

    enqueueSnackbar("Item added to cart", { variant: "success" });
    enqueueSnackbar("Item removed from cart", { variant: "error" });
    setExpanded(!expanded);
  };

  return (
    <>
      <Grid item xs={3}>
        <Box>
          <Card sx={{ maxWidth: 334 }}>
            <CardMedia
              component="img"
              height="382"
              src={image}
              alt="Product Image"
            />

            <CardContent>
              <Box>
                <Typography
                  variant="subtitle1"
                  component="h2"
                  color="text.priamry"
                >
                  {name}
                </Typography>
              </Box>

              <Box>
                <Rating name="read-only" value={3} readOnly />
              </Box>

              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <Typography variant="h10" color="rgb(210,63,87)">
                    ${price}
                  </Typography>
                </Grid>

                <Grid item xs={8}>
                  <CardActions>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleClick}
                      aria-expanded={expanded}
                      aria-label="add to cart"
                    >
                      <AddBoxOutlinedIcon
                        sx={{
                          fontSize: 32,
                          color: "rgb(210,63,87)",
                        }}
                      />
                      {/* Display quantity selected    */}
                    </ExpandMore>
                    {/* Show only if item is in cart */}
                    {/* <RemoveOutlinedIcon
                    sx={{
                      fontSize: 32,
                      color: "rgb(210,63,87)",
                      border: 2,
                    }}
                  /> */}
                  </CardActions>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </>
  );
}
