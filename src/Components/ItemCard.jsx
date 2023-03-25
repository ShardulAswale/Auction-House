import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

const ItemCard = (props) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 400 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Typography variant="h4" component="div">
          {props.item.name}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.item.description}
        </Typography> */}
        <Typography variant="h6">{props.item.description}</Typography>
        {/* <Typography>{JSON.stringify(props)}</Typography> */}
        <Typography variant="h6">
          Base Price : {props.item.baseprice}
        </Typography>
        <Typography variant="h6">
          Current Bid : {props.item.currentprice}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={"/auction/" + props.item.id}>
          BID 
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
