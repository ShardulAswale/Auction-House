import {
  Alert,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { MarginRounded } from "@mui/icons-material";

const AddBid = ({
  product,
  users,
  user,
  setUser,
  placeBid,
  bidPrice,
  setBidPrice,
  minbid,
  open,
  setOpen,
}) => {
  console.log(JSON.stringify(product, users));

  // const minbid = product ? parseInt(product.currentprice) + parseInt(100) : 0;
  // const [bidPrice, setBidPrice] = useState(
  //   product ? parseInt(product.currentprice) + parseInt(100) : 0
  // );

  const handleChange = (event) => {
    setUser(event.target.value);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  if (!product & !users) {
    return <>still loading...!</>;
  }
  return (
    <div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Place Bid
      </Typography>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Min Bid = {minbid}
      </Typography>
      <Box>
        <Stack spacing={2} direction="row">
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="demo-simple-select-label">
              {user ? user : "Select User"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user}
              label="user"
              onChange={handleChange}
            >
              {users.map((user) => {
                return (
                  <MenuItem key={user.pid} value={user.pid}>
                    {user.fname}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<RemoveIcon />}
            sx={{marginRight:100}}
            onClick={(e) => {
              if (bidPrice - 100 >= minbid) setBidPrice(bidPrice - 100);
            }}
          >
            100
          </Button>
          <Button
            variant="outlined"
            startIcon={<RemoveIcon />}
            onClick={(e) => {
              if (bidPrice - 1000 > minbid) setBidPrice(bidPrice - 1000);
            }}
          >
            1000
          </Button>
          <Input
            value={bidPrice}
            variant="outlined"
            color="primary"
            onChange={(e) => {
              setBidPrice(e.target.value);
              console.log("current price set to " + bidPrice);
            }}
            type="number"
          ></Input>
          <Button
            variant="outlined"
            endIcon={<AddIcon />}
            onClick={(e) => {
              e.preventDefault();
              setBidPrice(bidPrice + 100);
            }}
          >
            100
          </Button>
          <Button
            variant="outlined"
            endIcon={<AddIcon />}
            onClick={(e) => {
              e.preventDefault();
              setBidPrice(bidPrice + 1000);
            }}
          >
            1000
          </Button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={(e) => placeBid(e)}
          >
            Place BID
          </Button>
        </Stack>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open.state}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={open.type}
          sx={{ width: "100%" }}
        >
          {open.msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddBid;
