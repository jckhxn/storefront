import React from "react";
import Button from "@mui/material/Button";

function CustomButton({ children }) {
  return (
    <>
      <Button
        sx={{ background: "purple", color: "white", fontSize: 16 }}
        variant="text"
      >
        {children}
      </Button>
    </>
  );
}

export default CustomButton;
