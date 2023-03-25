import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";
import {
  Button,
  Grid,
  Link,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import AddBid from "./AddBid";

const Auction = () => {
  const { id } = useParams();
  const [product, setproduct] = useState();
  const [open, setOpen] = useState({ state: false, type: "error" });
  const [users, setUsers] = useState();
  const [user, setUser] = useState("");
  const [bidPrice, setBidPrice] = useState();
  const productsURL = "http://localhost:4000/products/" + id;
  const usersURL = "http://localhost:4000/users";

  useEffect(() => {
    axios.get(usersURL).then((response) => {
      setUsers(response.data);
      console.log("response users " + JSON.stringify(response.data));
    });
  }, []);
  useEffect(() => {
    axios.get(productsURL).then((response) => {
      setproduct(response.data);
      setBidPrice(response.data.currentprice + 100);
      console.log("response product " + JSON.stringify(response.data));
    });
  }, [open]);
  const minbid = product ? product.currentprice + 100 : 0;
  const placeBid = (e) => {
    console.log("user " + user + "bid price " + bidPrice + " " + minbid);
    if (user === "" || bidPrice < minbid) {
      console.log("error");
      setOpen({ state: true, type: "error", msg: "select correct params" });
    } else if (product && bidPrice >= minbid) {
      let nextvalue = product ? product.bids[0].id + 1 : 999;
      console.log(user);
      const newbid = [
        {
          id: nextvalue,
          pid: user,
          value: bidPrice,
        },
        ...product.bids,
      ];
      const res = axios.patch(productsURL, {
        currentprice: bidPrice,
        bids: newbid,
      });
      setOpen({ state: true, type: "success", msg: "bid added successfully" });
      console.log(
        "new bid " + JSON.stringify(newbid) + " response " + JSON.stringify(res)
      );
    }
  };

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  if (users & product) {
    return <>still loading</>;
  }
  return (
    <div>
      <h1>
        <Button>
          <Link rel="stylesheet" href={"/auction/" + (id - 1)}>
            <ArrowBackIcon />
          </Link>
        </Button>
        Auction item id :{id}
        <Button>
          <Link
            rel="stylesheet"
            href={"/auction/" + (parseInt(id) + parseInt(1))}
          >
            <ArrowForwardIcon />
          </Link>
        </Button>
      </h1>
      <Paper elevation={3}> 
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 6, mb: 6 }} variant="h2" component="div">
              {!product ? <div>product not found</div> : product.name}
            </Typography>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h3" component="div">
              Description :{" "}
              {!product ? <div>product not found</div> : product.description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
              Base Price ={" "}
              {!product ? <div>product not found</div> : product.baseprice}
            </Typography>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
              Current Price ={" "}
              {!product ? <div>product not found</div> : product.currentprice}
            </Typography>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
              Bidder name ={" "}
              {!product ? (
                <div>product not found</div>
              ) : (
                users[
                  users.findIndex((user) => user.pid === product.bids[0].pid)
                ].fname +
                " " +
                users[
                  users.findIndex((user) => user.pid === product.bids[0].pid)
                ].lname
              )}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* {!product ? <div>product not found</div> : JSON.stringify(product)} */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            All Bids
          </Typography>
          <Demo>
            <List>
              {console.log("in bids " + JSON.stringify(product))}
              {!product ? (
                <div>NO Bids</div>
              ) : (
                product.bids.map((item) => {
                  return (
                    <div key={item.id}>
                      <ListItem>
                        <ListItemText primary={"User ID: " + item.pid} />
                        <ListItemText
                          primary={
                            "User Name: " +
                            (users & users.findIndex((e) => e.pid === item.pid))
                              ? users[
                                  users.findIndex((e) => e.pid === item.pid)
                                ].fname +
                                " " +
                                users[
                                  users.findIndex((e) => e.pid === item.pid)
                                ].lname
                              : "no users found"
                          }
                        />
                        <ListItemText primary={"Bid Value: " + item.value} />
                      </ListItem>
                    </div>
                  );
                })
              )}
            </List>
          </Demo>
        </Grid>
        <Grid item xs={12} md={6}>
          {!product && !users ? (
            <div>loading...!!!</div>
          ) : (
            <AddBid
              product={product}
              users={users}
              user={user}
              setUser={setUser}
              placeBid={placeBid}
              bidPrice={bidPrice}
              setBidPrice={setBidPrice}
              minbid={minbid}
              open={open}
              setOpen={setOpen}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Auction;
