import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

const AuctionItemList = () => {
  const productsURL = "http://localhost:4000/products";
  // const [products, setProducts] = useState();
  const [items, setItems] = useState();
  useEffect(() => {
    axios.get(productsURL).then((response) => {
      setItems(response.data);
      console.log(response.data,items);
    });
  }, []);
  // eslint-disable-next-line
  console.log(items)
  return (
    <div>
      <h1>AuctionItemList</h1>
      <div className="itemList">
        {!items ? (
          <div>no items to display</div>
        ) : (
          items.map((item) => {
            return <ItemCard key={item.id} item={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default AuctionItemList;
